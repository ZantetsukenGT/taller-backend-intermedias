//imports
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

//.env
require('dotenv').config()

//core
const hostname = process.env.APP_HOST
const port = process.env.APP_PORT
const app = express()
const productos = [] //simulando la base de datos mysql

//middlewares
app.use((req, res, next) =>
{
    req.productos = productos //simulando la base de datos mysql
    next()
})
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
    cors({
        origin: process.env.ALLOW_ORIGIN,
        credentials: true,
    }),
)

//routes
const UserCRUDRoutes = require('./endpoints/UserCRUD')

app.use('/', UserCRUDRoutes)


//serve
app.listen(port, hostname, () =>
{
    if (port === 80)
        console.log(`Server running at http://${hostname}/`)
    else
        console.log(`Server running at http://${hostname}:${port}/`)
})
