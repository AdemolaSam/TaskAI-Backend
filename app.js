import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import routeManager from "./src/routes/index.js"
import sequelize from "./src/config/db.js"
dotenv.config()
const port = process.env.PORT || 8030
const app = express()

sequelize
  .sync()
  .then(() => console.log('Database synced'))
  .catch((error) => console.log(error));

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/v1', routeManager)

app.listen(port, () => {
    console.log(`:::::::::::::::: SERVER LISTENING ON PORT: ${port} ::::::::`)
})