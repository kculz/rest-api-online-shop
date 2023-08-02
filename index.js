const express = require('express');
const {default: mongoose}  = require('mongoose');
const cors = require('cors');

const productRouter = require('./routes/products')


const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log(`DB Connected`))
    .catch((e)=> console.log(`DB Connection error!\n ${e}`));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors);

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api/products', productRouter);
app.listen(port, () => console.log(`server running on http://localhost:${port}`));