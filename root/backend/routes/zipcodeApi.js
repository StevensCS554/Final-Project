const express = require("express");
const router = express.Router();
//redis:
const redis = require("redis");
const client = redis.createClient();
const bluebird = require("bluebird");
const flat = require('flat');
const unflatten = flat.unflatten;
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

router.get('/:', async(req, res) => {
    // try {
    //    res.status(200).json({
    //       user: user
    //    });
    // } catch(e) {
    //    res.status(500).json({
    //       error: e
    //    })
    // }
 })

module.exports = router;