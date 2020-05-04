const mongoCollections = require("../config/mongoCollections");
//const groupsRequire = require("./groups");
const users = mongoCollections.users;
const { ObjectId } = require("mongodb");

async function createUser(name, email, phone = null, gender = null, age = null, location = null, bio = null) {
   const addUser = {
      name: name,
      email: email,
      phone: phone,
      gender: gender,
      age: age,
      location: location,
      bio: bio,
      groups: null
   };
   const usersCollection = await getCollection();
   const findUser = await usersCollection.findOne({ $and: [{ name: name, email: email }] });
   let insertedUserId = "";
   if (findUser == null) {
      const insertInfo = await usersCollection.insertOne(addUser);
      if (insertInfo.insertedCount === 0) throw "Could Not Add User";
      insertedUserId = insertInfo.insertedId;
   }
   else insertedUserId = findUser._id.toString();
   return await readUser(insertedUserId);
}

async function readUser(userId) {
   const checkedId = checkId(userId);

   const usersCollection = await getCollection();
   const findUser = await usersCollection.findOne({ _id: checkedId });
   if (findUser == null) throw "No User Exists With ID: " + checkedId;
   return findUser;
}

// async function readAllUser(skip, take) {
//   if (skip < 0) skip = 0;
//   if (take < 0) take = 0;
//   if (take > 100) take = 100;
//   const usersCollection = await getCollection();
//   console.log(typeof usersCollection);
//   let taskArray = await usersCollection.find({}).toArray();
//   taskArray = taskArray.slice(skip, skip + take);
//   if (taskArray.length == 0) return taskArray;
//   return taskArray;
// }

async function addGroup(userId, groupId) {
   const checkedUserId = checkId(userId);
   const checkedGroupId = checkId(groupId);

   // await readUser(checkedUserId);
   // await readUser(checkedUserId);

   const usersCollection = await getCollection();
   const updatedUser = await usersCollection.updateOne({ _id: checkedUserId }, { $addToSet: { groups: checkedGroupId.toString() } });
   if (updatedUser.modifiedCount === 0) throw `Can't Add Group with Group ID: ${checkedGroupId} in User ID: ${checkedUserId}`;
   return await readUser(checkedUserId);
}

async function removeGroup(userId, groupId) {
   const checkedUserId = checkId(userId);
   const checkedGroupId = checkId(groupId);

   // await readUser(checkedUserId);
   // commentRequire.readComment(checkedGroupId);

   const usersCollection = await getCollection();
   const updatedUser = await usersCollection.updateOne({ _id: checkedUserId }, { $pull: { groups: checkedGroupId.toString() } });
   if (updatedUser.modifiedCount === 0) throw "Can't Remove Comment with ID: " + checkedGroupId;
   return await readUser(checkedUserId);
}

async function updateUser(userId, name = null, email = null, phone = null, gender = null, age = null, location = null, bio = null) {
   const checkedId = checkId(userId);

   await readUser(checkedId);

   const usersCollection = await getCollection();
   if (name) {
      const updatedUser = await usersCollection.updateOne({ _id: checkedId }, { $set: { name: name } });
      if (updatedUser.modifiedCount === 0) throw "Can't Update Name of User with ID: " + checkedId;
   }
   if (email) {
      const updatedUser = await usersCollection.updateOne({ _id: checkedId }, { $set: { email: email } });
      if (updatedUser.modifiedCount === 0) throw "Can't Update Email of User with ID: " + checkedId;
   }
   if (phone) {
      const updatedUser = await usersCollection.updateOne({ _id: checkedId }, { $set: { phone: phone } });
      if (updatedUser.modifiedCount === 0) throw "Can't Update Phone of User with ID: " + checkedId;
   }
   if (gender) {
      const updatedUser = await usersCollection.updateOne({ _id: checkedId }, { $set: { gender: gender } });
      if (updatedUser.modifiedCount === 0) throw "Can't Update Gender of User with ID: " + checkedId;
   }
   if (age) {
      const updatedUser = await usersCollection.updateOne({ _id: checkedId }, { $set: { age: age } });
      if (updatedUser.modifiedCount === 0) throw "Can't Update Age of User with ID: " + checkedId;
   }
   if (location) {
      const updatedUser = await usersCollection.updateOne({ _id: checkedId }, { $set: { location: location } });
      if (updatedUser.modifiedCount === 0) throw "Can't Update Location of User with ID: " + checkedId;
   }
   if (bio) {
      const updatedUser = await usersCollection.updateOne({ _id: checkedId }, { $set: { bio: bio } });
      if (updatedUser.modifiedCount === 0) throw "Can't Update Bio of User with ID: " + checkedId;
   }
   return await readUser(checkedId);
}

async function deleteUser(userId) {
   const checkedId = checkCommentId(userId);

   const usersCollection = await getCollection();

   const deleteUser = await usersCollection.deleteOne({ _id: checkedId });
   if (!deleteUser.result) throw "Can't Delete Comment with ID: " + checkedId;
   return true;
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

async function getCollection() {
   return await users();
}

module.exports = { createUser, readUser, updateUser, removeGroup, addGroup, deleteUser }