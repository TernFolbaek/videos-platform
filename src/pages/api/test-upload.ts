import type { NextApiRequest, NextApiResponse } from 'next';

const testUpload = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("testUpload function called");

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  res.status(200).json({ message: 'Test upload endpoint called' });
};

export default testUpload;
