## 🎵 Musify - Music Library Micro Frontend

This is the **Music Library** micro frontend of the **Musify** project. It supports filtering, sorting, and grouping songs by Album, Artist, and Title. This micro frontend is dynamically loaded into the `main-app` using **Module Federation**.

---

### 🚀 Features

* View a list of songs in a clean UI
* Filter, sort, and group by Album, Artist, or Title
* Uses built-in JavaScript methods (`map`, `filter`, `reduce`)
* Role-based UI (admin vs user)
* Designed as a micro frontend (remote) with Module Federation

---

### 💠 How to Run Locally

1. Clone the repository:

```bash
git clone https://github.com/Suhassuresha/Musify-music-library.git
cd Musify-music-library
```

2. Install dependencies:

```bash
npm install
```

3. Start the dev server:

```bash
npm run dev
```

Make sure this runs on **a different port** (like 4174) than the `main-app`.

---

### 🌐 How It Was Deployed

This micro frontend is deployed using **Vercel**.

**Live URL**: [https://musify-music-library.vercel.app](https://musify-music-library.vercel.app)

In `main-app`, this URL is used in `vite.config.js`:

```js
remotes: {
  music_library: 'https://musify-music-library.vercel.app/assets/remoteEntry.js',
}
```

---

### 🔐 Demo Credentials

| Role  | Username | Password |
| ----- | -------- | -------- |
| Admin | `admin`  | `admin`  |
| User  | `user`   | `user`   |

💡 This is mock authentication using **in-memory JWT** stored in localStorage.

---

### 🧹 Micro Frontend + Auth Explained

#### Micro Frontend

* This app is loaded remotely via Module Federation.
* Exposed as `music_library` in `main-app`.
* No direct routing required.

#### Role-based Access

* Role is stored in `localStorage` in `main-app`.
* `AuthContext` is exposed from `main-app` and consumed in `music-library`.
* Admins can add/delete songs.
* Users can only view/filter.

---

### 🧪 Tech Stack

* React + Vite
* Module Federation via `@originjs/vite-plugin-federation`
* Tailwind CSS
* Context API for state/auth
