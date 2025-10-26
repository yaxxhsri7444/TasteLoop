# 🍴 TasteLoop

**TasteLoop** is a modern food-sharing platform where food partners can upload short food-related videos, and users can explore, like, and save their favorites — similar to Instagram Reels but focused entirely on food content.

---

## 🚀 Features

- 🎥 Upload short food videos (MP4/MOV)
- ❤️ Like, save, and comment on food reels
- 👩‍🍳 Food partner dashboard to manage uploads
- 🧑‍💻 User authentication (Login / Signup)
- 💾 Saved videos page for later viewing
- 📱 Responsive mobile-first design
- 🔥 Smooth autoplay video feed using Intersection Observer

---

## 🛠️ Tech Stack

**Frontend:** React.js, Axios, React Router, CSS  
**Backend:** Node.js, Express.js, MongoDB  
**Media Storage:** ImageKit.io  
**Auth:** JWT (JSON Web Tokens)  
**Styling:** Custom CSS (mobile-first design)

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

## 📝 License

- This project is licensed under the MIT License — feel free to use and modify it.
