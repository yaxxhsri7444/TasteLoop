<h1 align="center">🍴 TasteLoop</h1>

<p align="center">
  <b>A modern food-sharing social platform where food lovers and creators meet!</b><br/>
  Upload, explore, like & save short food videos — just like Instagram Reels, but dedicated entirely to food! 😋
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React.js-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/Database-MongoDB-darkgreen?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/Deployed%20on-Localhost-orange?style=for-the-badge" />
</p>

---

## 🌟 Overview

**TasteLoop** is a full-stack food reel platform that lets users:
- 👨‍🍳 **Upload food videos**
- ❤️ **Like and save favorite reels**
- 💬 **View and comment** on others’ posts
- 🧑‍💻 **Login/Register** with authentication
- 📱 **Enjoy a responsive design** that looks great on any device

Whether you’re a home chef or a foodie explorer — TasteLoop brings everyone to one table! 🍽️

---

## 🖥️ Tech Stack

| Category | Technologies |
|-----------|---------------|
| **Frontend** | React.js, Axios, React Router, CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Media Hosting** | ImageKit.io |
| **Authentication** | JWT (JSON Web Token) |
| **Styling** | Custom CSS (Responsive Design) |

---

## 📁 Folder Structure


```
TasteLoop/
├── Backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── middlewares/
│ │ └── index.js
│ └── package.json
└── Frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── styles/
│ └── App.jsx
└── package.json
```

---

## ⚙️ Backend Setup
```
cd Backend
npm install
npm run dev

```
### Create a .env file inside /Backend:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```
---

## 💻 Frontend Setup
```
cd ../Frontend
npm install
npm run dev
```

### Then open:

- 👉 http://localhost:5173/ **(Frontend)**
- 👉 http://localhost:3000/ **(Backend)**

---

### 📱 Responsive UI

#### The interface is crafted for:

- 📲 Mobile devices

- 💻 Desktops & Laptops

- 🧭 Smooth scrolling & auto-play reels

---

### 🧠 Future Enhancements

- 🗨️ Real-time comments

- 🔔 Notifications for likes/saves

- 🧑‍🤝‍🧑 Follow creators

- 🌍 Global explore feed

---

## 🔐 Authentication Flow

- Users log in using email & password

- JWT token stored in cookies for authentication

- Protected routes verified via auth.middleware.js

---

## 🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first to discuss what you would like to change.

---

## 🧑‍💻 Author

- Saksham Srivastava
- 📧 srivastavasaksham243@gmail.com

- 🔗 LinkedIn : www.linkedin.com/in/saksham-srivastava-343088255
- 🐙 GitHub : https://github.com/yaxxhsri7444

---

## 📝 License

- This project is licensed under the MIT License — feel free to use and modify it.

---


<p align="center"> Made with ❤️ by <b>Saksham Srivastava</b><br/> If you like this project, don’t forget to ⭐ it on GitHub! </p>


---
