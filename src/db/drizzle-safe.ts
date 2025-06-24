import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Create a more robust connection with error handling
let db: ReturnType<typeof drizzle>;

try {
  const sql = neon(process.env.DATABASE_URL, {
    // @ts-expect-error - Neon connection options may not be fully typed
    connectionTimeoutMillis: 10000,
  });
  db = drizzle({ client: sql });
} catch (error) {
  console.error('Database connection error:', error);
  // Create a fallback or rethrow based on environment
  if (process.env.NODE_ENV === 'development') {
    console.warn('Database connection failed in development mode. Some features may not work.');
    // You might want to create a mock db here or handle gracefully
  }
  throw error;
}

export { db };
