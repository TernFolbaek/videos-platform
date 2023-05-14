import { NextApiRequest, NextApiResponse } from "next";
import { getConnection } from "./db";
import { RowDataPacket } from "mysql2";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('in api')
  console.log(req.body)
  try {
    const { videoId } = req.body;
    console.log(videoId);

    const connection = await getConnection();

    const [videos] = await connection.query<RowDataPacket[]>(`
      SELECT * FROM videos WHERE id = ?
    `, [videoId]);

    await connection.release();

    if (!videos.length) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json(videos[0]);
  } catch (error) {
    console.error('error', error);
    res.status(500).send("Internal server error");
  }
}
