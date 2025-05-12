const http = require('http'); //importing http module

//local host
const hostname = '127.0.0.1';
const port = 3000


//creating server
const server = http.createServer((req, res) => {
    //responses according to url - route
    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain')
        res.end("Hello welcome to this tea page")
    } else if (req.url === "/iced-tea") {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain')
        res.end("Here is your iced tea")
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain')
        res.end("404 Page Not Found!")
    }
})

server.listen(port, hostname, () => {
    console.log(`Server is listening at http://${hostname}:${port}`)
})

//writing for each route (/, /ice-tea... etc) is not feasible there can be many so we use a framwork