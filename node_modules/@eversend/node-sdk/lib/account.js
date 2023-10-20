const { makeRequest } = require("./utils/api");

module.exports = {
  getAccount: async () =>
    makeRequest({
      path: "/account",
      method: "GET"
    })
};
