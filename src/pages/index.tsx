import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { videoStore, useStore} from './useStore';

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const setVideoId = videoStore((state) => state.setVideoId)
  const setUserId = useStore((state) => state.setUserId);
  const {user} = useStore()

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('/api/videos');
        console.log(response)
        setVideos(
          response.data.map((video: any) => ({
            ...video,
            video_path: `/uploads/${video.video_path.split('/').slice(-1)[0]}`,
            thumbnail_path: `/uploads/${video.thumbnail_path.split('/').slice(-1)[0]}`,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideos();
  }, []);
  useEffect(() => {
        (async () => {
          try {
            const response = await axios.post('/api/userId', { username: user });
            setUserId(response.data.userId);
            console.log(response.data.userId)
          } catch (err) {
            console.error(err);
          }
        })();
    }, []);



  const setId = (id : string | null) => {
    setVideoId(id)
  }

  return (
    <div className="video-container">
      {videos.map((video: any) => (
        <div className="video" key={video.id}>
          <Link onClick={() => setId(video.id)} href={`/${video.id}`}>
              <h2>{video.title}</h2>
          </Link>
          <p>{video.description}</p>
          <p>{video.video_path}</p>
          <video width="320" height="240" controls>
            <source src={video.video_path} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
