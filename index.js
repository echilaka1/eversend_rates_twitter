const { TwitterApi } = require("twitter-api-v2");
const dotenv = require("dotenv");
// const express = require("express");
// const app = express();
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

const pairsArray = ["NGN", "GHS", "UGX", "KES"];

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
    console.error(
      `Main Exchange Rate Error fetching quotation for ${fromCurrency} to ${toCurrency}:`,
      error.response.data
    );
    throw error; // Rethrow the error to be caught by the calling function
  }
};

const tweetExchangeRates = async (baseCurrency, currencyArray) => {
  let errorOccurred = false;
  try {
    // Check if baseCurrency is in currencyArray, remove it if present
    const index = currencyArray.indexOf(baseCurrency);
    if (index !== -1) {
      currencyArray.splice(index, 1);
    }

    const exchangeRatePromises = currencyArray.map(async (currency) => {
      try {
        const rate = await getExchangeRate(baseCurrency, currency);
        return { currency, rate };
      } catch (error) {
        console.error(
          `Sub Exchange Rate when Tweeting - Error fetching quotation for ${baseCurrency} to ${currency}:`,
          error.response.data
        );
        errorOccurred = true;
        // Don't rethrow the error to continue processing other promises
        return null; // Return null for the failed promise
      }
    });

    const exchangeRates = await Promise.all(exchangeRatePromises);

    // Check if any errors occurred
    if (errorOccurred) {
      console.warn(
        "Errors occurred during exchange rate fetching. Skipping tweet."
      );
      return;
    }

    const tweetText =
      `${formatDateTime()}\n` +
      exchangeRates
        .map(
          ({ currency, rate }) =>
            ` ${flagEmoji[baseCurrency]} 1 ${baseCurrency} >>>> ${
              flagEmoji[currency]
            } ${currency} ${rate.destAmount.toFixed(4)}`
        )
        .join("\n");

    await client.v2.tweet(tweetText);
  } catch (error) {
    console.error(`Error in tweetExchangeRates${baseCurrency}:`, error);
    throw error; // Rethrow the error to be caught by the calling function or global error handler
  }
};

(async () => {
  try {
    const promises = [
      tweetExchangeRates("KES", pairsArray),
      tweetExchangeRates("NGN", pairsArray),
      tweetExchangeRates("UGX", pairsArray),
      tweetExchangeRates("GHS", pairsArray),
    ];

    await Promise.all(promises);
  } catch (error) {
    console.log(error);
  }
})();

// Endpoint to trigger the exchange rate tweet
// app.get("/trigger-exchange-rate-tweet", async (req, res) => {
//   try {
//     const promises = [
//       tweetExchangeRates("KES", pairsArray),
//       tweetExchangeRates("NGN", pairsArray),
//       tweetExchangeRates("UGX", pairsArray),
//       tweetExchangeRates("GHS", pairsArray),
//     ];

//     await Promise.all(promises);

//     res.status(200).send("Exchange rate tweet triggered successfully!");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// //global error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something went wrong!");
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
