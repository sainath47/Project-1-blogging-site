const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const authorModel= require("../models/authorModel")
const isValid = mongoose.Types.ObjectId.isValid

//*Author-Authentication

const authentication = async function(req, res, next) {
    try{
    //here using token we validate the user 
    let token = req.headers["x-Api-Key"];
    if (!token) token = req.headers["x-api-key"];
    if (!token) return res.status(401).send({ status: false, msg: "token must be present" });
    
//*Token decoded 

    let decodedToken = jwt.verify(token, "RSPtechnologies-brillientCoders");
    if (!decodedToken) return res.status(400).send({ status: false, msg: "token is invalid" });

//*To check valid Author-ID Input

    let authorId= req.params.authorId
    if(!isValid(authorId)) return res.status(404).send({ status: false, msg: "authorId invalid" })

//*To check Author Exist or not

    let author = await authorModel.findById(authorId);
    if (!author) return res.status(404).send("No such user exists");
    }
    catch (err) {res.status(500).send({ msg: "server error", error: err.message })}
    next()
}


module.exports.authentication= authentication