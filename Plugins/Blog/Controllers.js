const get = require('./getdata')
const config = require('../../config.json')
const env = require('../../var')
const fs = require('fs')
const themes = require(`../../Themes/${config.theme}/theme.js`)

exports.view_article = (req, res) => {

    let article_url = req.params.articleurl

    
    
        get.get_article('',article_url)
        .then((result) => {
            
            res.render(themes.plugin_blog_article, {
                article: result[0]
            })

        })


}

exports.view_categorie = (req, res) => {

    let categorie = req.params.categorie
    if (categorie) {
        get.get_article(categorie)
        .then((result) => {
            res.render(themes.plugin_blog , {
                article: result
            })

        })

    } 

}
exports.all = (req, res) => {
    get.get_allarticle()
    .then((result) => {
        res.render(themes.plugin_blog, {
            article: result
        })

    })
}