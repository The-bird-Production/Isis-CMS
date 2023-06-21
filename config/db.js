exports.db_host= "localhost"
exports.db_username = process.env.DB_USER || "root"
exports.db_password =  process.env.DB_PASSWORD || "" 
exports.db_name = process.env.DB || "isis"

exports.option = option = {
    host: 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || "" ,
    database: process.env.DB || 'isis'
}