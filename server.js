const express=require('express')
const app=express()
const port=2000
const {Client}=require('pg')

const client=new Client({
  host:"localhost",
  user:"postgres",
  port:5432,
  password:"123456",
  database:"wasi"
})

client.connect()

// client.query('select * from userdetails',(error1,response)=>
// {
//     if(!error1)
//     {
//         console.log(response.rows);
//     }
// })

app.listen(port,()=>{
  console.log(`on ${port} is sucessfully running`)
})

app.use(express.json())

app.use(function(req, res, next) 
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST ,OPTIONS ,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
       res.sendStatus(200);
     }
     else {
       next();
}});

// app.get('/micheal',(req,res)=>
// {     
//     res.status(200).send('<h1>albin micheal</h1>')
// })

// app.get('/albin',(req,res)=>{
//   res.json({name:"albin",age:21,place:"ekm"})
// })

app.get('/getdata',(req,res)=>{
  client.query('select * from userdetails',(err,responsequery)=>
  {
      res.json(responsequery.rows)
  })
})


app.post('/vishnuajay',(req,res)=>{
  console.log(req.body)
  client.query(`insert into userdetails values
  ('${req.body.fullname}','${req.body.username}',
  '${req.body.password}','${req.body.phonenumber}',
  '${req.body.email}')`)
})
