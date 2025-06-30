const express = require('express');
const { port } = require('./config');
const router = require('./src/routes/movieRoutes');
const cors = require('cors');
const connectDB = require('./src/service/db');

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

connectDB();

app.listen(port, err => {
	if (err) console.error(err);
	console.info(`Server running on port ${port}`);
});