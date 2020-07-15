const database = require("../config/database");

let sql =
  "CREATE TABLE IF NOT EXISTS books (id int AUTO_INCREMENT, title VARCHAR(255), author VARCHAR(255), isbn VARCHAR(255) UNIQUE, created_at DATETIME  DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id))";
database.query(sql, (error, result) => {
  if (error) throw error;
  return console.log(result);
});
