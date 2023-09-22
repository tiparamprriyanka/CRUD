const express=require('express')
const app=express()

// in addressbar type localhost:3000/profile/123
app.get('profile/id',(req,res)=>{
    res.send('profile id is' +req.params.id)
    })
    app.listen(3000,()=>console.log('server started...'))