const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv/config');
const databaseConnection = require('./database/databaseConnection');
const userRoute = require('./routes/userRoute');
const messageRoute = require('./routes/messageRoute');
const errorMiddleware = require('./middleware/errorMiddleware');
const {onlineUsers,setIO}=require('./shared/socketStore')

databaseConnection();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'https://whatsapp1-h0do.onrender.com'
    },
});

// Shared object for storing online users
setIO(io)

io.on('connection', (socket) => {
    console.log("Socket Connected");
    const userId = socket.handshake.query.userId;
    console.log("Connected User ID:", userId);

    if (userId) {
        onlineUsers[userId] = socket.id;
    }
    console.log(userId)
    console.log(onlineUsers)
    io.emit('getOnlineUsers', Object.keys(onlineUsers));

    socket.on('disconnect', () => {
        delete onlineUsers[userId];
        io.emit('getOnlineUsers', Object.keys(onlineUsers));
    });
});

// Middlewares
app.use(express.json({ limit: '20mb' }));
app.use(cors({
    origin: 'https://whatsapp1-h0do.onrender.com',
    credentials: true,
}));
app.use(cookieParser());

// Routes
app.use('/api/v1', userRoute);
app.use('/api/v1', messageRoute);

// Error middleware
app.use(errorMiddleware);

// Exports
module.exports=onlineUsers
// Start server
const port = process.env.PORT || 7000;
server.listen(port, () => {
    console.log("Server running on port " + port);
});

