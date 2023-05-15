import express from 'express';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import config from './config.js';
import userRoutes from './routes/User.js';
import publicationRoutes from './routes/Publication.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/image", express.static("image"));



app.use('/user',userRoutes);
app.use('/publication',publicationRoutes);

let imageName = "";
const storage = multer.diskStorage({
  destination: path.join("./image"),
  filename: function (req, file, cb) {
    imageName = Date.now() + path.extname(file.originalname);
    cb(null, imageName);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 3000000 },
}).single("myImage");

app.listen(config.port,()=>{
    console.log(`Port listening on ${config.port}`);
})