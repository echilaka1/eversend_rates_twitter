const { default: axios } = require("axios");
const { generateAuthToken } = require("../auth");
const { BASE_URL } = require("./constants");

module.exports = {
  makeRequest: async ({
    path,
    method = "POST",
    headers = {},
    data = null,
    params = null,
    isProtected = true
  }) => {
    const config = {};
    if (isProtected) {
      const token = await generateAuthToken();
      headers.Authorization = `Bearer ${token}`;
    }

    config.headers = headers;

    if (data) config.data = data;
    if (params) config.params = params;
    const response = await axios.request({
      url: `${BASE_URL}/${path}`,
      method,
      ...config
    });
    return response.data.data;
  }
};
