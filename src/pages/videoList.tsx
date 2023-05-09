import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/api/videos");
        setVideos(response.data.map((video: any) => ({
          ...video,
          video_path: `../public/uploads/${video.video_path.split('/').slice(-1)[0]}`,
        })));
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div>
      {videos.map((video: any) => (
        <div key={video.id}>
          <Link href={video.video_path}>
              <h2>{video.title}</h2>
              <h2>{video.video_path}</h2>
          </Link>
          <p>{video.description}</p>
          <video width="320" height="240" controls>
          <source src={`${video.video_path}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
