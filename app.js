const express = require('express'); 
const app = express();
const config = require('./config.json');

console.log('ISIS CMS STARTING');
const bodyParser = require('body-parser'); 
app.use(bodyParser.text({ type: 'text/html' }))

app.use(express.text())
app.set('view engine', 'ejs');

//Routes
const Main_Routes = require('./Routes/main_routes'); 


app.use('/', Main_Routes)
app.listen(config.app_port, () => {
    console.log("Serveur listening on http://localhost:"+config.app_port)
})