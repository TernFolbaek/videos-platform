import { NextApiRequest, NextApiResponse } from "next";
import { getConnection } from "./db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get a connection from the pool
    const connection = await getConnection();

    // Execute the query to get all videos
    const [videos] = await connection.query("SELECT * FROM videos");

    // Release the connection
    await connection.release();

    // Respond with videos
    res.status(200).json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}
