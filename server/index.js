import express from 'express';
import cors from 'cors';
import config from './config.js';
import userRoutes from './routes/User.js'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user',userRoutes);

app.get('/api',(req,res)=>{
    res.json({success:true,msg:'Hello again my dear friend'})
})

app.listen(config.port,()=>{
    console.log(config);
    console.log(`Port listening on ${config.port}`);
})