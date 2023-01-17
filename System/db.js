const mysql = require('mysql')
const dbconfig = require('../config/db')


module.exports = db = mysql.createPool({
    host: dbconfig.db_host,
    user: dbconfig.db_username,
    password: dbconfig.db_password,
    database: dbconfig.db_name 
})

db.getConnection( (err, connection)=> {
    if (err) {
        console.log('NEW DATABASE ERROR : ' + err)
    }
    console.log ("DB connected successful: " + connection.threadId)
})
