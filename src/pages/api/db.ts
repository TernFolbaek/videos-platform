import { createPool, PoolConnection } from 'mysql2/promise';

export async function getConnection(): Promise<PoolConnection> {
  const pool = await createPool({
    host: 'localhost',
    user: 'newuser',
    password: 'password',
    database: 'youtube_clone',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  const connection = await pool.getConnection();

  // Add the `release()` function to the `Connection` interface
  return connection as PoolConnection & { release(): void };
}
