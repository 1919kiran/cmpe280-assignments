const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');


var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));
app.use(express.static(path.join(__dirname, 'public')));

/******** GET ***********/
app.get('/users', (req, res) => {
  User.find().then((docs) => {
    res.send(docs);
  }, (err) => {
    res.send('Unable to fetch records');
  });
});

/********** POST ***********/
app.post('/users/userlist', (req, res) => {
  // console.log(req.body);
  var data = new User({
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    image: req.body.image,
    medics: req.body.medics,
    notes: req.body.notes
  });

  data.save((err, result) => {
    if (err) {
      return res.send({msg: err});
    }
    res.send({msg: ''});
  });
});



app.listen(port, () => {
  console.log(`Started the port at ${port}`);
});
