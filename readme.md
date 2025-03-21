### 📜 **README.md (Root)**

```markdown
# 📸 Full Stack Image Gallery

This is a full-stack image upload and management system built with **React (Frontend)** and **Node.js with Prisma ORM (Backend)**. Users can **upload, view, download, copy, and delete images** in a structured gallery with pagination and authentication.

## 🚀 Tech Stack

### **Frontend:**

- React.js

- Redux Toolkit (State Management)

- Bootstrap (Styling)

- Axios (API Requests)

- React Router (Navigation)

### **Backend:**

- Node.js + Express.js

- Prisma ORM + MySQL (Database)

- JWT (Authentication)

- Multer (Image Upload Handling)

## 📂 Project Structure

/frontend → React Frontend

/backend → Node.js Backend

## 🔐 Authentication

- Users must **log in** to upload and manage images.

- Authentication is handled using **JWT tokens**.

- Private routes ensure only authenticated users can access the gallery.

## 📸 Features

✅ **User Authentication** (Login/Register with JWT)

✅ **Upload Images** (Multer for file handling)

✅ **View Images** (Paginated gallery)

✅ **Download Images**

✅ **Copy Image Link**

✅ **Delete Images**

✅ **Persist State with Redux-Persist**

## 📜 API Endpoints

| Method | Endpoint | Description |

|--------|----------------|--------------------------|

| POST | `/api/auth/register` | Register a new user |

| POST | `/api/auth/login` | User login (returns JWT) |

| GET | `/api/files/:pageNo` | Get images (pagination) |

| POST | `/api/files/upload` | Upload an image |

| DELETE | `/api/files/:id` | Delete an image |

## 🚀 Future Improvements

- Image preview before upload

- AI-based image tagging

- Advanced search & filtering

---

### ✅ **What This README Covers**

- Project overview

- Tech stack

- Setup instructions (Frontend & Backend)

- Authentication details

- Features

- API endpoints

- Future improvements
```
