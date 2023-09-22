const express=require('express')
const app=express()
const mongoose=require('mongoose')
const connectDB=async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/students')
        console.log('connect')
    }catch(err){
        console.log('error',err)
    }
}
connectDB()

const newSchema=new mongoose.Schema({
    name:String,
    place:String,
    age:Number
})
const User=mongoose.model('col1',newSchema)

const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({
    extends:false
}))
app.set('view engine', 'ejs')

app.get('/',(req,res)=>{
    res.render('insert')
})

app.post('/insert',function(req,res){
	var user=new User({
	name:req.body.name,
	place:req.body.place,
	age:req.body.age
	})
user.save()
//.then(()=>res.send('Data inserted...'))
.then(()=>res.redirect('/show'))
.catch(()=>console.log('some error'))
})

app.get('/show',(req,res)=>{
    User.find({})
    .then((result)=>res.render('show',{users:result}))
    .catch((err)=>console.log(err))
})

app.get('/delete/:id',async function(req,res){
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/show')
})

    
// app.get('/edit/:id',function(req,res){
//     User.findById(req.params.id,function(err,result){
//         res.render('edit',{users:result});
//     })
// })

app.get('/edit/:id',async function(req,res){
	const result=await User.findById(req.params.id)
		res.render('edit',{users:result});
	})
 
app.post('/update/:id',async function(req,res){
    await User.findByIdAndUpdate(req.params.id,req.body);
    res.redirect('/show')
    })
app.listen(3000,console.log("Server started..."))