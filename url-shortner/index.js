import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import { router as urlRouter} from './routers/url.js';
import { router as staticRouter } from './routers/staticRouter.js'
import { router as userRouter } from './routers/user.js';
import { checkForAuthentication, restrictTo } from './middlewares/auth.js';
import { connectToMongoDB } from './connect.js';

const app = express();
const PORT = 8000;

dotenv.config();

connectToMongoDB(process.env.MONGO_DB_URL).then(() => console.log("Successfully connected to Mongo DB"));

app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))
app.use(checkForAuthentication);

app.use('/', staticRouter)
app.use('/url', restrictTo(["NORMAL", 'ADMIN']), urlRouter);
app.use('/user', userRouter);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));