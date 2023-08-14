// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');
// const mongoose = require('mongoose');
// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

// // Set up database connection (using Mongoose)
// mongoose.connect('mongodb://localhost/whiteboard', { useNewUrlParser: true, useUnifiedTopology: true });

// const WhiteboardItem = mongoose.model('WhiteboardItem', { content: String });

// io.on('connection', (socket) => {
//   console.log('A user connected');
  
//   // Handle Socket.IO events
//   socket.on('addItem', async (content) => {
//     const newItem = new WhiteboardItem({ content });
//     await newItem.save();
//     io.emit('itemAdded', newItem);
//   });
  
//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

// server.listen(5000, () => {
//   console.log('Server listening on port 5000');
// });
// Frontend (App.js):

// jsx
// Copy code
// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5000'); // Connect to the backend server

// function App() {
//   const [items, setItems] = useState([]);
//   const [newItemContent, setNewItemContent] = useState('');

//   useEffect(() => {
//     // Listen for events from the server
//     socket.on('itemAdded', (newItem) => {
//       setItems([...items, newItem]);
//     });
//   }, [items]);

//   const addItem = () => {
//     socket.emit('addItem', newItemContent); // Emit an event to the server
//     setNewItemContent('');
//   };

//   return (
//     <div>
//       <h1>Collaborative Whiteboard</h1>
//       <div>
//         <input type="text" value={newItemContent} onChange={(e) => setNewItemContent(e.target.value)} />
//         <button onClick={addItem}>Add Item</button>
//       </div>
//       <ul>
//         {items.map((item, index) => (
//           <li key={index}>{item.content}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
// Please note that this is a basic example and may need adjustments based on your specific use case, error handling, and security considerations. Additionally, remember to configure your MongoDB database properly and handle user authentication if required.




// User
// I use nextjs with app route 
// ChatGPT
// Certainly! If you're using Next.js and you want to create a real-time collaborative whiteboard app with Socket.IO and MongoDB for data storage, you'll need to structure your application as follows:

// Setting up the Backend:

// Create an API route in Next.js that handles Socket.IO integration and communication with the database.

// Install the required packages for the backend using npm or yarn:

// bash
// Copy code
// npm install express socket.io mongoose
// Set up the backend server using Express and Socket.IO as shown in the previous examples.

// Configure Socket.IO to work with Next.js by attaching it to the Express server.

// Implement the Socket.IO event handling and integration with the MongoDB database.

// Setting up the Frontend:

// In your Next.js project, create a new page component that will serve as your collaborative whiteboard app.

// Install the required package for the frontend using npm or yarn:

// bash
// Copy code
// npm install socket.io-client
// Initialize the Socket.IO connection within the page component.

// Implement the necessary UI components for drawing and interacting with the whiteboard.

// Emit and listen to events using Socket.IO to handle real-time collaboration.

// Sample Code:

// Here's a simplified example of how you might structure your Next.js app for a collaborative whiteboard:

// Backend (pages/api/socket.js):

// javascript
// Copy code
// import { Server } from "socket.io";
// import { NextApiRequest, NextApiResponse } from "next";
// import { connectDB, WhiteboardItem } from "../../utils/db"; // Implement your database connection and model

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const io = new Server();

//   io.on("connection", (socket) => {
//     console.log("A user connected");

//     socket.on("addItem", async (content) => {
//       await connectDB(); // Connect to MongoDB
//       const newItem = new WhiteboardItem({ content });
//       await newItem.save();
//       io.emit("itemAdded", newItem);
//     });

//     socket.on("disconnect", () => {
//       console.log("A user disconnected");
//     });
//   });

//   return res.status(200).end();
// }
// Frontend (pages/whiteboard.js):

// jsx
// Copy code
// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";

// const socket = io(); // Connect to the current host

// export default function Whiteboard() {
//   const [items, setItems] = useState([]);
//   const [newItemContent, setNewItemContent] = useState("");

//   useEffect(() => {
//     socket.on("itemAdded", (newItem) => {
//       setItems([...items, newItem]);
//     });
//   }, [items]);

//   const addItem = () => {
//     socket.emit("addItem", newItemContent);
//     setNewItemContent("");
//   };

//   return (
//     <div>
//       <h1>Collaborative Whiteboard</h1>
//       <div>
//         <input
//           type="text"
//           value={newItemContent}
//           onChange={(e) => setNewItemContent(e.target.value)}
//         />
//         <button onClick={addItem}>Add Item</button>
//       </div>
//       <ul>
//         {items.map((item, index) => (
//           <li key={index}>{item.content}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
