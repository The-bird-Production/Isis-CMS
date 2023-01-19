
const env = require('../var')
const theme = require('../themes.json')

exports.admin = (req, res ) => {
  
    if (req.session.role === 'admin') {
        res.render(env.dirname + '/Admin/index', {
            title: 'Isis CMS'
        })
    } else {
        res.redirect('/')
    }
}

exports.page = (req, res ) => {
    if (req.session.role === 'admin' ) {
        res.render(env.dirname + '/Admin/page', {
            title: 'Isis CMS', 
            theme:  theme.path
        })
    }
}
