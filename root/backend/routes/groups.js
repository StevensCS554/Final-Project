const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectID;
//middleware
// const middleware 	= require("../middleware");
const data = require('../data');
const groupsData = data.groupsData;

// Get single group !!
router.get("/:groupId", async (req, res) => {
   try {
      const id = req.params.groupId;
      const checkedId = checkId(id);
      const targetGroup = await groupsData.getById(checkedId);
      res.status(200).json(targetGroup);
   } catch (e) {
      res.status(500).json(e);
   }
});

//index Get all groups
router.get("/", async (req, res) => {
   try {
      const allGroup = await groupsData.getAll();
      res.status(200).json(allGroup)
   } catch (e) {
      res.status(500).json(e);
   }
});

//create Create a group (One user: one group!)
router.post("/:userId", async (req, res) => {
   try {
      //required information:
      const groupName = req.body.groupName;
      const groupNotice = req.body.groupNotice;
      const maxAge = req.body.maxAge;
      const minAge = req.body.minAge;
      const gender = req.body.gender;
      const maxGroupNo = req.body.maxGroupNo;
      const latitude = req.body.latitude;
      const longitude = req.body.longitude
      //saved user information:
      //TODO:
      // const zipcode = req.zipcode;
      // const managerId = req.user._id//managerId should be current user!
      const zipcode = req.body.zipcode;
      let managerId = req.params.userId;
      //   const posts = [];    every group has an array of posts !!

      managerId = checkId(managerId);
      if (groupName) {
         if (typeof groupName !== 'string') {
            throw `You Must Provide A groupName with string type! what you give:${typeof groupName}`;
         }
      } else {
         throw "You Must Provide A Name!";
      }
      if (groupNotice) {
         if (typeof groupNotice !== 'string') {
            throw `You Must Provide A groupNotice with string type! what you give:${typeof groupNotice}`;
         }
      } else {
         throw "You Must Provide A groupNotice!";
      }
      if (maxAge) {
         if (isNaN(maxAge)) {
            throw `You Must Provide A maxAge with number type! what you give:${typeof maxAge}`;
         }
      } else {
         throw "You Must Provide A maxAge!";
      }
      if (minAge) {
         if (isNaN(minAge)) {
            throw `You Must Provide A minAge with number type! what you give:${typeof minAge}`;
         }
      } else {
         throw "You Must Provide A minAge!";
      }
      if (gender) {
         if (typeof gender !== 'string') {
            throw `You Must Provide A gender with string type! what you give:${typeof gender}`;
         }
      } else {
         throw "You Must Provide A gender!";
      }
      if (maxGroupNo) {
         if (isNaN(maxGroupNo)) {
            throw `You Must Provide A maxGroupNo with number type! what you give:${typeof maxGroupNo}`;
         }
      } else {
         throw "You Must Provide A maxGroupNo!";
      }

      const newGroup = await groupsData.creatGroup(groupName, groupNotice, maxAge, minAge, gender, maxGroupNo, zipcode, managerId, latitude, longitude);
      res.status(200).json(newGroup);
   } catch (e) {
      console.log(e);
      res.status(500).json(e);
   }
});


//update group
router.put("/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const groupName = req.body.groupName;
      const groupNotice = req.body.groupNotice;
      const zipcode = req.body.zipcode;
      const maxAge = req.body.maxAge;
      const minAge = req.body.minAge;
      const gender = req.body.gender;
      const maxGroupNo = req.body.maxGroupNo;

      //error check
      const checkedId = checkId(id);
      if (groupName) {
         if (typeof groupName !== 'string') {
            throw `You Must Provide A groupName with string type! what you give:${typeof groupName}`;
         }
      }
      if (groupNotice) {
         if (typeof groupNotice !== 'string') {
            throw `You Must Provide A groupNotice with string type! what you give:${typeof groupNotice}`;
         }
      }
      if (zipcode) {
         if (typeof zipcode !== 'string') {
            throw `You Must Provide A zipcode with string type! what you give:${typeof zipcode}`;
         }
      }
      if (maxAge) {
         if (isNaN(maxAge)) {
            throw `You Must Provide A maxAge with number type! what you give:${typeof maxAge}`;
         }
      }
      if (minAge) {
         if (isNaN(minAge)) {
            throw `You Must Provide A minAge with number type! what you give:${typeof minAge}`;
         }
      }
      if (gender) {
         if (typeof gender !== 'string') {
            throw `You Must Provide A gender with string type! what you give:${typeof gender}`;
         }
      }
      if (maxGroupNo) {
         if (isNaN(maxGroupNo)) {
            throw `You Must Provide A maxGroupNo with number type! what you give:${typeof maxGroupNo}`;
         }
      }

      const updatedGroup = await groupsData.updateGroup(checkedId, groupName, groupNotice, zipcode, maxAge, minAge, gender, maxGroupNo);
      res.status(200).json(updatedGroup);
   } catch (e) {
      console.log(e);
      res.status(500).json(e);
   }
});

//delete the group
router.delete("/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const checkedId = checkId(id);

      const deleted = await groupsData.deleteGroupById(checkedId);
      if (deleted)
         res.status(200);
      else {
         throw `delete fail` + e;
      }
   } catch (e) {
      console.log(e);
      res.status(500).json(e);
   }
})

//add post to the group
router.post('/post/:groupId', async (req, res) => {
   try {
      let groupId = req.params.groupId;
      const username = req.body.username;
      const content = req.body.content;
      const time = req.body.time;

      // error check
      groupId = checkId(groupId);
      if (content) {
         if (typeof content !== 'string') {
            throw `You Must Provide A content with string type! what you give:${typeof content}`;
         }
      }

      const postResult = await groupsData.createPost(groupId, username, content, time);
      res.status(200).json(postResult);
   } catch (e) {
      console.log(e);
      res.status(500).json(e);
   }
})
// -----------------------Posts Section Added by Kuan -------------------
// Add a user to a group
router.post('/:groupId/:userId', async (req, res) => {
   let groupId = req.params.groupId;
   let userId = req.params.userId;
   try {
      groupId = checkId(groupId);
      userId = checkId(userId);
      const group = await groupsData.joinGroup(userId, groupId);
      res.status(200).json(group);
   } catch (e) {
      res.status(500).json({
         error: e
      })
   }
})

router.put('/profile/:groupId', async (req, res) => {
   try {
      await groupsData.addGroupProfile(req.params.groupId, req.body.url);
      res.status(200).json({
         msg: "success"
      })
   } catch (e) {
      console.log(e);
      res.status(501).json({
         msg: e
      })
   }
})

// delete a user from a group
router.delete('/:groupId/:userId', async (req, res) => {
   try {
      let groupId = req.params.groupId;
      let userId = req.params.userId;
      groupId = checkId(groupId);
      userId = checkId(userId);

      const group = await groupsData.deleteMember(groupId, userId);
      res.status(200).json(group);
   } catch (e) {
      console.log(e);
      res.status(500).json(e);
   }
})

//delete an post from group
router.delete('/post/:groupId/:postId', async (req, res) => {
   try {
      let groupId = req.params.groupId;
      let postId = req.params.postId;
      groupId = checkId(groupId);
      postId = checkId(postId);

      const group = await groupsData.deletePost(groupId, postId);
      res.status(200).json(group);
   } catch (e) {
      console.log(e);
      res.status(500).json(e);
   }
})

// Get group members

// Get group of the user
router.get('/group/:username', async (req, res) => {
   try {
      const group = await data.usersData.getUserOwnGroup(req.params.username)
      if (group === null)
         return res.status(200).json({
            groupName: null
         })
      res.status(200).json({
         groupName: group.groupName,
         groupId: group._id
      });
   } catch (e) {
      console.log(e);
      res.status(500).json({
         error: e
      })
   }
});

// get certain amount of groups in zipcode
router.get('/local/:zipcode', async (req, res) => {
   let { take, skip } = req.query;
   if (take)
      take = parseInt(take);
   if (skip)
      skip = parseInt(skip);

   try {
      const data = await groupsData.getCertainLocalGroups(req.params.zipcode, take, skip);
      const { groups, numLeftOver } = data;
      res.status(200).json({
         groups: groups,
         numLeftOver: numLeftOver
      })
   } catch (e) {
      console.log(e);
      res.status(500).json({
         error: e
      })
   }
});

// get all groups within a zipcode
router.get('/local-groups/:zipcode', async (req, res) => {
   try {
      const groups = await groupsData.getAllLocalGroups(req.params.zipcode);
      res.status(200).json({
         groups: groups
      })
   } catch (e) {
      console.log(e);
      res.status(500).json({
         error: e
      })
   }
});

router.get('/manager/:managerId', async (req, res) => {
   try {
      const group = await groupsData.getGroupByManager(req.params.managerId);
      res.status(200).json({
         group: group
      });
   } catch (e) {
      res.status(500).json({
         error: e
      })
   }
});


//-----------------------------------check--------------------------------------
//helper
function checkId(id) {
   try {
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
   } catch (e) {
      throw e;
   }
}

module.exports = router;