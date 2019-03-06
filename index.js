var express = require('express')
var app = express()

app.use(require('express-naked-redirect')({
  reverse: true,
  status: 301
}))
app.use(express.static('public'))
app.set('view engine', 'pug')

app.get('/', function (req, res) {
  res.status(200);
  res.render('index');
})

app.listen(process.env.PORT, function () {
  console.log('App listening on port ' + process.env.PORT + '!')
})
