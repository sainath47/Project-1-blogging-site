const jwt = require("jsonwebtoken");
const authorModel= require("../models/authorModel")


const authentication = async function(req, res, next) {
    //here using token we validate the user 
    let token = req.headers["x-Api-Key"];
    if (!token) token = req.headers["x-api-key"];
  
    if (!token) return res.status(401).send({ status: false, msg: "token must be present" });

    let decodedToken = jwt.verify(token, "RSPtechnologies-brillientCoders");
    if (!decodedToken)
      return res.status(400).send({ status: false, msg: "token is invalid" });
     let authorId= req.params.authorId
      let author = await authorModel.findById(authorId);
      if (!author) return res.status(404).send("No such user exists");

    next()
}

// router.delete("/blogs/delete",middleware.aurhorisation,blogController.DeleteBlogByQuery)

module.exports= authentication