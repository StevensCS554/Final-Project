const mongoCollections = require("../config/mongoCollections");
const groups = mongoCollections.groups;
const { ObjectId } = require("mongodb");
// const middleware = require("../middleware");

//get all the group
async function getAll() {
   const groupsCollection = await groups();
   const allGroup = groupsCollection.find({});
   return allGroup;
};

//get a group by id
async function getById(id) {
   checkId(id);
   const groupsCollection = await groups();
   const group = groupsCollection.find({ id: id });
   return group;
};

async function creatGroup(name, location, manager, description) {
   console.log(0);

   const newGroup = {
      name: name,
      location: location,
      manager: manager,
      user: [],
      description: description
   }
   
   const groupsCollection = await groups();
   const insertedGroup = await groupsCollection.insertOne(newGroup);
   // if(insertedGroup.id)
   return newGroup;
};

//update group
async function updateGroup(id, name = null, location = null, mamager = null, description = null) {
   try {
      const checkedId = checkId(id);

      //find and update
      const groupsCollection = await groups();
      if (name) {
         const updatedGroup = await groupsCollection.updateOne({ _id: checkedId }, { $set: { name: name } });
         if (updatedGroup.modifiedCount === 0) throw "Can't Update Name of Group with ID: " + checkedId;
      }
      if (location) {
         const updatedGroup = await groupsCollection.updateOne({ _id: checkedId }, { $set: { location: location } });
         if (updatedGroup.modifiedCount === 0) throw "Can't Update location of Group with ID: " + checkedId;
      }
      if (mamager) {
         const updatedGroup = await groupsCollection.updateOne({ _id: checkedId }, { $set: { mamager: mamager } });
         if (updatedGroup.modifiedCount === 0) throw "Can't Update mamager of Group with ID: " + checkedId;
      }
      if (description) {
         const updatedGroup = await groupsCollection.updateOne({ _id: checkedId }, { $set: { description: description } });
         if (updatedGroup.modifiedCount === 0) throw "Can't Update description of Group with ID: " + checkedId;
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
   getAll, getById, creatGroup, updateGroup, deleteGroupById
};