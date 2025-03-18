import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null); // Track selected blog for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Open the modal with the selected blog
  const openModal = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  return (
    <div className="min-h-screen bg-cover bg-center" 
    style={{ backgroundImage: "url('/nick-morrison-FHnnjk1Yj7Y-unsplash.jpg')" }}>
      {/* Navigation Bar */}
      <nav className="bg-black bg-opacity-60 text-white p-4 fixed w-full top-0">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Happy Blogging</h1>
          <ul className="flex space-x-6">
            <li><a href="/add-blog" className="hover:text-gray-300">Add Blog</a></li>
            <li><a href="/all=blog" className="hover:text-gray-300">All Blogs</a></li>
            <li><a href="/travel-blogs" className="hover:text-gray-300">Travel Blogs</a></li>
            <li><a href="/pictures" className="hover:text-gray-300">Pictures</a></li>
            <li><a href="/settings" className="hover:text-gray-300">Settings</a></li>
          </ul>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto pt-24">
        <h1 className="text-4xl font-bold text-center text-white mb-6 drop-shadow-lg">
          Welcome to Your Space for Stories & Ideas!
        </h1>
        {loading ? (
          <p className="text-center text-lg text-white">Loading...</p>
        ) : (
          <div className="grid gap-6">
            {blogs.map((blog) => (
              <div key={blog._id} className="bg-white bg-opacity-80 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
                {blog.image && (
                  <img 
                  src={`http://localhost:5000${blog.image}`} 
                  alt={blog.title} 
                  className="w-48 h-32 object-cover rounded-md shadow-md border border-gray-300"
                />
                
                )}
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{blog.title}</h2>
                <p className="text-gray-700">{blog.content.substring(0, 150)}...</p>
                <button
                  onClick={() => openModal(blog)} // Open modal with the selected blog
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Read More
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Blog Details */}
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

      {/* Ensure the correct path for the uploaded image */}
      {selectedBlog.image && (
        <img
          src={`http://localhost:5000${selectedBlog.image}`} // Ensure correct URL
          alt={selectedBlog.title}
          className="w-full h-64 object-cover rounded-md mb-4 border border-gray-300 shadow-md"
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

export default ProfilePage;
