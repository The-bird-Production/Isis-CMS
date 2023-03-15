const mysql = require("mysql");
const dbconfig = require("../config/db");

describe("MySQL connection", () => {
  test("should connect to MySQL database", async () => {
    const connection = await mysql.createConnection({
      host: dbconfig.db_host,
      user: dbconfig.db_username,
      password: dbconfig.db_password,
      database: dbconfig.db_name,
    });

    expect(connection).toBeDefined();
    connection.end();
  });
});
