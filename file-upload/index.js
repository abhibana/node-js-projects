import express from 'express'
import path from 'path'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
})
  
const upload = multer({ storage: storage })
const app = express()
const PORT = 8000

app.set('view engine', "ejs")
app.set('views', path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    return res.render("homepage")
})

app.post('/upload', upload.single('profileImage'), (req, res) => {

    return res.redirect("/")
})

app.listen(PORT, () => console.log(`Server started at PORT : ${PORT}`))