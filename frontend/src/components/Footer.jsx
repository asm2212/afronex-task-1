import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-28 w-full flex flex-col items-center">
      <hr className="w-4/5" />
      <h1 className="text-2xl font-bold text-slate-100">Afronex Blog</h1>
      <div className="py-10 px-10 sm:px-0 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-evenly w-full sm:items-center text-slate-400">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-slate-100">Useful Links</h2>
            <Link to="/">Home</Link>
            <Link to="/auth?mode=register">Sign Up</Link>
            <Link to="/auth?mode=login">Login</Link>
            <Link to="/users">Individual</Link>
            <Link to="/blogs/create-blog">Create</Link>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-100">Contact Information</h2>
          <div className="flex flex-col gap-4 mt-4">
            <p>Email: asmareadmasu0@gmail.com</p>
            <p>Phone: +251945906550</p>
            <p>Address: Main campus, Haramaya, Ethiopia</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-slate-100">Follow Us</h2>
          <div className="flex gap-4">
            <FaFacebook className="text-2xl text-slate-200 hover:text-blue-500 cursor-pointer" />
            <FaTwitter className="text-2xl text-slate-200 hover:text-blue-500 cursor-pointer" />
            <FaInstagram className="text-2xl text-slate-200 hover:text-blue-500 cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full mt-4">
        <p className="text-slate-400">&copy; 2024 by Asmare. All rights reserved.</p>
        <div>
          <Link to="/" className="mr-4">Privacy Policy</Link>
          <Link to="/" className="mr-4">Terms of Service</Link>
          <Link to="/">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
