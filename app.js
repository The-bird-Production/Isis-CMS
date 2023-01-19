const express = require('express'); 
const app = express();
const config = require('./config.json');

console.log('ISIS CMS STARTING');
const bodyParser = require('body-parser'); 
const session = require('express-session')
app.use(bodyParser.text({ type: 'text/html' }))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.text())
app.set('view engine', 'ejs');

//Routes
const Main_Routes = require('./Routes/main_routes'); 
const User_Routes = require('./Routes/userRoutes')
const Admin_Routes = require('./Routes/AdminRoutes')

app.use('/asset', express.static(__dirname + '/Admin/asset'))


app.use(session({
    secret: 'zifojzpok^poxo=zovz==v=ààé&=zdé244686&²&6z468²é41d1c46&4',
    saveUninitialized: true,
    resave: false, 
    
    maxAge: 20000000000000000000000000000000
}))
app.use('/', Main_Routes)
app.use('/user', User_Routes)
app.use('/admin', Admin_Routes)
app.listen(config.app_port, () => {
    console.log("Serveur listening on http://localhost:"+config.app_port)
})