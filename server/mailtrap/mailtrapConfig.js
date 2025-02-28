const MailtrapClient = require("mailtrap").MailtrapClient;
const dotenv = require("dotenv");

dotenv.config();

const mailtrapClient = new MailtrapClient({
    endpoint: process.env.MAILTRAP_ENDPOINT,
    token: process.env.MAILTRAP_TOKEN,
});

const sender = {
    email: "mailtrap@demomailtrap.com",
    name: "Manny",
};

module.exports = {mailtrapClient, sender}