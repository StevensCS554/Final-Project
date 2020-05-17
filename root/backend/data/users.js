const mongoCollections = require("../config/mongoCollections");
//const groupsRequire = require("./groups");
const users = mongoCollections.users;
const { ObjectId } = require("mongodb");

async function createUser(username, email, age, zipcode, gender, phone, bio) {
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
   if (gender === 'male')
      return await addUserProfile(username, 'https://firebasestorage.googleapis.com/v0/b/cs554fbauth.appspot.com/o/male-default.jpg?alt=media&token=3abd37e7-6cea-4540-bd0b-4446b2cb0924');
   if (gender === 'female')
      return await addUserProfile(username, 'https://firebasestorage.googleapis.com/v0/b/cs554fbauth.appspot.com/o/female-default.jpeg?alt=media&token=6ebc5265-ee83-44a4-be1c-089ce7b79852');
}

async function readUser(userId) {
   const checkedId = checkId(userId);
   const usersCollection = await users();
   const findUser = await usersCollection.findOne({ _id: checkedId });
   // console.log(findUser);
   //console.log(findUser);
   if (findUser == null) throw "No User Exists With ID: " + checkedId;
   return findUser;
}

async function readUserByName(newUsername) {
   if (!newUsername) throw 'No username provided!'
   const usersCollection = await users();
   let user = await usersCollection.findOne({ username: newUsername });
   return user;
}

async function readUserByEmail(newEmail) {
   if (!newEmail) throw 'No email provided!'
   console.log(newEmail);
   const usersCollection = await users();
   let user = await usersCollection.findOne({ email: newEmail });
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
   if (updatedUser.modifiedCount === 0) throw `Can't Remove group:${checkedGroupId} from user:${checkedUserId} in removeGroup mongodb function`;
   return await readUser(checkedUserId);
}

async function updateUser(userId, username = null, email = null, age = null, zipcode = null, gender = null, phone = null, bio = null) {
   const checkedId = checkId(userId);

   await readUser(checkedId);

   const usersCollection = await users();
   // if (username) {//NOT ALLOWED TO CHANGE!
   //    const updatedUser = await usersCollection.updateOne({ _id: checkedId }, { $set: { username: username } });
   //    // if (updatedUser.modifiedCount === 0) throw "Can't Update username of User with ID: " + checkedId;
   // }
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
   if (!deleteUser.result) throw "Can't Delete user with ID: " + checkedId;
   return true;
}

// --------------Added by Kuan-------------

async function getAllUser() {
   const usersCollection = await users();
   let res = await usersCollection.find({}).toArray();
   if (!res)
      throw 'No users!';
   return res;
}
// Get groups user in
async function getUserGroup(username) {
   const groupData = require('./index').groupsData; // why the fuck ???
   const user = await readUserByName(username);
   let groups = user.groups;
   let res = [];

   for (let i = 0; i < groups.length; i++) {
      const groupInfo = {
         groupId: undefined,
         groupName: undefined
      };
      groupInfo.groupId = groups[i];
      const group = await groupData.getById(groups[i]);

      groupInfo.groupName = group.groupName;
      res.push(groupInfo);
   }
   return res;
}

async function getUserOwnGroup(username) {
   const user = await readUserByName(username);
   if (user.myGroup === null)
      return null;

   const groupData = require('./groups');
   const group = await groupData.getById(user.myGroup);
   return group;
}

async function addUserProfile(username, url) {
   if (!url)
      throw 'No url provided!';
   const usersCollection = await users();
   const updateInfo = await usersCollection.updateOne(
      { username: username },
      { $set: { profileUrl: url } }
   );
   if (!updateInfo)
      throw 'Can\'t update url';
   let user = await readUserByName(username);
   return user;
}

async function getUserProfileUrl(username) {
   const user = await readUserByName(username);
   if (user.profileUrl)
      return user.profileUrl;
   throw 'No url provided error!';
}

async function updateUserProfile(username, url) {
   const usersCollection = await users();
   const updateInfo = await usersCollection.updateOne(
      { username: username },
      { $set: { profileUrl: url } }
   );
   if (!updateInfo)
      throw 'Can\'t update profile url!';
   return await readUserByName(username);
}

async function searchUsers(username) {
   const usersCollection = await users();
   const user = await usersCollection.findOne({
      username: username
   })
   return user;
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
   createUser, readUser, readUserByName,
   updateUser, readUserByEmail, removeGroup, addGroup, deleteUser,
   getAllUser, getUserGroup, getUserProfileUrl, addUserProfile,
   updateUserProfile, getUserOwnGroup, searchUsers
};
