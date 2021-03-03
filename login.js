const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const https = require('https')
const fetch = require('node-fetch');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Boonstreet@1996',
    database: 'movies'
});

const app = express();

app.use(express.static(__dirname));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/auth', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM users WHERE firstName = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                request.session.favourite_movies = results[0]['favourite_movies'].split(',');

                //console.log(results[0]['favourite_movies']);
                response.redirect('/home');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

app.get('/home', function(request, response) {

    if (request.session.loggedin) {

        const movie_data = [];
        const favourite_movies = request.session.favourite_movies;

        favourite_movies.forEach((imdb_id) => {

            (async () => {

                const url = `https://www.omdbapi.com/?i=${imdb_id}&apikey=efd62956`

                const data = await fetch(url).then(response => response.json());

                const subset = {
                    Title: data.Title,
                    Plot: data.Plot,
                    Poster: data.Poster,
                    imdbId: data.imdbID,
                    Released: data.Released,
                    Runtime: data.Runtime,
                    Rating: data.imdbRating,
                    Genre: data.Genre.split(',')[0]
                }

                console.log(subset);
                console.log('\n');

                movie_data.push(subset);

                if (movie_data.length === favourite_movies.length) {

                    request.session.movie_data = {
                        movie_data: movie_data,
                        username: request.session.username
                    };
                    response.redirect('/display');
                    response.end();
                }

            })();
        });


        /*
        (async () => {
            data = await fetch(url).then(response => response.json());
            console.log(data);
            response.send('Welcome back, ' + request.session.username + '!' + data);
            response.end();
        })();
        */

        /*
        https.get(url, (resp) => {
        
            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {

                //response.send('Welcome back, ' + request.session.username + '!' + data);
                console.log(data);

                request.session.movie_data = data;
                response.redirect('/display');

                response.end();
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
        */

    } else {
        response.send('Please login to view this page!');
        response.end();
    }

});


app.get('/display', function(request, response) {

    //todo : UI to display, with buttons to remove movies
    //response.send(request.session.movie_data);

    const prefix = `<!DOCTYPE html>
    <html lang="en" >
    <head>
      <meta charset="UTF-8">
      <title>Favourite movie list</title>
      <link rel="stylesheet" href="./display.css">
    
    </head>
    <body>`;

    const suffix = `<form action="/add" id="add">
                <label for="imdbID">IMDB ID:</label> 
                <input type="text" id="imdbID" name="imdbID">
                <input type="submit" value="Add Movie" />
            </form>
        </body>
    </html>`;

    let middle = '';

    console.log(request.session.movie_data);

    for (element of request.session.movie_data['movie_data']) {

        const templateStr = `<figure class="movie">
        <div class="movie__hero">
          <img src="${element.Poster}" alt="Poster" class="movie__img">
        </div>
        <div class="movie__content">
          <div class="movie__title">
            <h1 class="movie__heading">${element.Title}</h1>
            <div class="movie__genre movie__genre--1">#${element.Genre}</div>
            <div class="movie__genre delete">
              <a href="/delete/${element.imdbId}" id='${element.imdbId}'>x</a>
            </div>
          </div>
          <p class="movie__description">${element.Plot}</p>
          <div class="movie__details">
            <p class="movie__detail"><span class="emoji">📅</span>${element.Released}</p>
            <p class="movie__detail"><span class="emoji">⏱</span>${element.Runtime}</p>
            <p class="movie__detail"><span class="emoji">⭐️</span>${element.Rating} / 10</p>
          </div>
        </div>
      </figure>`
        middle = middle.concat(templateStr);

    }
    response.send(prefix.concat(middle, suffix));
});

app.get('/delete/:imdbid', function(request, response) {
    const imdbId = request.params.imdbid;
    console.log(imdbId);
    const username = request.session.movie_data['username'];
    console.log(username);

    //udpate session object
    request.session.movie_data['movie_data'] = request.session.movie_data['movie_data'].filter(item => item['imdbId'] !== imdbId);
    console.log(request.session.movie_data['movie_data']);

    let newFavs = ''
    for(const {imdbId:id} of request.session.movie_data['movie_data']){
        newFavs = newFavs.concat(id, ',');
    }
    newFavs = newFavs.slice(0, -1);
    console.log(newFavs);
    
    //delete this id from the database

    const sql = `UPDATE users SET favourite_movies = '${newFavs}' WHERE firstName = '${username}'`;

    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");

        //redirect to display
        response.redirect('/display');
        response.end();
    });    
    
});

app.get('/add', function(request, response) {
    console.log(request.query['imdbID']);

    request.session['favourite_movies'].push(request.query['imdbID']);
    console.log(request.session['favourite_movies']);

    
    const newFavs = request.session['favourite_movies'].join(',');

    //update db
    const sql = `UPDATE users SET favourite_movies = '${newFavs}' WHERE firstName = '${request.session.movie_data['username']}'`;

    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");

        //redirect to home
        response.redirect('/home');
        response.end();
    });

});

app.listen(3000);