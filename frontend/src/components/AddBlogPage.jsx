import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBlogPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  // Handle Image Selection and Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Show image preview
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/blogs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
  
      console.log('Blog posted successfully:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error uploading blog:', error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <div className="min-h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: "url('ephe-n-eCSj_yG0WwE-unsplash.jpg')" }}
    >
      <div className="bg-white bg-opacity-90 p-12 rounded-xl shadow-2xl border-4 w-full max-w-lg">
        <h1 className="text-4xl font-bold text-center text-black-700 mb-8">Add a New Blog</h1>
        
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Title Input */}
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 mb-4 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          
          {/* Content Input */}
          <textarea
            placeholder="Blog Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 mb-4 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Image Upload Input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 mb-4 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none"
          />

          {/* Display Image Preview */}
          {preview && (
            <div className="mb-4">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-md border-2 border-gray-300 shadow-md"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-4 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition duration-300 ease-in-out"
          >
            Create Post
          </button>
        </form>

        {/* Go Back Button */}
        <button
          onClick={() => navigate('/')}
          className="w-full p-4 mt-4 text-black-700 border-2 border-green-600 rounded-lg shadow-md hover:bg-gray-200 transition"
        >
          Go Back to Profile
        </button>
      </div>
    </div>
  );
};

export default AddBlogPage;
