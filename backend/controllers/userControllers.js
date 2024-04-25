import blogs from "../models/blogModel.js";
import commentModel from "../models/commentModel.js";
import userModel from "../models/userModel.js";
import {
  uploadOnCloudinary,
  deleteOnCloudinary,
} from "../config/cloudinary.js";

export const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const username = res.locals.username;
    const userDetails = await userModel.findOne({ username: id }).lean();

    if (!userDetails) {
      return res.status(404).json({ message: "User not found." });
    }

    const userBlogs = await blogs.find({ author: id });

    return res.status(200).json({
      ...userDetails,
      blogs: userBlogs,
      auth: id === username,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllUsers = async (req, res) => {
  const { username } = req.params;

  try {
    let users;
    if (username === "all" || !username) {
      users = await userModel.find({});
    } else {
      users = await userModel.find({
        $or: [
          { firstname: { $regex: username, $options: "i" } },
          { lastname: { $regex: username, $options: "i" } },
          { username: { $regex: username, $options: "i" } },
        ],
      });
    }

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal error." });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { _id: userId } = res.locals.user;
    const data = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      bio: req.body.bio,
    };

    if (req.file) {
      const newImg = await uploadOnCloudinary(req.file);
      data.profileImg = {
        public_id: newImg.public_id,
        url: newImg.url,
      };
    }

    await userModel.findByIdAndUpdate(userId, data);

    return res.status(200).json({ message: "Profile Updated!" });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { _id: userId, username, profileImg } = res.locals.user;

    await deleteOnCloudinary(profileImg.public_id);
    await userModel.findByIdAndDelete(userId);

    const allBlogs = await blogs.find({ author: username });

    if (allBlogs.length > 0) {
      const imageUrls = allBlogs.map((blog) => blog.img.public_id);
      await deleteBlogImages(imageUrls);
      await commentModel.deleteMany({ blogId: { $in: allBlogs.map((blog) => blog._id) } });
      await blogs.deleteMany({ author: username });
    }

    return res.status(200).json({ message: "Account closed." });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

async function deleteBlogImages(imageUrls) {
  try {
    if (imageUrls.length === 0) return;

    await Promise.allSettled(imageUrls.map((url) => deleteOnCloudinary(url)));
  } catch (error) {
    console.error("Error deleting blog images:", error);
    throw error;
  }
}
