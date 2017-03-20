const test = require('tape');
const shot = require('shot'); // eslint-disable-line no-unused-vars

const router = require('./router');


test('Initialise', (t) => {
  let num = 2;
  t.equal(num, 2, 'Checking if test env is working');
  t.end();
});


test('Home route', (t) => {
  shot.inject(router, { method: 'get', url: '/' }, (res) => {
    t.equal(res.statusCode, 200, 'Should return 200');
    t.equal(res.payload, 'Hello', 'Should return payload');
    t.end();
  });
});

test('Blog route', (t) => {
  shot.inject(router, { method: 'get', url: '/blog' }, (res) => {
    t.equal(res.statusCode, 200, 'Should return 200');
    t.deepEqual(JSON.parse(res.payload), {users: ['a', 'b', 'c']}, 'Should return payload');
    t.end();
  });
});


test('Unknown route', (t) => {
  shot.inject(router, { method: 'get', url: '/elephants' }, (res) => {
    t.equal(res.statusCode, 404, 'Should return 404');
    t.equal(res.payload, 'unknown uri', 'Should return payload');
    t.end();
  });
});


test('Blog route - post - password - payload', (t) => {
  shot.inject(router, { method: 'post', url: '/blog', headers: {password: 'potato'}, payload: ['a', 'b'] }, (res) => {
    t.equal(res.statusCode, 200, 'Should return 200');
    t.deepEqual(JSON.parse(res.payload), {users: ['a', 'b']}, 'Should return payload');
    t.end();
  });
});


test('Blog route - post - password - no payload', (t) => {
  shot.inject(router, { method: 'post', url: '/blog', headers: {password: 'noData'}}, (res) => {
    t.equal(res.statusCode, 302, 'Should return 302');
    t.equal(res.headers.Location, '/blog', 'Header should include Location /blog');
    t.end();
  });
});


test('Blog route tests - post - no password header', (t) => {
  shot.inject(router, { method: 'post', url: '/blog' }, (res) => {
    t.equal(res.statusCode, 403, 'Should return 403');
    t.equal(res.payload, 'Forbidden');
    t.end();
  });
});
