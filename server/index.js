import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

const port = 5000;

app.get('/api',(req,res)=>{
    res.json({success:true,msg:'Hello again my dear friend'})
})

app.listen(port,()=>{
    console.log(`Port listening on ${port}`);
})