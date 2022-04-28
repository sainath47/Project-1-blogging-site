const jwt = require("jsonwebtoken");
const AuthorModel= require("../models/authorModel")


const createAuthor= async function (req, res) {
  try{
    let data = req.body
    if(Object.keys(data).length!=0){
  let author = req.body
    let authorCreated = await AuthorModel.create(author)
    res.status(200).AuthorModelsend({status:true,data: authorCreated})
  }
else {
  return res.status(400).send({ msg: "Bad request" });
}
} catch (err) {
res.status(500).send({ msg: "server error", error: err.message });
}
}




const loginAuthor = async function (req, res) {
    let email = req.body.email;

    
    let password = req.body.password;
  try{
    let author = await AuthorModel.findOne({ email: email, password: password });
    if (!author)
          return res.status(400).send({
            status: false,
            msg: "email or the password is not corerct",
          });

          
    let token = jwt.sign(
      {
        authorId: author._id.toString(),
        batch: "brillientCoders",
        organisation: "RSPtechnologies",
      },
      "RSPtechnologies-brillientCoders"
    );
    res.header("x-Api-Key", token);
        res.status(200).send({ status: true, data: token });
      
    }
    catch (err) {
      res.status(500).send({ msg: "server error", error: err.message });
      }
    }
  






  
module.exports.createAuthor= createAuthor
module.exports.loginAuthor = loginAuthor
