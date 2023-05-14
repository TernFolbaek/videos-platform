import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { videoStore } from "./useStore";

const VideoId = () => {
  const [video, setVideo] = useState([]);
  const { videoId } = videoStore();

  useEffect(() => {

    const fetchVideo = async () => {
      try {
        const response = await fetch("/api/specificVideo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ videoId: videoId }),
        });

        const data = await response.json();
        setVideo(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchVideo(); // Always call fetchVideo on mount

  }, []);

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <div className="video-container">
      <h1>hello</h1>
    </div>
  );
};

export default VideoId;
