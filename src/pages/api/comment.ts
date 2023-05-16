import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { getConnection } from './db';
import { OkPacket, RowDataPacket, FieldPacket } from 'mysql2';


const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
    const { userId, commentId, text, username } = req.body;
  
    try {
        const connection = await getConnection();
        const [result] = await connection.query(
            'INSERT INTO comments (user_id, video_id, content, username) VALUES (?, ?, ?, ?)', 
            [userId, commentId, text, username]
        ) as [OkPacket, FieldPacket[]];

        const [commentResult] = await connection.query(
            'SELECT * FROM comments WHERE id = ?', 
            [result.insertId]
        ) as [RowDataPacket[], FieldPacket[]];

        const newComment = commentResult[0];

        res.status(200).json(newComment);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while trying to save your comment.' });
    }
})

export default handler;
