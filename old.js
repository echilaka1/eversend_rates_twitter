const Twit = require("twit");
// const cron = require("node-cron");
const dotenv = require("dotenv");
dotenv.config();
// Eversend API credentials
const eversendClient = require("@eversend/node-sdk")({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

// Twitter API credentials
const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY, //client id from twitter, this is when you grant read and write permissions
  consumer_secret: process.env.CONSUMER_SECRET, // client secret from twitter
  access_token: process.env.ACCESS_TOKEN, // access token from twitter
  access_token_secret: process.env.ACCESS_TOKEN_SECRET, // access token secret from twitter
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests. 60 seconds
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
    console.log(exchangeRate.quotation, "response");
    const { quotation } = exchangeRate;
    return quotation; // Return the quotation data
    // Do something with the quotation data
  } catch (error) {
    console.error("Error fetching quotation:", error);
  }
};

// Function to tweet exchange rates
const tweetExchangeRates = async (rateFunction) => {
  const quotation = await rateFunction();
  const tweetText =
    `${formatDateTime()}\n` +
    ` 1 ${flagEmoji[quotation?.baseCurrency]} ${quotation?.baseCurrency} 🔄 ${
      flagEmoji[quotation?.destCurrency]
    } ${quotation?.destCurrency} ${quotation?.destAmount.toFixed(4)}`;

  T.post("statuses/update", { status: tweetText }, (err, data, response) => {
    if (err) {
      console.error("Error posting tweet:", err);
    } else {
      console.log("Tweet posted:", tweetText);
    }
  });
};

// Schedule the bot to tweet at your desired interval
//setInterval(tweetExchangeRates, 24 * 60 * 60 * 1000); // 24 hours

// Initial tweet on bot activation
tweetExchangeRates(getExchangeRatesKEStoNGN);
// cron.schedule("0 9,17 * * *", () => {
//   tweetExchangeRates(getExchangeRatesKEStoNGN);
// });
