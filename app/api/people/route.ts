import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';
import { NextRequest } from "next/server";

export interface Person {
  id: string;
  name: string;
  email: string | null;
  department: string | null;
  position: string | null;
  createdAt: string;
  updatedAt: string;
}

// Generate a random ID (similar to the ones used in other parts of the codebase)
const generateId = () => Math.random().toString(36).substring(2, 9);

// Path to our "database" file
const dataFilePath = path.join(process.cwd(), 'data', 'people.json');

// Helper to ensure the file exists
const ensureFileExists = () => {
  const dirPath = path.dirname(dataFilePath);
  
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]));
  }
};

// Helper to read all people
const getPeople = (): Person[] => {
  ensureFileExists();
  const fileData = fs.readFileSync(dataFilePath, 'utf8');
  return fileData ? JSON.parse(fileData) : [];
};

// Helper to write people data
const writePeople = (people: Person[]) => {
  ensureFileExists();
  fs.writeFileSync(dataFilePath, JSON.stringify(people, null, 2));
};

// GET - Retrieve all people
export async function GET(request: NextRequest) {
  try {
    const people = getPeople();
    return NextResponse.json(people);
  } catch (error) {
    console.error("Error fetching people:", error);
    return NextResponse.json(
      { error: "Failed to fetch people" },
      { status: 500 }
    );
  }
}

// POST - Create a new person
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }
    
    const people = getPeople();
    
    // Create new person
    const newPerson: Person = {
      id: generateId(),
      name: body.name,
      email: body.email || null,
      department: body.department || null,
      position: body.position || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    people.push(newPerson);
    writePeople(people);
    
    return NextResponse.json(newPerson, { status: 201 });
  } catch (error) {
    console.error("Error creating person:", error);
    return NextResponse.json(
      { error: "Failed to create person" },
      { status: 500 }
    );
  }
}

// PUT - Update a person
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.id || !body.name) {
      return NextResponse.json(
        { error: "ID and name are required" },
        { status: 400 }
      );
    }
    
    const people = getPeople();
    const personIndex = people.findIndex(p => p.id === body.id);
    
    if (personIndex === -1) {
      return NextResponse.json(
        { error: "Person not found" },
        { status: 404 }
      );
    }
    
    // Update person
    const updatedPerson: Person = {
      ...people[personIndex],
      name: body.name,
      email: body.email !== undefined ? body.email : people[personIndex].email,
      department: body.department !== undefined ? body.department : people[personIndex].department,
      position: body.position !== undefined ? body.position : people[personIndex].position,
      updatedAt: new Date().toISOString()
    };
    
    people[personIndex] = updatedPerson;
    writePeople(people);
    
    return NextResponse.json(updatedPerson);
  } catch (error) {
    console.error("Error updating person:", error);
    return NextResponse.json(
      { error: "Failed to update person" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a person
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }
    
    const people = getPeople();
    const personIndex = people.findIndex(p => p.id === id);
    
    if (personIndex === -1) {
      return NextResponse.json(
        { error: "Person not found" },
        { status: 404 }
      );
    }
    
    // Remove the person
    people.splice(personIndex, 1);
    writePeople(people);
    
    return NextResponse.json(
      { success: true, message: "Person deleted successfully" }
    );
  } catch (error) {
    console.error("Error deleting person:", error);
    return NextResponse.json(
      { error: "Failed to delete person" },
      { status: 500 }
    );
  }
} 