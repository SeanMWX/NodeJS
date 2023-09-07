// Dependencies always on the top
const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

const courses = [
    {id: 1, name: 'Course 1'},
    {id: 2, name: 'Course 2'},
    {id: 3, name: 'Course 3'}
];

app.get('/', (req, res) => {
  res.send('Hello World!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// /api/courses/1
app.get('/api/courses/old/:id', (req, res) => {
    if (req.params.id <= courses.length) {
        res.send(courses[req.params.id-1]);
    } else {
        res.send(`No this course with id [${req.params.id}]`);
    }
    
});

app.get('/api/courses/:id', (req, res) => {
    // let or const
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Given course not existed');
    res.send(course);
});

app.get('/api/posts/:year/:month/:day', (req, res) => {
    // res.send(req.params); compulsory
    // res.send(req.query); optional
    res.send(`The post is uploaded on ${req.params.year}/${req.params.month}/${req.params.day}.`);
});

// You should never trust what client sends you
app.post('/api/courses/', (req, res) => {
    const {error} = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(courses);
});

app.put('/api/courses/:id', (req, res) => {
    // Look up course with given id
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Given course not existed');

    // Validate
    // If invalid, return 400 - Bad request
    const {error} = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Update the course
    course.name = req.body.name;

    // Return the updated course to the client
    res.send(course);
})

app.delete('/api/courses/:id', (req, res) => {
    // Look up the course
    // Not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Given course not existed');

    // Delete 
    courses.splice(courses.indexOf(course), 1);
    
    // Return the same course
    res.send(courses);
})

// Environment variables: Ports
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate(course);
}