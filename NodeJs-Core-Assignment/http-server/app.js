import { createServer } from "http"

const hostname = 'localhost'
const port = 7000

const requestListener = function(req, res) {
    res.writeHead(200)
    res.write('Hello World!,\nWelcome to my first Node server')
    res.end()
}

//create server
const server = createServer(requestListener)
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})
