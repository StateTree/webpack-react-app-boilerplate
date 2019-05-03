/* eslint no-var: 0 */
var exec = require("child_process").exec;
var fs = require("fs-extra");

async function moveFile(filePath,destinationPath,callback){
    if(!destinationPath){
        throw new Error("Destination directory missing");
    }
    if(!filePath){
        throw new Error("Source file missing");
    }

    try {
        await fs.move(filePath, destinationPath)
        console.log("Move: " + filePath + " moved to " + destinationPath)
    } catch (err) {
        console.error(err);
    }
}

async function copyFile(filePath,destinationPath,callback){
    if(!destinationPath){
        throw new Error("Destination directory missing");
    }
    if(!filePath){
        throw new Error("Source file missing");
    }

    try {
        await fs.copy(filePath, destinationPath)
        console.log( "COPY: " + filePath + " copied to " + destinationPath)
    } catch (err) {
        console.error(err);
    }
}

async function copyDir(source,dest){
    if(!source){
        throw new Error("Source directory missing");
    }
    if(!dest){
        throw new Error("Destination directory missing");
    }

    try {
        await fs.copy(source, dest)
        console.log( "COPY: " + source + " copied to " + dest)
    } catch (err) {
        console.error(err);
    }
}

async function createDir(dirPath){
    if(!dirPath){
        throw new Error("directory path missing");
    }

    try {
        await fs.ensureDir(dirPath)
        console.log( "Directory created at : " + dirPath)
    } catch (err) {
        console.error(err);
    }
}

async function remove(source,callback){
    try {
        await fs.remove(source);
        console.log("REMOVE: " + source + " deleted");
    } catch(error){
        console.error(error)
    }
}

async function writeJson(source,json){
    try {
        await fs.writeJson(source, json);
        console.log("WRITE: " + source + " created")
    } catch(error){
        console.error(error)
    }
}

async function updateJson(source,newJson,callback){
    try {
        const sourceJson = await fs.readJson(source);
        const updatedJson = Object.assign({}, sourceJson, newJson);
        await fs.outputJson(source,updatedJson);
        console.log("WRITE: " + source + " created")
    } catch (err) {
        console.error(err);
    }

}

function changeCurrentWorkingDirTemporarily(dirPath, command){
    //For this Node process "bower install" working directory is changed to build/client
//upon completion Node cwd will shift back to root where we started this process.
    execute(command, false,{
        cwd:dirPath
    });
}

function execute(commands,setNodeEnv,options,callback){
    if(Array.isArray(commands)){
        commands.map(function(cmdLine){
            _execute(cmdLine,setNodeEnv,options,callback);
        })
    }else {
        _execute(commands,setNodeEnv,options,callback);
    }
}

function _execute(cmdLine,setNodeEnv,options,callback){

    if(typeof cmdLine !== "string"){
        throw new Error("String format expected for commands")
    }
    if(setNodeEnv){
        var environ = "production";
        if (process.argv[2] && process.argv[2].indexOf("development")){
            environ = "development";
        }
        if (process.platform === "win32") {
            cmdLine = "set NODE_ENV=" + environ + "&& " + cmdLine;
        } else {
            cmdLine = "NODE_ENV=" + environ + " " + cmdLine;
        }
    }

    var command;
    if(options) {
        command = exec(cmdLine,options,(error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            if(callback){
                callback();
            }
        });
    }else {
        command = exec(cmdLine,(error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            if(stdout){
                console.log(`stdout: ${stdout}`);
            }
            if(stderr){
                console.log(typeof stderr, stderr);
                console.log(`stderr: ${stderr}`);
            }
            if(callback){
                callback();
            }
        });
    }
    if(command){
        /* eslint-disable */
        command.stdout.on("data", function(data) {
            process.stdout.write(data);
        });
        command.stderr.on("data", function(data) {
            process.stderr.write(data);
        });
        command.on("error", function(err) {
            process.stderr.write(err);
        });
        /* eslint-enable */
    }




}



module.exports = {
    moveFile,
    copyFile,
    copyDir,
    createDir,
    remove,
    writeJson,
    updateJson,
    execute,
    changeCurrentWorkingDirTemporarily
};

