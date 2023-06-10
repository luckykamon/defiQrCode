require('dotenv').config();

import express from 'express';
// const rootRouter = require("./routes/router");
import rootRouter from './routes/router';

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4011;

app.use(cors());
app.use(express.json());
app.use(cors());
app.use(rootRouter);


app.listen(PORT, () => {
    console.log(`Server has started and is listening on port ${PORT}.`);
});
