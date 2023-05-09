import nextConnect from 'next-connect';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { NextApiRequest, NextApiResponse } from 'next';
import configurePassport from './auth';
import { getConnection } from './db';

configurePassport(passport);

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  const { username, password , email} = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const connection = await getConnection();
    const [result] = await connection.query(`INSERT INTO users (username, password, email) VALUES (?, ?, ?)`, [
      username,
      hashedPassword,
      email
    ]);

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error in /api/signup:', error);

  }
});

export default handler;
