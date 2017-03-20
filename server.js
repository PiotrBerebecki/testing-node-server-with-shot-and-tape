const http = require('http');
const router = require('./router');

const hostname = process.env.HOSTNAME || 'locahost';
const port = process.env.PORT || 4000;

const server = http.createServer(router);

server.listen(port, () => {
  console.log(`listening on http://${hostname}:${port}`);
});
