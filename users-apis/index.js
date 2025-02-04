import express from 'express';
import { router } from './routes/users.js';
import { logRequestResponse } from './middlewares/index.js';

const app = express();
const PORT = 8000

app.use(express.urlencoded({extended : false}));
app.use(logRequestResponse);

app.use('api/users', router);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));

