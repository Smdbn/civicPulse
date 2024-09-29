civicPulse-project/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── reportController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── Report.js
│   │   └── User.js
│   ├── routes/
│   │   ├── reportRoutes.js
│   │   └── userRoutes.js
│   ├──database.sql   
│   ├──data.js
│
├── public/
│   ├── index.html
│   ├── register.html
│   ├── dashboard.html
│   ├── styles.css
│   ├── script.js
│   └── register.js
│   └── dashboard.js
│
├──.env
├──index.js
├──README.md
├──.gitignore

# CivicPulse Social Justice Project

This project is a web application designed to manage reports related to social justice issues, allowing users to create and view reports, as well as visualize report statistics.

## Features

- User registration and login
- Create and manage reports
- View reports with status filtering
- Visualize reports with charts
- RESTful API with Express.js and Sequelize
- MySQL database for data storage

## Technologies Used

- **Backend**: 
  - Node.js
  - Express.js
  - Sequelize ORM
  - MySQL
  - JWT for authentication
- **Frontend**: 
  - HTML
  - CSS
  - JavaScript
  - Chart.js for data visualization
- **Development Tools**: 
  - dotenv for environment variable management

## Project Structure
As above


## Installation

1. **Clone the Repository**:
   bash
   git clone 
   cd project_name

Install dependencies: bash npm install

Create a .env file in the backend directory and add your database credentials: DB_NAME=social_justice DB_USER=your_username DB_PASSWORD=your_password DB_HOST=localhost JWT_SECRET=your_jwt_secret

Set Up the Database:

Run the SQL commands from database.sql in your MySQL client to create the database and tables.
Seed the Database (Optional):

If you want to add some initial reports, run the following command: bash node data.js
Start the Server:
node index.js
Server will start on http://localhost:5000

Pitch Deck: PDF file

Usage
Register: New users can register and create an account.
Login: Registered users can log in to access the dashboard.
Dashboard: Users can submit new reports and view existing reports.
Report Visualization: The dashboard provides visual representation for the number of reports based on their status.

License
This project is licensed under the MIT License - see the LICENSE file for details.
