
const express = require('express')
const app = express()
const cors = require('cors')

const port = process.env.PORT || 8080

app.use(express.json());
app.use(cors({
    "origin": '*',
    "methods": "GET,HEAD,POST,PATCH,DELETE",


}))
app.use(express.urlencoded({extended: true}))

const lighthouse = require('./src/routes/lighthouse')
app.use('/lighthouse', lighthouse)

// Start Server
server = app.listen(port, () => {
    console.log(`Server is power ⚡ on localhost:${port}`)
   
})
