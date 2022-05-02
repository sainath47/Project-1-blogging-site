const mongoose = require('mongoose');
const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel");
const isValid = mongoose.Types.ObjectId.isValid



//*Create Blog
const createBlog = async function (req, res) {
  try {
    //*Empty Body Validation
    const data = req.body
    if(Object.keys(data).length == 0){
        return res.status(400).send({status: false,msg: "Invalid request, Please provide blog details",
      });
    }
    
      let authorId = req.body.authorId;
      if (!authorId) return res.status(400).send({ msg: "Author ID is Required" });
      let validationAuthorId = await authorModel.findById(authorId);
      if (!validationAuthorId) return res.send({ msg: "Enter Valid Author ID" });

    //*Extracts Param
      const title = req.body.title;
      const body = req.body.body;
      const tags = req.body.tags;
      const category = req.body.category;
      const subcategory = req.body.subcategory;

    //*Params Validation
      if (!title)  return res.status(400).send({ status: false, msg: "Title is required" }) 
      if (!body)   return res.status(400).send({ status: false, msg: "Body is required" }) 
      if (!tags)   return res.status(400).send({ status: false, msg: "Tags is required" }) 
      if (!category) return res.status(400).send({ status: false, msg: "Category is required" }) 
      if (!subcategory)  return res.status(400).send({ status: false, msg: "Subcategory is required" }) 

      let blogCreated = await blogModel.create(data);
      res.status(201).send({ data: blogCreated });
  } catch (err) {res.status(500).send({ msg: "server error", error: err.message })}
};

//*Get Filtered Blog

const GetFilteredBlog = async function (req, res) {
  try {

    

    let authId = req.query.authorId;
    let cat = req.query.category;
    let subcat = req.query.subcategory;
    let tag = req.query.tags;

  
    let allData = await blogModel.find({ isDeleted: false , isPublished: true ,
      $or: [
        { authorId: authId },
        { category: cat },
        { subcategory: subcat },
        { tags: tag }, 
      ],
    }).populate("authorId");

//*Validation

    if (allData.length == 0) return res.status(404).send({ msg: "Enter valid Details" });
    res.status(200).send({ status: true, msg: allData });}
  
  catch (err) {res.status(500).send({ status: false, msg: "server Error", err: err.message });
  }
};



//*Update Blog

const updateBlog = async function (req, res) {
  try {


    const blogId = req.params.blogId;
    if (!blogId) return res.status(404).send({ status: false, msg: "No Blog Found" })
    if(!isValid(blogId)) return res.status(404).send({ status: false, msg: "BlogID invalid" });

//*Extracts Param
    const title = req.body.title;
    const body = req.body.body;
    const tag = req.body.tags;
    const cat = req.body.category;
    const subcat = req.body.subcategory;

    if(title || cat || subcat || tag || body)
    {
    const updatedBlog = await blogModel.findOneAndUpdate(
      { _id: blogId },
      {
        title: title,
        body: body,
        category: cat,
        $push: { subcategory: subcat, tags: tag },
        isPublished: true,
        publishedAt: new Date(),
      },
      { new: true }
    );
//*Validation
    if (!updatedBlog) return res.status(400).send({ msg: "enter valid queries" });
    res.status(200).send({ status: true, msg: "Updated successfully", data: updatedBlog });
    }
      else{ res.status(400).send({msg:"data is required in body "})}
  } 
  catch (err) {res.status(500).send({ status: false, msg: "Error", err: err.message })}
};

//*Delete-Blog-By-Id

const DeleteBlogById = async function (req, res) {
  try {

    const blogId = req.params.blogId;
    if (!blogId) return res.status(404).send({ status: false, msg: "Blog Id is needed in path params" })
    if(!isValid(blogId)) return res.status(404).send({ status: false, msg: "BlogID invalid" });

    let DeletedBlog = await blogModel.findOneAndUpdate(
      { _id: blogId },
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );

    //*Validation

    if (!DeletedBlog) return res.status(404).send({ msg: "blog not found" });
    res.status(200).send({ status: true, msg: DeletedBlog });
  } 
  catch (err) {res.status(500).send({ status: false, msg: "Error", err: err.message });
  }
};


//*Delete-Blog-By-Queryparams

const DeleteBlogByQuery = async function (req, res) {
  try {
//*Extracts Query
    let authId = req.query.authorId;
    let cat = req.query.category;
    let subcat = req.query.subcategory;
    let tag = req.query.tags;

    if(cat || subcat || tag || body)
    {

    let deletedBlogs = await blogModel.findOneAndUpdate(
      {
        $or: [
          { authorId: authId },
          { category: cat },
          { subcategory: subcat },
          { tags: tag },
        ],
      },
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    ); 
 //*Validation   
    if (!deletedBlogs) return res.status(404).send({ msg: "enter valid queries" });
    }
    else{ res.status(400).send({msg:"at least one query is required for upadating data "})}
    res.status(200).send({ status: true, msg: deletedBlogs });
  } 
  catch (err) {res.status(500).send({ status: false, msg: "Error", err: err.message });
  }
};



module.exports.createBlog = createBlog;
module.exports.GetFilteredBlog = GetFilteredBlog;
module.exports.updateBlog = updateBlog;
module.exports.DeleteBlogById = DeleteBlogById;
module.exports.DeleteBlogByQuery = DeleteBlogByQuery;


