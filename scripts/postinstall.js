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

async function executeScript(){
    await command.createDir( "../../src");
    await command.createDir( "../../test");
    await command.copyDir( "./scripts", "../../scripts");
    await command.copyDir( "./src", "../../src");
    await command.copyFile( "./webpack.config.js", "../../webpack.config.js");
    await command.copyFile( "./.babelrc", "../../.babelrc");
    await command.copyFile( "./.eslintrc.json", "../../.eslintrc.json");
    //await command.copyFile( "./.gitignore", "../../.gitignore");
    await command.updateJson( "../../package.json", newJson);
    await command.remove( "../../scripts/postinstall.js");
    await command.remove( "../../scripts/utils.js");
    await command.remove( "../../node_modules/boilerplate");
}












