var start = process.argv[2];
var end = process.argv[3];

if(!start || !end){
  console.log('Start date and end date are required');
  process.exit();
}

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./applicants.sqlite3');
require('console.table');

let sql = `SELECT COUNT(*) AS count, date(created_at, 'weekday 0', '-1 days') as week, workflow_state FROM 
  applicants WHERE created_at BETWEEN date('${start}') AND date('${end}') GROUP BY workflow_state`;
 
db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }

  console.table(rows);
});
 
// close the database connection
db.close();
