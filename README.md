# Task Management Application
 
 Overview

This project is a task management application built with Angular 18 for the frontend and JSON Server for the backend. It allows users to view, add, edit, and delete tasks. The application uses Angular Material Dialog for modals and Bootstrap for styling.

# Backend Setup (JSON Server)

`Setup`
Navigate to the Backend Folder
 create db.json file `{
  "tasks": [
    {
      "id": "2",
      "name": "Task 2",
      "dateTime": "2024-08-25T14:00",
      "priority": "High",
      "description": "Lorem ipsum, placeholder or dummy text used in typesetting and graphic design for previewing layouts. It features scrambled Latin text, which emphasizes the design over content of the layout. It is the standard placeholder text of the printing and publishing industries.",
      "completed": true
    },]}`
    
Open your terminal and change to the backend directory where db.json is located.

cd backend
Install JSON Server

Start the JSON Server to watch the db.json file and serve data.
json-server --watch db.json
By default, JSON Server will be running on `http://localhost:3000`.

# Frontend Setup (Angular 18)

 Angular CLI installed globally.

`Setup`
Navigate to the Frontend Folder

Open a new terminal and change to the Angular frontend directory.

cd frontend
   Install Dependencies
Install the required npm packages.
`npm install`

Run Angular Development Server
Start the Angular development server.
`ng serve`
By default, the Angular application will be available at `http://localhost:4200.`

# Application Features

1. Dashboard: Displays a list of tasks with options to filter and sort.
2. Add Task: Opens a dialog to create a new task. The form includes fields for Task Name, Date and Time, Priority, and Description.
3. Edit Task: Opens a dialog to edit an existing task.
4. Delete Task: Allows users to delete a task with a confirmation prompt.

# Technologies Used

1. Frontend: Angular 18, Angular Material, Bootstrap
2. Backend: JSON Server
3. Angular Services to handle http api calls