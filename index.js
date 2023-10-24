const { TwitterApi } = require("twitter-api-v2");
const dotenv = require("dotenv");
const express = require('express')
// const app = express()
const port = process.env.PORT || 5000;
dotenv.config();

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`)
// })

const eversendClient = require("@eversend/node-sdk")({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

const client = new TwitterApi({
  appKey: process.env.CONSUMER_KEY,
  appSecret: process.env.CONSUMER_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
});


const flagEmoji = {
  KES: "🇰🇪", // Kenya
  NGN: "🇳🇬", // Nigeria
  UGX: "🇺🇬", // Uganda
  GHS: "🇬🇭", // Ghana
  RWF: "🇷🇼", // Rwanda
  ZMW: "🇿🇲", // Zambia
  XAF: "🇨🇲", // Cameroon
  XOF: "🇨🇮", // Ivory Coast
  // Add flag emojis for other currencies as needed
};

// Function to format the date and time
function formatDateTime() {
  const now = new Date();
  const day = now.toLocaleString("en-US", { weekday: "short" });
  const month = now.toLocaleString("en-US", { month: "short" });
  const time = now.toLocaleTimeString("en-US");
  return `${day} ${month} ${time}`;
}

// Function to fetch exchange rate data from Eversend
const getExchangeRatesKEStoNGN = async () => {
  try {
    const exchangeRate = await eversendClient.exchanges.getQuotation({
      from: "KES",
      to: "NGN",
      amount: 1,
    });
    const { quotation } = exchangeRate;
    return quotation; // Return the quotation data
    // Do something with the quotation data
  } catch (error) {
    console.error("Error fetching quotation:", error);
  }
};

const getExchangeRatesKEStoGHS = async () => {
  try {
    const exchangeRate = await eversendClient.exchanges.getQuotation({
      from: "KES",
      to: "GHS",
      amount: 1,
    });
    const { quotation } = exchangeRate;
    return quotation; // Return the quotation data
    // Do something with the quotation data
  } catch (error) {
    console.error("Error fetching quotation:", error);
  }
};

const getExchangeRatesKEStoUGX = async () => {
  try {
    const exchangeRate = await eversendClient.exchanges.getQuotation({
      from: "KES",
      to: "UGX",
      amount: 1,
    });
    const { quotation } = exchangeRate;
    return quotation; // Return the quotation data
    // Do something with the quotation data
  } catch (error) {
    console.error("Error fetching quotation:", error);
  }
};

const getExchangeRatesNGNtoKES = async () => {
  try {
    const exchangeRate = await eversendClient.exchanges.getQuotation({
      from: "NGN",
      to: "KES",
      amount: 1,
    });
    const { quotation } = exchangeRate;
    return quotation; // Return the quotation data
    // Do something with the quotation data
  } catch (error) {
    console.error("Error fetching quotation:", error);
  }
};

const getExchangeRatesNGNtoGHS = async () => {
  try {
    const exchangeRate = await eversendClient.exchanges.getQuotation({
      from: "NGN",
      to: "GHS",
      amount: 1,
    });
    const { quotation } = exchangeRate;
    return quotation; // Return the quotation data
    // Do something with the quotation data
  } catch (error) {
    console.error("Error fetching quotation:", error);
  }
};

const getExchangeRatesNGNtoUGX = async () => {
  try {
    const exchangeRate = await eversendClient.exchanges.getQuotation({
      from: "NGN",
      to: "UGX",
      amount: 1,
    });
    const { quotation } = exchangeRate;
    return quotation; // Return the quotation data
    // Do something with the quotation data
  } catch (error) {
    console.error("Error fetching quotation:", error);
  }
};

const getExchangeRatesUGXtoKES = async () => {
  try {
    const exchangeRate = await eversendClient.exchanges.getQuotation({
      from: "UGX",
      to: "KES",
      amount: 1,
    });
    const { quotation } = exchangeRate;
    return quotation; // Return the quotation data
    // Do something with the quotation data
  } catch (error) {
    console.error("Error fetching quotation:", error);
  }
};

const getExchangeRatesUGXtoGHS = async () => {
  try {
    const exchangeRate = await eversendClient.exchanges.getQuotation({
      from: "UGX",
      to: "GHS",
      amount: 1,
    });
    const { quotation } = exchangeRate;
    return quotation; // Return the quotation data
    // Do something with the quotation data
  } catch (error) {
    console.error("Error fetching quotation:", error);
  }
};

const getExchangeRatesUGXtoNGN = async () => {
  try {
    const exchangeRate = await eversendClient.exchanges.getQuotation({
      from: "UGX",
      to: "NGN",
      amount: 1,
    });
    const { quotation } = exchangeRate;
    return quotation; // Return the quotation data
    // Do something with the quotation data
  } catch (error) {
    console.error("Error fetching quotation:", error);
  }
};

const getExchangeRatesGHStoNGN = async () => {
  try {
    const exchangeRate = await eversendClient.exchanges.getQuotation({
      from: "GHS",
      to: "NGN",
      amount: 1,
    });
    const { quotation } = exchangeRate;
    return quotation; // Return the quotation data
    // Do something with the quotation data
  } catch (error) {
    console.error("Error fetching quotation:", error);
  }
};

const getExchangeRatesGHStoKES = async () => {
  try {
    const exchangeRate = await eversendClient.exchanges.getQuotation({
      from: "GHS",
      to: "KES",
      amount: 1,
    });
    const { quotation } = exchangeRate;
    return quotation; // Return the quotation data
    // Do something with the quotation data
  } catch (error) {
    console.error("Error fetching quotation:", error);
  }
};

const getExchangeRatesGHStoUGX = async () => {
  try {
    const exchangeRate = await eversendClient.exchanges.getQuotation({
      from: "GHS",
      to: "UGX",
      amount: 1,
    });
    const { quotation } = exchangeRate;
    return quotation; // Return the quotation data
    // Do something with the quotation data
  } catch (error) {
    console.error("Error fetching quotation:", error);
  }
};

const tweet = async (rateFunction) => {
  const quotation = await rateFunction();
  console.log(quotation, 'quotation error now');
  const tweetText =
    `${formatDateTime()}\n` +
    ` ${flagEmoji[quotation?.baseCurrency]} 1 ${quotation?.baseCurrency}  >>>>  ${
      flagEmoji[quotation?.destCurrency]
    } ${quotation?.destCurrency} ${quotation?.destAmount.toFixed(4)}`;
  try {
    await client.v2.tweet(tweetText);
  } catch (e) {
    console.log(e);
  }
};

tweet(getExchangeRatesKEStoNGN);
tweet(getExchangeRatesKEStoGHS);
tweet(getExchangeRatesKEStoUGX);

tweet(getExchangeRatesNGNtoKES);
tweet(getExchangeRatesNGNtoGHS);
tweet(getExchangeRatesNGNtoUGX);

tweet(getExchangeRatesUGXtoKES);
tweet(getExchangeRatesUGXtoGHS);
tweet(getExchangeRatesUGXtoNGN);

tweet(getExchangeRatesGHStoKES);
tweet(getExchangeRatesGHStoUGX);
tweet(getExchangeRatesGHStoNGN);
