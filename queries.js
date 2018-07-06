var promise = require("bluebird");

var options = {
  // init options
  promiseLib: promise
};

var pgp = require("pg-promise")(options);
var connectionString = "postgres://postgres:1234@localhost:5432/accounts";
var db = pgp(connectionString);

// add query functions
module.exports = {
  getAllAccounts: getAllAccounts,
  getOneAccount: getOneAccount,
  createAccount: createAccount
  // updateAccount: updateAccount,
  // removeAccount: removeAccount
};

// CRUD methods
function getAllAccounts(req, res, next) {
  db.any("select * from account")
    .then(function(data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved all accounts"
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

function getOneAccount(req, res, next) {
  var accountID = parseInt(req.params.id);
  db.one("select * from account where id = $1", accountID)
    .then(function(data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved one account"
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

function createAccount(req, res, next) {
  req.body.amount = parseInt(req.body.amount);
  db.none(
    "insert into accounts(owner, type, amount, status)" +
      "values(${'owner'}, ${'type'}, ${'amount'}, ${'status'})",
    req.body
  )
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "created one account"
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

function updateAccount(req, res, next) {
  db.none('update accounts set owner=$1, type=$2, amount=$3, status=$4 where id=$5',
    [req.body.owner, req.body.type, parseInt(req.body.amount),
      req.body.status, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated account'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeAccount(req, res, next) {
  var accountID = parseInt(req.params.id);
  db.result('delete from accounts where id = $1', accountID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} account`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

