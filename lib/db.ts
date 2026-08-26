import { neon } from '@neondatabase/serverless'

// Server-side Postgres client (Neon) — uses a pooled/serverless connection string.
// Only import this inside files under app/api/** (server-only code).
export function db() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error('Missing DATABASE_URL env var.')
  }
  return neon(connectionString)
}
