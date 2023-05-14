import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { IncomingForm } from 'formidable';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { getConnection } from './db';
import path from 'path';

const isCustomFile = (file: CustomFile | CustomFile[]): file is CustomFile => {
  return !Array.isArray(file);
};

const uploadDir = path.join(process.cwd(), '/public/uploads');

export const config = {
  api: {
    bodyParser: false,
  },
};

class ExtendedIncomingForm extends IncomingForm {
  uploadDir?: string;
}

interface CustomFile {
  name: string;
  filepath: string;
}

interface CustomFiles {
  video: CustomFile;
  thumbnail: CustomFile;
}

const uploadVideo = async (req: NextApiRequest, res: NextApiResponse) => {

  console.log("Entering uploadVideo function");
  console.log(uploadDir);

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = new ExtendedIncomingForm();
  form.uploadDir = uploadDir;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log('Error while parsing the form:', err);
      return res.status(400).json({ error: 'Error processing the request', err });
    }

    try {
      console.log('------------------------------------');
   

      const { title, description, user} = fields;
      const connection = await getConnection();
      const userResult = await connection.query('SELECT id FROM users WHERE username = ?', [user]);
      const userObject = JSON.parse(JSON.stringify(userResult))[0];
      const userId = userObject[0].id;

      if (!userId) {
        return res.status(400).json({ error: 'User ID not found' });
      }

      console.log('USER ID', userId)
      const { video, thumbnail } = files as unknown as CustomFiles;

      if (!title || !description || !video || !thumbnail || !isCustomFile(video) || !isCustomFile(thumbnail)) {
        return res.status(400).json({ error: 'All fields are required', fields, files });
      }

      const videoExtension = (video as any).originalFilename.split('.').pop();
      const thumbnailExtension = (thumbnail as any).originalFilename.split('.').pop();

      const videoFileName = `${uuidv4()}.${videoExtension}`;
      const thumbnailFileName = `${uuidv4()}.${thumbnailExtension}`;

      // Move the uploaded files to the desired location
      fs.renameSync(video.filepath, `${uploadDir}/${videoFileName}`);
      fs.renameSync(thumbnail.filepath, `${uploadDir}/${thumbnailFileName}`);

      // Save the video information to the database here (e.g., using an ORM)

      await connection.query(
        'INSERT INTO videos (user_id, title, description, video_path, thumbnail_path) VALUES (?, ?, ?, ?, ?)',
        [userId, title, description, `${uploadDir}/${videoFileName}`, `${uploadDir}/${thumbnailFileName}`]
      );

      res.status(201).json({
        message: 'Video uploaded successfully',
        videoPath: `${uploadDir}/${videoFileName}`,
        thumbnailPath: `${uploadDir}/${thumbnailFileName}`,
      });
    } catch (error) {
      console.error('An error occurred while processing the video upload:', error);
      res.status(500).json({ error: 'An error occurred while processing the video upload', errorDetails: error });
    }
  });
};
const uploadVideoHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new IncomingForm();
  

  await uploadVideo(req, res);
};


export default uploadVideoHandler;
