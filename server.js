const app = require('./app')
const config = require('./config.json')
const colors = require('colors/safe');
require('dotenv').config()


const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
app.use(cors({
  origin: '*',
  methods: [ "GET"]
}))
app.use(helmet())
app.use(compression())


app.listen(config.app_port, () => {
    console.log(colors.blue.underline("\nServeur listening on http://localhost:"+config.app_port + '\n'))
})