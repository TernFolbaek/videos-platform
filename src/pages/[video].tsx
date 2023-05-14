import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { videoStore } from "./useStore";

const VideoId = () => {
  const [video, setVideo] = useState({title: '', description: '', video_path : '', thumbnail_path: ''});
  const { videoId } = videoStore();

  useEffect(() => {
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
        const removedPath = data.video_path.substring(data.video_path.indexOf("/uploads"));
        data.video_path = removedPath;
        setVideo(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();

  }, [videoId]);

  if(video){
    return(
      <div>
        <h2>{video.title}</h2>
        <h4>{video.description}</h4>
        <h3>{video.video_path}</h3>
        <video width="320" height="240" controls>
            <source src={video.video_path} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
      </div>
    )
  }
  else{
  return (
    <div className="video-container">
      <h1>hello</h1>
    </div>
  );
}}

export default VideoId;
