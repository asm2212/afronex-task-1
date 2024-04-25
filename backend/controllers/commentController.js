import commentModel from "../models/commentModel.js";
import blogs from "../models/blogModel.js";
import mongoose from "mongoose";

export const createComment = async (req, res) => {
  const { blogId } = req.params;
  const { _id: userId, username } = res.locals.user;
  const { content } = req.body;

  try {
    if (!mongoose.isValidObjectId(blogId)) {
      return res.status(400).json({ message: "Invalid blog ID." });
    }

    const blog = await blogs.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    const newComment = await commentModel.create({
      blogId,
      userId,
      username,
      content,
    });

    if (!newComment) {
      throw new Error("Error while adding comment.");
    }

    res.status(201).json({ message: "Comment created successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllComments = async (req, res) => {
  const { blogId } = req.params;
  const { username } = res.locals;

  try {
    const comments = await commentModel.find({ blogId }).lean();
    const sortedComments = comments.map((comment) => ({
      ...comment,
      isUser: comment.username === username,
    }));

    res.status(200).json(sortedComments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const { _id: userId } = res.locals.user;

  try {
    const comment = await commentModel.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    if (userId.toString() !== comment.userId.toString()) {
      return res.status(401).json({ message: "User is not authorized." });
    }

    await commentModel.findByIdAndDelete(commentId);
    return res.status(200).json({ message: "Comment deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
