import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {useStore} from "../store/useStore";
import styled from "styled-components";

// Here we define styled components
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: lightblue;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  margin: auto;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: white;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  resize: none;
  background-color: white;

`;

const StyledButton = styled.button`
  padding: 10px 20px;
  color: white;
  background-color: #0070f3;
  border-radius: 5px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0051bb;
  }
`;

const UploadVideo = () => {
  const {user} = useStore();
  const [form, setForm] = useState({user: user, title: "", description: "", video: null, thumbnail: null});
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

    try {
      const response = await axios.post("/api/create-video", formData, {
          headers: { "Content-Type": "multipart/form-data" },
      });

      router.push("/user-videos");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div className="background-none">
        <label htmlFor="title">Title:</label>
        <StyledInput type="text" id="title" value={form.title} onChange={handleChange} />
      </div>
      <div className="background-none">
        <label htmlFor="description">Description:</label>
        <StyledTextArea id="description" value={form.description} onChange={handleChange} />
      </div>
      <div className="background-none">
        <label htmlFor="video">Video:</label>
        <StyledInput type="file" id="video" name="video" accept="video/*" onChange={handleChange} />
      </div>
      <div className="background-none">
        <label htmlFor="thumbnail">Thumbnail:</label>
        <StyledInput type="file" id="thumbnail" name="thumbnail" accept="image/*" onChange={handleChange} />
      </div>
      <StyledButton type="submit">Upload Video</StyledButton>
    </StyledForm>
  );
};

export default UploadVideo;

