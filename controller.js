const fs = require('fs');
const path = require('path');

/**
 * Function: handleRequest 
 * Description: used as a callback function by createServer in server.js to display page contents
 * @param {*} req 
 * @param {*} res 
 */
function handleRequest(req, res){
    let filePath = "." + req.url;

    if(filePath == "./"){
        filePath = "./index.html";
    } else if(filePath.substring(0,13) === "./detail.html" ){
        filePath = "./detail.html";
    }

    let extName = path.extname(filePath);

    if(fs.existsSync(filePath)){
        readAndServe(filePath, extName, res);
    }
}

/**
 * Function: getContentType
 * Description: Checks the extention name as a parameter and adjusts the content type accordingly
 * @param {*} extName 
 * @returns contentType (as a String)
 */
function getContentType(extName){
    let contentType = "";

    switch(extName){
        case".html":
            contentType = "text/html";
            break;
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".svg":
            contentType = "image/svg+xml"
            break;
        case ".json":
            contentType = "application/json"
            break;
        default:
            console.log('Invalid content type');
    }

    return contentType;
}

/**
 * Function: readAndServe
 * Description: Called by handleRequest to create a response to the wab page request through the Node.js server.
 * @param {*} filePath 
 * @param {*} extName 
 * @param {*} res 
 */
function readAndServe(filePath, extName, res){
    filePath = decodeURIComponent(filePath);

    if(!fs.existsSync(filePath)){
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404: File Not Found');
    }

    fs.readFile(filePath, function(error, content){
        if(error){
            res.writeHead(500, {'Content-Type': 'plain/text'});
            res.end('Server error: ' + error.code);
        } else {
            let contentType = getContentType(extName);
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, "utf-8");
        }
    });
    console.log('File Extention: ' + extName);
}

module.exports = {handleRequest};