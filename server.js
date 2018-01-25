var http = require('http');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

function httpListen() {
  var port = process.env.PORT || 3000;
  console.log("Server listening for jobs on " + port);
  http.createServer(function(req, res) {
    var body = [];
    var handler;

    process.stdout.write("Req: ");

    req.setTimeout(1000 * 60 * 60 /*1 hour*/ , function() {
      console.log("Server http timeout for path:" + req.url);
      end(res, 500);
    });

    switch (req.url) {
      case "/search":
        search(req.query, function(err, data){
          return end(res, 200, data);
        })
      default:
        return end(res, 404);
    }

    req.on('error', function(reqErr) {
      console.log("Server http error", reqErr);
    }).on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      var data = Buffer.concat(body).toString();
      handler(data)
        .then(function() {
          end(res);
        }, function(err) {
          console.error(err);
          end(res, 400);
        });
    });
  }).listen(port);

  function end(res, code = 200, data = {}) {
    console.log(res);
    
    res.writeHead(code, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
  }
}

function search(term, cb){
  db.each("SELECT * FROM tweets", function(err, row) {
    console.log(row);
    cb(err, row);
  });
}


httpListen();
