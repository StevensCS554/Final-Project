const express = require("express");
const router = express.Router();
const path = require('path');
const { ObjectId } = require("mongodb");
const authUser = require('../middleware/auth');
//middleware
// const middleware 	= require("../middleware");
const data = require('../data');
const usersData = data.usersData;


// //index
// router.get("/", async (req, res) => {
//     try {
//         const allGroup = await usersData.getAll();
//         res.status(200).json(allGroup)
//     } catch (e) {
//         res.status(500).json(e);
//     }
// });

// redirection was disrupted by get /
router.get('/logout', async(req, res) => {
   console.log('--------logout----------');
   res.clearCookie('connect.sid');
   req.session.destroy();
   res.status(200).json({
      auth: 'unauth'
   });
})
//create
router.post("/", async (req, res) => {
   // console.log('----------------------/---------post------------')
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
      req.session.userId = newUser._id;
      res.status(200).json(newUser);
   } catch (e) {
      res.status(500).json(e);
   }
});

router.get("/:newUsername", async (req, res) => {
   try {
      const newUsername = req.params.newUsername;

      const user = await usersData.readUserByName(newUsername);
      if (user == null) res.status(200).json({ noUser: true });
      else res.status(200).json({ noUser: false });
   } catch (e) {
      res.status(500).json(e);
   }
});

router.get("/getbyid/:id", authUser, async (req, res) => {
   try {

      const id = req.params.id;
      const checkedId = checkId(id);

      const user = await usersData.readUser(checkedId);
      res.status(200).json(user);
   } catch (e) {
      console.log(e);
      res.status(500).json(e);
   }
});

router.get("/getbyemail/:newEmail", async (req, res) => {
   try {

      const newEmail = req.params.newEmail;

      const user = await usersData.readUserByEmail(newEmail);
      if (user == null) res.status(200).json({ noEmail: true });
      else res.status(200).json({ noEmail: false });
   } catch (e) {
      res.status(500).json(e);
   }
});

router.get("/getuserbyemail/:email", async (req, res) => {
   try {
      const email = req.params.email;

      const user = await usersData.readUserByEmail(email);
      if (user === null) throw `user not found with email: ${email}`;
      else res.status(200).json(user);
   } catch (e) {
      console.log(e);
      res.status(500).json(e);
   }
});

router.get("/getUserByUsername/:username", async (req, res) => {
   try {
      const username = req.params.username;
      if (username) {
         if (typeof username !== 'string') {
            throw `You Must Provide A username with string type! what you give:${typeof username}`;
         }
      } else {
         throw "You Must Provide A username!";
      }

      const user = await usersData.readUserByName(username);
      if (user == null) throw `user not found with username: ${username}`;
      res.status(200).json(user);
   } catch (e) {
      res.status(500).json(e);
   }
});

router.put("/:id", authUser, async (req, res) => {
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
      res.status(200).json(updatedUser);

   } catch (e) {
      res.status(500).json(e);
   }
});

router.delete("/:id", authUser, async (req, res) => {
   try {
      const checkedId = checkId(req.params.id);

      const deletedUser = await usersData.deleteGroupById(checkedId);
      res.status(200).json(deletedUser);
   } catch (e) {
      res.status(500).json(e);
   }

})

// Add a group to a user
router.put("/:userId/:groupId", authUser, async (req, res) => {
   try {
      const checkedUserId = checkId(req.params.userId);
      const checkedGroupId = checkId(req.params.groupId);

      const addedUser = await usersData.addGroup(checkedUserId, checkedGroupId);
      res.status(200).json(addedUser);
   } catch (e) {
      res.status(500).json(e);
   }
})

// delete a group from a user
router.delete("/:userId/:groupId", authUser, async (req, res) => {
   try {
      let groupId = req.params.groupId;
      let userId = req.params.userId;
      groupId = checkId(groupId);
      userId = checkId(userId);

      const removedUser = await usersData.removeGroup(userId, groupId);
      res.status(200).json(removedUser);
   } catch (e) {
      res.status(500).json(e);
   }
})

// ----------------------- Added by Kuan ------------------ //
// Get groups user in
router.get('/groups/:username', authUser, async (req, res) => {
   try {
      const groups = await usersData.getUserGroup(req.params.username);
      res.status(200).json({
         groups: groups
      })
   } catch (e) {
      console.log('groups' + e);
      res.status(502).json({
         error: e
      })
   }
});

router.get('/profile/:username', authUser, async (req, res) => {
   // if (Object.entries(cookie).length === 0 && cookie.constructor === Object) {
   //    console.log(1);
   //    console.log(hehe(req.cookies));
   //    res.cookie("Agile Monster", "value", {
   //       maxAge: 1000 * 60 * 60
   //    });
   //    req.session.cookie.userId = req.session.userId;
   //    console.log(req.session.cookie);
   //    console.log(hehe(req.cookies));
   // }
   console.log('get profile cookies and session')
   console.log(req.cookies);
   console.log(req.session);
   try {
      const url = await usersData.getUserProfileUrl(req.params.username);
      res.status(200).json({
         url: url
      })
   } catch (e) {
      res.status(500).json({
         error: e
      })
   }
});

// update user profile
router.post('/profile/:username', authUser, async (req, res) => {
   try {
      await usersData.updateUserProfile(req.params.username, req.body.url);
      res.status(200).json({
         msg: 'success!'
      })
   } catch (e) {
      console.log(e);
      res.status(500).json({
         error: e
      })
   }
});

router.get('/', async (req, res) => {
   try {
      const users = await usersData.getAllUser();
      res.status(200).json({
         users: users
      });
   } catch (e) {
      console.log(e);
      res.status(500).json({
         error: e
      })
   }
});

router.get('/getUserByName/:username', async (req, res) => {
   console.log('get user by name');
   console.log(req.session);
   try {
      const user = await usersData.readUserByName(req.params.username);
      res.status(200).json({
         user: user
      });
   } catch (e) {
      console.log(e);
      res.status(500).json({
         error: e
      })
   }
})

// search everything !!!
router.get('/search/:item', authUser, async (req, res) => {
   try {
      const result = {
         userInfo: undefined,
         groupsInfo: undefined
      }
      result.userInfo = await usersData.searchUsers(req.params.item);
      result.groupsInfo = await data.groupsData.searchGroups(req.params.item);
      res.status(200).json({
         result: result
      })
   } catch(e) {
      console.log(e);
      res.status(500).json({
         error: e
      })
   }
});

router.post('/login', async(req, res, next) => {
   req.session.auth = 'user';
   console.log('------------login-------------');
   console.log(req.session);
   res.status(200);
   next();
})




//-----------------------------------check--------------------------------------
function checkId(id) {
   if (!id) throw "You Must Provide A Id!";
   if (id._bsontype == "ObjectID") {
      return id;
   }
   else if (typeof id == "string") {
      if (ObjectId.isValid(id))
         return ObjectId(id);
      else {
         throw `not valid id: ${id}`
      }
   }
   else throw "Input Can't Be An Id!"
}

module.exports = router;