const express = require("express");
const router = express.Router();
const path = require('path');
const { ObjectId } = require("mongodb");
//middleware
// const middleware 	= require("../middleware");
const data = require('../data');
const usersData = data.usersData;

// //index
// router.get("/", async (req, res) => {
//     try {
//         const allGroup = await usersData.getAll();
//         res.json(allGroup)
//     } catch (e) {
//         res.status(200).json(e);
//     }
// });

//create
router.post("/", async (req, res) => {
    try {

        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const gender = req.body.gender;
        const age = req.body.age;
        const location = req.body.location;
        const bio = req.body.bio;

        if (name) {
            if (typeof name !== 'string') {
                throw `You Must Provide A Name with string type! what you give:${typeof name}`;
            }
        } else {
            throw "You Must Provide A Name!";
        }
        if (email) {
            if (typeof email !== 'string') {
                throw `You Must Provide A email with string type! what you give:${typeof location}`;
            }
        } else {
            throw "You Must Provide A email!";
        }
        
        const newUser = await usersData.createUser(name, email, phone, gender, age, location, bio);
        res.json(newUser);
    } catch (e) {
        res.status(200).json(e);
    }
});

router.get("/:id", async (req, res) => {
    try {

        const id = req.params.id;
        const checkedId = checkId(id);

        const user = await usersData.readUser(checkedId);
        res.json(user);
    } catch (e) {
        res.status(200).json(e);
    }
});

router.put("/:id", async (req, res) => {
    try {

        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const gender = req.body.gender;
        const age = req.body.age;
        const location = req.body.location;
        const bio = req.body.bio;

        if (name) {
            if (typeof name !== 'string') {
                throw `You Must Provide A Name with string type! what you give:${typeof name}`;
            }
        } else {
            throw "You Must Provide A Name!";
        }
        if (email) {
            if (typeof email !== 'string') {
                throw `You Must Provide A email with string type! what you give:${typeof location}`;
            }
        } else {
            throw "You Must Provide A email!";
        }
        
        const updatedUser = await usersData.updateUser(name, email, phone, gender, age, location, bio);
        res.json(updatedUser);

    } catch (e) {
        res.status(200).json(e);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const checkedId = checkId(req.params.id);

        const deletedUser = await usersData.deleteGroupById(checkedId);
        res.json(deletedUser);
    } catch (e) {
        res.status(200).json(e);
    }

})

router.put("/:userId/:groupId", async (req, res) =>{
    try {
        const checkedUserId = checkId(req.params.userId);
        const checkedGroupId = checkId(req.params.groupId);

        const addedUser = await usersData.addGroup(checkedUserId, checkedGroupId);
        res.json(addedUser);
    } catch (e) {
        res.status(200).json(e);
    }
})

router.delete("/:userId/:groupId", async (req, res) =>{
    try {
        const checkedUserId = checkId(req.params.userId);
        const checkedGroupId = checkId(req.params.groupId);

        const removedUser = await usersData.removeGroup(checkedUserId, checkedGroupId);
        res.json(removedUser);
    } catch (e) {
        res.status(200).json(e);
    }
})

// User Image file upload route!!! Added by Kuan //
router.post('/upload', async(req, res) => {
   if (req.files.file === null)
      return res.status(400).json({msg: 'No file uploaded!'});

   const file = req.files.file;
   const date = new Date();
   const newName = date + file.name;
   file.mv(path.resolve(`../frontend/src/upload/users/${newName}`), err => {
      if (err) {
         console.log(err);
         return res.status(500).json({e: err});
      }
      res.status(200).json({
         fileName: file.name,
         filePath: `/upload/users/${newName}`
      })
   });
});


//-----------------------------------check--------------------------------------
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