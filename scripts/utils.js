
function removePropertiesFromObj(obj, keys) {
    var target = {};
    for (var i in obj) {
        if (keys.indexOf(i) >= 0) {
            continue;
        }
        if (!Object.prototype.hasOwnProperty.call(obj, i)){
            continue;
        }
        target[i] = obj[i];
    }
    return target;
}

function getPropertiesFromObj(obj, keys) {
    var target = {};
    for (var i in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, i)){
            continue;
        }

        if (keys.indexOf(i) >= 0) {
            target[i] = obj[i];
        }else{
            continue;
        }


    }
    return target;
}

function extractPropertiesFromObj(obj, keysToExtract) {
    var target = {};
    var keys =  Object.keys(obj);
    for(var i = 0; i < keys.length; i++){
        var key = keys[i];
        if (!Object.prototype.hasOwnProperty.call(obj, key)){
            continue;
        }
        if (keysToExtract.indexOf(key) >= 0) {
            target[key] = obj[key];
            delete obj[key];
        }else{
            continue;
        }
    }
    return target;
}


module.exports = {
    extractPropertiesFromObj,
    removePropertiesFromObj,
    getPropertiesFromObj
};