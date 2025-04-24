import { PrismaClient } from './generated/prisma'; // Adjust path based on your 'output' setting in schema.prisma

// Use declare global to ensure prisma instance is reused across hot reloads in development
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient({
  // Optional: Log database queries during development
  // log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma; 