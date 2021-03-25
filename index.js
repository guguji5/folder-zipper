const http = require('http')
const { getTemplate } = require('./template')

console.log(getTemplate)

const server = http.createServer((req, res) => {
  if(req.url !== '/') return res.end()

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
  

  res.end(getTemplate());
});

server.listen('8000', function(){
  console.log('Listening 8000')
})
