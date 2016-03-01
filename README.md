Matanza
=======

Matanza minifies your html files to whatever directory you want, without applying concatination to a single file.

### Usage:

Install Matanza:

```bash
$ npm i matanza -g
```

## NPM Scripts:
### Examples

Moving all the partials templates from a AngularJs project folder to a distribution or build folder

 ```json
{
  ...
  "scripts": {
    "partials": "matanza -s ./src/client/app/**/*.html -d ./dist/partials",
  }
  ...
}
 ```

### Result

 ```
 -> Not minified                    | -> html minified
+-- app/                            | +-- dist/
    +-- login/                      |     +-- js/
    |   +-- login.controller.js     |     |   +-- bundle.js
    |   +-- login.html              |     +-- css/
    +-- users/                      |     |   +-- style.css   
    |   +-- user.controller.html    |     +-- partials
    |   +-- user.html               |     |   +-- login.html
    +-- task/                       |     |   +-- user.html
    |   +-- task.controller.js      |     |   +-- task.html
    |   +-- task.html               |     |...
 ```

### Command Line Interface:
```
Usage: matanza [options] <Dir>

Standard Options:

       --help, -h  Help

     --source, -s  Source directory. Supports globbing

--destination, -d  Destination directory
```

### Programmatic usage:

Install Matanza:

```bash
$ npm i matanza --save
```

After that you can require it in your code and use it:

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
