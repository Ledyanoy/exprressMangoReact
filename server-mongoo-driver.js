const express = require('express')
const app = express()
const {MongoClient} = require('mongodb')

const mongoURL ='mongodb+srv://admin:stars44@cluster0.7yid0.mongodb.net?retryWrites=true&w=majority'

const client = new MongoClient(mongoURL,  { useUnifiedTopology: true })


app.get('/api/users',  async (req, res, next)=> {
   try{
       await client.connect()
       const database = client.db('my-app')
       const collection = database.collection('users')
       const query = await collection.insertOne({
           name: 'Alexander',
           age: '33'
       })
       res.status(200).json({'bruh':'what!'})
       console.log("all is done")
   }
   catch (error) {
       throw error
   } finally {
       await client.close()
   }
})


// MongoClient.connect(mongoURL,  { useUnifiedTopology: true }, (err, client)=> {
//     if(err) {
//         throw err
//     }
//     console.log('we coonected to the mongo')
// })

const port  = process.env.PORT || 3001
app.listen(port)


