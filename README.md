# mern-render-tutorial
walkthrough on how to create and deploy a new app with minimal code

## Backend
- Will contain everything pertining to the application's backend

### Initialize the app
- Creates a package.json for the application
- Enter `source ~/.bash_profile` in terminal so that `npm init` works
- Enter `npm init` while in root of folder
    - Default everything
    - Enter `server.js` as the entry point

### Install Dependencies
#### Dependencies
- Third party software / libraries that help build out our application
- Often written by other developers
- These libraries offer solutions to common problems
- Enter `npm i bcryptjs colors concurrently dotenv express express-async-handler jsonwebtoken mongodb mongoose`

#### Dev Dependencies
- Dependencies specifically for developers
- Are not necessary but act as useful tools during stages of development
- Are not important to consumer
- In root folder of application, enter command in terminal `npm i -D nodemon`
    - Tool that constantly watches `server.js`
    - Restarts and refreshes after changes have been made
    - Would other wise have to go into the terminal and manually restart the server

### Add Scripts
- Add scripts to the `package.json` in root directory

```js
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node backend/server.js",
    "server": "nodemon backend/server.js",
    "client": "npm start --prefix frontend",
    "clientinstall": "npm install --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "render-postbuild": "npm install --prefix frontend && npm run build --prefix frontend"
  },
```

### Create Server Boilerplate
- Create a file named `server.js` within in the `backend` folder
- See `server.js`

### Create Environment Variables
- Create a file called `.env` in the root directory

```js
// NODE_ENV = development
NODE_ENV = production
MONGODB_URI = db url will go here
JWT_SECRET = jsonwebtokensecret
```

### Test Server
- Type `npm run server` in your terminal
- Check to see if the connection is successful in your terminal
- Visit the api in your browser `http://localhost:5000/hello`

## Frontend
- Start by entering the command `npx create-react-app frontend --template redux` in your terminal

### Create a proxy
- Head to the package.json located in your `frontend` folder
- Add the proxy to the backend, should have the correct backend localhost port

```js
{
  "name": "frontend",
  "version": "0.1.0",
  "proxy": "http://localhost:5000",
```

### Check to see if backend is connected
- While in the terminal, change directories to `frontend`
- While in the `frontend` directory, install the axios package with the command `npm i axios`

#### Make a call to the Backend API
- You can choose to delete the bulk of the content in your `App.js`
- Make an call to you backend API using axios and display the message

```js
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    contactAPI()
  }, [])

  const contactAPI = async () => {
    const response =  await axios.get('/hello')
    setMessage(response.data.message)
  }

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}

export default App;
```

## Test to see of Frontend is connected to the Backend
- In the root of your application, run the command `npm run dev`
- If the message from your backend is displayed, that means there is a successful connection

## Deploy to Render