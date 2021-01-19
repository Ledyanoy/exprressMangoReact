const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const mongoURL = 'mongodb+srv://admin:stars44@cluster0.7yid0.mongodb.net/awesomeapp?retryWrites=true&w=majority'
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

const carSchema = mongoose.Schema({
    brand: String,
    model: String,
    year: Number,
    available: Boolean
})

const Car = mongoose.model('Car', carSchema)

app.post('/api/addcar', (req, res) => {
    const addCar = new Car(req.body)
    addCar.save((err, doc) => {
        if (err) console.log(err);
        res.status(200).json(doc)

    })
})

app.get('/api/getcar', (req, res) => {
    Car.find((err, doc) => {
        if (err) console.log(err);
        res.status(200).json(doc)
    })
})

app.get('/api/getFord', (req, res) => {
    Car.find({brand: 'ford'}, (err, doc) => {
        if (err) console.log(err);
        res.status(200).json(doc)
    })
})

app.post('/api/removeCar', (req, res) => {
    const brand = req.body.brand
    Car.findOneAndRemove({brand: brand}, (err, doc) => {
        if (err) console.log(err);
        res.json(doc)
    })
})

app.post('/api/updatecar', (req, res) => {
    const id = req.body.id
    const brand = req.body.brand
    Car.findByIdAndUpdate(id, { $set:{brand: brand} }, {new: false},(err, doc) => {
            if (err) console.log(err);
            console.log(doc)
            res.json(doc)
        }
    )
})


const port = process.env.PORT || 3001
app.listen(port)


