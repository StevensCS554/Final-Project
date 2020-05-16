const express = require("express");
const router = express.Router();
const axios = require('axios');
//redis:
const redis = require("redis");
const client = redis.createClient();
const bluebird = require("bluebird");
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

router.get('/:latitude/:longitude/:username', async (req, res) => {
    try {
        const latitude = req.params.latitude;
        const longitude = req.params.longitude;
        const username = req.params.username;
        //error check
        if (latitude) {
            if (typeof latitude !== 'string') {
                throw `You Must Provide A latitude with string type! what you give:${typeof latitude}`;
            }
        } else {
            throw "You Must Provide A latitude!";
        }
        if (longitude) {
            if (typeof longitude !== 'string') {
                throw `You Must Provide A longitude with string type! what you give:${typeof longitude}`;
            }
        } else {
            throw "You Must Provide A longitude!";
        }
        if (username) {
            if (typeof username !== 'string') {
                throw `You Must Provide A username with string type! what you give:${typeof username}`;
            }
        }

        let zipcode = null;
        //if there is username then check for the redis.
        if (username) {
            const jsonZipcode = await client.getAsync(username);
            // found user's zipcode in redis
            if (jsonZipcode) {
                zipcode = JSON.parse(jsonZipcode)//unStringify
                console.log("Zipcode come from the redis");
                // res.status(200).json(zipcode);
            }
            //Do not have user's zipcode, then insert username-zipcode pair to redis
            else {
                const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCTJckDGDyHM8cZ9R-PKUIQGHgfhoXzzFA`);
                const { results } = data;
                zipcode = results[0].address_components[6].short_name;
                console.log("Zipcode come from the google Api!");
                let jsonZipcode = JSON.stringify(zipcode);//stringify
                await client.setAsync(username, jsonZipcode);
                //Note here >> 1 hour time expire, so the user location is assume not change during one hour!
                await client.expireAsync(username, 3600);//set expire time
                jsonZipcode = await client.getAsync(username);
                zipcode = JSON.parse(jsonZipcode)//unStringify
                // res.status(200).json(zipcode);
            }
        }
        //if there is no user login, then just fetch for the zipcode.
        else{
            const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCTJckDGDyHM8cZ9R-PKUIQGHgfhoXzzFA`);
            const { results } = data;
            zipcode = results[0].address_components[6].short_name;
            console.log("No user right now! Zipcode come from the google Api!");
        }
        if(zipcode)
            res.status(200).json(zipcode);
        else throw `zipcode fecth fail try again!`
    } catch (e) {
        res.status(500).json(e)
    }
})

module.exports = router;