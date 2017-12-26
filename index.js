const express = require('express');
const app = express();
var port = process.env.PORT || 1337;

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render("index")
});

app.listen(port, () => {
  console.log('Example app listening on port ' + port)
});
