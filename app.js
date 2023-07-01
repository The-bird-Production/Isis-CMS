const express = require('express'); 
const app = express();
const config = require('./config.json');
const db_config = require('./config/db')
const env = require('./var')
const fs = require('fs')
const colors = require('colors/safe');
require('dotenv').config()

console.log( colors.blue.underline( 'ISIS CMS STARTING \n')  );
console.log(colors.green('Theme used : ' + config.theme + '\n'))
const bodyParser = require('body-parser'); 
const session = require('express-session')
app.use(bodyParser.text({ type: 'text/html' }))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(express.text())
app.set('view engine', 'ejs');
//Session

const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore(db_config.option);



app.use(session({
    secret: 'zifojzpok^poxo=zovz==v=ààé&=zdé244686&²&6z468²é41d1c46&4',
    store: sessionStore,
    saveUninitialized: false,
    resave: false, 
    
    maxAge: 20000000000000000000000000000000
}))

//Routes
const Main_Routes = require('./Routes/main_routes'); 
const User_Routes = require('./Routes/userRoutes')
const Admin_Routes = require('./Routes/AdminRoutes')

//Test Route 

app.get('/test', (req, res) => {
  console.log("TEST"); 
  res.status(200)
})


app.use("/public/upload/", express.static(env.dirname +  '/public/upload'))
app.use('/user', User_Routes)
app.use('/admin', Admin_Routes)
app.use('/asset', express.static(__dirname + '/Admin/asset'))
app.use('/Themes',express.static(__dirname + '/Themes'))

//Language
app.use((req, res, next) => {
  if (req.method === 'GET') {
    const acceptedLanguages = req.headers['accept-language'];

    // Analyse des langues acceptées par le navigateur
  
  if (acceptedLanguages) {
    const languages = acceptedLanguages.split(',');
    const browserLanguage = languages[0].trim().substring(0, 2);
  

    const lang = browserLanguage || 'fr'; // Remplacez 'fr' par la langue souhaitée

    

    // Ajoutez le paramètre de langue à l'URL
    
    req.langage = lang
    next()
  }
}
  
});


//Logs for all actions 
app.use((req, res, next) => {
  console.log(`[${new Date()}] ${req.method} ${req.url}`);
  res.on('finish', () => {
    console.log(`[${new Date()}] ${req.method} ${req.url} ${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`);
  });
  next();
});


//Plugin loading 

const pluginsPath = './Plugins';

fs.readdirSync(pluginsPath).forEach(file => {

  const plugin = require(`${pluginsPath}/${file}`);
  colors.enable()

  app.use(plugin.route, plugin.router);
  console.log( colors.green(' [ok] Plugin '+ plugin.info.name +  ' loaded,  version : '+ plugin.info.version +  ' \n'))
  

  
});



app.use('/', Main_Routes)



module.exports = app