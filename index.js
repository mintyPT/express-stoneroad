const fs            = require('fs');
const pad        = require('pad');
const path        = require('path');
const chalk        = require('chalk');

const methodColors = {
    'get': 'yellow',
    'post': 'magenta',
    'delete': 'red',
    'put': 'cyan',
}

const expressRoutesLoader = (app, dir, base_url) => {


    // For each file in the dir
    fs.readdirSync(dir).forEach( fileOrDir => {

        // Build path of the file
        var completePathToFileOrDir = path.join(dir, fileOrDir);

        // Creates the new url, adding the name of the file/dir to the `base_url`
        // If the file is called `index.js`, or the directory `index`, adds nothing
        const isIndex = fileOrDir != 'index' && fileOrDir != 'index.js';
        if (isIndex) {
            var new_url = path.join(base_url, fileOrDir);
        } else {
            var new_url = base_url;
        }

        var stats = fs.statSync(completePathToFileOrDir);

        if (stats.isFile()) {
            // If fileOrDir is a file, it should export a router so we use it
            const router = require(completePathToFileOrDir);
            const routerUrl = new_url.replace('.js', '');

            app.use(routerUrl, router );

            router.stack.forEach((middleware) => {
                 if (middleware.route) { // routes registered directly on the app

                    const {methods} = middleware.route;
                    const methodsKeys = Object.keys(methods);

                    methodsKeys.map( key => {
                        let value = methods[key];
                        if(value){
                            //http://localhost:${app.config.ports.http}
                            var urlx = path.join(`/${routerUrl}`, middleware.route.path);
                            const keyPadded = pad(`${key.toUpperCase()}`, 8, ' ');
                            const urlxPadded = pad(urlx, 35, ' ');



                            console.log(
                                chalk.bold[methodColors[key] ? methodColors[key]:'blue'](keyPadded),
                                chalk.green(urlxPadded),
                                dir
                            );
                        } else {
                            throw Error('no idea how to get here');
                        }
                    })

                 } else {
                    // middleware
                 }
            });


        } else {
            // If fileOrDir is a directory, it should go into this function again (recursive)
            expressRoutesLoader(app, completePathToFileOrDir, new_url);
        }

    })
}

module.exports = expressRoutesLoader;
