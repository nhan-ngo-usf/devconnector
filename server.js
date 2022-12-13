const express = require('express')
const connectDB = require('./config/db')

const app = express()

//Connect Database
connectDB()

//Init middleware
app.use(express.json({extented: false}))

app.get('', (req, res) => res.send('API is running'))
app.use('/api/user', require('./routes/api/user'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/profile', require('./routes/api/profile'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server is on  port ${PORT}`))