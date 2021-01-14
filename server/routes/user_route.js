const express = require('express');
const app = express();
const userExpressRoute = express.Router();
const userSchema = require('../models/user_model')
const fs = require('fs')

// GET USERS
userExpressRoute.route('/get-users/').get((req, res) => {
    userSchema.find((err, data) => {
        if(err){
            return err
        }else{
            fs.appendFile('./log.txt', 'GET ALL USERS ' + Date(), (err) => {
                if(err){
                    return err
                }
            })
            res.json(data)
        }
    })
})

// CREATE USER
userExpressRoute.route('/create-user').post((req, res) => {
    userSchema.create(req.body, (err, data) => {
        if(err){
            return err
        }else {
            fs.appendFile('../log.txt', 'POST : CREATE USER ' + Date(), (err) => {
                if(err){
                    return err
                }
            })
            res.json(data)
        }
    })
})

// Update User
userExpressRoute.route('/update-user/:id').put((req, res) => {
    userSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (err, data) => {
        if(err){
            return err
        }else{
            fs.appendFile('../log.txt', 'PUT : UPDATE USER ' + Date(), (err) => {
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
userExpressRoute.route('/get-user/:id').get((req, res) => {
    userSchema.findById(req.params.id, (err, data) => {
        if(err){
            return err
        }else{
            fs.appendFile('../log.txt', 'GET : SINGLE USER ' + Date(), (err) => {
                if(err){
                    return err
                }
            })
            res.json(data)
        }
    })
})

// Delete One
userExpressRoute.route('/delete-user/:id').delete((req, res) => {
    userSchema.findByIdAndRemove(req.params.id, (err, data) => {
        if(err){
            return err
        }else{
            fs.appendFile('../log.txt', 'DELETE : SINGLE USER ' + Date(), (err) => {
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

module.exports = userExpressRoute;