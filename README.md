# GRC Guard - Third-Party Vendor Risk Assessment Platform

A premium Risk Management platform built with the MERN stack, designed to help organizations assess and monitor third-party vendor risks based on international compliance standards like ISO 27001, PCI DSS, GDPR, and SOC2.

## 🚀 Features

### 1. Risk Dashboard
- **Risk Heatmap**: Visual representation of vendor risk distribution (Critical, High, Medium, Low).
- **Risk Distribution Chart**: Bar chart showing the volume of vendors per risk category.
- **Key Metrics**: Real-time stats for total vendors, average risk score, and high-risk alerts.
- **Key Metrics**: Real-time stats for total vendors, average risk score, and high-risk alerts.
- **Recent Assessments**: Quick view of the latest vendor evaluations.

### 2. User Authentication (JWT)
- **Secure Access**: JWT-based login and registration system.
- **Protected Routes**: Dashboard and assessment tools are restricted to authorized users.
- **Session Management**: Persistent login using local storage and custom Auth context.

### 3. Vendor Management

- **Vendor Inventory**: A searchable grid of all third-party vendors.
- **Risk Scoring**: Automated risk calculation (0-100) based on compliance certifications.
- **Compliance Tracking**: Per-vendor checkmarks for specific standards.
- **Visual Risk Indicators**: Color-coded badges and progress bars for immediate risk context.

### 3. Smart Risk Assessment (Add Vendor)
- **Compliance Toggles**: Easy-to-use interface to verify certifications.
- **Real-time Assessment**: Risks are calculated instantly upon vendor creation.
- **Industry Context**: Categorize vendors by industry (Tech, Finance, etc.).

## 🛠 Tech Stack
- **Frontend**: React (Vite), Framer Motion (Animations), Recharts (Data Viz), Lucide React (Icons), Axios.
- **Backend**: Node.js, Express, JSON Web Tokens (JWT), bcryptjs, multer.
- **Database**: MongoDB (Mongoose) with an **automatic in-memory fallback** for demonstration environments.
- **Styling**: Vanilla CSS with a customized **Glassmorphic Design System**.

## 🛡 Risk Calculation Logic
The platform uses a weighted scoring system:
- **Base Risk**: 100 (Unassessed/Critical)
- **Compliance Offsets**: Each major certification (ISO 27001, PCI DSS, etc.) reduces the risk score by **20 points**.
- **Risk Levels**:
  - `> 80`: Critical
  - `50 - 80`: High
  - `30 - 50`: Medium
  - `< 30`: Low

## 📦 Getting Started

1. **Start Backend**:
   ```bash
   cd backend
   npm start
   ```
2. **Start Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) (or the port shown in terminal).

## ⚙️ Environment Variables

### Backend (`/backend/.env`)
Create a `.env` file in the `backend` folder with the following keys:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/grc_guard
JWT_SECRET=super_secret_key_here
```

### Frontend (`/frontend/.env`)
Create a `.env` file in the `frontend` folder with the backend URL (only needed if backend is hosted elsewhere):
```env
VITE_API_URL=http://localhost:5000
```

## 🌍 Deployment

### Deploy Backend (Render)
1. Set Root Directory to `backend`
2. Build Command: `npm install`
3. Start Command: `node server.js`
4. Add Environment Variables (`MONGODB_URI`, `PORT`, `JWT_SECRET`)

### Deploy Frontend (Vercel)
1. Set Root Directory to `frontend`
2. Framework Preset: `Vite`
3. Add Environment Variable: `VITE_API_URL` (Set this to your Render backend URL)

# GRC-Guard
