import { NextApiRequest, NextApiResponse } from "next";
import { getConnection } from "./db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    const {videoId} = req.body
    // Get a connection from the pool
    const connection = await getConnection();

    // Execute the query to get all videos
    const [comments] = await connection.query("SELECT * FROM comments WHERE video_id = ?", [videoId]);

    // Release the connection
    await connection.release();

    // Respond with videos
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}
