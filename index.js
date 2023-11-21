const { TwitterApi } = require("twitter-api-v2");
const dotenv = require("dotenv");
dotenv.config();

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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const tweetExchangeRates = async (baseCurrency, currencyArray) => {
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
        throw error;
      }
    });

    const exchangeRates = await Promise.all(exchangeRatePromises);

    const tweetText =
      `${formatDateTime()}\n` +
      exchangeRates
        .map(
          ({ currency, rate }) =>
            ` ${flagEmoji[baseCurrency]} 1 ${baseCurrency} >>>> ${
              flagEmoji[currency]
            } ${currency} ${rate.destAmount.toFixed(4)}`
        )
        .join("\n") +
      "\n\n#EversendExchangeRates";

    await client.v2.tweet(tweetText);

    // Introduce a delay after each tweet
    await sleep(5000);
  } catch (error) {
    console.error(`Error in tweetExchangeRates${baseCurrency}:`, error.response.data);
    throw error;
  }
};

(async () => {
  try {
    for (const baseCurrency of ["KES", "NGN", "UGX", "GHS"]) {
      await tweetExchangeRates(baseCurrency, pairsArray);
    }
  } catch (error) {
    console.log(error.response.data, "Error in last async function");
  }
})();
