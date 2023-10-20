const { makeRequest } = require("./utils/api");

module.exports = {
  fetchTransactions: async ({ page = 1, limit = 10 }) =>
    makeRequest({
      path: "/crypto/transactions",
      params: {
        page,
        limit
      },
      method: "GET"
    }),
  fetchAddresses: async ({ page = 1, limit = 10 }) =>
    makeRequest({
      path: "/crypto/addresses",
      params: {
        page,
        limit
      },
      method: "GET"
    }),
  getAssetChains: async ({ coin }) =>
    makeRequest({
      path: `/crypto/assets/${coin}`,
      method: "GET"
    }),

  createAddress: async ({
    assetId,
    ownerName,
    destinationAddressDescription,
    purpose
  }) => {
    const data = { assetId, ownerName, destinationAddressDescription };
    if (purpose) data.purpose = purpose;
    return makeRequest({
      path: "/crypto/addresses",
      method: "POST",
      data
    });
  }
};
