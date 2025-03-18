import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null); // Track selected blog for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of blogs when the page loads
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

//   // Open the modal with the selected blog
//   const openModal = (blog) => {
//     setSelectedBlog(blog);
//     setIsModalOpen(true);
//   };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this blog?")) return;

  try {
    await axios.delete(`http://localhost:5000/api/blogs/${id}`);
    setBlogs(blogs.filter(blog => blog._id !== id)); // Remove deleted blog from state
  } catch (error) {
    console.error('Error deleting blog:', error);
  }
};


  return (
    <div
  className="min-h-screen bg-cover bg-center flex justify-center items-center"
  style={{
    backgroundImage: "url('kevin-bhagat-zNRITe8NPqY-unsplash.jpg')",
    backgroundAttachment: 'fixed', 
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
  }}
    >
      {/* Full Page Border Container */}
      <div className="bg-opacity-90 p-12 rounded-xl shadow-2xl w-full max-w-5xl overflow-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-8">My Blogs</h1>

        {loading ? (
          <p className="text-center text-lg text-white">Loading...</p>
        ) : (
          <div className="grid gap-6">
            {/* Wrap each blog in a separate container */}
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white bg-opacity-80 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105"
              >
                {blog.image && (
                  <img 
                  src={`http://localhost:5000${blog.image}`} 
                  alt={blog.title} 
                  className="w-48 h-32 sm:w-64 sm:h-40 md:w-80 md:h-56 object-cover rounded-md shadow-md border border-gray-300"
                />
                
                )}
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{blog.title}</h2>
                <p className="text-gray-700">{blog.content.substring(0, 150)}...</p>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => navigate(`/edit/${blog._id}`)}
                    className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                  {/* <button
                    onClick={() => openModal(blog)} // Open modal with the selected blog
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Read More
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Blog Details */}
      {isModalOpen && selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-3xl relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-2xl text-gray-600"
            >
              &times;
            </button>
            {selectedBlog.image && (
              <img
                src={selectedBlog.image}
                alt={selectedBlog.title}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
            )}
            <h1 className="text-3xl font-bold text-gray-900">{selectedBlog.title}</h1>
            <p className="text-gray-700 mt-4">{selectedBlog.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
