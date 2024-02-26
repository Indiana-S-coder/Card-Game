const express = require("express")
const dotenv = require("dotenv")
dotenv.config();
const cors = require("cors")
const userRoute = require('./routes/userRoute')
const gameRoute = require('./routes/gameRoute')

const app = express();
app.use(express.json())
app.use(cors())

app.use('/api/user', userRoute)
app.use('/api/game', gameRoute)

const PORT = process.env.PORT || 8080;



app.listen(PORT, () => {
    console.log(`Server listening at port: ${PORT}`);
})