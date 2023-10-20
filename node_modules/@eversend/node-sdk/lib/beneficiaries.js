const { makeRequest } = require("./utils/api");

module.exports = {
  getBeneficiaries: async ({ page = 1, limit = 10 }) =>
    makeRequest({
      path: "/beneficiaries",
      params: {
        page,
        limit
      },
      method: "GET"
    }),
  getBeneficiary: async ({ id }) =>
    makeRequest({
      path: `/beneficiaries/${id}`,
      method: "GET"
    }),
  addBeneficiary: async ({
    firstName,
    lastName,
    country,
    phoneNumber,
    bankName,
    bankCode,
    bankAccountName,
    bankAccountNumber
  }) =>
    makeRequest({
      path: "/beneficiaries",
      method: "POST",
      data: [
        {
          firstName,
          lastName,
          country,
          phoneNumber,
          bankName,
          bankCode,
          bankAccountName,
          bankAccountNumber
        }
      ]
    }),
  deleteBeneficiary: async ({ id }) =>
    makeRequest({
      path: `/beneficiaries/${id}`,
      method: "DELETE"
    })
};
