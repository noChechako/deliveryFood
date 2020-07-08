function log(){
const express = require("express");
const bodyParser = require("body-parser");
  
const app = express();
  
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});
 console.log('ku')
// app.get("/enter", urlencodedParser, function (request, response) {
//     response.sendFile(__dirname + "/pages/enter.html");
//     console.log(__dirname + "./pages/enter.html")
// });
app.post("/enter.html", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    console.log(`${request.body.userName} - ${request.body.userAge}`)

    response.send(`${request.body.userName} - ${request.body.userAge}`);
});
  


app.listen(8889);
}
exports.log=log;