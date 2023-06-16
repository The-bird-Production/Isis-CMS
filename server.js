const app = require('./app')
const config = require('./config.json')
const colors = require('colors/safe');


app.listen(config.app_port, () => {
    console.log(colors.blue.underline("\nServeur listening on http://localhost:"+config.app_port + '\n'))
})