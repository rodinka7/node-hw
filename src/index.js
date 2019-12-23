const http = require('http');
const { error } = require('./messages');
const showTime = require('./showTime');

const port = 8080;
const args = process.argv.slice(2);

const interval = +args[1];
const duration = +args[3];

if (!interval || !duration){
    console.log(error);
    return;    
}

const server = http.createServer((req, res) => {
    if (req.method !== 'GET' || req.url !== '/') return;
    showTime(interval, duration)
        .then(response => {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(response);
        })
});

server.listen(port, () => {
    console.log(`Server is running on ${port} port`);
});