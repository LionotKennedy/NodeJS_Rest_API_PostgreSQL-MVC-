const Pool = require("pg").Pool;

const PostgreSQL = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "lionot",
  database: "MVC",
});

PostgreSQL.connect(() => {
  console.log("Connecting have been successfully");
});

module.exports = PostgreSQL;
