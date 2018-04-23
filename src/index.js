var express = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// login routes ======================================================================
require('./app/routes.js')(app, passport);

// mysql onfiguration ===============================================================
var mysql = require('mysql');
var sql_connection = mysql.createConnection({
    host: 'mysql550project.cl1yl0dhh5zw.us-east-1.rds.amazonaws.com',
    user: 'liuliuliu',
    password: 'sixsixsix',
    database: 'myFlights'
});

sql_connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + sql_connection.threadId);
});

// //-------------mongodb---------------
// var Schema = mongoose.Schema;
// mongoose.connect('mongodb://liuliuliu:sixsixsix@54.147.46.161:27017/cool_db', function(err, db) {
//     if (err) {
//         throw err;
//     } else {
//         console.log("successfully connected to the database");
//     }
//     //db.close();
// });



//-------------connection test--------------
// Create a schema
// var TodoSchema = new mongoose.Schema({
//     name: String,
//     completed: Boolean,
//     note: String,
//     updated_at: { type: Date, default: Date.now },
// });
// // Create a model based on the schema
// var Todo = mongoose.model('Todo', TodoSchema);
// // Create a todo in memory
// var todo = new Todo({ name: 'Master NodeJS', completed: false, note: 'Getting there...' });
// // Save it to database
// todo.save(function(err) {
//     if (err)
//         console.log(err);
//     else
//         console.log(todo);
// });
//---------mongodb---------------
app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, '/', 'index.html'));
})

app.get('/index', function(request, response) {
    response.sendFile(path.join(__dirname, '/', 'index.html'));
})

app.get('/search', function(request, response) {
    response.sendFile(path.join(__dirname, '/', 'search.html'));
})

// app.get('/login', function(request, response) {
//     response.sendFile(path.join(__dirname, '/', 'login.html'));
// })

app.get('/airlineData', function(request, response) {
    // console.log("get airline data");
    queryStr = 'select airline_id, airline_name, airline_iata from airlines;';
    connection.query(queryStr, function(error, results, fields) {
        if (error) throw error;
        response.json(JSON.stringify(results));
        // console.log("results");
        // console.log(results);
    })
})


// app.get('/bikes', function(request, response) {
//   response.sendFile(path.join(__dirname, '/', 'bikes.html'));
// })

// app.get('/friendships', function(request, response) {
//   response.sendFile(path.join(__dirname, '/', 'friendships.html'));
// })

// app.get('/friendshipdata', function(req, res) {
//   queryStr = 'select p.name as name, IFNULL(fc.friendCount, 0) as friendCount' +
//            ' from Person p' +
//            ' left join (' +
//            '  select login, count(friend) as friendCount ' +
//            '  from Friends ' +
//            '  group by login' +
//            ' ) fc on p.login = fc.login;';
//   connection.query(queryStr, function (error, results, fields) {
//     if (error) throw error;
//     res.json(JSON.stringify(results))
//   })
// })

// app.post('/familydata', jsonParser, function(req, res) {
//   reqName = req.body.data;
//   console.log(req.body.data);
//   queryStr = 'select p2.login, p2.name, f.role, p2.sex, p2.relationshipStatus, p2.birthyear' +
//             ' from Person p' +
//             ' inner join Family f on f.login = p.login' +
//             ' left join Person p2 on f.member = p2.login' +
//             ' where p.name = "' + reqName + '"';
//   connection.query(queryStr, function (error, results, fields) {
//     if (error) throw error;
//     res.json(JSON.stringify(results))
//   })
// })

app.get('/script.js', function(request, response) {
    response.sendFile(path.join(__dirname, '/', 'script.js'));
})

app.listen(app.get('port'), function() {
    console.log('Node app is running at localhost:' + app.get('port'))
})