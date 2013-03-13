This is how to serve static files using Node.

It's really easy.

I'm going to use the [st](http://github.com/isaacs/st) module.

First, install [st](http://github.com/isaacs/st):

```
$ npm install st -q
st@0.1.2 node_modules/st
├── async-cache@0.0.2
├── graceful-fs@1.1.14
├── lru-cache@2.0.4
├── mime@1.2.9
├── negotiator@0.2.5
└── fd@0.0.2
```

Then, we're going to create some files and folders in the `static`
folder.  You can name the folder something else, but this of course
affects things later.

```
mkdir static
vim static/index.html
vim static/foo.css
vim static/foo.js
```

Or you can be lazy, and use the ones in this repo which are already
made for you.  They're kind of silly, though.

Next, let's create the actual server.  Again, you can start with this
one, or you can craft your own.

```
vim server.js
```

This is the code I put in it:

```javascript
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
```

Now we have only to start our ball rolling!

```
node server.js
```

Point your webitrix browseratron at <http://localhost:1337/static/> and
you'll see all manner of static files!

If you'd like to show the `index.html` file by default, instead of an
auto-generated list of files, then you can set `index: 'index.html'`
in the options to `st()`.

If you want to not have to restart the server to see every change, you
can set `cache: false` in the options to `st()`.

You can have multiple mounts if you'd like.  But if you call
`mount(req, res)` and it returns true, then you must stop doing
anything to the request and response, or else bad happens.

Enjoy your static!

# OMG That's SOOO hard!! Typing!  Gah!!  Can't I be lazier?  JEEZZZ!!!

Ok, fine, do this:

```
npm install st -g
```

Then cd into the folder you want to serve, and type:

```
st
```

It listens on port 1337, just like the example above.

I CANNOT MAKE IT ANY FEWER CHARACTERS, BECAUSE ALL THE ONE-LETTER npm
NAMES ARE TAKEN.
