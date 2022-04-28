const jwt = require("jsonwebtoken");


const authorisation = function(req, res, next) {
    // comapre the logged in user's id and the id in request
    let token = req.headers["x-Api-Key"];
    if (!token) token = req.headers["x-api-key"];
    if (!token) return res.status(400).send({ status: false, msg: "token must be present" });

    let decodedToken = jwt.verify(token, "RSPtechnologies-brillientCoders");
    if(!decodedToken) return res.status(401).send({ status: false, msg: "token is invalid"})
    let authorId= req.params.authorId
    if(decodedToken.authorId != authorId) return res.status(403).send({msg:"you are not autherised for this process"})

    
    next()
}


module.exports.authorisation= authorisation