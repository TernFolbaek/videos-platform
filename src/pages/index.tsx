import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { videoStore, useStore} from './useStore';
import Image from 'next/image';
import styled from 'styled-components';

// Define a type for Video
interface Video {
  id: string,
  title: string,
  description: string,
  video_path: string,
  thumbnail_path: string
}
const $VideoContainer = styled.div`
  border: 1px solid gray;
  padding: 5px;
  margin: 10px;
  border-radius: 5px;
`;

const $Title = styled.h2`
  font-size: 1.5em;
  margin-bottom: 0.25em;
`;

const $Description = styled.p`
  font-size: 1em;
`;

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
      <div className="center">
        <$SearchBar
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
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
            <video width="320" height="240" controls>
              <source src={video.video_path} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
                <h2>{video.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const $SearchBar = styled.input `
      width: 250px;
      height: 30px;
      font-size: 25px;
      border: 1px solid black;
      border-radius: 5px;
      padding: 3px;
`

export default VideoList;
