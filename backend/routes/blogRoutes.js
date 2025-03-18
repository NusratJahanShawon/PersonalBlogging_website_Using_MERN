import express from 'express';
import multer from 'multer';
import path from 'path';
import Blog from '../models/Blog.js';

const router = express.Router();

// GET all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error });
  }
});

// GET a single blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog', error });
  }
});

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store images in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  }
});

const upload = multer({ storage });

// POST - Create a new blog with an image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, content } = req.body;
    let imageUrl = null;

    // If there's an image, save its path
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const newBlog = new Blog({ title, content, image: imageUrl });
    await newBlog.save();

    res.status(201).json(newBlog); // Send back the created blog
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Error creating blog', error: error.message });
  }
});

// Serve uploaded images statically
router.use('/uploads', express.static('uploads'));

// PUT - Update a blog
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Update fields with new values
    blog.title = title;
    blog.content = content;

    // If a new image is uploaded, update the image field
    if (req.file) {
      blog.image = `/uploads/${req.file.filename}`;
    }

    await blog.save(); // Save the updated blog
    res.json(blog);  // Return the updated blog
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// DELETE - Remove a blog
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog', error });
  }
});


export default router;
