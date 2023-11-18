
//Change this
exports.db_host= "localhost"
exports.db_username = process.env.DB_USER || "root"
exports.db_password =  process.env.DB_PASSWORD || "" 
exports.db_name = process.env.DB || "isis"






//Don't change this 
exports.option = option = {
    host: this.db_host,
    user: this.db_username,
    password: this.db_password,
    database: this.db_name
}