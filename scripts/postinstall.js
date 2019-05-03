/* eslint no-var: 0 */
var command = require("./command");
var packageJson = require("./../package.json");
var utils = require("./utils");



/*------ Update package.json ------*/


var scripts = utils.removePropertiesFromObj(packageJson.scripts,["postinstall"]);


var dependencies = utils.extractPropertiesFromObj(packageJson.dependencies,["react", "react-dom"]);

var newJson = {
    "devDependencies": packageJson.dependencies,
    "dependencies": dependencies,
    "scripts":scripts,
    "files": [
        "dist"
    ]
};

command.createDir( "../../src",function(){
    command.createDir( "../../test",function(){
        command.copyDir( "./scripts", "../../scripts",function(){
            command.copyDir( "./src", "../../src",function(){
                command.copyFile( "./webpack.config.js", "../../webpack.config.js",function(){
                    command.copyFile( "./.babelrc", "../../.babelrc",function(){
                        command.copyFile( "./.eslintrc.json", "../../.eslintrc.json",function(){
                            command.copyFile( "./.gitignore", "../../.gitignore",function(){
                                command.updateJson( "../../package.json", newJson,function(){
                                    command.remove("../../scripts/postinstall.js",function(){
                                        command.remove("../../scripts/utils.js",function(){
                                            command.remove("../../node_modules/boilerplate")
                                        })
                                    })
                                });
                            });
                        })
                    });
                });
            });
        });
    });
});












