var express = require('express'),
    morgan = require('morgan'),
    app = express()

app.use(require('express-naked-redirect')({
  reverse: true,
  status: 301
}))
app.use(morgan('combined'))
app.use(express.static('public'))
app.set('view engine', 'pug')

app.get('/', function (req, res) {
  var protocol = req.protocol
  if (req.headers['x-forwarded-proto']) {
    protocol = req.headers['x-forwarded-proto'];
  }

  res.status(200);
  res.render('index', {absPath: protocol + '://' + req.hostname + '/'});
})

app.get('/.well-known/webfinger', function (req, res) {
  if (req.query.resource !== 'acct:adam@acpr.dev') {
    res.status(404).send('404 Not Found')
    return
  }

  var me = {
    "subject":"acct:pieceofthepie@n8e.dev",
    "aliases":[
      "https://social.n8e.dev/@pieceofthepie",
      "https://social.n8e.dev/users/pieceofthepie"
    ],
    "links":[
      {
        "rel":"http://webfinger.net/rel/profile-page",
        "type":"text/html",
        "href":"https://social.n8e.dev/@pieceofthepie"
      },
      {
        "rel":"self",
        "type":"application/activity+json",
        "href":"https://social.n8e.dev/users/pieceofthepie"
      },
      {
        "rel":"http://ostatus.org/schema/1.0/subscribe",
        "template":"https://social.n8e.dev/authorize_interaction?uri={uri}"
      }
    ]
  }

  res.json(me)
})

app.listen(process.env.PORT, function () {
  console.log('App listening on port ' + process.env.PORT + '!')
})
