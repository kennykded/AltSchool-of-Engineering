const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const itemsRoute = require('./routes/items')

const PORT = 3000

app.use(express.static('public'))
app.use(bodyParser.json())

app.use('/items', itemsRoute)

app.listen(PORT, ()=>{
    console.log(`server is running at port:${PORT}`)
})
