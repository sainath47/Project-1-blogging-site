const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel");



const createBlog = async function (req, res) {

  try {
    if (req.body) {

        let authorId = req.body.authorId;
        if(!authorId) return res.send({msg:"authorId is required"})
        let validationAuthorId = await authorModel.findById(authorId);
        if (!validationAuthorId) return res.send({ msg: "enter valid authorId" });

      let blog = req.body;
      let blogCreated = await blogModel.create(blog);
      console.log(blogCreated);
      res.status(201).send({ data: blogCreated });
    } else {
      return res.status(400).send({ msg: "Bad request" });
    }
  } catch (err) {
    res.status(500).send({ msg: "server error", error: err.message });
  }
};


const filterBlogs= async function(req,res){

    let data = await blogModel.find($and[{isDeleted:false},{published:true}])
    res.send({msg:data})
}


// const createBlog1 = async function (req, res) {
//   let authorId = req.body.authorId;
//   let validationAuthorId = await authorModel.findById(authorId);







module.exports.createBlog = createBlog;
// module.exports.createBlog1 = createBlog1;
