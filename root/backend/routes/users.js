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
//         res.status(500).json(e);
//     }
// });

//create
router.post("/", async (req, res) => {
    try {

        const username = req.body.username;
        const email = req.body.email;
        const age = req.body.age;
        const zipcode = req.body.zipcode;
        const gender = req.body.gender;
        const phone = req.body.phone;
        const bio = req.body.bio;

        //required
        if (username) {
            if (typeof username !== 'string') {
                throw `You Must Provide A username with string type! what you give:${typeof username}`;
            }
        } else {
            throw "You Must Provide A username!";
        }
        if (email) {
            if (typeof email !== 'string') {
                throw `You Must Provide A email with string type! what you give:${typeof email}`;
            }
        } else {
            throw "You Must Provide A email!";
        }
        if (age) {
            if (isNaN(age)) {
                throw `You Must Provide A age with number type! what you give:${typeof age}`;
            }
        } else {
            throw "You Must Provide A age!";
        }
        if (zipcode) {
            if (typeof zipcode !== 'string') {
                throw `You Must Provide A zipcode with string type! what you give:${typeof zipcode}`;
            }
        } else {
            throw "You Must Provide A zipcode!";
        }
        if (gender) {
            if (typeof gender !== 'string') {
                throw `You Must Provide A gender with string type! what you give:${typeof gender}`;
            }
        } else {
            throw "You Must Provide A gender!";
        }
        if (phone) {
            if (typeof phone !== 'string') {
                throw `You Must Provide A phone with string type! what you give:${typeof phone}`;
            }
        } else {
            throw "You Must Provide A phone!";
        }
        //optional
        if (bio) {
            if (typeof bio !== 'string') {
                throw `You Must Provide A bio with string type! what you give:${typeof bio}`;
            }
        }
        const newUser = await usersData.createUser(username, email, age, zipcode, gender, phone, bio);
        res.json(newUser);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get("/:newUsername", async (req, res) => {
    try {
        const newUsername = req.params.newUsername;
        
        const user = await usersData.readUserByName(newUsername);
        if (user == null) res.json({noUser: true});
        else res.json({noUser: false});
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get("/getbyid/:id", async (req, res) => {
    try {

        const id = req.params.id;
        const checkedId = checkId(id);

        const user = await usersData.readUser(checkedId);
        res.json(user);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get("/getbyemail/:newEmail", async (req, res) => {
    try {

        const newEmail = req.params.newEmail;

        const user = await usersData.readUserByEmail(newEmail);
        if (user == null) res.json({noEmail: true});
        else res.json({noEmail: false});
    } catch (e) {
        res.status(500).json(e);
    }
});

router.put("/:id", async (req, res) => {
    try {

        const id = req.params.id;
        const username = req.body.username;
        const email = req.body.email;
        const age = req.body.age;
        const zipcode = req.body.zipcode;
        const gender = req.body.gender;
        const phone = req.body.phone;
        const bio = req.body.bio;

        // required
        const checkedId = checkId(id);
        //optional
        if (username) {
            if (typeof username !== 'string') {
                throw `You Must Provide A username with string type! what you give:${typeof username}`;
            }
        }
        if (email) {
            if (typeof email !== 'string') {
                throw `You Must Provide A email with string type! what you give:${typeof email}`;
            }
        }
        if (age) {
            if (isNaN(age)) {
                throw `You Must Provide A age with number type! what you give:${typeof age}`;
            }
        }
        if (zipcode) {
            if (typeof zipcode !== 'string') {
                throw `You Must Provide A zipcode with string type! what you give:${typeof zipcode}`;
            }
        }
        if (gender) {
            if (typeof gender !== 'string') {
                throw `You Must Provide A gender with string type! what you give:${typeof gender}`;
            }
        }
        if (phone) {
            if (typeof phone !== 'string') {
                throw `You Must Provide A phone with string type! what you give:${typeof phone}`;
            }
        }
        if (bio) {
            if (typeof bio !== 'string') {
                throw `You Must Provide A bio with string type! what you give:${typeof bio}`;
            }
        }
        
        const updatedUser = await usersData.updateUser(checkedId, username, email, age, zipcode, gender, phone, bio);
        res.json(updatedUser);

    } catch (e) {
        res.status(500).json(e);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const checkedId = checkId(req.params.id);

        const deletedUser = await usersData.deleteGroupById(checkedId);
        res.json(deletedUser);
    } catch (e) {
        res.status(500).json(e);
    }

})

router.put("/:userId/:groupId", async (req, res) =>{
    try {
        const checkedUserId = checkId(req.params.userId);
        const checkedGroupId = checkId(req.params.groupId);

        const addedUser = await usersData.addGroup(checkedUserId, checkedGroupId);
        res.json(addedUser);
    } catch (e) {
        res.status(500).json(e);
    }
})

router.delete("/:userId/:groupId", async (req, res) =>{
    try {
        const checkedUserId = checkId(req.params.userId);
        const checkedGroupId = checkId(req.params.groupId);

        const removedUser = await usersData.removeGroup(checkedUserId, checkedGroupId);
        res.json(removedUser);
    } catch (e) {
        res.status(500).json(e);
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
      res.status(500).json({
         filename: file.name,
         filepath: `/uploads/users/${newName}`
      })
   });
});

router.get('/groups/:username', async(req, res) => {
   console.log(req.params.username);
   try {
      const groups = await usersData.getUserGroup(req.params.username);
      res.status(200).json({
         groups: groups
      })
   } catch(e) {
      console.log(e);
      res.status(502).json({
         error: e
      })
   }
})


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