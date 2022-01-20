const functions = require("firebase-functions");
const errorHandler = require("./errorHandlers");
const emailParser = require('./emailParser')
const sendMail = require('./mailer');

const campaignTargets = {};

exports.handleAutomatedEmailsReq = functions.https.onRequest(
	async (req, res) => {
		let action, emailAddress;
		try {

			if (req.body instanceof Buffer) {
				const str = req.body.toString('utf-8');
				const fields = await emailParser(str)
				action = fields.subject.toLowerCase();
				emailAddress = fields.from;
			} else {
				action = req.body.action.toLowerCase();
				emailAddress = req.body.emailAddress;
			}

      if (action !== "stop" && action !== "start") {
        throw new Error("Invalid 'action' value in request body.  Must be 'stop' or 'start'");
      }
	
      if (action === 'stop') {

        if (campaignTargets[emailAddress]) {
			  	clearInterval(campaignTargets[emailAddress]);
				  delete campaignTargets[emailAddress];
			  	res.sendStatus(204);
				  return;
			  }
			  throw new Error("Email address not a target in campaign")
	  	}

		  if (action === "start") {

		    if (campaignTargets[emailAddress] === undefined) {
				  campaignTargets[emailAddress] = setInterval(sendMail, 10000, emailAddress);
				  res.sendStatus(201);
				  return;
			  }
			  throw new Error("Email address already a campaign target");
		  }

			res.sendStatus(400);
			return;
	} catch (err) {
		console.error(err);
		const response = await errorHandler(err.message);
		response(err.message, res);
		return;
	}
})

