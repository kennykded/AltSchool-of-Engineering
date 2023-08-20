const express = require('express')
const bodyParser = require('body-parser');

const port = 3000
const app = express()



app.use(express.static('public'))
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.status(404).send("<h1>Resource Not Found</h1>")  })

app.listen(port, () => {
    console.log(`server is running at port ${port}`)
})
