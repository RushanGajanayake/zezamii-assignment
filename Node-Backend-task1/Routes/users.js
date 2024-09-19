const express = require('express');
const router = express.Router();

const userData = require('../Models/user');
const validator = require('../Utils/validators');
const logger = require('../Utils/logger');

router.use(logger);

//get all users
router.get("/", async(req, res) => {
    try {
        var data = userData.filter(user => user.active === true);
        res.status(200).json(data);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

//get user by id
router.get("/:id", async(req, res) => {
    try {
        var {id} = req.params;
        var data = userData.filter(user => user.id == id && user.active == true);
        if(!data.length){
            return res.status(404).json({message: `cant find any user with ID ${id}`});
        }
        else {
            return res.status(200).json(data);
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

//create new user and validate email address
router.post("/", (req, res) => {
    try {
        let newId = userData.length + 1;
        if(!validator.nameValidation(req.body.name)){
            return res.status(400).json({message: `Name is not valid - ${req.body.name}`});
        }
        else if(!validator.emailValidation(req.body.email)) { 
            return res.status(400).json({message: `Email is not valid - ${req.body.email}`});
        }
        else {
            userData.push({"id": newId, "active": true, ...req.body});
            return res.status(200).json({message: `Added new user - ${req.body.name}`})
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
    res.send(req.body);
});

//update the user by id
router.put("/:id", (req, res) => {
    try {
        var {id} = req.params;
        var data = userData.filter(user => user.id == id && user.active == true);
        if(!data.length){
            return res.status(404).json({message: `cant find any user with ID ${id}`});
        }
        else {
            if(!validator.nameValidation(req.body.name)){
                return res.status(400).json({message: `Name is not valid - ${req.body.name}`});
            }
            else if(!validator.emailValidation(req.body.email)) { 
                return res.status(400).json({message: `Email is not valid - ${req.body.email}`});
            }
            else {
                data[0].name = req.body.name; 
                data[0].email = req.body.email; 
                return res.status(200).json(data);
            }
        }
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
});

//deactivate the user
router.delete("/:id", (req, res) => {
    try {
        var {id} = req.params;
        var data = userData.filter(user => user.id == id && user.active == true);
        if(!data.length){
            return res.status(404).json({message: `cant find any user with ID ${id}`});
        }
        else {
            data[0].active = false;
            return res.status(200).json(data);
        }
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;