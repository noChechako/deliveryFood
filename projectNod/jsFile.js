const fs = require('fs');
const http = require('http');
const path = require('path');
const mysql = require("mysql2");

var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');
// const app = require('./data');
// console.log(app)
// const express = require('express');
// const app=express();
http.createServer(function (request, responce) {
    console.log(request.url)
    if (request.url != '/favicon.ico') {
        if (request.url.endsWith('.css')) {
            let cssFile = request.url.slice(1);
            fs.readFile(cssFile, (err, data) => {
                if (err) throw err;
                responce.setHeader('Content-Type', 'text/css');
                responce.statusCode = 200;
                responce.write(data);
                responce.end();
            })
        }
        // else if (request.url.endsWith('sendForm.js')) {
        //     let jsFile = request.url.slice(1);


        //     fs.readFile(jsFile, (err, data) => {
        //         if (err) throw err;
        //         responce.setHeader('Content-Type', 'text/javascript');
        //         responce.statusCode = 200;
        //         responce.write(data);
        //         responce.end();
        //     })

        // }
        else if (request.url.endsWith('.js')) {
            let jsFile = request.url.slice(1);
            fs.readFile(jsFile, (err, data) => {
                if (err) throw err;
                responce.setHeader('Content-Type', 'text/javascript');
                responce.statusCode = 200;
                responce.write(data);
                responce.end();
            })
        }
        else if (request.url.endsWith('.php')) {
            let phpFile = request.url.slice(1);
            fs.readFile(phpFile, (err, data) => {
                if (err) throw err;
                responce.setHeader('Content-Type', 'text/php');
                responce.statusCode = 200;
                responce.write(data);
                responce.end();
            })
        }
        else if (request.url.endsWith('.png')) {
            let imgFile = request.url.slice(1);
            fs.readFile(imgFile, (err, data) => {
                if (err) throw err;
                responce.setHeader('Content-Type', 'image/png');
                responce.statusCode = 200;
                responce.write(data);
                responce.end();
            })
        }
        else if (request.url.endsWith('.jpg')) {
            let jpgFile = request.url.slice(1);
            fs.readFile(jpgFile, (err, data) => {
                if (err) throw err;
                responce.setHeader('Content-Type', 'image/jpeg');
                responce.statusCode = 200;
                responce.write(data);
                responce.end();
            })
        }
        else if (request.url.endsWith('.svg')) {
            let svgFile = request.url.slice(1);
            fs.readFile(svgFile, (err, data) => {
                if (err) throw err;
                responce.setHeader('Content-Type', 'image/svg+xml');
                responce.statusCode = 200;
                responce.write(data);
                responce.end();
            })
        }
        else
            getPage(request.url, responce)
    }
}).listen(8889);




const express = require("express");

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const app = express();
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "logindb",
    password: "root"
});
connection.connect(function (err) {
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else {
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});
app.set('port',3001);
http.createServer(app).listen(app.get('port'),function(){
  console.log('serv '+app.get('port'))
})

app.use(express.static(path.join(__dirname, 'public')));

app.post("/registration.html", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    response.render(addDb(request.body));
    console.log('2');
    
});
app.post("/order.html", function (request, response) {
    // console.log('2')
response.send('2')    
});



// app.listen(3000);
// const sql = "DELETE FROM users WHERE name=?";
// const data = [""]; // удаляем пользователей с именем Sam
// connection.query(sql, data, function(err, results) {
//     if(err) console.log(err);
//     console.log(results);
// });
 
// let sql = `ALTER TABLE users auto_increment=0`;
// connection.query(sql, (err, res) => {
//     if(err) console.log(err);
//     console.log('good ' + res);
// })

function addDb(body) {
    let fl = false;
    // console.log(body.userName)
let str='asd';
    let sql = "SELECT * FROM users";
    connection.query(sql, function (err, results) {
        if (err) console.log(err);
        const users = results;
        for (let i = 0; i < users.length; i++) {
            // console.log(body.userName)
            // console.log(users[i].name)
            if (users[i].name == body.userName) {
                fl = true;
            }
        }
        if (!fl) {
            sql = `INSERT INTO users(name, password) VALUES('${body.userName}', '${body.userPassword}')`;
            connection.query(sql, function (err, results) {
                if (err) console.log(err);
                console.log("Вы успешно зарегистрировались!")
                str = "Вы успешно зарегистрировались!";
            });
        }
        else {
            console.log("Пользователь с таким логином уже есть! Попробуйте снова")
            str="Пользователь с таким логином уже есть! Попробуйте снова";
        }


        let sql1 = "SELECT * FROM users";
        connection.query(sql1, function (err, results) {
            if (err) console.log(err);

            console.log(results)
        })
    });
    return str;

}





const checkLog = (body) => {

}

//  connection.query("CREATE DATABASE logindb",
//   function(err, results) {
//     if(err) console.log(err);
//     else console.log("База данных создана");
// });
//  const sql = `create table if not exists users(
//     id int primary key auto_increment,
//     name varchar(255) not null,
//     password varchar(255) not null
//   )`;
//   connection.query(sql, function(err, results) {
//     if(err) console.log(err);
//     else console.log("Таблица создана");
// });
// connection.end();

// // создаем парсер для данных application/x-www-form-urlencoded
// const urlencodedParser = bodyParser.urlencoded({extended: false});
//  console.log('ku')
// app.get("/enter", urlencodedParser, function (request, response) {
//     response.sendFile(__dirname + "/pages/enter.html");
//     console.log(__dirname + "./pages/enter.html")
// });
// app.post("/enter", urlencodedParser, function (request, response) {
//     if(!request.body) return response.sendStatus(400);
//     console.log(request.body);
//     console.log(`${request.body.userName} - ${request.body.userAge}`)

//     response.send(`${request.body.userName} - ${request.body.userAge}`);
// });



// app.listen(3000);



// app.listen(3000);

// app.post('/delivery',function (req, res){
// res.send('succes');
// })
// app.listen(3000);


function getPage(name, responce, statusCode = 200) {
    if (name == '/') {
        name = name.slice(1) + 'index';
    }
    console.log(name);

    fs.readFile('pages/' + name + '.html', 'utf8', (err, data) => {

        if (!err) {
            fs.readFile('pages/header.html', 'utf8', (err, header) => {
                if (err) throw err;
                data = data.replace(/\{\{header\}\}/g, header);
                fs.readFile('pages/footer.html', 'utf8', (err, footer) => {
                    if (err) throw err;
                    data = data.replace(/\{\{footer\}\}/g, footer);
                    responce.setHeader('Content-Type', 'text/html');
                    responce.statusCode = statusCode;
                    responce.write(data);
                    responce.end();
                });
            });
        }
    })

}
