const db = require('../System/db')
const config = require('../config.json')
const env = require('../var')

const themes = require(`../Themes/${config.theme}/theme.js`)


exports.index = async (req,res) => {

    const [result] = await db.awaitQuery('SELECT * FROM page WHERE url = "/index"'); 
    if (!result) {
        if(typeof themes.index !== 'undefined') {
            res.render (themes.index , {
                theme_header : themes.header
            })
        }
       
        res.render(env.dirname + '/App/error/404', {
            theme_header: themes.header
        })
    } else {
        db.query('SELECT * FROM page WHERE url = "/index"', (err, result ) => {
            if (err) {
                res.status(503).send('Erreur du serveur')
            }
            if (result) {
                let formi = JSON.stringify(result)
                let formed = JSON.parse(formi)
    
                res.render(themes.view_path + '.ejs' , {
                    page :formed,
                    theme_header: themes.header
                })
            }
            else {
                res.status(404).render(env.dirname + '/App/error/404', {
                    theme_header: themes.header
                });
            }
    
        })

    }

    
}
exports.page = (req,res) => {
    let page = req.params.page;

    db.query('SELECT * FROM page WHERE url = ' + `"/${page}"`, (err, result) => {
        if (err) {
            res.status(503).send('Erreur du serveur')
        }
        if (result) {
            let formi = JSON.stringify(result)
            let formed = JSON.parse(formi)
            if (typeof formed !== 'undefined' && formed.length > 0 && typeof formed[0].title !== 'undefined') {
                
            res.render(themes.view_path + '.ejs' , {
                page :formed,
                theme_header: themes.header
            })

            } else {
                res.status(404).render(themes.error_path , {
                    theme_header: themes.header
                }); 
            }

        }
        else {
            res.status(404).render(themes.error_path, {
                theme_header: themes.header
            });
        }
    })
}