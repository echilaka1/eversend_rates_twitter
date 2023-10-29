const { TwitterApi } = require("twitter-api-v2");
const dotenv = require("dotenv");
// const express = require('express')
// const app = express()
// const port = process.env.PORT || 5000;
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
const getExchangeRate = async (fromCurrency, toCurrency) => {
  try {
    const exchangeRate = await eversendClient.exchanges.getQuotation({
      from: fromCurrency,
      to: toCurrency,
      amount: 1,
    });
    const { quotation } = exchangeRate;
    return quotation; // Return the quotation data
    // Do something with the quotation data
  } catch (error) {
    console.error("Error fetching quotation:", error);
  }
};

const tweetExchangeRates = async () => {
  try {
    const kestoNGN = await getExchangeRate("KES", "NGN");
    const kestoGHS = await getExchangeRate("KES", "GHS");
    const kestoUGX = await getExchangeRate("KES", "UGX");

    const tweetText =
      `${formatDateTime()}\n` +
      ` ${flagEmoji["KES"]} 1 KES  >>>>  ${
        flagEmoji["NGN"]
      } NGN ${kestoNGN.destAmount.toFixed(4)}\n` +
      ` ${flagEmoji["KES"]} 1 KES  >>>>  ${
        flagEmoji["GHS"]
      } GHS ${kestoGHS.destAmount.toFixed(4)}\n` +
      ` ${flagEmoji["KES"]} 1 KES  >>>>  ${
        flagEmoji["UGX"]
      } UGX ${kestoUGX.destAmount.toFixed(4)}`;

    await client.v2.tweet(tweetText);
  } catch (e) {
    console.log(e);
  }
};

const tweetExchangeRatesTwo = async () => {
  try {
    const kestoNGN = await getExchangeRate("NGN", "KES");
    const kestoGHS = await getExchangeRate("NGN", "GHS");
    const kestoUGX = await getExchangeRate("NGN", "UGX");

    const tweetText =
      `${formatDateTime()}\n` +
      ` ${flagEmoji["NGN"]} 1 NGN  >>>>  ${
        flagEmoji["KES"]
      } KES ${kestoNGN.destAmount.toFixed(4)}\n` +
      ` ${flagEmoji["NGN"]} 1 NGN  >>>>  ${
        flagEmoji["GHS"]
      } GHS ${kestoGHS.destAmount.toFixed(4)}\n` +
      ` ${flagEmoji["NGN"]} 1 NGN  >>>>  ${
        flagEmoji["UGX"]
      } UGX ${kestoUGX.destAmount.toFixed(4)}`;

    await client.v2.tweet(tweetText);
  } catch (e) {
    console.log(e);
  }
};

const tweetExchangeRatesThree = async () => {
  try {
    const kestoNGN = await getExchangeRate("UGX", "KES");
    const kestoGHS = await getExchangeRate("UGX", "GHS");
    const kestoUGX = await getExchangeRate("UGX", "NGN");

    const tweetText =
      `${formatDateTime()}\n` +
      ` ${flagEmoji["UGX"]} 1 UGX  >>>>  ${
        flagEmoji["KES"]
      } KES ${kestoNGN.destAmount.toFixed(4)}\n` +
      ` ${flagEmoji["UGX"]} 1 UGX  >>>>  ${
        flagEmoji["GHS"]
      } GHS ${kestoGHS.destAmount.toFixed(4)}\n` +
      ` ${flagEmoji["UGX"]} 1 UGX  >>>>  ${
        flagEmoji["NGN"]
      } NGN ${kestoUGX.destAmount.toFixed(4)}`;

    await client.v2.tweet(tweetText);
  } catch (e) {
    console.log(e);
  }
};
const tweetExchangeRatesFour = async () => {
  try {
    const kestoNGN = await getExchangeRate("GHS", "KES");
    const kestoGHS = await getExchangeRate("GHS", "UGX");
    const kestoUGX = await getExchangeRate("GHS", "NGN");

    const tweetText =
      `${formatDateTime()}\n` +
      ` ${flagEmoji["GHS"]} 1 GHS  >>>>  ${
        flagEmoji["KES"]
      } KES ${kestoNGN.destAmount.toFixed(4)}\n` +
      ` ${flagEmoji["GHS"]} 1 GHS  >>>>  ${
        flagEmoji["UGX"]
      } UGX ${kestoGHS.destAmount.toFixed(4)}\n` +
      ` ${flagEmoji["GHS"]} 1 GHS  >>>>  ${
        flagEmoji["NGN"]
      } NGN ${kestoUGX.destAmount.toFixed(4)}`;

    await client.v2.tweet(tweetText);
  } catch (e) {
    console.log(e);
  }
};

tweetExchangeRates();
tweetExchangeRatesTwo();
tweetExchangeRatesThree();
tweetExchangeRatesFour();
