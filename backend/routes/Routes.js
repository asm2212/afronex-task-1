import express from "express";
import multer from "multer";
import { authentication, verifyUser } from "../middleware/auth.js";
import {
  registerController,
  loginController,
} from "../controllers/authController.js";
import {
  getAllUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} from "../controllers/userControllers.js";
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  searchBlog
} from "../controllers/blogController.js";
import {
  createComment,
  deleteComment,
  getAllComments,
} from "../controllers/commentController.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/register", registerController);
router.post("/login", loginController);


router.get("/users/:id", verifyUser, getUserDetails); 
router.get("/get-users/:username", getAllUsers); 
router.put("/update-user/", authentication, upload.single("img"), updateUser);
router.delete("/delete-user", authentication, deleteUser); 


router.get("/get-blogs", getAllBlogs);
router.get("/get-blog/:blogId", verifyUser, getBlogById);
router.post("/create-blog", authentication, upload.single("img"), createBlog); 
router.put("/update-blog/:id", authentication, upload.single("img"), updateBlog); 
router.delete("/delete-blog/:id", authentication, deleteBlog);
router.get("/search/:id", searchBlog);


router.post("/create-comment/:blogId", authentication, createComment); 
router.get("/get-comments/:blogId", verifyUser, getAllComments);
router.delete("/delete-comment/:commentId", authentication, deleteComment);

export default router;
