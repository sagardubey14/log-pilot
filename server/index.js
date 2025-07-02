const http = require('http');
const socketIO = require('socket.io');
const app = require('./src/app');
const socketService = require('./src/services/socketService');
const PORT = process.env.PORT || 3001;

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.ORIGIN || 'http://localhost:5173'
  },
});

socketService.init(io);

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log('\n\t**** Welcom to Log Pilot ****\n');
  console.log(`Server running at http://localhost:${PORT}`);
});
