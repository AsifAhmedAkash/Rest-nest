🏠 RENTNEST - Property Rental & Booking Platform

A full-stack property rental and booking platform where property owners can list rental properties, tenants can browse and book properties, and administrators can manage the entire marketplace.

The platform provides secure authentication, role-based access control, online booking, Stripe payments, favorites management, reviews, analytics dashboards, and property moderation.

🚀 Live Demo

Frontend: https://your-live-link.com

Backend API: https://your-server-link.com

📌 Project Purpose

RESTNET connects tenants and property owners through a secure and transparent rental marketplace.

Tenant Features
Browse approved properties
Search and filter properties
View property details
Add properties to favorites
Book properties online
Make payments via Stripe
Leave reviews and ratings
Manage bookings
Owner Features
Add rental properties
Manage listed properties
View booking requests
Approve or reject bookings
Monitor earnings analytics
Track monthly revenue
Admin Features
Manage users
Change user roles
Approve/reject properties
Monitor bookings
View transactions
Provide rejection feedback
🛠️ Tech Stack
Frontend
Next.js 15
React.js
Tailwind CSS
Framer Motion
React Hook Form
Axios
React Icons
Recharts
Stripe
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
Stripe API
CORS
dotenv
✨ Key Features
🔐 Authentication & Authorization
Email & Password Authentication
Google Login
JWT Token Authentication
Protected Routes
Role-Based Access Control
Roles
Tenant
Owner
Admin
🏡 Property Management
Owner
Add Property
Update Property
Delete Property
View Property Status
View Rejection Feedback
Admin
Approve Property
Reject Property
Delete Property
Update Property
🔍 Property Discovery
Search by Location
Search by Property Type
Filter by Price
Sorting
Low to High
High to Low
Backend Filtering
❤️ Favorites System

Tenants can:

Add properties to favorites
Remove favorites
View all saved properties
📅 Booking System

Tenants can:

Select Move-in Date
Submit Contact Information
Add Notes
Confirm Booking

Booking Status:

Pending
Approved
Rejected
💳 Stripe Payment Integration

Features:

Secure Payment Gateway
Booking Fee Collection
Transaction Storage
Payment History
⭐ Review System

Tenants can:

Rate Properties
Write Reviews

Reviews include:

Name
Email
Date
Rating
Comment
📊 Dashboard Analytics
Owner Dashboard
Total Earnings
Total Properties
Total Bookings
Monthly Earnings Chart
Admin Dashboard
User Management
Property Moderation
Booking Monitoring
Transaction Monitoring
📱 Responsive Design

Fully optimized for:

Mobile
Tablet
Desktop
📂 Project Structure
src
│
├── app
│   ├── allproperties
│   ├── api
│   ├── auth
│   ├── blogspage
│   ├── dashboard
│   │   ├── admin
│   │   ├── owner
│   │   └── tenant
│   ├── payment
│   └── properties
│
├── components
│   ├── navbar
│   ├── hero
│   ├── locations
│   ├── testimonials
│   ├── dashboard
│   ├── footer
│   └── profile
│
├── lib
├── hooks
├── context
└── utils
🔑 Environment Variables
Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:5000

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_key

NEXT_PUBLIC_IMGBB_API_KEY=your_key
Backend (.env)
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

STRIPE_SECRET_KEY=your_stripe_secret_key

CLIENT_URL=http://localhost:3000
⚙️ Installation
Clone Frontend
git clone https://github.com/yourusername/restnet-client.git

cd restnet-client

npm install

npm run dev
Clone Backend
git clone https://github.com/yourusername/restnet-server.git

cd restnet-server

npm install

npm run dev
📄 API Features
Authentication
POST /api/auth/register
POST /api/auth/login
POST /api/auth/google-login
Properties
GET /api/properties
GET /api/properties/:id
POST /api/properties
PATCH /api/properties/:id
DELETE /api/properties/:id
Bookings
POST /api/bookings
GET /api/bookings
PATCH /api/bookings/:id
Favorites
POST /api/favorites
GET /api/favorites
DELETE /api/favorites/:id
Transactions
GET /api/transactions
🎨 UI Features
Modern Responsive Design
Framer Motion Animations
Loading Screen
Custom Error Page
Dashboard Layout
Reusable Components
Consistent Theme
🔥 Additional Features
Property Search
Backend Filtering
Backend Sorting
Pagination
Monthly Earnings Analytics
Role-Based Dashboard
Stripe Integration
Review System
Favorites System
Rejection Feedback System
📦 NPM Packages Used
Frontend
next
react
tailwindcss
axios
framer-motion
react-icons
react-hook-form
recharts
stripe
@stripe/react-stripe-js
@stripe/stripe-js
sweetalert2
react-hot-toast
Backend
express
mongoose
jsonwebtoken
bcryptjs
cors
dotenv
stripe
cookie-parser
morgan
👨‍💻 Developed By

Asif Ahmed Akash Ankon

Urban & Regional Planning Student | Full Stack Developer

GitHub: https://github.com/AsifAhmedAkash

📜 License

This project is developed for educational and portfolio purposes. © RENTNEST.