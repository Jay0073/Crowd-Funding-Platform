# 💸 Crowd-Funding Platform

A full-stack web application that enables users to **create and support crowdfunding campaigns**. Whether you're launching a new startup idea, helping a social cause, or just experimenting with full-stack development, this platform has your back.

Built for learning and experimentation — and maybe even to go live someday. 😄

---

## 🚀 Features

- 🔐 **User Registration and Authentication** — JWT-secured login/signup
- 📝 **Campaign Creation** — Create new fundraisers with title, description, image, and goal amount
- 🔍 **Campaign Browsing & Search** — View, search, and explore all campaigns
- 💰 **Secure Donations** — Stripe payment integration
- 📦 **Media Uploads** — Upload campaign images or banners
- 📊 **Progress Tracking** — See funding progress live

---

## 🌐 Live Demo

Check out the live application here:  
🔗 [https://crowdfund-eo0d.onrender.com/](https://crowdfund-eo0d.onrender.com/)

---

## 🛠️ Tech Stack

### Frontend:
- **React.js** with **Vite**
- **Tailwind CSS** for UI
- **React Router** for navigation

### Backend:
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **Stripe API** for handling payments
- **JWT** for authentication

---

## 📁 Project File Structure

```
Crowd-Funding-Website
│
├── client                    # Frontend React app
│   ├── node_modules
│   ├── public
│   ├── src
│   │   ├── Components        # Reusable UI components
│   │   ├── Pages             # Route-based pages
│   │   ├── assets            # Images, icons, etc.
│   │   ├── App.jsx           # Main app layout
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx          # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server                    # Backend API
│   ├── models                # Mongoose schemas (User, Campaign, Donations)
│   ├── uploads               # Uploaded media files
│   ├── index.js              # API entry point
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 📦 Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Jay0073/Crowd-Funding-Website.git
cd Crowd-Funding-Website
```

---

### 2. Install dependencies

- Backend:

```bash
cd server
npm install
```

- Frontend:

```bash
cd ../client
npm install
```

---

### 3. Set up environment variables

Create a `.env` file in the `server/` folder and add:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

### 4. Start the development servers

- **Backend**:

```bash
cd server
node index.js
```

- **Frontend**:

```bash
cd ../client
npm run dev
```

Now open: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Example Use Cases

- Launching a social cause fundraiser (e.g., flood relief, education aid)
- Crowdsourcing for your next mobile app or tech idea
- Practicing full-stack app development
- Building your portfolio with real-world features
- Trying out Stripe payment integration in a real app

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Added XYZ"`
4. Push and create a Pull Request

---

## 🪪 License

This project is licensed under the [MIT License](LICENSE).

---

## ✨ Author

Crafted by [@Jay0073](https://github.com/Jay0073) — with code, caffeine, and curiosity.
