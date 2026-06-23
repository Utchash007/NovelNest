# NovelNest Frontend

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)
[![Appwrite](https://img.shields.io/badge/Appwrite-FD366E?style=for-the-badge&logo=appwrite&logoColor=white)](https://appwrite.io/)

A responsive, feature-rich web application frontend for the **NovelNest novel-reading platform**. This frontend is built with **React 19 + TypeScript + Vite**, uses **Axios** with JWT interceptors to communicate with the Express backend, and leverages the **Appwrite Web SDK** for secure, client-side session authentication.

---

## 🚀 Key Features

*   **Appwrite Authentication**: Seamless email-based sign-in and registration forms synced directly to the PostgreSQL backend.
*   **JWT Client Interceptors**: A custom Axios instance that automatically retrieves and attaches dynamic Appwrite Bearer JWT tokens to all backend API requests.
*   **Responsive Novel Discovery**: Clean, responsive layout grid displaying novel catalogs by genre filters (Action, Slice of Life, Adventure, Isekai, and Fantasy).
*   **Reading History & Bookmarks**: Dynamic tracking showing the user's latest reads, continue-reading shortcuts, and bookmarked titles.
*   **Resilient Cover Image Resolution**: Falls back automatically to local assets using `handleImgError` if remote cover image queries fail.
*   **Interactive Star Ratings**: Integrates rating selections, converting the frontend's 10-point user interface to/from the database's 5-star metric seamlessly.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose / Rationale |
| :--- | :--- | :--- |
| **Runtime** | Node.js (v18+) | Runtime environment for dependencies and building |
| **Framework** | React 19 + Vite | Component-driven UI framework with instant hot-module-reloads |
| **Language** | TypeScript | Strong typing, autocompletion, compile-time safety |
| **Routing** | React Router v7 | Declarative routing and parameters retrieval |
| **Client Auth** | Appwrite Web SDK | Client session lifecycle management |
| **HTTP Client** | Axios | Custom interceptors handling Bearer token headers |
| **Styling** | Vanilla CSS | Modern, robust design system, variables, and responsive classes |

---

## 📂 Project Structure

```
my-app/
├── public/
│   └── Assets/                 # Static sequences (img1-img5, logo, default profile pictures)
├── src/
│   ├── Generic_API/            # Bookmark and Reading History mutation helpers
│   ├── Header_Components/      # Navigation navbar, profile dropdown toggles
│   ├── Layout/                 # Primary page views (homepage, Novelpage, Bookmarks, SearchResult)
│   ├── template/               # Atomic component templates (Card, Slider, NovelDescription, NovelCpt)
│   ├── api.ts                  # Axios client setup with jwt bearer interceptor
│   ├── appwrite.ts             # Appwrite client configuration (Endpoint & Project ID)
│   ├── AuthContext.tsx         # Global session state provider
│   ├── main.tsx                # Frontend entry point
│   ├── storage.ts              # LocalStorage helpers
│   ├── utils.ts                # Layout utility functions (Genre tags, Image error handlers)
│   └── index.css               # Core styling and variables
├── .env.example                # Credentials schema template
└── vite.config.ts              # Vite server configs and API dev proxies
```

---

## ⚙️ Setup & Installation

### 1. Prerequisites
Ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v18+)
*   The Express Backend server running on `http://localhost:3000`

### 2. Environment Configuration
Create a `.env` file inside the `my-app/` directory based on `.env.example`:
```env
# Appwrite Client Settings
VITE_APPWRITE_ENDPOINT="https://sgp.cloud.appwrite.io/v1"
VITE_APPWRITE_PROJECT_ID="your-appwrite-project-id"

# Backend Gateway URL
VITE_BACKEND_URL="http://localhost:3000"
```

### 3. Install Dependencies
Run npm installation in the `my-app/` folder:
```bash
npm install
```

### 4. Run Development Server
Start the local hot-reloaded development server:
```bash
npm run dev
```
Open your browser and navigate to **`http://localhost:5173`**.

---

## 🏃 Scripts Reference

*   **`npm run dev`**: Launches local Vite development server on port `5173`.
*   **`npm run build`**: Compiles TS/TSX assets to optimization-bundled JS/CSS files (`dist/`).
*   **`npm run preview`**: Serves a local preview of the production-built bundle.
