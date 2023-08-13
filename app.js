require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const cors = require('cors');
const ejs = require('ejs')
const path = require('path');
// const authUser = require('./middleware/authentication');

const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//routes path
const authRoute = require('./routes/auth');
const productRoute = require('./routes/products');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// extra packages
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }))
app.use(fileUpload({ useTempFiles: true }));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/uploads', express.static('./public/uploads'));

// routes
// app.use('/api/v1/products', authUser ,productRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/auth', authRoute);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3001;
const start = async () => {
  try {
    connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
