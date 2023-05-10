import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
const path = require('path');

// Construct the file's path relative to the project's root directory
const filePath = path.join(__dirname, 'src', 'public', 'uploads', 'f9965ae4-9fdc-4ab7-b9ea-ecb591c8db60.mov');

// Construct the file's URL path
const baseUrl = 'http://localhost:3000/';
const urlPath = filePath.replace(__dirname, '').replace(/\\/g, '/');
const fileUrl = `${baseUrl}${urlPath}`;

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/api/videos");
        setVideos(response.data.map((video: any) => ({
          ...video,
          video_path: `/uploads/${video.video_path.split('/').slice(-1)[0]}`,
          thumbnail_path: `/uploads/${video.thumbnail_path.split('/').slice(-1)[0]}`,
        })));
        console.log(fileUrl)
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="video-container">
      {videos.map((video: any) => (
        <div className="video" key={video.id}>
          <Link href={video.video_path}>
              <h2>{video.title}</h2>
              <h2>{video.thumbnail_path}</h2>
          </Link>
          <p>{video.description}</p> 
          <video width="320" height="240" controls>
            <img src={video.thumbnail_path} alt="" />
          <source src={video.video_path} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
         </div>
      ))} 
    </div>
  );
};

export default VideoList;
