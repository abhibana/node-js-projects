import { Router } from 'express';
import express from 'express'
import path from 'path';
import multer from 'multer';
import fs from 'fs'
import { Blog } from '../models/blog.js'
import { Comment } from '../models/comment.js';

export const blogRouter = Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const dir =  `./public/uploads/${req.user._id}`;  
      fs.mkdirSync(dir, { recursive: true });  
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage });
blogRouter.use(express.static(path.resolve("./public")))

blogRouter.get("/add-new", (req, res) => {
    return res.render("addBlog", {
        user: req.user
    });
});

blogRouter.get("/:blogId", async (req, res) => {
    const blog = await Blog.findById(req.params.blogId).populate("createdBy");
    const comments = await Comment.find({blogId: req.params.blogId}).populate("createdBy");
    return res.render("blog", {
        user: req.user,
        blog: blog,
        comments: comments
    });
});

blogRouter.post("/", upload.single("coverImage"), async (req, res) => {
    const { title, content } = req.body;
    const blog = await Blog.create({
        title: title.trim(),
        content: content.trim(), 
        createdBy: req.user._id,
        coverImageURL: `${req.file.path.split("public/")[1]}`
    });
    return res.redirect(`/blog/${blog._id}`);
});

blogRouter.post("/comment/:blogId", async (req, res) => {
    const commnet = await Comment.create({
        content: req.body.comment.trim(), 
        blogId: req.params.blogId, 
        createdBy: req.user._id
    });

    return res.redirect(`/blog/${req.params.blogId}`);
});