const mysql = require("mysql")

const connection = mysql.createPool({
  user: "root",
  password: "manager",
  host: "localhost",
  port: 3306,
  database: "TastyGo"
})


module.exports = connection