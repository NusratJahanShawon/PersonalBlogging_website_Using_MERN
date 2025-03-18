import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ProfilePage from './components/ProfilePage';
import AddBlogPage from './components/AddBlogPage';
import EditBlogPage from './components/EditBlogPage';
import AllBlogs from './components/AllBlogs';


function App() {
  return (
    <Router>
      <nav>
        {/* <Link to="/">Profile</Link>
        <Link to="/add-blog">Add Blog</Link> */}
      </nav>
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/add-blog" element={<AddBlogPage />} />
        <Route path="/edit-blog" element={<EditBlogPage />} />
        <Route path="/all=blog" element={<AllBlogs />} />
        <Route path="/edit/:id" element={<EditBlogPage />} />
      </Routes>
    </Router>
  );
}

export default App;