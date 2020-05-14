const mongoCollections = require("../config/mongoCollections");
const groups = mongoCollections.groups;
const users = mongoCollections.users;
const { ObjectId } = require("mongodb");
// const ObjectID = require('mongodb').ObjectID;
// const middleware = require("../middleware");
const userData = require('./users');

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
      id = checkId(id);
      const groupsCollection = await groups();
      const group = await groupsCollection.findOne({ _id: id });
      if (group == null) throw `can not find the group with id: ${id}`;
      return group;
   } catch (e) {
      throw `` + e;
   }
};

async function creatGroup(groupName, groupNotice, maxAge, minAge, gender, maxGroupNo, zipcode, managerId, latitude, longitude) {
   const userData = require('./users');
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
         posts: [],
         lat: latitude,
         lng: longitude
      }
      const groupsCollection = await groups();
      const insertedGroup = await groupsCollection.insertOne(newGroup);
      // if(insertedGroup.id)
      const userCollection = await users();
      managerId = checkId(managerId);
      const groupId = checkId(insertedGroup.insertedId);
      const updateInfo = await userCollection.updateOne(
         { _id: managerId },
         { $set: { myGroup: groupId } }
      )
      await addGroupProfile(groupId, 'https://firebasestorage.googleapis.com/v0/b/web-ii-project.appspot.com/o/group-default.jpg?alt=media&token=f94064fa-9da1-4052-9eaa-44591752cfd9');
      return await getById(groupId);
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
   const userData = require('./users');
   try {
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
         { $addToSet: { users: userId.toString() } }
      );
      const userCollection = await users();
      const updateInfo2 = await userCollection.updateOne(
         { _id: userId },
         { $addToSet: { groups: groupId.toString() } }
      );
      if (!updateInfo || !updateInfo2)
         throw 'Can\'t join in!'
      group = await getById(groupId);
      return group;
   } catch (e) {
      throw e + ` joinGroup`;
   }

}

async function deleteMember(groupId, userId) {
   try {
      groupId = checkId(groupId);
      userId = checkId(userId);
      const groupcollection = await groups();
      const updateInfo = await groupcollection.updateOne(
         { _id: groupId },
         { $pull: { users: userId.toString() } }
      );
      if (!updateInfo)
         throw 'Can\'t delete user!';
      const group = await getById(groupId);
      return group;
   } catch (e) {
      throw e;
   }

}

async function getCertainLocalGroups(zipcode, take = 6, skip = 0) {
   const groups = await getAll();
   let res = [];
   for (let i = 0; i < groups.length; i++) {
      if (groups[i].zipcode === zipcode)
         res.push(groups[i]);
   }
   if (take > res.length)
      take = 6;
   if (skip < 0)
      skip = 0;
   let output = {
      groups: [],
      numLeftOver: 0
   };

   let j = 0;
   for (j = skip; j < res.length && j < skip + take; j++) {
      output.groups.push(res[j]);
   }
   output.numLeftOver = res.length - j;
   return output;
}

async function getAllLocalGroups(zipcode) {
   const groups = await getAll();
   let res = [];
   for (let i = 0; i < groups.length; i++) {
      if (groups[i].zipcode === zipcode)
         res.push(groups[i]);
   }
   return res;
}

async function createPost(groupId, username, content, time) {
   if (typeof username !== 'string' || typeof content !== 'string')
      throw 'Invalid username or content!!';
   const userData = require('./users');
   groupId = checkId(groupId);
   const user = await userData.readUserByName(username);
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

async function deletePost(groupId, postId) {
   try {
      groupId = checkId(groupId);
      postId = checkId(postId);
      const groupsCollection = await groups();
      // const group = await groupsCollection.findOne({ _id: groupId });
      const group = await groupsCollection.updateOne(
         { _id: groupId },
         { $pull: { posts: { _id: postId } } }
      );
      if (group === null)
         throw 'Invalid group !!!';
      return;
   } catch (e) {
      throw e;
   }

}

async function getPosts(groupId) {
   groupId = checkId(groupId);
   const group = await getById(groupId);
   let res = group.posts;
   return res;
}

async function addGroupProfile(groupId, url) {
   groupId = checkId(groupId);
   const groupsCollection = await groups();
   const updateInfo = await groupsCollection.updateOne(
      { _id: groupId },
      { $set: { groupProfileUrl: url } }
   );
   if (!updateInfo)
      throw 'Can\'t update group profile!';
}

async function getGroupByManager(managerId) {
   const groupsCollection = await groups();
   managerId = checkId(managerId);
   const group = await groupsCollection.findOne(
      { managerId: managerId }
   );
   if (!group)
      throw 'There is no such group!';
   return group;
}

async function updateGroupProfile(groupId, url) {
   const groupsCollection = await groups();
   groupId = checkId(groupId);
   const updateInfo = await groupsCollection.updateOne(
      { _id: groupId },
      { $set: { groupProfileUrl: url } }
   );
   if (!updateInfo)
      throw 'Can\t update group profile！';
}

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

module.exports = {
   getAll, getById, creatGroup, updateGroup, deleteGroupById,
   createPost, getPosts, deletePost, deleteMember, joinGroup, getCertainLocalGroups,
   getAllLocalGroups, addGroupProfile, getGroupByManager, updateGroupProfile
};