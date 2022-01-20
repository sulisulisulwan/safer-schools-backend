require("dotenv").config({path: "./.env"});
const sgMail = require("@sendgrid/mail");
const {SENDGRID_API_KEY} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const composeMessage = (sendToAddress) => {
  return {
    to: `${sendToAddress}`,
    from: "suliozhf@sulimantekalliviolin.com",
    subject: "Send STOP in the subject line to stop the email assault",
    text: "Send STOP in the subject line to stop these emails",
    html: "<h2> Send STOP in the subject line to stop these emails</h2>",
  };
};

const sendMail = async (email) => {
  const msg = composeMessage(email);
  await sgMail.send(msg).catch((err) => console.error(err));
};


module.exports = sendMail;