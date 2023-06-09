import express from 'express';
import cors from 'cors';
import path from 'path'
import config from './config.js';
import tagRoutes from './routes/Tag.js';
import userRoutes from './routes/User.js';
import publicationRoutes from './routes/Publication.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve('./server/image'))); //Con resolve accedo a la raiz root y ahi paso a server / image
//Al utilizar recursos estaticos puedo acceder a las imagenes desde React usando el src localhost:5000/'nombreImagen'.

app.use('/tag',tagRoutes);
app.use('/user',userRoutes);
app.use('/publication',publicationRoutes);

//Prueba deploy en Render
app.get('/home',(req,res)=>{
    res.send('Trying server on Render');
})
app.listen(config.port,()=>{
    console.log(`Port listening on ${config.port}`);
})