const functions = require("firebase-functions")
const express = require('express')
const cors = require('cors')
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('./src/products')
const { createCustomer, getCustomerById } = require('./src/customers')
// const { getAllCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer } = require('./src/customers')

const app = express()
app.use(cors())

app.get('/products/:productId', getProductById)
app.patch('/products/:productId', updateProduct)
app.delete('/products/:productId', deleteProduct)
app.get('/products', getAllProducts)
app.post('/products', createProduct)

app.get('/customers/:customerId', getCustomerById)
// app.patch('/customers/:customerId', updateCustomer)
// app.delete('/customers/:customerId', deleteCustomer)
// app.get('/customers', getAllCustomers)
app.post('/customers', createCustomer)


 exports.app = functions.https.onRequest(app)