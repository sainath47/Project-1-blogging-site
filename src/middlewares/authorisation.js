const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const isValid = mongoose.Types.ObjectId.isValid;

const authorisation = function (req, res, next) {
  // comapre the logged in user's id and the id in request
  try {
    let token = req.headers["x-Api-Key"];
    if (!token) token = req.headers["x-api-key"];
    if (!token)
      return res
        .status(400)
        .send({ status: false, msg: "token must be present" });

    let decodedToken = jwt.verify(token, "RSPtechnologies-brillientCoders");
    if (!decodedToken)
      return res.status(401).send({ status: false, msg: "token is invalid" });
    let authorId = req.params.authorId;
    if (!isValid(authorId))
      return res.status(404).send({ status: false, msg: "authorId invalid" });
    if (decodedToken.authorId != authorId)
      return res
        .status(403)
        .send({ msg: "you are not autherised for this process" });
  } catch (err) {
    res.status(500).send({ msg: "server error", error: err.message });
  }

  next();
};

module.exports.authorisation = authorisation;
