const mysql = require('mysql')
const amysql = require('mysql-await')
const dbconfig = require('../config/db')


module.exports = db = mysql.createConnection({
    host: dbconfig.db_host,
    user: dbconfig.db_username,
    password: dbconfig.db_password,
    database: dbconfig.db_name 
})


db.connect((error) => {
    if (error) {
      console.error('Error connecting to database: ' + error.stack);
      return;
    }
    console.log('Connected to database with threadId: ' + db.threadId);
  });

  module.exports = connection = amysql.createConnection({
    host: dbconfig.db_host,
    user: dbconfig.db_username,
    password: dbconfig.db_password,
    database: dbconfig.db_name 
})
connection.on(`error`, (err) => {
    console.error(`Connection error ${err.code}`);
  });
  

  