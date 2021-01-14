const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const dbConfig = require('./db/database');
const mongoose = require('mongoose')


mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.uri, {
    useNewUrlParser: true
}).then(() => {
    console.log('Database connected')
},
error=> {
    console.log('Erreur de connexion')
})


const app = express()
const PORT = 9999;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

const noteRoute = require('./routes/note_route')
const userRoute = require('./routes/user_route')
app.use('/', userRoute, noteRoute)


app.listen(PORT, (req, res) => {
    console.log('Hello from Express')
});

app.use((err, req, res, next) => {
    console.error(err.message)
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message)
})