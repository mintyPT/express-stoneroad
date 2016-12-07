var fs            = require('fs');
var extensionless = require('extensionless');
const path        = require('path');


const expressRoutesLoader = (app, dir, base_url) => {

    var files = fs.readdirSync(dir);

    files.forEach( ffile => {

        var new_dir = path.join(dir, ffile);
        if (ffile != 'index') {
            var new_url = path.join(base_url, ffile);
        } else {
            var new_url = path.join(base_url);
        }

        var stats = fs.statSync(new_dir);

        if (stats.isFile()) {
            new_url = extensionless(new_url);
            var router = require(new_dir);
            app.use(new_url, router);
        }

        if (stats.isDirectory()) {
            expressRoutesLoader(app, new_dir, new_url);
        }
    })
}

module.exports = expressRoutesLoader;
