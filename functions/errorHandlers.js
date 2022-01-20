
const errorCodes = {
  "Invalid email": 400,
  "Invalid 'action' value in request body.  Must be 'stop' or 'start'": 400,
  "Email address not a target in campaign": 400,
  "Email address already a campaign target": 400,
};

const errorHandler = async (errMessage, res) => {
  const code = errorCodes[errMessage] || 500;
  return code === 400 ? (err, res) => res.status(400).json(err) :
    (err, res) => res.sendStatus(500);
};

module.exports = errorHandler;
