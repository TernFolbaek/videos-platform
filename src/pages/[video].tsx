import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import { videoStore, useStore } from "./useStore";

interface Comment {
  userId: string;
  commentId: string;
  text: string;
  timestamp: string;
}

const VideoId = () => {
  const [video, setVideo] = useState({
    title: "",
    description: "",
    video_path: "",
    thumbnail_path: "",
  });
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const { videoId } = videoStore();
  const {user} = useStore();
  console.log(user)
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
          console.log(typeof data.video_path);
          data.video_path = `/uploads/${data.video_path
            .split("/")
            .slice(-1)[0]}`;
          data.thumbnail_path = `/uploads/${data.thumbnail_path
            .split("/")
            .slice(-1)[0]}`;
          setVideo(data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
    
  }, [videoId]);

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(event.target.value);
  };

  const handleSubmitComment = async (event: FormEvent) => {
    event.preventDefault();
    
    try {
      const response = await fetch("/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "user-id", // Replace with the actual user ID
          commentId: videoId,
          text: newComment,
          timestamp: new Date().toISOString(),
        }),
      });

      const commentData = await response.json();

      setComments([...comments, commentData]);
      setNewComment("");
    } catch (error) {
      console.log(error);
    }
  };

  if (!video.title) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{video.title}</h1>
      <h4>{video.description}</h4>
      <video width="320" height="240" controls>
        <source src={video.video_path} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <h3>Comments</h3>
      {comments.map((comment) => (
        <div key={comment.commentId}>
          <p>User: {comment.userId}</p>
          <p>{comment.text}</p>
          <p>Timestamp: {comment.timestamp}</p>
        </div>
      ))}

      <form onSubmit={handleSubmitComment}>
        <textarea value={newComment} onChange={handleCommentChange} />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default VideoId;
