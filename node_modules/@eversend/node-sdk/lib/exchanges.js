const { makeRequest } = require("./utils/api");

module.exports = {
  getQuotation: async ({ from, to, amount }) =>
    makeRequest({
      path: "/exchanges/quotation",
      method: "POST",
      data: {
        from,
        to,
        amount
      }
    }),

  createExchange: async ({ quotationToken, transactionRef }) => {
    const data = { token: quotationToken };
    if (transactionRef) data.transactionRef = transactionRef;
    return makeRequest({
      path: "/exchanges",
      method: "POST",
      data
    });
  }
};
