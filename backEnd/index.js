const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');  // <-- bu qatorda cors ni chaqir

const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const movieRoute = require('./routes/movies');
const listRoute = require('./routes/lists');

dotenv.config();

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log('DB Connection Successful'))
	.catch((err) => {
		console.error(err);
	});


app.use(cors({
  origin: true,
  credentials: true,
}));


app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/movies', movieRoute);
app.use('/api/lists', listRoute);

app.listen(8800, () => {
	console.log('BackEnd server is running');
});
