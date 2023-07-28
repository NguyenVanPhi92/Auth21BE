const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const route = express.Router()

const corsOptions = {
    origin: true,
    credentials: true
}

app.use(cors(corsOptions))

require('dotenv').config()

// db
mongoose.connect(
    process.env.MONGO_URL,
    {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (err) throw err
        console.log('db connected')

        const PORT = 8000
        app.listen(PORT, () => {
            console.log('server is active')
        })
    }
)

// mw
app.use(express.json()) // parser form => express
express.urlencoded({ extended: true })
app.use(cookieParser()) // parser cookies
// public thư mục uploads
app.use('/uploads', express.static('uploads'))

// routes
app.use(
    route.get('/', (req, res) => {
        res.send('server running')
    })
)
app.use(userRoutes)
app.use(uploadRoutes)

module.exports = app
