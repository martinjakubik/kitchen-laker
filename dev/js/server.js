import http from 'http';
import fs from 'fs';
import url from 'url';
import path from 'path';

let sBaseDirectory = '.';
let nPort = 2701;

let getContentType = function (sPath) {

    let sContentType = 'text/plain';

    if (sPath.includes('.css')) {
        sContentType = 'text/css';
    } else if (sPath.includes('.html')) {
        sContentType = 'text/html';
    } else if (sPath.includes('.js')) {
        sContentType = 'application/javascript';
    }

    return sContentType;

}

let respondToBrowserRequest = function (request, response) {

    let oRequestUrl = url.parse(request.url);

    let sRequestedPath = oRequestUrl.pathname;

    if (sRequestedPath === '/') {
        sRequestedPath = 'app/html/index.html';
    }

    let sSandboxedPath = path.normalize(sBaseDirectory + '/' + sRequestedPath);

    let sContentType = getContentType(sSandboxedPath)

    let oHeaders =  {
       'Content-Type': sContentType
    };

    response.writeHead(200, oHeaders);
    
    let oFileStream = fs.createReadStream(sSandboxedPath);
    oFileStream.pipe(response);

};

let server = http.createServer(respondToBrowserRequest);
server.listen(process.env.PORT || nPort);

console.log('listening on port ' + nPort);
