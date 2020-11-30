import express from 'express';

const server = express();
server.use(express.static('build'));

server.listen(4242, () => console.log('Server is running...'));