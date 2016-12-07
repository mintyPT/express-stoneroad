# Express Routes Loader

## Synopsis

This small module is meant to load routers defined acording to the following stucture:

    routes
        > api
            - user.js
        - index.js 

It will load the routes inside ```api/user.js``` to ```api/users``` and inside ```index.js``` to ```/```

## Code Example

    var expressRoutesLoader = require('express-routify');
    expressRoutesLoader(app, path.join(__dirname, 'routes'), '/');

### Router example

    const router = require('express').Router();
    
    router.get('/', (req, res, next) => {
        res.render('index', {title: 'index'});
    });
    
    module.exports = router;

## Installation

    npm install --save express-routify

## API Reference

    expressRoutesLoader(app, dir, base_url);

- `app`: express app
- `dir`: folder holding the routers
- `base_url`: base url to mount all routers

## Tests

Sorry, none. 

## License

MIT License

Copyright (c) 2016 mintyPT

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

