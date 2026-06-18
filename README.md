# Stolaris Author Frontend Documentation

## Table of Contents

1. [Introduction](#1-introduction)
2. [Technologies Used](#2-technologies-used)
3. [Project Structure](#3-project-structure)
4. [Features](#4-features)
5. [Setup and Installation](#5-setup-and-installation)
6. [API Integration](#6-api-integration)
7. [Authentication](#7-authentication)
8. [Live Preview](#8-live-preview)

## 1. Introduction

This project is a React-based web application designed for authors to create, edit, and manage articles on the [Stolaris Blog API](https://github.com/Stolir/stolaris-blog-api/). It provides a rich text editing experience, article management features, and engagement tracking. To view this project refer to the [live preview]() section.

## 2. Technologies Used

This project utilizes a modern web development stack to provide a powerful and efficient authoring environment:

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool that provides a lightning-fast development experience.
- **JavaScript (ESM)**: The primary programming language, utilizing ES Modules for modularity.
- **CSS Modules**: For scoped styling of components.
- **React Router**: For declarative routing within the application.
- **Tiptap**: A headless wrapper around ProseMirror, providing a flexible and extensible rich text editor.
- **Dotenv**: For managing environment variables.

## 3. Project Structure

The application's codebase is organized into a clear and modular structure:

```
src/
├── App.tsx                 # Main application component
├── components/             # Reusable UI components
│   ├── common/             # General purpose components
│   ├── tiptap-ui/          # Components specifically for the Tiptap editor UI
│   └── tiptap-ui-primitive/# Low-level, unstyled UI primitives for Tiptap
├── context/                # React Context for global state management (e.g., AuthContext)
├── hooks/                  # Custom React hooks for reusable logic
├── layouts/                # Layout components (e.g., AuthLayout, PublicLayout)
├── lib/                    # Utility functions and API request handlers
│   ├── serverRequests.js
│   ├── tiptap-utils.ts
│   └── utils.js
├── loaders/                # Data loaders for React Router
│   ├── articleLoader.js
│   └── userLoader.js
├── main.tsx                # Entry point of the application
├── pages/                  # Page-level components (e.g., DashboardPage, EditorPage)
│   ├── DashboardPage/
│   ├── EditorPage/
│   ├── ... (and many more)
├── router.tsx              # React Router configuration
└── styles/                 # Global styles and SCSS variables
    ├── _keyframe-animations.scss
    └── _variables.scss
```

## 4. Features

This project offers a comprehensive set of features for content management:

- **Rich Text Editor**: A powerful and customizable editor for creating and formatting articles.
- **Article Management**: Authors can create, edit, publish, unpublish, and delete articles.
- **Dashboard**: Overview of article statistics and recent activity.
- **Engagement Tracking**: View comments and other engagement metrics for articles.
- **User Authentication**: Secure login and registration for authors.
- **Responsive Design**: Optimized for various screen sizes and devices.
- **Settings Management**: Manage author profile settings.

## 5. Setup and Installation

To set up and run this project locally, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Stolir/stolaris-author-frontend.git
    cd stolaris-author-frontend
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    # or yarn install
    ```
3.  **Configure environment variables**:
    Create a `.env` file in the root directory and add your API URL:
    ```
    VITE_API_URL=http://localhost:3000 # Replace with your backend API URL
    ```
4.  **Run the development server**:
    ```bash
    npm run dev
    # or yarn dev
    ```
    The application will typically be available at `http://localhost:5173`.

## 6. API Integration

The frontend interacts with a backend API to manage articles, user data, and other functionalities. The `src/lib/serverRequests.js` file handles these API calls. Key API interactions include:

- **Authentication**: `loginUser`, `registerUser`, `logoutUser`, `getUser`.
- **Articles**: `saveAsDraft`, `updateArticleStatus`, `getArticle`, `saveExistingArticle`.
- **Comments**: `getAllComments`, `deleteComment`.

All API requests are made using `fetch` and include `credentials: "include"` to handle cookies for authentication.

## 7. Authentication

Similar to the User Frontend, the Author Frontend uses an authentication system managed via `AuthContext.jsx`. This context provides global access to the author's authentication status, including `user` data, `login`, `logout`, `loading`, and `setLoading` functions, ensuring consistent authentication state across the application.

## 8. Live Preview

To view this site head to https://abdelrahman-blog-author.netlify.app/

Note that new users are unable to create accounts by design. Please use the following credentials:  
**username:** stolaris  
**password:** stolarisAuthor
