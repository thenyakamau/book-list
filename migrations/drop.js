const database = require("../config/database");

let sql = "DROP TABLE IF EXISTS books";
database.query(sql, (error, result) => {
  if (error) throw error;
  return console.log(result);
});
