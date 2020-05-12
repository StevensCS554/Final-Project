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
      res.json(targetGroup);
   } catch (e) {
      res.status(500).json(e);
   }
});

//index Get all groups
router.get("/", async (req, res) => {
   try {
      const allGroup = await groupsData.getAll();
      res.json(allGroup)
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
      //saved user information:
      //TODO:
      // const zipcode = req.zipcode;
      // const managerId = req.user._id//managerId should be current user!
      const zipcode = req.body.zipcode;
      const managerId = req.params.userId;
      //   const posts = [];    every group has an array of posts !!

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

      const newGroup = await groupsData.creatGroup(groupName, groupNotice, maxAge, minAge, gender, maxGroupNo, zipcode, managerId);
      res.json(newGroup);
   } catch (e) {
      res.status(500).json(e);
   }
});


//update group
router.put("/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const groupName = req.body.groupName;
      const groupNotice = req.body.groupNotice;
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

      const updatedGroup = await groupsData.updateGroup(checkedId, groupName, groupNotice, maxAge, minAge, gender, maxGroupNo);
      res.json(updatedGroup);
   } catch (e) {
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
      res.status(500).json(e);
   }

})


// -----------------------Posts Section Added by Kuan -------------------
// Add a user to a group
router.put('/:groupId/:userId', async (req, res) => {
   let groupId = req.params.groupId;
   let userId = req.params.userId;
   try {
      groupId = checkId(groupId);
      userId = checkId(userId);
      const group = await groupsData.joinGroup(userId, groupId);
      res.status(200).json(group);
   } catch(e) {
      res.status(500).json({
         error: e
      })
   }
})

// delete a user from a group
router.delete('/:groupId/:userId', async (req, res) => {
   console.log("deleting user from group");
   try {
      let groupId = req.params.groupId;
      let userId = req.params.userId;
      groupId = checkId(groupId);
      userId = checkId(userId);

      const group = await groupsData.deleteMember(userId, groupId);
      res.status(200).json(group);
   } catch(e) {
      res.status(500).json(e);
   }
})

// Get group members

//-----------------------------------check--------------------------------------
//helper
function checkId(id) {
   try{
      if (!id) throw "You Must Provide A Id!";
      if (id._bsontype == "ObjectID") {
         return id;
      }
      else if (typeof id == "string") {
         if(ObjectId.isValid(id))
            return ObjectId(id);
         else{
            throw `not valid id: ${id}`
         }
      }
      else throw "Input Can't Be An Id!"
   }catch(e){
      throw e;
   }
}

module.exports = router;