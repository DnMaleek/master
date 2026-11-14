const express = require ('express')
const app = express()
const path = require('path')
const cors = require('cors')
const {logger} = require("./middleware/LogEvents")
const errorHandler = require("./middleware/errorHandler")
const PORT = process.env.PORT || 3500

app.use(logger);

const whitelist = ['https://www.yrsite.com']

const corsOptions = {
    origin: (origin,callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null,true)
        } else {
            callback(new Error('Not allowed by cors'))
        }
    }, 
    optionsSuccessStatus:200 
}

app.use(cors(corsOptions));

app.use(express.urlencoded({extended:false}))

app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))

app.get('/',(req,res) =>{
    res.send('hellow world')
})

app.use(errorHandler)

app.listen(PORT, () =>{
    console.log(`server running at http://localhost:3500`)
})