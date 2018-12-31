const express = require('express')
const app = express()

//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))

//routes
app.get('/', (req, res) => {
	res.render('index')
})

let http_port = 4200;
server = app.listen(http_port)
console.log('Client running on *:' + http_port);
