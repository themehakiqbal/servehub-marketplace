# 🚀 ServeHub – Full-Stack Service Marketplace

<div align="center">

![ServeHub Banner](https://img.shields.io/badge/ServeHub-Marketplace-blue?style=for-the-badge&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

**A complete service marketplace platform connecting customers with professional service providers.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://servehub-marketplace.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/themehakiqbal/servehub-marketplace)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/themehakiqbal)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🌟 Overview

**ServeHub** is a full-stack service marketplace platform built with the MERN stack. It allows customers to browse services, hire professionals, submit service requests, and track project progress. Providers can create profiles, list services, manage requests, and handle project delivery.

> **This project was built as part of the TEYZIX CORE Internship Program.**

---

## ✨ Features

### 🔐 Authentication & Authorization
- Secure user registration and login with JWT
- Role-based access control (Customer, Provider, Admin)
- Password hashing with bcrypt

### 👤 Provider Profiles
- Complete provider profiles with skills, experience, and pricing
- Profile picture upload using Cloudinary
- Portfolio management

### 📋 Service Listings
- Full CRUD operations for services
- Search and filter by category
- Responsive service cards

### 📝 Service Request System
- Customers can submit service requests
- Real-time status tracking
- Status workflow: Pending → Accepted → In Progress → Completed → Delivered

### ⭐ Review & Rating System
- Customers can rate providers (1-5 stars)
- Average rating calculation
- Provider reputation management

### 📊 Dashboards
- Role-based dashboards for Customers, Providers, and Admin
- Request statistics and management
- Profile management

### 🌙 Dark Mode
- Toggle between light and dark themes
- Persistent user preference

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
| :--- | :--- |
| **React.js** | UI Framework |
| **Bootstrap** | Styling & Components |
| **React Router** | Navigation |
| **Axios** | API Calls |
| **React Icons** | Icons |

### Backend
| Technology | Purpose |
| :--- | :--- |
| **Node.js** | Runtime Environment |
| **Express.js** | Web Framework |
| **MongoDB Atlas** | Cloud Database |
| **JWT** | Authentication |
| **bcrypt** | Password Hashing |
| **Cloudinary** | Image Upload |

---

## 📸 Screenshots

### Homepage
![Homepage](https://via.placeholder.com/800x400?text=Homepage+Screenshot)

### Service Listing
![Services](https://via.placeholder.com/800x400?text=Services+Screenshot)

### Customer Dashboard
![Customer Dashboard](https://via.placeholder.com/800x400?text=Customer+Dashboard)

### Provider Dashboard
![Provider Dashboard](https://via.placeholder.com/800x400?text=Provider+Dashboard)

---

## 🚀 Installation

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for image upload)

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/themehakiqbal/servehub-marketplace.git
cd servehub-marketplace/backend

# Install dependencies
npm install

# Create .env file (see Environment Variables section)
# Run the server
npm run dev

# Navigate to frontend folder
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm run dev

cd ../backend
node scripts/seed.js

# Server
PORT=5000

# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/servehubDB?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_jwt_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret