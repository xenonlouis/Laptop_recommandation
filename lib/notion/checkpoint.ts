import fs from 'fs';
import path from 'path';

// Define the path for checkpoint storage
const CHECKPOINT_DIR = path.join(process.cwd(), 'checkpoints');

// Ensure the checkpoint directory exists
function ensureCheckpointDir() {
  if (!fs.existsSync(CHECKPOINT_DIR)) {
    fs.mkdirSync(CHECKPOINT_DIR, { recursive: true });
  }
}

// Create a checkpoint of the data
export async function createCheckpoint() {
  ensureCheckpointDir();
  
  // Create a valid ISO timestamp that's both safe for filenames and easily parsable
  const now = new Date();
  const isoString = now.toISOString();
  const timestamp = isoString.replace(/:/g, '-');
  const checkpointPath = path.join(CHECKPOINT_DIR, `checkpoint-${timestamp}`);
  fs.mkdirSync(checkpointPath);

  // Data files to backup
  const dataFiles = [
    'packages.json',
    'laptops.json',
    'accessories.json',
    'people.json',
  ];

  // Copy each data file to the checkpoint directory
  for (const file of dataFiles) {
    const sourcePath = path.join(process.cwd(), 'data', file);
    const destPath = path.join(checkpointPath, file);
    
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
    }
  }

  // Create a manifest file with metadata
  const manifestPath = path.join(checkpointPath, 'manifest.json');
  const manifest = {
    // Store the clean ISO string for timestamp (not the filename-safe version)
    timestamp: isoString,
    createdAt: isoString,
    files: dataFiles,
  };

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  
  console.log(`Checkpoint created at: ${checkpointPath}`);
  return checkpointPath;
}

// List all available checkpoints
export function listCheckpoints() {
  ensureCheckpointDir();
  
  const checkpoints = fs.readdirSync(CHECKPOINT_DIR)
    .filter(dir => dir.startsWith('checkpoint-'))
    .map(dir => {
      const checkpointPath = path.join(CHECKPOINT_DIR, dir);
      const manifestPath = path.join(checkpointPath, 'manifest.json');
      
      if (fs.existsSync(manifestPath)) {
        try {
          const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
          return {
            id: dir,
            path: checkpointPath,
            ...manifest,
          };
        } catch (err) {
          // If we can't read the manifest, extract date from directory name
          const filenameDate = extractDateFromCheckpointId(dir);
          return {
            id: dir,
            path: checkpointPath,
            timestamp: filenameDate,
            error: 'Invalid manifest',
            files: [],
            createdAt: filenameDate
          };
        }
      }
      
      // No manifest file - extract timestamp from directory name
      const filenameDate = extractDateFromCheckpointId(dir);
      return {
        id: dir,
        path: checkpointPath,
        timestamp: filenameDate,
        files: [],
        createdAt: filenameDate
      };
    })
    .sort((a, b) => {
      // Sort by timestamp descending (most recent first)
      try {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);
        
        // Check if both dates are valid
        if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
          return dateB.getTime() - dateA.getTime();
        }
        
        // Fall back to string comparison if dates are invalid
        return a.id.localeCompare(b.id);
      } catch (err) {
        // Fallback if the timestamps can't be parsed
        return a.id.localeCompare(b.id);
      }
    });
  
  return checkpoints;
}

// Helper function to extract a valid date from checkpoint ID
function extractDateFromCheckpointId(checkpointId: string): string {
  try {
    // Extract the date part after 'checkpoint-'
    const datePart = checkpointId.replace(/^checkpoint-/, '');
    
    // Format should be: YYYY-MM-DDTHH-MM-SS.mmmZ
    // Need to replace hyphens with colons in the time part, but keep date hyphens
    const match = datePart.match(/^(\d{4}-\d{2}-\d{2})T(\d{2})-(\d{2})-(\d{2})\.(\d{3})Z$/);
    
    if (match) {
      const [_, datePortion, hours, minutes, seconds, millis] = match;
      // Reconstruct a valid ISO string
      return `${datePortion}T${hours}:${minutes}:${seconds}.${millis}Z`;
    }
    
    // Try the current date as a fallback
    return new Date().toISOString();
  } catch (error) {
    console.error("Error parsing checkpoint date:", error);
    return new Date().toISOString();
  }
}

// Restore data from a checkpoint
export function restoreCheckpoint(checkpointId: string) {
  const checkpointPath = path.join(CHECKPOINT_DIR, checkpointId);
  
  if (!fs.existsSync(checkpointPath)) {
    throw new Error(`Checkpoint not found: ${checkpointId}`);
  }
  
  const manifestPath = path.join(checkpointPath, 'manifest.json');
  
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Invalid checkpoint (no manifest): ${checkpointId}`);
  }
  
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  
  // Restore each file from the checkpoint
  for (const file of manifest.files) {
    const sourcePath = path.join(checkpointPath, file);
    const destPath = path.join(process.cwd(), 'data', file);
    
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
    }
  }
  
  console.log(`Restored checkpoint: ${checkpointId}`);
  return true;
}

// Delete a specific checkpoint by ID
export function deleteCheckpoint(checkpointId: string) {
  const checkpointPath = path.join(CHECKPOINT_DIR, checkpointId);
  
  if (!fs.existsSync(checkpointPath)) {
    throw new Error(`Checkpoint not found: ${checkpointId}`);
  }
  
  // Delete the checkpoint directory
  fs.rmSync(checkpointPath, { recursive: true, force: true });
  console.log(`Deleted checkpoint: ${checkpointId}`);
  return true;
}

// Clean up old checkpoints based on retention policy
export function cleanupCheckpoints() {
  const retentionDays = parseInt(process.env.CHECKPOINT_RETENTION_DAYS || '30');
  const now = new Date();
  const retentionMs = retentionDays * 24 * 60 * 60 * 1000; // Convert days to milliseconds
  
  const checkpoints = listCheckpoints();
  
  let deletedCount = 0;
  
  for (const checkpoint of checkpoints) {
    try {
      // Make sure we have a valid date before trying to calculate age
      const timestamp = checkpoint.timestamp;
      if (!timestamp || typeof timestamp !== 'string') {
        console.warn(`Checkpoint ${checkpoint.id} has invalid timestamp, skipping cleanup`);
        continue;
      }

      const checkpointDate = new Date(timestamp);
      
      // Verify we got a valid date
      if (isNaN(checkpointDate.getTime())) {
        console.warn(`Checkpoint ${checkpoint.id} has unparseable timestamp: ${timestamp}`);
        continue;
      }
      
      const ageMs = now.getTime() - checkpointDate.getTime();
      
      if (ageMs > retentionMs) {
        // Delete the checkpoint directory
        fs.rmSync(checkpoint.path, { recursive: true, force: true });
        deletedCount++;
      }
    } catch (err) {
      console.error(`Error processing checkpoint ${checkpoint.id}:`, err);
    }
  }
  
  console.log(`Cleaned up ${deletedCount} old checkpoints (retention: ${retentionDays} days)`);
  return deletedCount;
} 