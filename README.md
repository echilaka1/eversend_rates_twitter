# Eversend Twitter Exchange Rates Bot

Twitter bot for [Eversend](https://twitter.com/eversendapp)

## Getting Started

Clone the repository

```sh

$ https://github.com/echilaka1/eversend_rates_twitter.git

```

Install dependencies:

```sh

$ npm install

```

# Local Development

To protect the [@eversend_rates](https://twitter.com/eversend_rates) account, the related consumer keys and access tokens are hidden as environment variables. You can create your own tokens and hook them into this project to run the code with a personal Twitter account, and also get your own Eversend API keys to run the code.

Create a .env file and provide values for the following keys

```sh
CLIENT_ID=eversend_client_id
CLIENT_SECRET=eversend_client_secret
CONSUMER_KEY=private_consumer_key
CONSUMER_SECRET=private_consumer_secret
ACCESS_TOKEN=private_access_token
ACCESS_TOKEN_SECRET=private_access_token_secret
```

# Testing
To run tests locally:

```sh

$ node index.js

```

## Contribution Guidelines

Contributions are welcome and encouraged. Learn more about our contribution guidelines [here](/CONTRIBUTING.md)
## License

MIT © [Echilaka1]()