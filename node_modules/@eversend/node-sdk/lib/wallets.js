const { makeRequest } = require("./utils/api");

module.exports = {
  getWallets: async () =>
    makeRequest({
      path: "/wallets",
      method: "GET"
    }),

  getWallet: async ({ id }) =>
    makeRequest({
      path: `/wallets/${id}`,
      method: "GET"
    })
};
