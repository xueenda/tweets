var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./Tweets.txt', 'utf8')
});


db.serialize(function() {
  db.run(`CREATE TABLE IF NOT EXISTS tweets (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    "created_at" datetime,
    "text" text,
    "user_id" varchar
  )`);

  var stmt = db.prepare("INSERT INTO tweets VALUES (?, ?,?,?)");
  readFile(stmt, function(){
    db.each("SELECT * FROM tweets", function(err, row) {
      console.log(row);
    });
  });
});


function readFile(stmt, cb) {
  var count = 0;

  var token_length = [],
    length_of_line;

  var line = '';

  lineReader.on('line', function(_line) {
    var created_at, text, user_id;
    count++;
    if (count === 2) {
      length_of_line = _line.length;
      _line.trim().split(" ").forEach(function(t) {
        token_length.push(t.length);
      });
    }

    if (count <= 2)
      return;

    line += _line;
    if (line.length !== length_of_line) {
      line += ' ';
      return;
    }

    created_at = line.substr(0, token_length[0]);
    text = line.substr(token_length[0] + 1, token_length[1]);
    user_id = line.substr(token_length[0] + token_length[1] + 2, token_length[2]);
    line = '';

    stmt.run([count, created_at, text.trim(), user_id.trim()]);

    // console.log(created_at + "," + text + "," + user_id);
  });

  lineReader.on('close', function() {
    stmt.finalize();
    cb();
  });
}
