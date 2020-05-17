const data = require('./data');
const groupsData = data.groupsData;
const usersData = data.usersData;
//------ change this to your zipcode for testing --------
const TESTZIPCODE = '07087';
//=======================================================

const userSeeds = [
    {
        // "_id":{"$oid":"5ec14edbdce7c706d5218abf"},"
        "username": "alex1",
        "email": "alex1@gmail.com",
        "age": "23",
        "zipcode": TESTZIPCODE,
        "gender": "male",
        "phone": "1222222222",
        "bio": "nanana",
        "myGroup": null,
        // { "$oid": "5ec14f3cdce7c706d5218ac0" },
        "groups": [],
        //  ["5ec15681dce7c706d5218ad0", "5ec15087dce7c706d5218ac4"],
        "profileUrl": "https://firebasestorage.googleapis.com/v0/b/web-ii-project.appspot.com/o/images%2Ftom-cruise.jpg1589726962602?alt=media&token=fd177945-0720-44b6-a151-376afe81199e"
    },
    {
        // "_id": { "$oid": "5ec14ff3dce7c706d5218ac3" },
        "username": "Wayne1",
        "email": "wayne1@gmail.com",
        "age": "24",
        "zipcode": TESTZIPCODE,
        "gender": "male",
        "phone": "2016801240",
        "bio": "",
        "myGroup": null,
        // { "$oid": "5ec15087dce7c706d5218ac4" }
        "groups": [],
        // [],
        "profileUrl": "https://firebasestorage.googleapis.com/v0/b/web-ii-project.appspot.com/o/images%2Ftom.jpg1589727242381?alt=media&token=ccb0d54c-26cb-4487-937c-5e05304ea974"
    },
    {
        // "_id": { "$oid": "5ec151c4dce7c706d5218ac6" },
        "username": "Emily",
        "email": "emily1@gmail.com",
        "age": "34",
        "zipcode": TESTZIPCODE,
        "gender": "female",
        "phone": "2016801240",
        "bio": "",
        "myGroup": null,
        // { "$oid": "5ec15209dce7c706d5218ac7" },
        "groups": [],
        // ["5ec14f3cdce7c706d5218ac0"],
        "profileUrl": "https://firebasestorage.googleapis.com/v0/b/web-ii-project.appspot.com/o/images%2Fscarley.jpg1589727706655?alt=media&token=d47fd72e-865b-46f3-839d-65182bbe5e70"
    },
    {
        // "_id": { "$oid": "5ec152b6dce7c706d5218ac9" },
        "username": "dqueen",
        "email": "dqueen@gmail.com",
        "age": "33",
        "zipcode": TESTZIPCODE,
        "gender": "female",
        "phone": "1222222222",
        "bio": "queen",
        "myGroup": null,
        // { "$oid": "5ec1537fdce7c706d5218acb" },
        "groups": [],
        //  ["5ec15087dce7c706d5218ac4",
        // "5ec15209dce7c706d5218ac7"],
        "profileUrl": "https://firebasestorage.googleapis.com/v0/b/web-ii-project.appspot.com/o/images%2Fdragon%20queen.jpg1589727965128?alt=media&token=c9d6a7a6-db19-42e9-a7ea-54fee9abb3dc"
    },
    {
        // "_id": { "$oid": "5ec1546ddce7c706d5218acd" },
        "username": "ellens",
        "email": "ellens@gmail.com",
        "age": "44",
        "zipcode": TESTZIPCODE,
        "gender": "female",
        "phone": "2016801240",
        "bio": "",
        "myGroup": null,
        // { "$oid": "5ec154cddce7c706d5218ace" },
        "groups": [],
        //  ["5ec15209dce7c706d5218ac7",
        // "5ec1537fdce7c706d5218acb"],
        "profileUrl": "https://firebasestorage.googleapis.com/v0/b/web-ii-project.appspot.com/o/images%2Fellen.jpg1589728387347?alt=media&token=f380b96e-5dd1-4896-97f7-1d1218117529"
    },
    {
        // "_id": { "$oid": "5ec155f9dce7c706d5218acf" },
        "username": "jordan",
        "email": "jordan@gmail.com",
        "age": "23",
        "zipcode": TESTZIPCODE,
        "gender": "male",
        "phone": "2016801240",
        "bio": "",
        "myGroup": null,
        // { "$oid": "5ec15681dce7c706d5218ad0" },
        "groups": [],
        // ["5ec15087dce7c706d5218ac4"],
        "profileUrl": "https://firebasestorage.googleapis.com/v0/b/web-ii-project.appspot.com/o/images%2FRyan.jpeg1589728829867?alt=media&token=f9b8fece-3272-46e4-bb89-0c0b057491f5"
    },
    {
        // "_id": { "$oid": "5ec15a1adce7c706d5218ad1" },
        "username": "mmbappe",
        "email": "mmbappe1@gmail.com",
        "age": "20",
        "zipcode": TESTZIPCODE,
        "gender": "male",
        "phone": "1222222222",
        "bio": "",
        "myGroup": null,
        // { "$oid": "5ec15aa0dce7c706d5218ad2" },
        "groups": [],
        // [],
        "profileUrl": "https://firebasestorage.googleapis.com/v0/b/web-ii-project.appspot.com/o/images%2Fmbappe.jpeg1589729860299?alt=media&token=e19b3f7f-7dc2-499b-8815-8bbc50dafd1a"
    }
]









const groupSeeds = [
    {
        // "_id": { "$oid": "5ec14f3cdce7c706d5218ac0" },
        "groupName": "developer's home",
        "groupNotice": "dedicated to web programming and technologies",
        "maxAge": "45",
        "minAge": "23",
        "groupGender": "none",
        "maxGroupNo": "6",
        "groupZipcode": TESTZIPCODE,
        "users": [],
        // 
        // ["5ec151c4dce7c706d5218ac6"],
        "managerId": null,
        // { "$oid": "5ec14edbdce7c706d5218abf" },
        "posts": [{
            "_id": { "$oid": "5ec14f8ddce7c706d5218ac1" },
            "username": "alex1",
            "content": "welcome to join",
            "time": "Sun, 17 May 2020 14: 51: 57 GMT"
        },
        {
            "_id": { "$oid": "5ec14fa3dce7c706d5218ac2" },
            "username": "alex1",
            "content": "let's code",
            "time": "Sun, 17 May 2020 14: 52: 19 GMT"
        },
        {
            "_id": { "$oid": "5ec15266dce7c706d5218ac8" },
            "username": "Emily",
            "content": "hi i am Emily",
            "time": "Sun, 17 May 2020 15: 04: 05 GMT"
        }],
        "lat": 40.7571321,
        "lng": -74.04112351300012,
        "groupProfileUrl": "https://firebasestorage.googleapis.com/v0/b/web-ii-project.appspot.com/o/images%2FDeveloper.webp1589727098615?alt=media&token=deceb62c-ae29-4812-85ce-17dc8a87a370"
    },
    {
        // "_id": { "$oid": "5ec15087dce7c706d5218ac4" },
        "groupName": "csgo game online",
        "groupNotice": "we'll play on every Friday",
        "maxAge": "34",
        "minAge": "16",
        "groupGender": "none",
        "maxGroupNo": "20",
        "groupZipcode": TESTZIPCODE,
        "users": [],
        //  ["5ec152b6dce7c706d5218ac9",
            // "5ec155f9dce7c706d5218acf"],
        "managerId": null,
        // { "$oid": "5ec14ff3dce7c706d5218ac3" },
        "posts": [{
            "_id": { "$oid": "5ec150c1dce7c706d5218ac5" },
            "username": "Wayne1",
            "content": "welcome to every gamers",
            "time": "Sun, 17 May 2020 14: 57: 05 GMT"
        },
        {
            "_id": { "$oid": "5ec1530bdce7c706d5218aca" },
            "username": "dqueen",
            "content": "i like this game",
            "time": "Sun, 17 May 2020 15: 06: 51 GMT"
        }],
        "lat": 40.756731234,
        "lng": -74.04167513002866,
        "groupProfileUrl": "https://firebasestorage.googleapis.com/v0/b/web-ii-project.appspot.com/o/images%2Fcsgo.jpg1589727403444?alt=media&token=7a54c278-f4e2-4cd8-bc96-3ac29ccb0b17"
    },
    {
        // "_id": { "$oid": "5ec15209dce7c706d5218ac7" },
        "groupName": "yoga fans",
        "groupNotice": "teach yoga online",
        "maxAge": "56",
        "minAge": "20",
        "groupGender": "female",
        "maxGroupNo": "7",
        "groupZipcode": TESTZIPCODE,
        "users": [],
        //  ["5ec152b6dce7c706d5218ac9",
            // "5ec1546ddce7c706d5218acd"],
        "managerId": null,
        // { "$oid": "5ec151c4dce7c706d5218ac6" },
        "posts": [{
            "_id": { "$oid": "5ec153e6dce7c706d5218acc" },
            "username": "dqueen",
            "content": "hi i am dqueen",
            "time": "Sun, 17 May 2020 15: 10: 30 GMT"
        }],
        "lat": 40.756523419,
        "lng": -74.04147513003299,
        "groupProfileUrl": "https://firebasestorage.googleapis.com/v0/b/web-ii-project.appspot.com/o/images%2Fyoga.jpg%3Dw7681589727772029?alt=media&token=8799e2ec-ecda-4626-b9a5-ff4bb848a83d"
    },
    {
        // "_id": { "$oid": "5ec1537fdce7c706d5218acb" },
        "groupName": "food lover",
        "groupNotice": "online recipe teaching",
        "maxAge": "67",
        "minAge": "12",
        "groupGender": "none",
        "maxGroupNo": "45",
        "groupZipcode": TESTZIPCODE,
        "users": [],
        //  ["5ec1546ddce7c706d5218acd"],
        "managerId": null,
        // { "$oid": "5ec152b6dce7c706d5218ac9" },
        "posts": [],
        "lat": 40.756351277645,
        "lng": -74.0411751300118,
        "groupProfileUrl": "https://firebasestorage.googleapis.com/v0/b/web-ii-project.appspot.com/o/images%2Fcook.jpeg1589728168480?alt=media&token=a3c35bd0-d998-453f-bad2-9967326ef8a6"
    },
    {
        // "_id": { "$oid": "5ec154cddce7c706d5218ace" },
        "groupName": "bible study group",
        "groupNotice": "meet up at my house with free food and love of god",
        "maxAge": "90",
        "minAge": "10",
        "groupGender": "none",
        "maxGroupNo": "20",
        "groupZipcode": TESTZIPCODE,
        "users": [],
        //  [],
        "managerId": null,
        // { "$oid": "5ec1546ddce7c706d5218acd" },
        "posts": [],
        "lat": 40.7578398,
        "lng": -74.02341751300224,
        "groupProfileUrl": "https://firebasestorage.googleapis.com/v0/b/web-ii-project.appspot.com/o/images%2Fzoom-bg-6.jpg1589728480508?alt=media&token=18930e99-7b71-4a89-91fc-6ed7a2e248c8"
    },
    {
        // "_id": { "$oid": "5ec15681dce7c706d5218ad0" },
        "groupName": "basketball group",
        "groupNotice": "play basketball every weekend",
        "maxAge": "40",
        "minAge": "14",
        "groupGender": "male",
        "maxGroupNo": "23",
        "groupZipcode": TESTZIPCODE,
        "users": [],
        //  [],
        "managerId": null,
        // { "$oid": "5ec155f9dce7c706d5218acf" },
        "posts": [],
        "lat": 40.754555312,
        "lng": -74.042241908,
        "groupProfileUrl": "https://firebasestorage.googleapis.com/v0/b/web-ii-project.appspot.com/o/images%2Fbasketball.jpg1589728965296?alt=media&token=cc3383cd-e9ed-401b-8772-f3c3db7856a3"
    },
    {
        // "_id": { "$oid": "5ec15aa0dce7c706d5218ad2" },
        "groupName": "soccer ball lovers",
        "groupNotice": "play soccer together",
        "maxAge": "45",
        "minAge": "23",
        "groupGender": "male",
        "maxGroupNo": "23",
        "groupZipcode": TESTZIPCODE,
        "users": [],
        //  [],
        "managerId": null,
        // { "$oid": "5ec15a1adce7c706d5218ad1" },
        "posts": [{
            "_id": { "$oid": "5ec15aefdce7c706d5218ad3" },
            "username": "mmbappe",
            "content": "welcome everyone",
            "time": "Sun, 17 May 2020 15: 40: 31 GMT"
        }],
        "lat": 40.7537307,
        "lng": -74.04675130000003,
        "groupProfileUrl": "https://firebasestorage.googleapis.com/v0/b/web-ii-project.appspot.com/o/images%2Fsoccer.jpg1589730016607?alt=media&token=bfccac9c-c103-46de-955c-7ece2657dd60"
    }
]

function seedDB() {
    console.log("==============================seeding the database---------------------------");
    let count = 0;
    userSeeds.forEach(async function (user) {
        const { username, email, age, zipcode, gender, phone, bio, profileUrl } = user;
        console.log(`_____________________`);
        console.log(`add user: ${username}`);
        await usersData.createUser(username, email, age, zipcode, gender, phone, bio);
        const currentUser = await usersData.readUserByName(username);
        await usersData.addUserProfile(username, profileUrl);
        const {groupName, groupNotice, maxAge, minAge, groupGender, maxGroupNo, groupZipcode, managerId, posts, lat, lng, groupProfileUrl} = groupSeeds[count++];
        console.log(`user create group: ${groupName}`);
        await groupsData.creatGroup(groupName, groupNotice, maxAge, minAge, groupGender, maxGroupNo, groupZipcode, currentUser._id, lat, lng);
        const newGroup = await groupsData.getGroupByManager(currentUser._id);
        await groupsData.addGroupProfile(newGroup._id, groupProfileUrl);
        posts.forEach(async(post)=>{
            await groupsData.createPost(newGroup._id, username, post.content, post.time);
        });
    });
    console.log("==============================seeding finished---------------------------------");
}

seedDB();