
const express = require('express');
const app = express();
const fs = require('fs')

app.use(express.static('public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/captcha.html');
});

app.get('/api/write', function(request, response) {
  var userid = request.query.userid;
  
  if (!userid) {
    return response.send("bad");
  } else {

    fs.writeFile("")
    response.send("good");

  }

});

app.get('/v', function(request, response) {
  response.sendFile(__dirname + '/views/verified.html');
});
  
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
