let express = require('express');
let app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.listen(3000);
console.log("Running at Port 3000");