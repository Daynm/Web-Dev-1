
const express = require('express');
const trackerRouter = express.Router();
trackerRouter.get('/post');
trackerRouter.post('/post')

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Daynm:3QnmkPXZza6PRrTH@atlascluster.lzf7qef.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster')
const url = 'mongodb+srv://Daynm:3QnmkPXZza6PRrTH@atlascluster.lzf7qef.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster'
const Task = require('../models/task');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
trackerRouter.use(bodyParser.json());

const client = new MongoClient(url);

const DB = client.db('test')
const coll = DB.collection('tasks')

const cur = coll.find()

const store = []

cur.forEach(doc => {
    console.log(doc);
    store.push(doc);
})

trackerRouter.route('/') // task list
    .get((req, res) => {
        res.render('taskListView', {
            nav: [
                {link: '/', title: 'Home'},
                {link: '/tasks', title: 'Tasks'},
            ],
            title: 'Simple task tracker',
            store
        }
        );
    });

trackerRouter.route('/:id') // task list
    .get((req, res) => {
        const id = req.params.id;
        res.render(
            'tasks',
            {
                nav: [
                    {link: '/', title: 'Home'},
                    {link: '/tasks', title: 'Tasks'},
                ],
                title: 'Simple task tracker',
                store: tasks[id]
            }
        )
    });

module.exports = trackerRouter;

