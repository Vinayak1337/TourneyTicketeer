# Tourney Ticketeer

Tourney Ticketeer is a specialized Discord bot tailored for tournament organizers, particularly those who host and manage gaming tournaments. Developed with Node.js and JavaScript, its primary function is to oversee the payment process for tournament winners, ensuring a seamless and transparent transaction experience for both the organizers and the winners.

## Data Management

The bot employs `.csv` files as a makeshift database, ensuring efficient data storage, retrieval, and manipulation. This approach provides quick access to data and simplifies the management process.

## Core Functionality

Upon initiating a command in a designated channel, a ticket is created for the user. This ticket serves as a private channel where the user can specify their preferred payment method. Once all necessary details are provided, the user can lock the channel with another command. After the payment is processed, the ticket is deleted, the user is notified via DM, and any associated roles are removed. All ticket activities, including creation, updates, deletions, or failures, are logged in a dedicated channel for transparency and record-keeping.

## Getting Started

To set up the bot, follow these steps:

```
git clone https://github.com/Vinayak1337/TourneyTicketeer.git
cd TourneyTicketeer
npm install
```

Next, edit the configuration values in:
[settings.js](https://github.com/Vinayak1337/TourneyTicketeer/blob/master/data/keys/settings.js)

```
exports.tokenFirst = 'YOUR_FIRST_TOKEN';
exports.tokenSecond = 'YOUR_SECOND_TOKEN'; // Optional
exports.tag = '$';
exports.seprator = 's+;';
exports.owners = ['YOUR_DISCORD_ID'];
exports.clientID = 'YOUR_CLIENT_ID';
```

For Brawl Stars tokens (optional), edit:
[tokens.js](https://github.com/Vinayak1337/TourneyTicketeer/blob/master/data/keys/tokens.js)

```
exports.token1 = 'YOUR_TOKEN_1';
// ... Add other tokens as needed
```

Finally, start the bot:

```
npm start
```

## License

This project is licensed under the terms of the [MIT License](https://github.com/Vinayak1337/TourneyTicketeer/blob/master/LICENSE).
