/* eslint no-var: 0 */
var command = require("./command");
var packageJson = require("./../package.json");
var utils = require("./utils");



/*------ Update package.json ------*/


var json = utils.getPropertiesFromObj(packageJson,[
    "dependencies"
]);

var scripts = utils.removePropertiesFromObj(packageJson.scripts,["postinstall"]);

var newJson = {
    "devDependencies": json.dependencies,
    "dependencies": json.devDependencies,
    "scripts":scripts,
};

//todo implement 
//command.execute("../../node_modules/.bin/eslint --init")

command.createDir( "../../src",function(){
    command.createDir( "../../test",function(){
        command.createDir( "../../lib",function(){
            command.copyDir( "./scripts", "../../scripts",function(){
	            command.copyDir( "./src", "../../src",function(){
	                command.copyFile( "./webpack.config.js", "../../webpack.config.js",function(){
	                    command.copyFile( "./.babelrc", "../../.babelrc",function(){
                            command.copyFile( "./.eslintrc.json", "../../.eslintrc.json",function(){
                                command.updateJson( "../../package.json", newJson,function(){
                                    command.remove("../../scripts/postinstall.js",function(){
                                        command.remove("../../scripts/utils.js",function(){
                                            command.remove("../../node_modules/boilerplate")
                                        })
                                    })
                                });
                            })
	                    });
	                });
                });
            });
        });
    });
});

/*command.copyFile( "./.gitignore", "../../.gitignore",function(){
    command.copyFile( "./.eslintrc.json", "../../.eslintrc.json",function(){
        command.updateJson( "../../package.json", newJson,function(){
            command.remove("../../scripts/postinstall.js",function(){
                command.remove("../../node_modules/library-boilerplate")
            })
        });
    })
});*/











