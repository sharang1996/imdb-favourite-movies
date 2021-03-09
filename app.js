const mysql = require('mysql');
require('dotenv').config()
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const https = require('https')
const fetch = require('node-fetch');
const hbs = require('hbs');
const { Session } = require('express-session');


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'test'
});

const app = express();
const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './views');
app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(publicDir));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
    response.render('login')
});
app.get('/logout', function(request, response) {
    request.session.destroy();
    response.render('login')
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

app.get('/home', async function(request, response) {

    if (request.session.loggedin) {
        let movie_data = [];
        const favourite_movies = request.session.favourite_movies;
        favourite_movies.forEach(async (imdb_id, index) => {
            let query = `SELECT * FROM movies where id='${imdb_id}'`
            connection.query(query, async function(err, result) {
                let subset = {};
                if (err) throw err
                if(result.length === 0){
                    console.log(imdb_id)
                    const url = `https://www.omdbapi.com/?i=${imdb_id}&apikey=${process.env.API_KEY}`
                    const data = await fetch(url).then(response => response.json());
                    subset = {
                        Title: data.Title,
                        Plot: data.Plot,
                        Poster: data.Poster,
                        imdbId: data.imdbID,
                        Released: data.Released,
                        Runtime: data.Runtime,
                        Rating: data.imdbRating,
                        Genre: data.Genre.split(',')[0]
                    }
                    movie_data.push(subset)
                    let sql = 'insert into movies(id, title, plot, poster, released, rating, runtime,genre) values (?, ?, ?,?,?,?,?,?)';
                    let values = [data.imdbID, data.Title, data.Plot, data.Poster, data.Released, data.imdbRating, data.Runtime, data.Genre];
                    connection.query(sql, values, function (err, result) {
                        if (err) throw err;
                    })
                }
                else {
                    subset = {
                        Title: result[0].title,
                        Plot: result[0].plot,
                        Poster: result[0].poster,
                        imdbId: result[0].id,
                        Released: result[0].released,
                        Runtime: result[0].runtime,
                        Rating: result[0].rating,
                        Genre: result[0].genre.split(',')[0]
                    }
                    movie_data.push(subset)
                }
                if (movie_data.length === favourite_movies.length) {
                    request.session.movie_data = {
                        movie_data: movie_data,
                        username: request.session.username
                    };
                    response.redirect('/display');
                    response.end();
                }
            })

        })
    }

});


app.get('/display', function(request, response) {
if (request.session.loggedin) {
    response.render('display', {movies: request.session.movie_data['movie_data']})
    } 
else {
        response.send('Please login to view this page!');
        response.end();
    }
});

app.get('/delete/:imdbid', function(request, response) {
    const imdbId = request.params.imdbid;
    const username = request.session.movie_data['username'];
    //udpate session object
    request.session.movie_data['movie_data'] = request.session.movie_data['movie_data'].filter(item => item['imdbId'] !== imdbId);
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
    if (request.session.loggedin) {
        let movies  = request.session['favourite_movies'];
        request.session['favourite_movies'].push(request.query['imdbID']);
        const uniqueMovieId = new Set(request.session.favourite_movies);
        request.session['favourite_movies'] = Array.from(uniqueMovieId)
        const newFavs = request.session['favourite_movies'].join(',');
        if (request.session['favourite_movies'].length === movies.length - 1) {
            // response.send('<script>alert("Already added this movie")</script>'); 
        }
        //update db
        const sql = `UPDATE users SET favourite_movies = '${newFavs}' WHERE firstName = '${request.session.movie_data['username']}'`;
    
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
    
            //redirect to home
            response.redirect('/home');
            response.end();
        });
    }
    else {
        response.send('Please login to view this page!');
        response.end();
    }


});

app.listen(port, () => {
    console.log('App is listening on port ', port)
});