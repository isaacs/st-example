var st = require('st')

// a 'mount' is a function that mounts a folder on a url path
// you pass it a request object and and a response object
// if it handles them, then it will return true.  if not, false
var mount = st({ path: './static' })

// now create our server
var http = require('http')
var server = http.createServer(function(req, res) {
  if (mount(req, res)) {
    console.log('static file handled', req.url)
  } else {
    res.statusCode = 404
    res.end('what is this i dont even\n')
  }
})

// listen on a port, and then the action begins!
server.listen(1337)
