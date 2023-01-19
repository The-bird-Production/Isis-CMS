
const env = require('../var')

exports.admin = (req, res ) => {
  
    if (req.session.role === 'admin') {
        res.render(env.dirname + '/Admin/index', {
            title: 'Isis CMS'
        })
    } else {
        res.redirect('/')
    }
}
