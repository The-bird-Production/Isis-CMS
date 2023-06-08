const config = require('./config.json')

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */


module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'isis'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: config.db_host,
      user: config.db_user,
      password: config.db_password,
      database: config.db_name
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
