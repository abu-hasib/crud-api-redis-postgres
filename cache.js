const express = require("express");
const request = require("superagent");
const PORT = process.env.PORT;

const redis = require("redis");
const REDIS_PORT = process.env.REDIS_PORT;

const app = express();
const client = redis.createClient(REDIS_PORT);

client.set("some key", "some value");

var repoNumber = response.body.length;
client.set(org, repoNumber);
res.send((org, repoNumber));

client.get(key, function(err, data) {});

function cache(req, res, next) {
  const org = req.query.org;
  client.get(org, function(err, data) {
    if (err) throw err;

    if (data != null) {
      res.send(respond(org, data));
    } else {
      next();
    }
  });
}

module.exports = {
  cache: cache
};
