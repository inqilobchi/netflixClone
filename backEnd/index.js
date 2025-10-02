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

// CORS uchun allowed origins ro'yxati
const allowedOrigins = ['https://netflix-clone-sigma-seven-21.vercel.app'];

// CORS middleware ni sozlash
app.use(cors({
	origin: function(origin, callback) {
		// Postman yoki serverdan kelayotgan so'rovlar uchun origin bo'lmasligi mumkin
		if (!origin) return callback(null, true);
		if (allowedOrigins.indexOf(origin) === -1) {
			const msg = 'CORS policy: This origin is not allowed';
			return callback(new Error(msg), false);
		}
		return callback(null, true);
	},
	credentials: true, // agar cookie va authorization header ishlatsa
}));

app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/movies', movieRoute);
app.use('/api/lists', listRoute);

app.listen(8800, () => {
	console.log('BackEnd server is running');
});
