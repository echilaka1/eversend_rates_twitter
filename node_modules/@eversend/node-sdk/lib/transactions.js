const { makeRequest } = require("./utils/api");

module.exports = {
  fetchTransactions: async ({ page = 1, limit = 10 }) =>
    makeRequest({
      path: "/transactions",
      params: {
        page,
        limit
      },
      method: "GET"
    }),
  fetchTransaction: async ({ id }) =>
    makeRequest({
      path: `/transactions/${id}`,
      method: "GET"
    })
};
