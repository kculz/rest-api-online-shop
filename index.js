const express = require('express')
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const productsRouter = require('./routes/products')

const app = express()
const port = 3000

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log(`DB Connected`)
    })
    .catch((e)=> {
        console.log(`Error!\n${e}`)
    })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/v1/products', productsRouter)
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))