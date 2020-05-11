const mongoCollections = require("../config/mongoCollections");
//const groupsRequire = require("./groups");
const users = mongoCollections.users;
const { ObjectId } = require("mongodb");

async function createUser(username, email, age, zipcode, gender, phone, bio){
   const addUser = {
      username: username,
      email: email,
      age: age,
      zipcode: zipcode,
      gender: gender,
      phone: phone,
      bio: bio,
      myGroup: null,
      groups: []
   };
   const usersCollection = await users();

   const findUser = await usersCollection.findOne({ $and: [{ username: username, email: email }] });
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
   const usersCollection = await users();
   const findUser = await usersCollection.findOne({ _id: checkedId });
   //console.log(findUser);
   if (findUser == null) throw "No User Exists With ID: " + checkedId;
   return findUser;
}

async function readUserByName(newUsername) {
  if (!newUsername) throw 'No username provided!'
  const usersCollection = await users();
  let user = await usersCollection.findOne({ username: newUsername});
  return user;
}

async function readUserByEmail(newEmail) {
   if (!newEmail) throw 'No email provided!'
   const usersCollection = await users();
   let user = await usersCollection.findOne({ email: newEmail});
   return user;
 }

async function addGroup(userId, groupId) {
   const checkedUserId = checkId(userId);
   const checkedGroupId = checkId(groupId);

   // await readUser(checkedUserId);
   // await readUser(checkedUserId);

   const usersCollection = await users();
   const updatedUser = await usersCollection.updateOne({ _id: checkedUserId }, { $addToSet: { groups: checkedGroupId.toString() } });
   if (updatedUser.modifiedCount === 0) throw `Can't Add Group with Group ID: ${checkedGroupId} in User ID: ${checkedUserId}`;
   return await readUser(checkedUserId);
}

async function removeGroup(userId, groupId) {
   const checkedUserId = checkId(userId);
   const checkedGroupId = checkId(groupId);

   // await readUser(checkedUserId);
   // commentRequire.readComment(checkedGroupId);

   const usersCollection = await users();
   const updatedUser = await usersCollection.updateOne({ _id: checkedUserId }, { $pull: { groups: checkedGroupId.toString() } });
   if (updatedUser.modifiedCount === 0) throw "Can't Remove Comment with ID: " + checkedGroupId;
   return await readUser(checkedUserId);
}

async function updateUser(userId, username = null, email = null, age = null, zipcode = null, gender = null, phone = null, bio = null) {
   const checkedId = checkId(userId);

   await readUser(checkedId);

   const usersCollection = await users();
   if (username) {
      const updatedUser = await usersCollection.updateOne({ _id: checkedId }, { $set: { username: username } });
      // if (updatedUser.modifiedCount === 0) throw "Can't Update username of User with ID: " + checkedId;
   }
   if (email) {
      const updatedUser = await usersCollection.updateOne({ _id: checkedId }, { $set: { email: email } });
      // if (updatedUser.modifiedCount === 0) throw "Can't Update Email of User with ID: " + checkedId;
   }
   if (phone) {
      const updatedUser = await usersCollection.updateOne({ _id: checkedId }, { $set: { phone: phone } });
      // if (updatedUser.modifiedCount === 0) throw "Can't Update Phone of User with ID: " + checkedId;
   }
   if (gender) {
      const updatedUser = await usersCollection.updateOne({ _id: checkedId }, { $set: { gender: gender } });
      // if (updatedUser.modifiedCount === 0) throw "Can't Update Gender of User with ID: " + checkedId;
   }
   if (age) {
      const updatedUser = await usersCollection.updateOne({ _id: checkedId }, { $set: { age: age } });
      // if (updatedUser.modifiedCount === 0) throw "Can't Update Age of User with ID: " + checkedId;
   }
   if (zipcode) {
      const updatedUser = await usersCollection.updateOne({ _id: checkedId }, { $set: { zipcode: zipcode } });
      // if (updatedUser.modifiedCount === 0) throw "Can't Update zipcode of User with ID: " + checkedId;
   }
   if (bio) {
      const updatedUser = await usersCollection.updateOne({ _id: checkedId }, { $set: { bio: bio } });
      // if (updatedUser.modifiedCount === 0) throw "Can't Update Bio of User with ID: " + checkedId;
   }

   return await readUser(checkedId);
}

async function deleteUser(userId) {
   const checkedId = checkCommentId(userId);

   const usersCollection = await users();

   const deleteUser = await usersCollection.deleteOne({ _id: checkedId });
   if (!deleteUser.result) throw "Can't Delete Comment with ID: " + checkedId;
   return true;
}

// --------------Added by Kuan-------------

async function getUserByUserName(username) {
   if (typeof username !== 'string')
      throw 'Invalid username provided!';
   const usersCollection = await users();
   const user = await usersCollection.findOne({ username: username });
   if (!user)
      return undefined;
   return user;
}

async function getAllUser() {
   const usersCollection = await users();
   let res = await usersCollection.find({}).toArray();
   if (!res)
      throw 'No users!';
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

module.exports = { createUser, readUser, readUserByName, readUserByEmail, updateUser, removeGroup, addGroup, deleteUser, getAllUser }