const express = require('express');

const chalk = require('chalk');

const path = require('path'); 

const morgan = require('morgan');

const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://Daynm:3QnmkPXZza6PRrTH@atlascluster.lzf7qef.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster')
const Task = require('./models/task');

const taskRouter = require('./routes/taskRoutes');
const bodyParser = require('body-parser');
app.use('/tasks', taskRouter);

app.use(morgan('tiny'));
app.use(bodyParser.json());

app.get('/getData', (req, res) => { //get data
    Task.find().then(foundTasks => {
        console.log("tasks found successfully", foundTasks)
    })
})

app.post('/data', (req, res) => { //upload data
    const newTask = new Task({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        due_date: req.body.due_date
    });
    newTask.save().then(savedTask => {
        console.log("task saved successfully", savedTask)
    })
});

//Static Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(express.json()); app.use('/taskRoutes', taskRouter);

app.set('views', './views');
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    res.render('index', 
    {
        nav: [
            {link: '/', title: 'Home'},
            {link: '/tasks', title: 'Tasks'},
        ],
        title: 'Simple task tracker'}
    );
});

app.listen(4000, function() {
    console.log(`Server is running on port ${chalk.green('4000')}`);
});