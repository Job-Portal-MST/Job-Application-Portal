const StatusCodes = require("http-status-codes").StatusCodes;

const errorSend = (res, msg, sts = StatusCodes.INTERNAL_SERVER_ERROR) => (err) => {
    console.log(err);
    res.status(sts).json({ error: msg });
};

module.exports = {
    errorSend,
};
