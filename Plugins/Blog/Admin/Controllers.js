const get = require('../getdata')
const data = require('../../../System/ControlData')
const config = require('../../../config.json')
const pkg = require('../../../package.json')

const plugins = require('../../../System/getdata')
const plugin = plugins.plugins


const env = require('../../../var')

exports.view = (req,res) => {
    get.get_admin_blogData((result) => {
       
        res.render(env.dirname + '/Admin/plugins/blog', {
            article: result.article, 
            categorie: result.categorie,
            logopath: config.logo_path,
            version: pkg.version,
            plugins:plugin
        })

    })
}

exports.publish = (req,res) => {
    get.get_admin_blogData((result) => {
       
        res.render(env.dirname + '/Admin/plugins/publish_blog', {
            article: result.article, 
            categorie: result.categorie,
            logopath: config.logo_path,
            version: pkg.version,
            plugins:plugin
        })

    })
}

exports.publish_send = (req,res) => {
    let title = req.body.title
        let desc = req.body.desc
        let categorie = req.body.categorie
        let url = req.body.article_url
        let body = req.body.body
        data.addArticle(title, categorie, url, desc, body)
        res.redirect('/admin/blog')
}
exports.categorie_gestion = (req,res) => {
    if (req.params.info === 'add') {
        let name = req.query.name
        data.addCategorie(name)
        res.redirect('/admin/blog')
    }
    if (req.params.info === 'remove') {
        let name = req.query.name
        data.removeCategorie(name)
        res.redirect('/admin/blog')
    }
}