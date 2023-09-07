const config = require('config');
const express = require('express');
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(helmet());

// Configuration
console.log(`Application name: ${config.get("name")}`);
console.log(`Application mail server: ${config.get("mail.host")}`);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...')
}

const genres = [
    {id: 1, name: 'Horror'},
    {id: 2, name: 'Fiction'},
    {id: 3, name: 'Child'}
]

// CRUD
app.get('/api/genres', (req, res) => {
    res.send(genres);
});

// CRUD - Create
app.post('/api/genres', (req, res) => {
    const {error} = validateGenres(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = {
        id: genres[genres.length-1].id + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genres);
})

// CRUD - Read
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Given genre is not found!');

    res.send(genre);
})

// CRUD - Update
app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Given genre is not found')

    const {error} = validateGenres(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Reference not needed
    // genres[req.params.id-1].name = req.body.name;
    // res.send(genres[req.params.id-1])

    genre.name = req.body.name;
    res.send(genre)
})

// CRUD - Delete
app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Given genre is not found')

    genres.splice(genres.indexOf(genre), 1);

    res.send(genres);
})

// Listening
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

// validate genres
function validateGenres(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(genre);
}
