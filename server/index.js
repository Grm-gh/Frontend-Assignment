const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/Product');

const app = express();

app.use(cors({
  origin: "http://localhost:5174",  // or 3000 depending on your React port
  credentials: true
}));

app.use(express.json());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);

const PORT = process.env.PORT || 5000;
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Mongo connected');
  app.listen(PORT, () => console.log(`Server ${PORT}`));
}).catch(err => console.error(err));
console.log("server is running on port " +"http://localhost:"+PORT);