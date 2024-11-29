# Messenger App

This is a full-stack messaging application that enables seamless real-time communication. The app provides essential features for user authentication, profile management, and interactive messaging with a clean and responsive user interface.

## Features

### 1. Authentication & Authorization
- Secure user registration and login.
- Authentication flow to protect private routes and user data.
- Token-based authorization for secure API interactions.

### 2. User Management
- User profile settings for personalizing information.
- Ability to view and update profile details.

### 3. Chats
- Search for users to initiate new conversations.
- Delete chats to manage conversations.

### 4. Messaging
- Create, edit, and delete messages.
- Reply to specific messages in a conversation for context.
- Real-time updates for a dynamic messaging experience.

## Tech Stack

### Backend
- **Node.js**: Server-side runtime for building the application logic.
- **Nodemon**: Automatic server restarts during development.
- **TypeScript**: For type-safe backend development.
- **Express**: Lightweight framework for routing and APIs.
- **PostgreSQL**: Relational database for storing user, chat, and message data.
- **Prisma**: ORM for efficient and type-safe database queries.

### Frontend
- **TypeScript**: For type-safe frontend development.
- **React**: For building an interactive and dynamic user interface.
- **Vite**: Fast tooling for efficient development and build processes.

## Setup and Development

### Prerequisites
1. Node.js installed on your system.
2. A relational database (PostgreSQL) set up and running.
3. Prisma CLI installed for database management.

### Backend Setup
1. Clone the repository.
2. Navigate to the backend folder:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure environment variables in a `.env` file:
   ```plaintext
   DATABASE_URL=your_database_connection_string
   ```
5. Run database migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```