const express=require('express')
const app=express()
const mongoose=require("mongoose")
const Thing=require('./Models/thing')
const bodyParser=require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
mongoose.connect("mongodb+srv://anas:anas@cluster0.eo4ai.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",(err,done)=>{
if(err)
console.log(err)
if(done)
console.log("Connexion reussite a MongoDB Atlas.")
})

app.post('/ajouter_thing', async (req,res)=>{
    try {
        let new_thing =new Thing({
            title:req.body.title,
            description:req.body.description,
            imageUrl:req.body.imageUrl,
            userId:req.body.userId,
            price:req.body.price,
        })
        await new_thing.save()
        res.send("Sauvegardé avec succes")
        }
        catch(err){
            res.send(err)
        }
    })

app.get('/things',async (req,res)=>{
    try{
        await Thing.find({}).then(result=>{res.send(result)}) 
    }
    catch(err){
        res.send(err)
    }
})

app.delete('/delete/:id', async (req,res)=>{
    try{
        await Thing.findOneAndDelete({id:req.params.id})
        res.send('supprime avec succes')
    }
    catch(err){
        res.send(err)
    }
})

app.put('/maj/:id', async (req,res)=>{
    try{
        await Thing.findOneAndUpdate({id:req.params.id},{description:req.body.description})
        res.send('modifier avec succes !')
    }
    catch(err){
        res.send(err)
    }
})


const router=express.Router()
router.get('/irm',(req,res)=>{
    res.send('IRM');
})

app.use('/',router)

app.listen(3000,(req,res)=>{
    console.log("Serveur en marche");
})
