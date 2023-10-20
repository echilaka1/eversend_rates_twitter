"use strict";
const config = require("./utils/configs");
const { CLIENT_ID, CLIENT_SECRET } = require("./utils/constants");

const Eversend = function({ clientId, clientSecret }) {
  if (!clientId || !clientSecret)
    throw Error("clientId and clientSecret are required params");

  if (!(this instanceof Eversend)) {
    return new Eversend({ clientId, clientSecret });
  }

  config.cache.set(CLIENT_ID, clientId);
  config.cache.set(CLIENT_SECRET, clientSecret);

  this.auth = require("./auth");
  this.wallets = require("./wallets");
  this.transactions = require("./transactions");
  this.exchanges = require("./exchanges");
  this.beneficiaries = require("./beneficiaries");
  this.payouts = require("./payouts");
  this.collections = require("./collections");
  this.account = require("./account");
  this.crypto = require("./crypto");
};

module.exports = Eversend;
module.exports.Eversend = Eversend;
module.exports.default = Eversend;
