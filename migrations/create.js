const database = require("../config/database");

let sql =
  'CREATE TABLE books (id int AUTO_INCREMENT, title VARCHAR(255), author VARCHAR(255), isbn VARCHAR(255), PRIMARY KEY (id))';
database.query(sql, (error, result) => {
  if (error) throw error;
  return console.log(result);
});
