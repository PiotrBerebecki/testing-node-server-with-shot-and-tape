const router = (req, res) => {

  if (req.url === '/' && req.method === 'GET') {

    res.writeHead(200, {'content-type': 'text/html'});
    res.end('Hello');

  } else if (req.url === '/blog' && req.method === 'GET') {

    res.writeHead(200, {'content-type': 'application/json'});
    res.end(JSON.stringify({users: ['a', 'b', 'c']}));

  } else if (req.url === '/blog' && req.method === 'POST' && req.headers.password && req.headers.password === 'potato') {

    let data = '';

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      res.writeHead(200, {'content-type': 'text/html'});
      res.end(JSON.stringify({users: JSON.parse(data)}));
    });

  } else if (req.url === '/blog' && req.method === 'POST' && req.headers.password) {

    let data;

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      if (!data) {
        res.writeHead(302, {'Location': '/blog'});
      }
      res.end();
    });

  } else if (req.url === '/blog' && req.method === 'POST') {

    res.writeHead(403, {'content-type': 'text/html'});
    res.end('Forbidden');

  } else {

    res.writeHead(404, {'content-type': 'text/html'});
    res.end('unknown uri');

  }

};


module.exports = router;
