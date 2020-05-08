const data = require('./data');
const groupsData = data.groupsData;
const usersData = data.usersData;

const groupSeeds = [
    {
        "groupName": "this is the group name",
        "groupNotice": "The Best Resource for Building Amazing Full-Stack Apps with the Best in MongoDB, Express, React and Node.js",
        "maxAge": 99,
        "minAge": 20,
        "gender": "male",
        "maxGroupNo": 199,
        "zipcode": "07030",
        "managerId": "5eb4d3fa3c509c4300349df9"
    },
]
const userSeeds = [
    {
        "username": "username",
        "email": "email",
        "age": 18,
        "zipcode": "07030",
        "gender": "none",
        "phone": "1234567890",
        "bio": "bio"
     },
]

function seedDB() {
    console.log("==============================seeding the database---------------------------");
    groupSeeds.forEach(async function (seed) {
        console.log(seed);
        const {groupName, groupNotice, maxAge, minAge, gender, maxGroupNo, zipcode, managerId} = seed;
        await groupsData.creatGroup(groupName, groupNotice, maxAge, minAge, gender, maxGroupNo, zipcode, managerId);
    });
    userSeeds.forEach(async function (seed) {
        console.log(seed);
        const {username, email, age, zipcode, gender, phone, bio} = seed;
        await usersData.createUser(username, email, age, zipcode, gender, phone, bio);
    });
    console.log("==============================seeding finished---------------------------------");
}

seedDB();