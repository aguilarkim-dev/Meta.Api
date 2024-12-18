require('dotenv').config();
const express = require('express');
const routes = require('./routes/routes');
const { Server } = require("socket.io");
const http = require('http');
const path = require("path");
const configureApiKey = require('./configureApiKey');
const errorHandler = require('./errorHandler');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Your client's origin
        methods: ['GET', 'POST'],
    },
}
);

const PORT = process.env.PORT || 3000;

app.use(express.json());
// Add socket.io on request
app.use((req, res, next) => {
    req.io = io;
    next();
});
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use(configureApiKey);
app.use('/metaapi/forex', routes);

io.on('connection', (socket) => {
    const { id, handshake } = socket;
    const { headers } = handshake;
    console.log({ id, host: headers.host });
});

app.use(errorHandler);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});