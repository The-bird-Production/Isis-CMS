const pm2 = require('pm2')
const config = require('../config.json')

const restart = new Promise((resolve, reject) => {
    pm2.connect(function(err) {
        if (err) return reject(err)
        
        console.log("[PM2] Processes connected")

        pm2.restart(process.env.NAME || config['pm2 name app'] || 'all', function(err, proc) {

            if (err) {
                reject(err)
                console.error(err)
            }
            else {
                resolve(proc)
            
            }
        })
        

        
    })
})

module.exports = restart; 