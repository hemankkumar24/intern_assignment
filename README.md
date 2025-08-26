# 🚀 Cosmic Event Tracker

A React + Vite web application that fetches **Near-Earth Object (NEO)** data from NASA's API, 
allows **filtering, sorting, comparing asteroids**, and provides detailed visualizations.  
Authentication is handled using **Supabase**.
Project is live on [Vercel](https://intern-assignment-eight-rose.vercel.app/signin)
---

## 📂 Project Structure
```
hemankkumar24-intern_assignment/
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── vercel.json
├── vite.config.js
└── src/
    ├── App.css
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── supabaseClient.js
    └── components/
        ├── Compare.jsx
        ├── Home.jsx
        ├── Navbar.jsx
        ├── NEODetail.jsx
        ├── ProtectedRoute.jsx
        ├── SignIn.jsx
        └── SignUp.jsx
```

---

## ⚡ Features
- 🔑 **Authentication** (Sign Up / Sign In with Supabase)
- 🌍 **Fetch NEO Data** from NASA API
- 🛡️ **Filter** by hazardous asteroids
- 📅 **Sort** by approach date (ascending/descending)
- 📊 **Compare multiple asteroids** with interactive Recharts graphs
- 📖 **Detailed view** of individual asteroids
- 🔄 **Load more** asteroids dynamically
- 🎨 Styled with **Tailwind CSS**

---

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/neo-tracker.git
   cd neo-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**  
   Create a `.env` file in the root directory and add:
   ```env
   VITE_NASA_API_KEY=your_nasa_api_key
   VITE_SUPABASE_PUBLIC_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

---

## 🖼️ Screenshots
- **Home Page** – Lists all asteroids with filters & sorting
- **Compare Page** – Graphical asteroid comparison
- **Detail Page** – Full information about a selected asteroid
- **Auth Pages** – Sign In / Sign Up

---

## 🚀 Deployment (Vercel)
This project includes a `vercel.json` file for smooth deployment.
1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com/)
3. Set environment variables in Vercel dashboard
4. Deploy 🚀

---

## 📦 Tech Stack
- **Frontend:** React (Vite) + TailwindCSS
- **Auth:** Supabase
- **API:** NASA NEO API
- **Visualization:** Recharts
- **Deployment:** Vercel

---

## 👨‍💻 Author
**Hemank Kumar**  
CSE (AI & ML) Undergraduate @ Manipal University Jaipur  
🚀 Passionate about AI, Full-Stack Development & Scalable Apps

---
