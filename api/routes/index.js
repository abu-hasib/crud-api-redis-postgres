const express = require("express");
const router = express.Router();

const db = require("../../queries");
const rd = require("../.. /cache");

router.get("/api/accounts", rd.cache, db.getAllAccounts);
router.get("/api/accounts/:id", db.getOneAccount);
router.post("/api/accounts", db.createAccount);
router.put("/api/accounts/:id", db.updateAccount);
router.delete("/api/accounts/:id", db.removeAccount);

module.exports = router;
