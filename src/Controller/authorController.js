const jwt = require("jsonwebtoken");
const AuthorModel= require("../models/authorModel")


const createAuthor= async function (req, res) {
    let author = req.body
    let authorCreated = await AuthorModel.create(author)
    res.send({data: authorCreated})
}

const loginAuthor = async function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
  
    let user = await AuthorModel.findOne({ email: email, password: password });
    if (!user)
      return res.send({
        status: false,
        msg: "username or the password is not corerct",
      });
  
 
    let token = jwt.sign(
      {
        userId: user._id.toString(),
        batch: "brillientCoders",
        organisation: "RSPtechnologies",
      },
      "RSPtechnologies-brillientCoders"
    );
    res.setHeader("x-auth-token", token);
    res.send({ status: true, data: token });
  };
  
module.exports.createAuthor= createAuthor
module.exports.loginAuthor = loginAuthor