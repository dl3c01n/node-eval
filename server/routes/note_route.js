const express = require('express');
const app = express();
const noteExpressRouter = express.Router();
const noteSchema = require('../models/note_model')
const fs = require('fs');

// GET USERS
noteExpressRouter.route('/get-notes/').get((req, res) => {
    noteSchema.find((err, data) => {
        if(err){
            return err
        }else{
            fs.appendFile('./log.txt', 'GET ALL NOTES ' + Date() + '\r\n', (err) => {
                if(err){
                    return err
                }
            })
            res.json(data)
        }
    })
})

// CREATE USER
noteExpressRouter.route('/create-note').post((req, res) => {
    noteSchema.create(req.body, (err, data) => {
        if(err){
            return err
        }else {
            fs.appendFile('./log.txt', 'POST: CREATE NOTE ' + Date(), (err) => {
                if(err){
                    return err
                }
            })
            res.json(data)
        }
    })
})

// Update User
noteExpressRouter.route('/update-note/:id').put((req, res) => {
    noteSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (err, data) => {
        if(err){
            return err
        }else{
            fs.appendFile('./log.txt', 'PUT: UPDATE NOTE ' + Date(), (err) => {
                if(err){
                    return err
                }
            })
            res.status(200).json({
                msg: data
            })
        }
    })
})

// Get One
noteExpressRouter.route('/get-note/:id').get((req, res) => {
    noteSchema.findById(req.params.id, (err, data) => {
        if(err){
            return err
        }else{
            fs.appendFile('./log.txt', 'GET : SINGLE NOTE ' + Date(), (err) => {
                if(err){
                    return err
                }
            })
            res.json(data)
        }
    })
})

// Delete One
noteExpressRouter.route('/delete-note/:id').delete((req, res) => {
    noteSchema.findByIdAndRemove(req.params.id, (err, data) => {
        if(err){
            return err
        }else{
            fs.appendFile('./log.txt', 'DELETE : SINGLE NOTE ' + Date(), (err) => {
                if(err){
                    return err
                }
            })
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = noteExpressRouter;