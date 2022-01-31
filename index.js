// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');

const path = require('path')

// const privateKey = fs.readFileSync(path.resolve(__dirname,'./cert/umdomby/umdombykey.pem'));
// const certificate = fs.readFileSync(path.resolve(__dirname,'./cert/umdomby/umdombycert.pem'));
// const ca = fs.readFileSync(path.resolve(__dirname,'./cert/umdomby/umdombychain.pem'));

const privateKey = fs.readFileSync(path.resolve(__dirname,'./cert/cyberbetonline/cyberbetonlinekey.pem'));
const certificate = fs.readFileSync(path.resolve(__dirname,'./cert/cyberbetonline/cyberbetonlinecert.pem'));
const ca = fs.readFileSync(path.resolve(__dirname,'./cert/cyberbetonline/cyberbetonlinechain.pem'));

const app = express()
app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'build')))

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

httpServer.listen(80, () => {
    console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});
