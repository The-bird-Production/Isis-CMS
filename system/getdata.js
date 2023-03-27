const db = require('../System/db'); 
const fs = require('fs')



function get_admin_img(callback_result) {

    db.query('SELECT * FROM img' , (err, result ) => {
        if (err) {
            throw err
        }
         if (result) {
            let formi = JSON.stringify(result)
            let formed =JSON.parse(formi)
            callback_result(formed)
         }
    })

}
exports.get_admin_img = get_admin_img



function get_all_user (callback_result) {
    db.query('SELECT * FROM user', (err, result) => {
        if (err) {
            console.log(err)
        }
        if (result) {
            let formi = JSON.stringify(result) 
            let formed = JSON.parse(formi)
            callback_result(formed)
        }
    })
}

exports.get_admin_user = get_all_user

function get_all_docs (callback_result) {
    db.query('SELECT * FROM file', (err, result) => {
        if (err) {
            console.log(err)
        }
        if (result) {
            let formi = JSON.stringify(result)
            let formed = JSON.parse(formi)
            callback_result(formed)

        }
        
    })
}

exports.get_all_docs = get_all_docs

function get_all_page (callback_result) {
    db.query('SELECT * FROM page', (err, result ) => {
        if (err) {
            console.log(err)
        }
        if (result) {
            let formi = JSON.stringify(result)
            let formed = JSON.parse(formi)
            callback_result(formed)
        }
    })
}

exports.get_all_page = get_all_page

function get_all_redirect  (callback_result) {
    db.query('SELECT * FROM redirect', (err,result) => {
        if (err) {
            console.log(err)
        }
        if (result) {
            let formi = JSON.stringify(result)
            let formed = JSON.parse(formi)
            callback_result(formed)
        }
    })
}

exports.get_all_redirect = get_all_redirect

function get_number_of_user (callback_result) {
    db.query('SELECT COUNT(*) AS count FROM user', (error, results) => {
        if (error) {
          throw error;
        }
        // Stocker le résultat de count(*) dans une variable
        const count = results[0].count;
        callback_result(count)

    })
    
}
exports.get_number_of_user = get_number_of_user

function get_number_of_docs (callback_result) {
    db.query('SELECT COUNT(*) AS count FROM file', (error, results) => {
        if (error) {
          throw error;
        }
        // Stocker le résultat de count(*) dans une variable
        const count = results[0].count;
        callback_result(count)

    })
    
}
exports.get_number_of_docs = get_number_of_docs


function get_user_page (callback_result) {
    db.query('SELECT * FROM page WHERE type="user_page"', (err, result) => {
        if (err) {
            console.log(err)

        }
        if (result ) {
            let formi = JSON.stringify(result)
            let formed = JSON.parse(formi)

            callback_result(formed)
        }
    })
}

exports.get_user_page = get_user_page

const pluginsPath = './Plugins';
const plugins = [];

fs.readdirSync(pluginsPath).forEach(file => {
  const plugin = require(`../${pluginsPath}/${file}`);
  plugins.push({
    name: plugin.info.name,
    url: plugin.route
  });
});

exports.plugins = plugins
 




