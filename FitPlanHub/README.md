# FitPlanHub – Trainers & Users Platform

This project is a full-stack application for `FitPlanHub`, a platform where certified trainers can create and sell fitness plans to users.

## Features

- User & Trainer Authentication (Signup/Login)
- Trainer Dashboard for CRUD operations on fitness plans
- User subscriptions to fitness plans
- Access control for subscribed content
- Ability for users to follow/unfollow trainers
- Personalized feed for users based on followed trainers

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React (or another modern frontend framework)

## Project Structure

```
FitPlanHub/
├── backend/         # Node.js backend
├── frontend/        # React frontend
└── README.md        # Main README
```

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation & Setup

**1. Clone the repository:**

```bash
git clone <repository-url>
cd FitPlanHub
```

**2. Backend Setup:**

```bash
cd backend
npm install
# Create a .env file and add your MongoDB connection string and JWT secret
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
npm run dev
```

**3. Frontend Setup:**

```bash
cd ../frontend
npm install
npm start
```

## API Endpoints

A Postman collection is included in the root of the project (`FitPlanHub.postman_collection.json`) for easy API testing.

### Auth
- `POST /api/auth/register` - Register a new user or trainer.
- `POST /api/auth/login` - Login for users and trainers.

### Plans
- `POST /api/plans` - Create a new fitness plan (trainer only).
- `GET /api/plans` - Get all fitness plans (public).
- `GET /api/plans/my-plans` - Get plans for the logged-in trainer.
- `GET /api/plans/:id` - Get a single plan by ID (requires auth).
- `PUT /api/plans/:id` - Update a plan (trainer only).
- `DELETE /api/plans/:id` - Delete a plan (trainer only).

### Subscriptions
- `POST /api/subscriptions/:planId` - Subscribe to a plan (user only).
- `GET /api/subscriptions/me` - Get current user's active subscriptions.

### Users
- `PUT /api/users/follow/:id` - Follow a trainer (user only).
- `PUT /api/users/unfollow/:id` - Unfollow a trainer (user only).
- `GET /api/users/trainer/:id` - Get a trainer's public profile.

### Feed
- `GET /api/feed` - Get the user's personalized feed.
