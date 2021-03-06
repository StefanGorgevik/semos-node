//  https://www.w3schools.com/nodejs/nodejs_http.asp

//Creating a server

var http = require('http');

// //create a server object:
// http.createServer(function (req, res) {
//   res.write('Hello World!'); //write a response to the client
//   res.end(); //end the response
// }).listen(8080); //the server object listens on port 8080


//create a server object:
var server = http.createServer(function (req, res) {
    console.log(req);
   var URL = req.url.split("/");
   var output = 0;
   switch(URL[1]) {
       case "add":
           if(URL.length > 2) {
                for(let i = 2; i < URL.length;i++) {
                    output += parseInt(URL[i]);
                }
           }
            break;
   } 
    res.write(URL[1] + " " + output + "");
    res.end(); //end the response
});

server.listen(8080, (err) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log("Server started successfully!");
});

//http://127.0.0.1:8080/ loopback address, local host 