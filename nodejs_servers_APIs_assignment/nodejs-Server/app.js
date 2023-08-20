import { createServer } from 'http'
import { readFileSync } from 'fs'

const port = 3001
const hostname = 'localhost'

const requestHandler = function(req, res){
    res.setHeader("content-type", 'text/html')
    if (req.url === '/') {
        home(req, res)
    } else if (req.url.endsWith('.html') && req.method === 'GET') {
        otherPages(req, res)
    }
}

function home(req, res) {
    const file = readFileSync('./index.html')
    res.writeHead(200)
    res.write(file)
    res.end()
}

function otherPages(req, res) {
    try {
        const splitUrl = req.url.split('/')
        const filename = splitUrl[1]
        const fileLocation = `./${filename}`

        const file = readFileSync(fileLocation)
        res.writeHead(200)
        res.write(file)
        res.end()
    } catch (error) {
        const file = readFileSync('./404.html')
        res.writeHead(500)
        res.write(file)
        res.end()
    }
}

const server = createServer(requestHandler)

server.listen(port, hostname, () => {
    console.log(`Server running on port http://${hostname}:${port}`)
})
