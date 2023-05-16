import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import { videoStore, useStore } from "./useStore";
import axios from 'axios';

interface Comment {
  username: string;
  id: number;
  content: string;
  created_at: string;
}

const VideoId = () => {
  const [video, setVideo] = useState({
    title: "",
    description: "",
    video_path: "",
    thumbnail_path: "",
  });
  const setUserId = useStore((state) => state.setUserId)
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const { videoId } = videoStore();
  const {user} = useStore();
  const isMounted = useRef(false);
  const {userId} = useStore()

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

  useEffect(() => {
    if(user){
      (async () => {
        try {
          const response = await axios.post('/api/userId', { username: user });
          setUserId(response.data.userId);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [user]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/getComments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ videoId: videoId }),
        });

        const data = await response.json();
        setComments(data.map((comment: any) => ({
          ...comment,
        })));
      } catch (error) {
        console.log(error);
      }
    })();
  },[])



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
          userId: userId, // Replace with the actual user ID
          commentId: videoId,
          text: newComment,
          username: user,
          timestamp: new Date().toISOString(),
        }),
      });

      const commentData = await response.json();

      setComments([...comments, commentData]);
      console.log(comments)
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
        <div key={comment.id}>
          <p>User: {comment.username}</p>
          <p>{comment.content}</p>
          <p>Timestamp: {comment.created_at}</p>
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
