import jwt from 'jsonwebtoken';
import nextConnect from 'next-connect';
import passport from 'passport';
import { NextApiRequest, NextApiResponse } from 'next';
import configurePassport from './auth';

const JWT_SECRET = 'lol'; // Change this to your own secret

configurePassport(passport);

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.use(passport.initialize());

handler.post(passport.authenticate('local', { session: false }), (req, res) => {
  // Create JWT token
  const token = jwt.sign({ username: req.body.username }, JWT_SECRET);

  res.status(200).json({ success: true, token });
});

export default handler;
