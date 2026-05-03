# BudgetWise

## Project Overview

BudgetWise is a personal finance dashboard application designed to help users track their income, expenses, and visualize their spending patterns. This document provides an overview of the application, its architecture, and key components.

## Tech Stack

*   **Frontend:**
    *   React
    *   Vite
    *   TypeScript
    *   Tailwind CSS
*   **Backend:**
    *   Express
    *   TypeScript
    *   MongoDB
    *   Mongoose

## API Endpoints

The following API endpoints are available:

*   `POST /api/income`: Creates a new income record.
*   `GET /api/income`: Retrieves all income records.
*   `DELETE /api/income/:id`: Deletes a specific income record.
*   `POST /api/expense`: Creates a new expense record.
*   `GET /api/expense`: Retrieves all expense records.
*   `DELETE /api/expense/:id`: Deletes a specific expense record.
*   `GET /api/categories`: Retrieves all expense categories.

## Project Structure

The project is structured into two main parts: a frontend and a backend.

### Frontend

The frontend is built using React and Vite. It provides the user interface for interacting with the application.

*   `src/main.tsx`: The entry point for the React application.
*   `src/App.tsx`: The main application component.
*   `src/pages/*`: Contains the different pages of the application (Dashboard, Add Income, Add Expense, Categories, Reports).
*   `src/components/*`: Contains reusable React components (Layout, Navbar).
*   `src/api/client.ts`: Handles communication with the backend API.
*   `src/store/authStore.ts`:  Manages authentication state.
*   `src/hooks/useAuth.ts`:  Provides authentication hooks.
*   `src/types/index.ts`: Defines TypeScript types for the application.

### Backend

The backend is built using Express and Node.js. It provides the API endpoints and handles data persistence using MongoDB.

*   `src/index.ts`: The main application file for the backend.
*   `src/middleware/auth.ts`: Authentication middleware.
*   `src/config/db.ts`: Configuration for the MongoDB connection.
*   `src/models/*`: Defines the MongoDB schemas for Income, Expense, and Categories.
*   `src/controllers/*`: Contains the logic for handling API requests related to income, expenses, and categories.
*   `src/routes/*`: Defines the API routes for the application.