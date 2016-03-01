Matanza
=======

Matanza is a simple tool that grabs all the your html and minify it to a wherever you want without concatenation.

### Usage:

Install Matanza:

```bash
$ npm i matanza -g
```

### NPM Scripts:

Moving all the partials templates from a angularjs project folder to a distribution or build folder

 ```json
{
  ...
  "scripts": {
    "partials": "matanza -s ./src/client/app/**/*.html -d ./dist/partials",
  }
  ...
}
 ```

### Command Line Interface:
$ matanza <options>
  . -h help
  . -s Source folder
  . -d Destination folder

```bash
$ matanza -s <Dir ...> -d <Dir>
```

### Programmatic usage:

Install Matanza:

```bash
$ npm i matanza --save
```

After that you can require it in your code and use it like this:

```javascript
var matanza = require('matanza');

matanza.minify({
  source: [ './**/*.html' ],
  dest: [ './dist' ],
  minify: {
    collapseWhitespace: true,
    removeComments: true
  }
});
```
