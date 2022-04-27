const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel");


// const createBlog= async function(req,res){
//     let author = req.body
//     let authorCreated = await blogModel.create(author)
//     res.send({data: authorCreated})
// }

const createBlog = async function (req, res) {

  try {
   let data= req.body
    if (Object.keys(data).length != 0) {

        let authorId = req.body.authorId;
        if(!authorId) return res.send({msg:"authorId is required"})
        let validationAuthorId = await authorModel.findById(authorId);
        if (!validationAuthorId) return res.send({ msg: "enter valid authorId" });

      let blog = req.body;
      let blogCreated = await blogModel.create(blog);
      // console.log(blogCreated);
      res.status(201).send({ data: blogCreated });
    } else {
      return res.status(400).send({ msg: "Bad request" });
    }
  } catch (err) {
    res.status(500).send({ msg: "server error", error: err.message });
  }
};


const GetFilteredBlog= async function(req,res){
    let data = await blogModel.find({$and:[{isDeleted:false},{isPublished:true}]})
    // console.log(data)
    res.send({msg:data})
}



// $and
// $in
// $or
// $gte
// $gt



// const createBlog1 = async function (req, res) {
//   let authorId = req.body.authorId;
//   let validationAuthorId = await authorModel.findById(authorId);

//   if (!validationAuthorId) return res.send({ msg: "enter valid authorId" });
//   try {
//     if (req.body) {
//       let blog = req.body;
//       let blogCreated = await blogModel.create(blog);
//       console.log(blogCreated);
//       res.status(201).send({ data: blogCreated });
//     } else {
//       return res.status(400).send({ msg: "invalid request" });
//     }
//   } catch (err) {
//     res.status(500).send({ msg: "server error", error: err.message });
//   }
// };

module.exports.createBlog = createBlog;
module.exports.GetFilteredBlog = GetFilteredBlog;
// module.exports.createBlog1 = createBlog1;
