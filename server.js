import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Event from './models/Event'

// let Event = require('models/Event')

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/EventPlanner');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});


// Retrieving All Events
router.route('/Event').get((req, res) => {
    Event.find((err, events) => {
        if (err)
            console.log(err);
        else{
            res.json(events);
            console.log(events)
        }

    });
});

// Retrieving event by id
router.route('/Event/:id').get((req, res) => {
    Event.findById(req.params.id, (err, event) => {
        if (err)
            console.log(err);
        else
            res.json(event);
    })
});


// add new event
router.route('/Event/add').post((req, res) => {
    let event = new Event(req.body);
    event.save()
        .then(event => {
            res.status(200).json({'event': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

// update an event
router.route('/Event/update/:id').post((req, res) => {
    Event.findById(req.params.id, (err, event) => {
        if (!event)
            return next(new Error('Could not load Document'));
        else {
            event.name = req.body.name;
            event.time = req.body.time;
            event.description = req.body.description;
            event.isActive = req.body.isActive;
            event.save().then(event => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

// delete an event
router.route('/Event/delete/:id').get((req, res) => {
    Event.findByIdAndRemove({_id: req.params.id}, (err, event) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
