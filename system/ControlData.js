const db = require('./db')
const fs = require('fs')


function Rename_file(file_name, img_name ) {
    fs.rename(`./public/upload/${file_name}`, `./public/upload/${img_name}`, () => {

    })
}
exports.Rename_file = Rename_file

function Delete_file(file_path) {
    fs.unlink(file_path, (err) => {
        if (err) {throw err}
        
    })
}

exports.Delete_file = Delete_file