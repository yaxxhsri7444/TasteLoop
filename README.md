🍴 TasteLoop

TasteLoop is a modern food-sharing platform where food partners can upload short food-related videos, and users can explore, like, and save their favorites — similar to Instagram Reels but focused on food content.

🚀 Features

🎥 Upload short food videos (MP4/MOV)

❤️ Like, save, and comment on food reels

👩‍🍳 Food partner dashboard to manage uploads

🧑‍💻 User authentication (Login / Signup)

💾 Saved videos page for later viewing

📱 Responsive design optimized for mobile

🔥 Smooth autoplay video feed with Intersection Observer

🛠️ Tech Stack

Frontend: React.js, Axios, React Router, CSS
Backend: Node.js, Express.js, MongoDB
Media Storage: ImageKit.io (for video hosting)
Auth: JWT (JSON Web Tokens)
Styling: Custom CSS (mobile-first design)

📁 Project Structure
TasteLoop/
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── index.js
│   └── package.json
└── Frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── styles/
    │   └── App.jsx
    └── package.json

⚙️ Installation
1. Clone the repository
git clone https://github.com/yaxxhsri7444/TasteLoop.git
cd TasteLoop

2. Backend Setup
cd Backend
npm install
npm run dev


Create a .env file in /Backend:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

3. Frontend Setup
cd ../Frontend
npm install
npm run dev

🔐 Authentication Flow

Users log in using email & password.

A JWT token is stored in cookies for session management.

Protected routes use middleware to verify tokens.

📸 Screenshots (optional)

(Add preview images of your UI once available)

🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

🧑‍💻 Author

Saksham Srivastava
📧 srivastavasaksham243@gmail.com

🔗 LinkedIn

🐙 GitHub

📝 License

This project is licensed under the MIT License — feel free to use and modify it.
