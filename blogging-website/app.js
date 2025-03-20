import express from 'express';
import path from 'path';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import { userRouter } from './routes/user.js';
import { blogRouter } from './routes/blog.js';
import { connectToMongoDB } from './database_connection.js'
import { checkForAuthenticationCookie } from './middlewares/authentication.js';
import { Blog } from './models/blog.js';

dotenv.config();
const app = express();

connectToMongoDB(process.env.MONGO_DB_URL).then(() => console.log("Successfully connected to Mongo DB"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")))

app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({}).sort({ cratedAt : -1 });
    return res.render("home", {
        user: req.user,
        blogs: allBlogs
    });
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);


app.listen(process.env.PORT, () => console.log(`Server started at PORT: ${process.env.PORT}`));