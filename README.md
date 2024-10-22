
#  FantasyFlick

Join the fun of fantasy sports by picking your favorite players and earning points based on your selected. It’s easy: just select your team, and watch the excitement unfold with every match! Can you flick your way to the top? Get started today!

## Approach

First, I identified the key features of the game, including team building, player selection, scoring system, and user interface. I started by building the backend, defining the models based on the nature of players and teams, and establishing the necessary routes and controllers. Next, I tested the backend using Postman to ensure everything worked correctly, addressing any edge cases, such as handling missing parameters. While working on the backend, I also developed a simple yet intuitive frontend interface. Once I felt the frontend and backend were complete, I connected them together and tested the entire application to ensure it functioned seamlessly.

## Challenges faced

One of the major challenges I faced was passing team data between components. If not managed properly, this could lead to prop drilling, and in the worst-case scenarios, it might even break the application. To avoid this issue, I utilized the Context API, which allowed me to access form states globally and effectively manage data and submission states throughout the app. 

## Installation


1. Clone the repository:
   ```bash
   git clone https://github.com/Vidhi-Mathur/FantasyFlick.git
    ```
2. Navigate to project repository:
    ```bash
   cd PuraniDilli
    ```
### Backend Setup

1. Navigate to the backend directory: 
    ```bash
   cd backend
    ```
2. Install backend dependencies:
    ```bash
   npm install
    ```
3.  Set up the backend environment variables by creating a .env file in the root directory:
    ```bash
    MONGODB_URI=<your-mongodb-uri>
    ```
4. Start the backend server
    ```bash
   nodemon app.js
    ```
### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
   cd frontend
    ```
2. Install frontend dependencies: 
   ```bash
   npm install
    ```
3. Set up the frontend environment variables by creating a .env file in the root directory:
    ```bash
    VITE_API_BASE_URL=http://localhost:5173
    ```    
4. Start the frontend server
    ```bash
   npm start
    ```

## Usage

Once the server and frontend are running:

- Visit http://localhost:5173 to view the FantasyFlick application.
- Make sure server runs on http://localhost:3000 at the same time.
