db.createCollection("users", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["password", "email", "phoneNumber", "gender"],
            properties: {
                username: {
                    bsonType: "string",
                    uniqueItems: true,
                },
                password: {
                    bsonType: "string",
                },
                email: {
                    bsonType: "string",
                    uniqueItems: true,
                    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
                },
                contact: {
                    bsonType: "string",
                },
                phoneNumber: {
                    bsonType: "string",
                    uniqueItems: true,
                },
                gender: {
                    bsonType: "string",
                    enum: ["male", "female"],
                },
                is_admin: {
                    bsonType: "bool"
                },
                is_staff: {
                    bsonType: "bool"
                },
                createdAt: {
                    bsonType: "date",
                },
            },
        },
    },
});


db.createCollection("products", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "description", "price", "quantity"],
            properties: {
                name: {
                    bsonType: "string",
                },
                description: {
                    bsonType: "string",
                },
                price: {
                    bsonType: "number",
                },
                quantity: {
                    bsonType: "int",
                },
                available: {
                    bsonType: "bool"
                },
                size: {
                    bsonType: "string",
                    enum: ["small", "medium", "large"],
                },
                categories: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        properties: {
                            name: {
                                bsonType: "string",
                            },
                        },
                    },
                },
            },
        },
    },
});


db.createCollection("orders", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["userId", "approval", "orderItems", "total"],
            properties: {
                userId: {
                    bsonType: "objectId",
                },
                approval: {
                    bsonType: "bool"
                },
                orderItems: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        properties: {
                            productId: {
                                bsonType: "objectId"
                            },
                            quantity: {
                                bsonType: "int",
                            },
                            unitPrice: {
                                bsonType: "number",
                            },
                        },
                    },
                },
                total: {
                    bsonType: "number",
                },
            },
        },
    },
});



db.users.insertOne({
    username: "KennyDavid",
    email: "mygmail@gmail.com",
    password: "mypassword",
    contact: "Altschool Close 5",
    gender: "male",
    phoneNumber: "0703864XXXX",
    is_admin: false,
    is_staff: false
});

db.products.insertOne({
    name: "Samsung Galaxy A32",
    description: "Some good phone",
    price: 189.99,
    quantity: 12,
    available: true,
    size: "medium",
    category: [{ name: "Electronics" }, { name: "Mobile Phones" }, { name: "Samsung Devices" }],
    available: true
});



db.orders.insertOne({
    userId: ObjectId("64fbe0ca3e8356460de84a79"),
    approval: false,
    orderItems: [
        { productId: ObjectId("64fbe3fe9d9f0605762cec02"), quantity: 4, unitPrice: 125.45 },
        { productId: ObjectId("64fc49b841db2c9a7f38d030"), quantity: 2, unitPrice: 99.99 },
    ],
    total:430.00

});



db.users.find({})
db.product.find({})
db.orders.find({})
