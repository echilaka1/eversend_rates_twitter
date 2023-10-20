const { default: axios } = require("axios");
const {
  BASE_URL,
  TOKEN,
  CLIENT_ID,
  CLIENT_SECRET
} = require("./utils/constants");
const { cache } = require("./utils/configs");

const generateAuthToken = async () => {
  if (cache.get(TOKEN)) return cache.get(TOKEN);

  const clientId = cache.get(CLIENT_ID);
  const clientSecret = cache.get(CLIENT_SECRET);
  const response = await axios.request({
    url: `${BASE_URL}/auth/token`,
    method: "GET",
    headers: {
      clientId,
      clientSecret
    }
  });
  cache.set(TOKEN, response.data.token, 3600);
  return response.data.token;
};

module.exports = {
  generateAuthToken
};
