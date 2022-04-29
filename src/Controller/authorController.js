const jwt = require("jsonwebtoken");
const AuthorModel= require("../models/authorModel")


const createAuthor= async function (req, res) {
  try{
    let data = req.body
    if(Object.keys(data).length == 0){
      return res.status(400).send({status: false,msg: "Invalid request, Please provide blog details",
      });
    }
    const {fname,lname,title,email,password} = data

    if (!fname)
     {return res.status(400).send({ status: false, msg: "Firstname is required" })}
    if (!lname) 
    {return res.status(400).send({ status: false, msg: "Lastname is required" })}
    if (!title)
     {return res.status(400).send({ status: false, msg: "Title is required" })}
    if (!email) 
    {return res.status(400).send({ status: false, msg: "Email is required" })}
    if (!password)
     {return res.status(400).send({ status: false, msg: "Password is required" })}

    const validate = function(v){
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
    }
    if(validate(email)) return res.status(400).send({ status: false, msg: "email is not valid" })
    let authorCreated = await AuthorModel.create(fname,lname,title,email,password)
    res.status(200).AuthorModelsend({status:true,data: authorCreated})

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
