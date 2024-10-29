# API Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Environment Variables](#environment-variables)
3. [Dependencies](#dependencies)
4. [Running the Application](#running-the-application)
5. [API Endpoints](#api-endpoints)
   - [User  Authentication](#user-authentication)
   - [Notes Management](#notes-management)

---

## Introduction

This API allows users to create and manage notes. It includes user authentication and uses JWT for secure access.

## Environment Variables

To configure your application, create a `.env` file in the root directory with the following variables:

### Atlas Configuration
```plaintext
FRONTEND_PORT=3000
BACKEND_PORT=5000
MONGODB_URI=mongodb+srv://kadavzu:carlos123@clustercarlos.qb1yv8u.mongodb.net/notesappdb
MONGODB_DB_NAME=notesappdb
JWT_SECRET=tu_clave_secreta
```

### Local Configuration
```plaintext
FRONTEND_PORT=3000
BACKEND_PORT=5000
MONGODB_URI=mongodb://root:campus2023@localhost:27017/noteappdb
MONGODB_DB_NAME=notesappdb
JWT_SECRET=tu_clave_secreta
```

## Dependencies

To install all required dependencies, run:

```bash
npm install
```

Alternatively, you can install them one by one:

```bash
npm install vue
npm install cors
npm install dotenv
npm install express
npm install mongodb
npm install mongoose
npm install vite --save-dev
npm install @vitejs/plugin-vue --save-dev
npm install concurrently --save-dev
npm install jsonwebtoken
npm install https fs
npm install cross-env --save-dev
npm install bcrypt
npm install axios cookiejs
npm install cookie-parser
```

## Running the Application

To start the application in development mode, use:

```bash
npm run dev:all
```

## API Endpoints

### User Authentication

#### 1. Create User
- **Endpoint:** `POST /api/v1/users/createuser`
- **Description:** Creates a new user in the database and returns a JWT token for authentication.

##### Request Headers
- `Content-Type: application/json`

##### Request Body
```json
{
  "username": "caliche",
  "email": "carlos@example.com",
  "password": "password123"
}
```

##### Responses
- **201 Created**
```json
{
  "message": "User  created",
  "token": "JWT_TOKEN"
}
```
- **400 Bad Request**
```json
{
  "error": "Username already exists"
}
```
```json
{
  "error": "Email already exists"
}
```
```json
{
  "error": "All fields are required and must be strings."
}
```
- **500 Internal Server Error**
```json
{
  "error": "Error creating user"
}
```

### Notes Management

#### 2. Create Note
- **Endpoint:** `POST /api/v1/notes/createnote`
- **Description:** Creates a new note for a user.

##### Request Body
```json
{
  "userId": "ObjectId",
  "title": "string",
  "content": "string"
}
```

##### Responses
- **201 Created**
```json
{
  "message": "Note created successfully",
  "token": "JWT_TOKEN"
}
```
- **400 Bad Request**
```json
{
  "error": "User  ID, title, and content are required"
}
```
- **404 Not Found**
```json
{
  "error": "User  not found"
}
```
- **500 Internal Server Error**
```json
{
  "message": "Error al crear la nota"
}
```

#### 3. Update Note
- **Endpoint:** `PUT /api/v1/notes/updatenote`
- **Description:** Updates an existing note.

##### Request Body
```json
{
  "noteId": "ObjectId",
  "userId": "ObjectId",
  "title": "string",
  "content": "string"
}
```

##### Responses
- **200 OK**
```json
{
  "message": "Note updated successfully",
  "token": "JWT_TOKEN"
}
```
- **400 Bad Request**
```json
{
  "error": "Note ID and User ID are required"
}
```
- **404 Not Found**
```json
{
  "error": "Note not found"
}
```
- **500 Internal Server Error**
```json
{
  "message": "Error updating note"
}
```

### Notes
- Ensure that `username` and ` email` are unique when creating a user.
- Use the `JWT_TOKEN` returned in the response to authenticate subsequent API requests.
- Replace `ObjectId` with the actual MongoDB ObjectId for the user or note.