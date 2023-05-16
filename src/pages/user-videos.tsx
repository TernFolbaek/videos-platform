import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {useStore} from "./useStore";

const UploadVideo = () => {
  const {user} = useStore()
  const [form, setForm] = useState({user: user,  title: "", description: "", video: null, thumbnail: null });
  const router = useRouter();



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const files = (e.target as HTMLInputElement).files;
    if (id === "video" || id === "thumbnail") {
      setForm({ ...form, [id]: files ? files[0] : null });
    } else {
      setForm({ ...form, [id]: value });
    }
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.video || !form.thumbnail || !form.user) {
      console.log("Please fill out all fields");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value);
      }
    });

    

    console.log("Request URL:", "/api/create-video");


    try {
    const response = await axios.post("/api/create-video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
        
      console.log(response.data);
      router.push("/user-videos");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={form.title} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={form.description} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="video">Video:</label>
        <input type="file" id="video" name="video" accept="video/*" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="thumbnail">Thumbnail:</label>
        <input type="file" id="thumbnail" name="thumbnail" accept="image/*" onChange={handleChange} />
      </div>
      <button type="submit">Upload Video</button>
    </form>
  );
};

export default UploadVideo;
