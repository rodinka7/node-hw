const http = require('http');
const { interval, duration, error } = require('./messages');
const showTime = require('./showTime');

const port = 8080;

process.stdin.setEncoding('utf8');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/'){
        process
            .stdout
            .write(!process.env.INTERVAL ? interval : duration);
        
        process.stdin.on('data', data => {
            data = +data;
            
            if (!data) {
                console.log(error);
                return;
            }

            if (!process.env.INTERVAL) {
                process.env.INTERVAL = data;
                process
                    .stdout
                    .write(duration);  
            } else {
                process.env.DURATION = data;                
                showTime(process.env);
            }
        });
    }
    
    res.setHeader('Content-Type', 'text/html');
    res.end('Node Application');
});

server.on('close', () => {
    console.log('BYE!');
});

server.listen(port, () => {
    console.log(`Server is running on ${port} port`);
});