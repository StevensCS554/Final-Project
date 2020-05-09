const mongoCollections = require("../config/mongoCollections");
const groups = mongoCollections.groups;
const users = mongoCollections.users;
const { ObjectId } = require("mongodb");
// const ObjectID = require('mongodb').ObjectID;
const userData = require('./users');
// const middleware = require("../middleware");

//get all the group
async function getAll() {
   try {
      const groupsCollection = await groups();
      const allGroup = groupsCollection.find({}).toArray();
      return allGroup;
   } catch (e) {
      throw `` + e;
   }
};

//get a group by id
async function getById(id) {
   try {
      checkId(id);
      const groupsCollection = await groups();
      const group = await groupsCollection.findOne({ _id: id });
      return group;
   } catch (e) {
      throw `` + e;
   }
};

async function creatGroup(groupName, groupNotice, maxAge, minAge, gender, maxGroupNo, zipcode, managerId) {
   try {
      const newGroup = {
         groupName: groupName,
         groupNotice: groupNotice,
         maxAge: maxAge,
         minAge: minAge,
         gender: gender,
         maxGroupNo: maxGroupNo,
         zipcode: zipcode,
         users: [],
         managerId: managerId,
         posts: []
      }
      const groupsCollection = await groups();
      const insertedGroup = await groupsCollection.insertOne(newGroup);
      // if(insertedGroup.id)
      return newGroup;
   } catch (e) {
      throw `` + e;
   }
};

//update group
async function updateGroup(id, groupName = null, groupNotice = null, maxAge = null, minAge = null, gender = null, maxGroupNo = null) {
   try {
      const checkedId = checkId(id);//double check may not needed;

      //find and update
      const groupsCollection = await groups();
      if (groupName) {
         const updatedGroup = await groupsCollection.updateOne({ _id: checkedId }, { $set: { groupName: groupName } });
         if (updatedGroup.modifiedCount === 0) throw "Can't Update groupName of Group with ID: " + checkedId;
      }
      if (groupNotice) {
         const updatedGroup = await groupsCollection.updateOne({ _id: checkedId }, { $set: { groupNotice: groupNotice } });
         if (updatedGroup.modifiedCount === 0) throw "Can't Update groupNotice of Group with ID: " + checkedId;
      }
      if (maxAge) {
         const updatedGroup = await groupsCollection.updateOne({ _id: checkedId }, { $set: { maxAge: maxAge } });
         if (updatedGroup.modifiedCount === 0) throw "Can't Update maxAge of Group with ID: " + checkedId;
      }
      if (minAge) {
         const updatedGroup = await groupsCollection.updateOne({ _id: checkedId }, { $set: { minAge: minAge } });
         if (updatedGroup.modifiedCount === 0) throw "Can't Update minAge of Group with ID: " + checkedId;
      }
      if (gender) {
         const updatedGroup = await groupsCollection.updateOne({ _id: checkedId }, { $set: { gender: gender } });
         if (updatedGroup.modifiedCount === 0) throw "Can't Update gender of Group with ID: " + checkedId;
      }
      if (maxGroupNo) {
         const updatedGroup = await groupsCollection.updateOne({ _id: checkedId }, { $set: { maxGroupNo: maxGroupNo } });
         if (updatedGroup.modifiedCount === 0) throw "Can't Update maxGroupNo of Group with ID: " + checkedId;
      }
      return await getById(checkedId);
   } catch (e) {
      throw e;
   }
};

//delete group 
async function deleteGroupById(id) {
   try {
      const checkedId = checkId(id);

      const groupcollection = await groups();
      const deleteGroup = await groupcollection.deleteOne({ _id: checkedId });
      if (!deleteGroup.result) throw "Can't Delete Comment with ID: " + checkedId;
      return true;
   } catch (e) {
      throw e;
   }
};

// -----------------------Posts Section Added by Kuan -------------------
async function joinGroup(userId, groupId) {
   groupId = checkId(groupId);
   userId = checkId(userId);
   let group = await getById(groupId);
   const user = await userData.readUser(userId);
   if (user.age >= group.maxAge || user.age <= group.minAge)
      throw 'Your age does not meet requirements!';
   if (group.users.length >= group.maxGroupNo)
      throw 'Goup has met its max number!';
   if (group.gender !== 'none' && group.gender !== user.gender)
      throw 'Group requires a different gender!';
   const groupcollection = await groups();
   const updateInfo = await groupcollection.updateOne(
      { _id: groupId },
      { $push: { users: user } }
   );
   const userCollection = await users();

   const updateInfo2 = await userCollection.updateOne(
      {_id: userId},
      {$push: {groups: groupId}}
   );
   if (!updateInfo || !updateInfo2)
      throw 'Can\'t join in!'
   group = await getById(groupId);
   return group;
}

async function deleteMember(groupId, userId) {
   groupId = checkId(groupId);
   userId = checkId(userId);
   const groupcollection = await groups();
   const updateInfo = await groupcollection.updateOne(
      { _id: groupId },
      { $pull: { user: userId } }
   );
   if (!updateInfo)
      throw 'Can\'t delete user!';
   const group = await getById(groupId);
   return group;
}

async function createPost(groupId, username, content, time) {
   if (typeof username !== 'string' || typeof content !== 'string')
      throw 'Invalid username or content!!';

   groupId = checkId(groupId);
   const user = await userData.getUserByUserName(username);
   if (user === undefined)
      throw 'Invalid user !!!';

   const newPost = {
      _id: ObjectId(),
      username: username,
      content: content,
      time: time
   };

   const groupcollection = await groups();
   const updateInfo = await groupcollection.updateOne(
      { _id: groupId },
      { $push: { posts: newPost } }
   );
   if (!updateInfo)
      throw "Can't add post!";
   return newPost;
}

async function getPosts(groupId) {
   groupId = checkId(groupId);
   const group = await getById(groupId);
   let res = group.posts;
   return res;
}

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

module.exports = {
   getAll, getById, creatGroup, updateGroup, deleteGroupById, createPost, getPosts, deleteMember, joinGroup
};