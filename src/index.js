import './helpers/dotenv'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import pino from 'express-pino-logger'

import { notFound, errorHandler } from './helpers/errors'

const app = express()
const port = parseInt(process.env.PORT)

app.use(cors({ ORIGIN: process.env.ORIGIN }))
app.use(helmet())
app.use(pino())
app.use(express.json())

app.use('/', (req, res) => {
    res.json({ msg: 'Hello There', type: req.method })
})

// Error Handling
app.use(notFound)
app.use(errorHandler)

app.listen(port)
