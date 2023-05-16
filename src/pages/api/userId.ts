import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { getConnection } from './db';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
    const { username} = req.body;
  
    try {
        const connection = await getConnection();
        const userResult = await connection.query('SELECT id FROM users WHERE username = ?', [username]);
        const userObject = JSON.parse(JSON.stringify(userResult))[0];
        const userId = userObject[0].id;
    }catch(error){
        console.error(error);

    }})