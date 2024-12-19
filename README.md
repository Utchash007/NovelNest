# NovelNest a React-Django Application

This is a full-stack web application with a React frontend and Django backend. The Django backend provides REST APIs using Django REST Framework, and the React frontend communicates with the backend via Axios.

## Features

- **Django Backend**:
  - Provides REST APIs using Django REST Framework.
  - Fully functional backend for data handling and business logic.

- **React Frontend**:
  - Built with React.
  - Uses React Router for navigation.
  - Communicates with the backend using Axios.

## Installation
### Frontend (React)

1. Install Node.js (if not already installed):
   ```bash
   # Download and install Node.js from the official website:
   # https://nodejs.org/en/download/
   ```

2. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

   Key packages:
   - `react` and `react-dom` for building user interfaces.
   - `react-router-dom` for routing.
   - `axios` for making HTTP requests.

   Install individually (if required):
   ```bash
   npm install react react-dom react-router-dom axios
   ```

4. Start the development server:
   ```bash
   npm start
   ```
## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   python manage.py runserver
   ```

2. Start the frontend server:
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to:
   ```text
   http://localhost:3000
   ```
