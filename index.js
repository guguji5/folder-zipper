const http = require('http')
const fs = require('fs');
const { getTemplate } = require('./template')
const { download } = require('./download')
const nStatic = require('node-static');
var fileServer = new nStatic.Server('./public');

const server = http.createServer((req, res) => {
  
  if(req.url === '/favicon.ico') return res.end()
  if(req.url === '/'){
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    return res.end(getTemplate());
  }
  if(req.url.startsWith('/download')){
    const origin = req.headers.host.split(':')[0]
    const projects = req.url.slice(10)
    const projectArr = projects && projects.split(',')
    const nowtime = new Date();
    const month = nowtime.getMonth()+1
    const date = nowtime.getDate()
    const hour = nowtime.getHours()
    const minute = nowtime.getMinutes()
    const second = nowtime.getSeconds()
    const timeStamp=`${month}-${date}-${hour}-${minute}-${second}`
    download(projectArr, timeStamp, function(){
      res.writeHead(302,{
        'Location': `http://${origin}:5000/pub${timeStamp}.zip`
      })
      res.end('下载中……');
    })
    // res.end('123455')
  }
});

server.listen('8000', function(){
  console.log('Listening 8000')
})

// serve the generated zip 
http.createServer(function (req, res) {
  req.addListener('end', function () {
    fileServer.serve(req, res);
  }).resume();
}).listen(5000);