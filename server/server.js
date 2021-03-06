import http from 'http';
import app from './app';

const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(process.env.PORT || port, () => {
  console.log(`Server is listening on port ${port}`);
});
