const { makeRequest } = require("./utils/api");

module.exports = {
  getQuotation: async ({
    sourceWallet,
    type,
    amount,
    destinationCountry,
    destinationCurrency,
    amountType
  }) => {
    return makeRequest({
      path: "/payouts/quotation",
      method: "POST",
      data: {
        sourceWallet,
        type,
        amount,
        destinationCountry,
        destinationCurrency,
        amountType
      }
    });
  },

  payoutExistingBeneficiary: async ({
    quotationToken,
    transactionRef,
    beneficiaryId
  }) => {
    const data = {
      quotationToken,
      beneficiaryId
    };
    if (transactionRef) data.transactionRef = transactionRef;
    return makeRequest({
      path: "/payouts",
      method: "POST",
      data
    });
  },

  payoutNewBeneficiary: async ({
    quotationToken,
    transactionRef,
    firstName,
    lastName,
    phoneNumber,
    bankName,
    bankAccountName,
    bankCode,
    bankAccountNumber,
    country
  }) => {
    const data = {
      token: quotationToken,
      firstName,
      lastName,
      phoneNumber,
      country
    };

    if (transactionRef) data.transactionRef = transactionRef;
    if (bankName) data.bankName = bankName;
    if (bankAccountName) data.bankAccountName = bankAccountName;
    if (bankCode) data.bankCode = bankCode;
    if (bankAccountNumber) data.bankAccountNumber = bankAccountNumber;

    return makeRequest({
      path: "/payouts",
      method: "POST",
      data
    });
  },

  getDeliveryCountries: async () =>
    makeRequest({
      path: "/payouts/countries",
      method: "GET"
    }),

  getDeliveryBanks: async ({ country }) =>
    makeRequest({
      path: `/payouts/banks/${country}`,
      method: "GET"
    })
};
