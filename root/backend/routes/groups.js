const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
//middleware
// const middleware 	= require("../middleware");
const data = require('../data');
const groupsData = data.groupsData;

//index
router.get("/", async (req, res) => {
    try {
        const allGroup = await groupsData.getAll();
        res.json(allGroup)
    } catch (e) {
        res.status(200).json(e);
    }
});

//create
router.post("/", async (req, res) => {
    try {

        const name = req.body.name;
        const location = req.body.location;
        //TODO: 
        const manager = req.body.manager;
        //manager should be current user!
        //using the gived for now
        // const manager = {
        //     id: req.user._id,
        //     username: req.user.username
        // };
        const description = req.body.description;

        if (name) {
            if (typeof name !== 'string') {
                throw `You Must Provide A Name with string type! what you give:${typeof name}`;
            }
        } else {
            throw "You Must Provide A Name!";
        }
        if (location) {
            if (typeof location !== 'string') {
                throw `You Must Provide A location with string type! what you give:${typeof location}`;
            }
        } else {
            throw "You Must Provide A location!";
        }
        if (manager) {
            if (typeof manager !== 'string') {
                throw `You Must Provide A location with string type! what you give:${typeof manager}`;
            }
        } else {
            throw "You Must Provide A location!";
        }
        if (description) {
            if (typeof description !== 'string') {
                throw `You Must Provide A description with string type! what you give:${typeof description}`;
            }
        } else {
            throw "You Must Provide A description!";
        }

        const newGroup = await groupsData.creatGroup(name, location, mamager, description);
        res.json(newGroup);
    } catch (e) {
        res.status(200).json(e);
    }
});

//show
router.get("/:id", async (req, res) => {
    try {

        const id = req.params.id;
        const checkedId = checkId(id);

        const targetGroup = await groupsData.getById(checkedId);
        res.json(targetGroup);
    } catch (e) {
        res.status(200).json(e);
    }
});

// // TODO:
// //edit page
// router.get("/:id/edit", (req, res) => {
//     const id = req.params.id;
//     const checkedId = checkId(id);
//     const targetGroup = await groupsData.getById(checkedId);
// });

//update group
router.put("/:id", async (req, res) => {
    try {

        const id = req.params.id;
        const name = req.body.name;
        const location = req.body.location;
        //TODO: 
        const manager = req.body.manager;
        //manager should be current user!
        //using the gived for now
        // const manager = {
        //     id: req.user._id,
        //     username: req.user.username
        // };
        const description = req.body.description;

        //error check
        const checkedId = checkId(id);
        if (name) {
            if (typeof name !== 'string') {
                throw `You Must Provide A Name with string type! what you give:${typeof name}`;
            }
        }
        if (location) {
            if (typeof location !== 'string') {
                throw `You Must Provide A location with string type! what you give:${typeof location}`;
            }
        }
        if (manager) {
            if (typeof manager !== 'string') {
                throw `You Must Provide A location with string type! what you give:${typeof manager}`;
            }
        }
        if (description) {
            if (typeof id !== 'string') {
                throw `You Must Provide A description with string type! what you give:${typeof id}`;
            }
        }

        const updatedGroup = await groupsData.updateGroup(checkedId, name, location, mamager, description);
        res.json(updatedGroup);
    } catch (e) {
        res.status(200).json(e);
    }
});

//destory campground route
router.delete("/:id", async (req, res) => {
    try {

        const id = req.params.id;
        const checkedId = checkId(id);

        const deleted = await groupsData.deleteGroupById(checkId);
    } catch (e) {
        res.status(200).json(e);
    }

})

//-----------------------------------check--------------------------------------
//helper
function checkId(id) {
    if (!id) throw "You Must Provide A Id!";
    if (id._bsontype == "ObjectID") {
        return id;
    }
    else if (typeof id == "string") {
        return ObjectId(id);
    }
    else throw "Input Can't Be An Id!"
}

module.exports = router;