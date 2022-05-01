const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const isValid = mongoose.Types.ObjectId.isValid;

//*Author-Authorisation
const authorisation = function (req, res, next) {
  try {
//*Here using Token we validate the user

    let token = req.headers["x-Api-Key"];
    if (!token) token = req.headers["x-api-key"];
    if (!token)return res.status(400).send({ status: false, msg: "token must be present" });

//*Token Decoded

    let decodedToken = jwt.verify(token, "RSPtechnologies-brillientCoders");
    if (!decodedToken) return res.status(401).send({ status: false, msg: "token is invalid" });

//*To check valid Author-ID input

    let authorId = req.params.authorId;
    if (!isValid(authorId))return res.status(404).send({ status: false, msg: "authorId invalid" });

//*To check Author is Authorised or not

    if (decodedToken.authorId != authorId) 
    return res.status(403).send({ msg: "you are not autherised for this process" });
  } 
  catch (err) {res.status(500).send({ msg: "server error", error: err.message });
  }

  next();
};

module.exports.authorisation = authorisation;
