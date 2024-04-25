import blogs from "../models/blogModel.js";
import commentModel from "../models/commentModel.js";
import mongoose from "mongoose";
import { uploadOnCloudinary, deleteOnCloudinary } from "../config/cloudinary.js";

export const getAllBlogs = async (req, res) => {
  const category = req.query.category;
  const query = category && category !== "all" ? { category } : {};
  try {
    const blogData = await blogs.find(query);
    res.status(200).json(blogData);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBlogById = async (req, res) => {
  const { blogId } = req.params;
  const author = res.locals.username;
  if (!mongoose.isValidObjectId(blogId)) {
    return res.status(400).json({ message: "Invalid blog ID." });
  }
  try {
    const blogData = await blogs.findById(blogId).lean();
    if (!blogData) {
      return res.status(404).json({ message: "Blog not found." });
    }
    const auth = blogData.author === author;
    res.status(200).json({ ...blogData, auth });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const createBlog = async (req, res) => {
  const { title, content, category } = req.body;
  const user = res.locals.user;
  try {
    const cloudinaryRes = await uploadOnCloudinary(req.file);
    if (!cloudinaryRes) {
      throw new Error("Failed to upload image to Cloudinary");
    }
    const newBlog = new blogs({
      title,
      content,
      category,
      img: {
        public_id: cloudinaryRes.public_id,
        url: cloudinaryRes.url,
      },
      author: user.username,
    });
    const createdBlog = await newBlog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateBlog = async (req, res) => {
  const { id: blogId } = req.params;
  const user = res.locals.user.username;
  const updatedData = { title: req.body.title, content: req.body.content };
  try {

    if (req.file) {
      const oldBlogData = await blogs.findById(blogId);
      await deleteOnCloudinary(oldBlogData.img.public_id);
      const newImg = await uploadOnCloudinary(req.file);
      updatedData.img = { public_id: newImg.public_id, url: newImg.url };
      if (!newImg) {
        throw new Error("Failed to upload image to Cloudinary");
      }
    }
    const updatedBlog = await blogs.findOneAndUpdate(
      { _id: blogId, author: user },
      updatedData,
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteBlog = async (req, res) => {
  const { id: blogId } = req.params;
  const user = res.locals.user.username;
  try {
    const blogData = await blogs.findById(blogId);
    if (!blogData) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (blogData.author !== user) {
      return res.status(403).json({ message: "User is not authorized." });
    }
    await deleteOnCloudinary(blogData.img.public_id);
    await commentModel.deleteMany({ blogId });
    await blogs.findByIdAndDelete(blogId);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const searchBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blogData = await blogs.find({
      $or: [
        { title: { $regex: id, $options: "i" } },
        { category: { $regex: id, $options: "i" } },
        { author: { $regex: id, $options: "i" } },
      ],
    });
    if (!blogData) {
      return res.status(404).json({ message: "No blogs found" });
    }
    res.status(200).json(blogData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
