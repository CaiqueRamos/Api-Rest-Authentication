const app = require('express')()
const bodyParser = require("body-parser");

app.use(bodyParser.json()); //Faz o app entender json
app.use(bodyParser.urlencoded({ extended: true })); //Faz o app receber parametros pela url


app.get('/', function(req, res){
    res.send('Esta funcionando corretamente')
})

require("./app/controllers/authController")(app);
require("./app/controllers/projectController")(app);

app.listen(3003)