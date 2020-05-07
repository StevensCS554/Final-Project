const mongoCollections = require("../config/mongoCollections");
const groups = mongoCollections.groups;
const { ObjectId } = require("mongodb");
// const middleware = require("../middleware");

//get all the group
async function getAll() {
    try {
        const groupsCollection = await groups();
        const allGroup = groupsCollection.find({});
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
        const group = groupsCollection.find({ id: id });
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
            user: [],
            managerId: managerId,
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