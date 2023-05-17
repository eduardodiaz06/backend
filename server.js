import express from 'express'
//import router from '/.routes.index.js'
import { engine } from 'express-handlebars'

const server = express()

const PORT = 8080
const ready = () => console.log('server ready on port: ' + PORT)

server.engine('handlebars',engine)
server.use('public',express.static('public'))
server.use(express.json())
server.use(express.urlencoded({ extended:true}))
//server.use('/',router)

server.listen(PORT,ready)