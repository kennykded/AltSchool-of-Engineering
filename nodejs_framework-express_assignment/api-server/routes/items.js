const express = require('express')
const Joi = require('joi')
const fs = require('fs')
const path = require('path')

const itemsDbPath = path.join(__dirname, "..", "db", "items.json")

const itemRouter = express.Router()

const itemsDB = JSON.parse(fs.readFileSync(itemsDbPath, "utf-8"))

const itemSchema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    price: Joi.number().precision(2).required(),
    quantity: Joi.number().integer().required(),
    size: Joi.string().valid('S', 'M', 'L').required()
})

const updateItemDB = function () {
    fs.writeFile(itemsDbPath, JSON.stringify(itemsDB), (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
}

itemRouter.get('/', (req, res) => {
    res.json(itemsDB)
})

itemRouter.get('/:id([0-9]+)', (req, res) => {
    const id = req.params.id
    const itemIndex = itemsDB.findIndex((item) => {
        return item.id == id
    })
    if (itemIndex === -1) {
        res.status(404).send('Item with given id is not found on the server')
    }else{
        const item = itemsDB[itemIndex]
        res.status(200).send(item)
    }
})

itemRouter.post('/', (req, res) => {
    const { error, value } = itemSchema.validate(req.body)

    if (error) {
        res.status(400).send(error.details);
    } else {
        const newItem = value
        const lastItem = itemsDB[itemsDB.length - 1]
        const lastItemId = lastItem.id
        newItem.id = lastItemId + 1;

        //save to db
        itemsDB.push(newItem);
        updateItemDB()
        res.status(201).send(newItem);
    }

})

itemRouter.put('/:id([0-9]+)', (req, res) => {
    const id = req.params.id
    const itemIndex = itemsDB.findIndex((item) => {
        return item.id == id
    })
    if (itemIndex === -1) {
        res.status(404).send('Item with given id is not found on the server')
    } else {
        const { error, value } = itemSchema.validate(req.body)

        if (error) {
            res.status(400).send(error)
        } else {
            // update the item in the database
            itemsDB[itemIndex] = { ...itemsDB[itemIndex], ...value }
            updateItemDB()
            res.send(value)
        }
    }
})

itemRouter.delete('/:id([0-9]+)', (req, res) => {
    const id = req.params.id
    const itemIndex = itemsDB.findIndex((item) => {
        return item.id == id
    })
    if (itemIndex === -1) {
        res.status(404).send('Item with given id is not found on the server')
    }else{
        itemsDB.splice(itemIndex,1)
        updateItemDB()
        res.status(200).send('item has been deleted succesfully')
    }

})

module.exports = itemRouter
