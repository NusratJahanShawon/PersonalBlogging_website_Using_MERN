import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        const blog = response.data;
        setTitle(blog.title);
        setContent(blog.content);
        setImage(blog.image); // Set existing image URL
      } catch (error) {
        console.error('Error fetching blog:', error);
        setError('Failed to load blog data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImage(URL.createObjectURL(selectedFile)); // Show preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError('Title and content are required.');
      return;
    }

    setError('');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (file) {
      formData.append('image', file);
    }

    try {
      // Sending the form data to the backend to update the blog
      const response = await axios.put(`http://localhost:5000/api/blogs/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Updated blog:', response.data); // Optionally log the updated blog data

      // Redirect to home page after successful update
      navigate('/');
    } catch (error) {
      console.error('Error updating blog:', error);
      setError('Failed to update blog. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex justify-center items-center">
      <div className="bg-white p-12 rounded-xl shadow-2xl border-4 w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8">Edit Blog</h1>

        {loading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : (
          <>
            {error && <p className="text-red-600 text-center">{error}</p>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <input
                type="text"
                placeholder="Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-4 mb-6 border-2 rounded-lg"
              />

              <textarea
                placeholder="Blog Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-4 mb-6 border-2 rounded-lg"
              />

              {/* File Upload Input */}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-4 mb-6 border-2 rounded-lg"
              />

              {/* Show Image Preview */}
              {image && <img src={image} alt="Preview" className="w-full h-64 object-cover rounded-md mb-4" />}

              <button type="submit" className="w-full p-4 bg-green-600 text-white rounded-lg">
                Update Post
              </button>
            </form>
          </>
        )}

        <button onClick={() => navigate('/')} className="w-full p-4 mt-6 border-2 rounded-lg">
          Go Back to Profile
        </button>
      </div>
    </div>
  );
};

export default EditBlogPage;
