import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { videoStore, useStore} from './useStore';
import Image from 'next/image';

// Define a type for Video
interface Video {
  id: string,
  title: string,
  description: string,
  video_path: string,
  thumbnail_path: string
}

const VideoList = () => {
  // Use the Video type for videos state
  const [videos, setVideos] = useState<Video[]>([]);
  const setVideoId = videoStore((state) => state.setVideoId)
  const setUserId = useStore((state) => state.setUserId);
  const {user} = useStore()
  const [searchTerm, setSearchTerm] = useState('');


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

  const setId = (id : string | null) => {
    setVideoId(id)
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div className="video-container">
      {videos.filter(video => {
    if (searchTerm === "") {
        return video
    } else if (video.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return video
    }
      }).map((video: Video) => (
          <div className="video" key={video.id}>
            <Link onClick={() => setId(video.id)} href={`/${video.id}`}>
                <h2>{video.title}</h2>
            </Link>
            <p>{video.description}</p>
            <video width="320" height="240" controls>
              <source src={video.video_path} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
