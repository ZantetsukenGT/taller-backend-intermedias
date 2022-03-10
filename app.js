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


//middlewares
app.use((req, res, next) =>
{
    req.mysqlOptions = {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB_NAME,
    }
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
