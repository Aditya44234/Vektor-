#  Loopin — Full Project Execution Plan (Next.js + TypeScript + MongoDB + AI)

##  Project Vision

Loopin is a modern AI-powered microblogging platform (like Twitter/X) where users can:

* Create profiles
* Post short text + optional images
* Interact via "Like" & "Piss" (fun reaction system)
* Discover content based on interests
* Get AI-curated feeds (auto-categorized posts)

Goal: Build a **production-ready, scalable full-stack app** while learning:

* TypeScript
* Next.js (App Router)
* System Design fundamentals

---

#  PHASE 1 — MVP (Must Build First)

## Core Features

1. Authentication (Signup/Login)
2. User Profile (name, bio, profile pic, interests)
3. Create Post (text + optional image)
4. Feed (latest posts first)
5. Like & Piss reactions
6. Search users by username

---

#  PHASE 2 — AI + SMART FEED

1. AI categorization of posts
2. Interest-based feed filtering
3. Personalized feed ranking

---

#  TECH STACK

## Frontend + Backend (Fullstack)

* Next.js (App Router)
* TypeScript
* Tailwind CSS

## Backend Logic

* Next.js API Routes / Server Actions

## Database

* MongoDB (with Mongoose or Prisma)

## Auth

* NextAuth.js (or custom JWT)

## File Upload

* Cloudinary / AWS S3

## AI

* OpenAI API (or any LLM)

---

# 📂 PROJECT STRUCTURE

```
Loopin/
│
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── signup/
│   │
│   ├── (main)/
│   │   ├── feed/
│   │   ├── profile/[username]/
│   │   ├── search/
│   │
│   ├── api/
│   │   ├── auth/
│   │   ├── posts/
│   │   ├── users/
│   │   ├── reactions/
│   │   ├── ai/
│
├── components/
├── lib/
├── models/
├── utils/
├── hooks/
```

---

#  DATABASE DESIGN (MongoDB)

## User Schema

```
{
  _id
  username
  email
  password
  profilePic
  bio
  interests: [String]
  createdAt
}
```

## Post Schema

```
{
  _id
  userId
  content
  imageUrl
  category (AI generated)
  likes: [userId]
  piss: [userId]
  createdAt
}
```

## Reaction Schema (Optional advanced)

```
{
  userId
  postId
  type: "like" | "piss"
}
```

---

#  API DESIGN

## Auth

* POST /api/auth/signup
* POST /api/auth/login

## Users

* GET /api/users/:username
* GET /api/users/search?q=

## Posts

* POST /api/posts/create
* GET /api/posts/feed
* GET /api/posts/:id

## Reactions

* POST /api/reactions

## AI

* POST /api/ai/classify

---

#  SYSTEM DESIGN CONCEPTS (IMPORTANT)

## 1. Feed System

* Basic: Latest posts (sorted by createdAt DESC)
* Advanced:

  * Filter by user interests
  * Rank posts by relevance

## 2. AI Categorization

Flow:
User posts → send content to AI → assign category → store in DB

Example Categories:

* Tech
* Finance
* Fitness
* Memes
* Motivation
* Education

## 3. Scalability Thinking

* Avoid heavy queries
* Use pagination (limit + cursor)
* Index fields:

  * username
  * createdAt
  * category

## 4. Image Upload Handling

* Upload → Cloudinary → store URL in DB

---

#  UI PAGES

## Auth

* Login Page
* Signup Page

## Main App

* Feed Page (home)
* Profile Page
* Create Post Modal
* Search Page

---

# DATA FLOW (IMPORTANT)

### Create Post Flow

1. User writes post
2. Upload image (optional)
3. Send content → AI classify
4. Save post with category
5. Return success

---

### Feed Load Flow

1. Fetch posts from DB
2. Filter based on interests (optional)
3. Sort by latest
4. Display

---

#  COMPONENT BREAKDOWN

* Navbar
* PostCard
* CreatePostBox
* ProfileHeader
* FeedList
* ReactionButtons
* SearchBar

---

#  FUTURE FEATURES (DO NOT BUILD NOW)

* Comments
* Follow system
* Notifications
* Real-time updates (WebSockets)
* Trending topics
* Hashtags

---

#  LEARNING GOALS MAPPING

## TypeScript

* Strong typing for API & DB models
* Interfaces for props & responses

## Next.js

* App Router
* Server vs Client Components
* API routes
* Server Actions

## System Design

* Feed system
* DB schema design
* API structuring
* Scalability thinking

---

# DEVELOPMENT ORDER (STRICT)

## Step 1

Setup Next.js + TypeScript + Tailwind

## Step 2

Setup MongoDB connection

## Step 3

Auth system (login/signup)

## Step 4

User profile system

## Step 5

Create post API + UI

## Step 6

Feed page

## Step 7

Reactions (like & piss)

## Step 8

Search users

## Step 9

Image upload

## Step 10

AI classification

---

#  FINAL NOTE

Build this like:

* A **real product**
* Not a tutorial
* Always think: "Will this scale?"

---

 Once MVP is done, we’ll move to:

* Feed ranking algorithm
* Real-time system
* Advanced system design

---
