const db = require('../../System/db')
function get_article (categorie, articleurl) {

    return new Promise((resolve, reject) => {
        if (categorie) {
            db.query(`SELECT * FROM article WHERE categorie="${categorie}"`, (err, result) => {
                if (result) {
                    let formi = JSON.stringify(result)
                    let formed = JSON.parse(formi)
                    resolve((formed))
                }
                if (err) {
                    reject()
                }

            })
        }
        if (articleurl) {
            db.query(`SELECT * FROM article WHERE article_url="/${articleurl}"`, (err, result) => {
                if (result) {
                    let formi = JSON.stringify(result)
                    let formed = JSON.parse(formi)
                    resolve((formed))

                }
                if (err) {
                    reject()
                }
            })
        }
    })

}

exports.get_article = get_article

function get_allarticle () {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM article', (err, result) => {
            if (err) {
                reject()
            }
            if (result) {
                let formi = JSON.stringify(result)
                let formed = JSON.parse(formi)
                resolve((formed))
            }
        })
    })
}

exports.get_allarticle = get_allarticle


function get_admin_blogData (callback) {
    
    db.query('SELECT * FROM article', (err, result)=> {
        if (err) {throw err}
        if (result) {
            let formi = JSON.stringify(result)
            let formed = JSON.parse(formi)
            
            db.query('SELECT * FROM categorie', (err, resolt) => {
                 
                if (result) {
                    let formi2 = JSON.stringify(resolt)
                    let formed2 = JSON.parse(formi2)
                    
                    let data = {
                        article: formed,
                        categorie: formed2
                    }
                    
                    callback(data)

                    
                }
            })
        }



    })
    
    
 }
 exports.get_admin_blogData = get_admin_blogData
