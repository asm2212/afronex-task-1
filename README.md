

###  Dynamic Blog Website
Welcome to the Dynamic Blog Website project! This is a full-stack web application built using react with vite,node,monogodb,express,tailwind css etc. It provides users with a platform to create, read, update, and delete blog posts. The project aims to deliver a seamless and personalized blogging experience with robust user authentication and authorization systems.

### Features
## 1. User Authentication
Secure Sign-up: Users can register securely to the platform.
Login and Logout: Authenticated users can log in and out of their accounts.
## 2. Create and Manage Posts
Create Posts: Authenticated users can create new blog posts.
Edit and Delete Posts: Users have the ability to edit and delete their own posts.
View Recent Posts: The homepage dynamically displays recent blog posts with titles, excerpts, publication dates, and authors.
## 3. Browse and Engage
Browse Posts: Visitors can browse existing blog posts.
Read Content: Users can view the full content of each blog post.
Interact via Comments: Users can engage with posts by leaving comments.
Comment Submission: Each blog post page includes a comment submission form for user engagement.
## 4. Responsive Design
Seamless Experience: The website is designed to provide a seamless experience across devices of all sizes.
### Tech Stack
## Frontend
React.js with vite

## Backend
Node.js: A JavaScript runtime for building server-side applications.
Express.js: A web application framework for Node.js.
## Database
MongoDB: A NoSQL database for storing application data.
## Media Storage
Cloudinary: A cloud-based media management solution for storing images.
## Authentication
JSON Web Tokens (JWT): Used for secure authentication and authorization.
## Styling
Tailwind CSS: A utility-first CSS framework for styling user interfaces.
ShadCn: Additional styling framework for enhancing the design.
### Getting Started
To run this project locally, follow these steps:

Clone Repository: Clone this repository to your local machine.
Install Dependencies: Navigate to the project directory and install dependencies using npm install.
Set up MongoDB: Set up your MongoDB database and obtain the connection string.
Configure Environment Variables:
Frontend: VITE_BASE_URL (Backend server link)
Backend:
PORT: Port number for the server
ACCESS_SECRET_KEY: User-defined access secret key
CLOUD_NAME, CLOUD_API, CLOUD_API_SECRET: Cloudinary configuration
USER_IMAGE: User image directory (Frontend link + /user.jpeg)
URI: MongoDB URI address
Run Backend Server: Execute npm run dev in the /server directory.
Run Frontend Development Server: Execute npm run dev in the /frontend directory.
Access Application: Open your browser and go to http://localhost:5173.


### License
This project is licensed under the MIT License. See the LICENSE file for details.

