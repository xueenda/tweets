require('./provision');

var http = require('http');
var querystring = require('querystring');

function httpListen() {
  var port = process.env.PORT || 3000;
  console.log("Server listening for jobs on " + port);
  http.createServer(function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');

    var body = [];
    var handler;

    // process.stdout.write("Req: ");

    req.setTimeout(1000 * 60 * 60 /*1 hour*/ , function() {
      console.log("Server http timeout for path:" + req.url);
      end(res, 500);
    });

    console.log(req.url);

    if (req.url.indexOf('/search') > -1) {
      var query = querystring.parse(req.url.split("?")[1]);
      var term = query.term;

      if (!term)
        return end(res, 400, 'Query term is required');

      search(term, function(err, data) {
        if (err)
          return end(res, 500, err);

        return end(res, 200, data);
      });
    } else
      return end(res, 404);

    req.on('error', function(reqErr) {
      console.log("Server http error", reqErr);
    }).on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      var data = Buffer.concat(body).toString();
      console.log(data);
    });
  }).listen(port);

  function end(res, code = 200, data = {}) {
    if (typeof data !== 'object')
      data = { message: data };
    res.writeHead(code, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
  }
}

// Search the term and add the score for the result
function search(term, cb) {
  var reg = new RegExp("\\b" + term + "\\b", "ig");

  db.all("SELECT * FROM tweets WHERE text LIKE '%" + term + "%'", function(err, rows) {
    if (rows)
      rows = rows.map(function(r) {
        r.score = 0;
        if (r.text)
          r.score = (r.text.match(reg) || []).length;
        return r;
      })
      .sort(function(a, b) {
        return b.score - a.score;
      });

    return cb(err, rows);
  });
}


httpListen();
