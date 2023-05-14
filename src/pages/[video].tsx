import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { videoStore } from "./useStore";

const VideoId = () => {
  const [video, setVideo] = useState({ title: '', description: '', video_path: '', thumbnail_path: '' });
  const { videoId } = videoStore();
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      (async () => {
        try {
          const response = await fetch("/api/specificVideo", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ videoId: videoId }),
          });

          const data = await response.json();
          console.log(typeof(data.video_path))
          data.video_path = `/uploads/${data.video_path.split('/').slice(-1)[0]}`;
          data.thumbnail_path = `/uploads/${data.thumbnail_path.split('/').slice(-1)[0]}`
          setVideo(data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [videoId]);

  return (
    <div >
      <h1>{video.title}</h1>
      <h4>{video.description}</h4>
      <video width="320" height="240" controls>
            <source src={video.video_path} type="video/mp4" />
            Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoId;
