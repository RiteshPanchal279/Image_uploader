import express from 'express';
import multer from 'multer';
import { storage } from '../config/cloudinary.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import Image from '../model/Image.js';

const router = express.Router();
const upload = multer({ storage });

router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { name, folderId } = req.body;

    if (!req.file || !name) {
      return res.status(400).json({ message: 'Name and image are required.' });
    }

    const newImage = new Image({
      name,
      imageUrl: req.file.path,
      folder: folderId || null,
      user: req.user.id,
    });

    await newImage.save();
    res.status(201).json({newImage,success:true});
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ message: 'Image upload failed.',success:false });
  }
});

router.get("/search",authMiddleware,async (req, res) => {
  try {
    const { name } = req.query;
    const userId = req.user._id;

    const images = await Image.find({
      name: { $regex: name, $options: 'i' },
      owner: userId,
    });

    res.json(images);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});

export default router;