import { error } from "console";
import { readFileSync, readFile, writeFile } from "fs";
import { createServer } from "http";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const itemsDbPath = join(__dirname, "db", "items.json");
let itemsDB = [];

const HOSTNAME = "localhost";
const PORT = "3001";

function requestHandler(req, res) {
    res.setHeader("content-type", "application/json");

    if (req.url === "/items" && req.method === "GET") {
        getAllItems(req, res);
    } else if (req.url.startsWith('/items/') && req.method === "GET") {
        getOneItem(req, res);
    } else if (req.url === "/items/" && req.method === "POST") {
        createItem(req, res);
    } else if (req.url.startsWith('/items/') && req.method === "PATCH") {
        updateItem(req, res);
    } else if (req.url.startsWith('/items/') && req.method === "DELETE") {
        deleteItem(req, res);
    } else {
        res.writeHead(404);
        res.end(
            JSON.stringify({
                message: "Method Not Supported",
            })
        );
    }
}

let defaultMessage = "Internal Server Error"
const updateItemDB = function (errorMessage, resData, res) {
    if (errorMessage == undefined) {
        errorMessage = defaultMessage
    }
    if (resData == undefined) {
        resData = itemsDB
    }
    writeFile(itemsDbPath, JSON.stringify(itemsDB), (err) => {
        if (err) {
            res.writeHead(500);
            res.end(JSON.stringify({
                message: errorMessage
            }));
        }

        res.end(JSON.stringify(resData));
    });
}

const getData = function (req) {
    const body = []
    req.on('data', (chunk) => {
        body.push(chunk)
    })
    return body
}

function getAllItems(req, res) {
    res.end(JSON.stringify(itemsDB))
}

function getOneItem(req, res) {
    let itemId = req.url.split('/')[2]
    const itemIndex = itemsDB.findIndex((item) => {
        return item.Id === parseInt(itemId)
    })

    if (itemIndex === -1) {
        return response({ code: 404, error: `Item not found` })
    }

    const item = itemsDB[itemIndex]
    res.writeHead(200)
    res.end(JSON.stringify(item))
}

function createItem(req, res) {
    const body = getData(req)

    req.on('end', () => {

        const parsedBody = Buffer.concat(body).toString()
        const newItem = JSON.parse(parsedBody)

        const lastItem = itemsDB[itemsDB.length - 1]
        const lastItemId = lastItem.id
        newItem.id = lastItemId + 1;

        //save to db
        itemsDB.push(newItem);
        updateItemDB(undefined, newItem, res)
    })
}

function updateItem(req, res) {
    let itemId = req.url.split('/')[3]
    const body = getData(req)

    req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString()
        const itemToUpdate = JSON.parse(parsedBody)
        console.log(itemToUpdate)
        // find the item in the database
        const itemIndex = itemsDB.findIndex((item) => {
            return item.id === itemId;
        });

        // Return 404 if item not found
        if (itemIndex === -1) {
            res.writeHead(404);
            res.end(JSON.stringify({
                message: 'Item not found'
            }));
            return;
        }

        // update the item in the database
        itemsDB[itemIndex] = { ...itemsDB[itemIndex], ...itemToUpdate };

        // save to db
        updateItemDB(undefined, itemToUpdate, res)
    });

}

function deleteItem(req, res) {
    const body = getData(req)

    req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString()
        const itemToDelete = JSON.parse(parsedBody)

        if (itemToDelete.id) {
            const itemId = itemToDelete.id
            console.log(itemId)
            // find the item in the database
            const itemIndex = itemsDB.findIndex((item) => {
                return item.id === itemId;
            });
            if (itemIndex === -1) {
                res.writeHead(404)
                res.end(JSON.stringify({ message: "resource not found" }))
                return
            }
            itemsDB.splice(itemIndex, 1)
            updateItemDB(undefined, "item deleted", res)
            res.end(JSON.stringify({ message: "item deleted succesfully" }))



        } else {
            res.writeHead(400)
            res.end(JSON.stringify({ message: "id of item to be deleted is not provided" }))
        }

    })

}


const server = createServer(requestHandler);

server.listen(PORT, HOSTNAME, () => {
    itemsDB = JSON.parse(readFileSync(itemsDbPath, "utf-8"));
    console.log(`server is running at port ${PORT}`);
});
