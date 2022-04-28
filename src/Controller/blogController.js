const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel");



//===============POST/blogs====================
const createBlog = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length != 0) {
      let authorId = req.body.authorId;
      if (!authorId) return res.send({ msg: "authorId is required" });
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

//============GET/blogs===========

const GetFilteredBlog = async function (req, res) {


  try {
    
      let authId = req.query.authorId;
      let cat = req.query.category;
      let subcat = req.query.subcategory;
      let tag = req.query.tags;
      let allData = await blogModel.find({
        $or: [
          { authorId: authId },
          { category: cat },
          { subcategory: subcat },
          { tags: tag },{ isDeleted: false }, { isPublished: true }
        ],
      });
      if (allData.length == 0)
        return res.status(404).send({ msg: "enter valid queries" });
      // console.log(allData);

      res.status(200).send({ status: true, msg: allData });
   
    
  } catch (err) {
    res.status(500).send({ status: false, msg: "Error", err: err.message });
  }
};

// const GetFilteredBlog = async function (req, res) {
//   let data = await blogModel.find({
//     $and: [{ isDeleted: false }, { isPublished: true }],
//   });
//   try {
//     if (data.length != 0) {
//       let authId = req.query.authorId;
//       let cat = req.query.category;
//       let subcat = req.query.subcategory;
//       let tag = req.query.tags;
//       let allData = await blogModel.find({
//         $and: [
//           { authorId: authId },
//           { category: cat },
//           { subcategory: subcat },
//           { tags: tag },
//         ],
//       });
//       if (allData.length == 0)
//         return res.status(400).send({ msg: "enter valid queries" });
//       // console.log(allData);

//       res.send({ status: true, msg: allData });
//     } else {
//       return res.status(404).send({ msg: "Not Found" });
//     }
//   } catch (err) {
//     res.status(500).send({ status: false, msg: "Error", err: err.message });
//   }
// };

//=============== PUT/blogs/:blogId===========

const updateBlog = async function (req, res) {
  try {
    const blogId = req.params.blogId;
    if (!blogId) {
      return res.status(404).send({ status: false, msg: "No Blog Found" });
    }

    const title = req.body.title;
    const body = req.body.body;
    const tags = req.body.tags;
    const cat = req.body.category;
    const subcat = req.body.subcategory;

    const updatedBlog = await blogModel.findOneAndUpdate(
      { _id: blogId },
      {
        title: title,
        body: body,
        category: cat,
        $push: { subcategory: subcat, tags: tags },
        isPublished: true,
        publishedAt : new Date(),
      },
      { new: true }
    );
    // $push: { tags: tags }

    // updateBlog.subcategory.push(subcat)

    if (!updateBlog)
      return res.status(400).send({ msg: "enter valid queries" });

   
    res
      .status(200)
      .send({ status: true, msg: "Updated successfully", data: updatedBlog });
  } catch (err) {
    res.status(500).send({ status: false, msg: "Error", err: err.message });
  }
};

//=============DELETE/blogs/:blogId======================

const DeleteBlogById = async function (req, res) {
  try {
    const blogId = req.params.blogId;
    if (!blogId) {
      return res
        .status(404)
        .send({ status: false, msg: "Blog Id is needed in path params" });
    }

    let DeletedBlog = await blogModel.findOneAndUpdate(
      { _id: blogId },
      { isDeleted: true, deletedAt: new Date() },

      { new: true }
    );

    if (!DeletedBlog) return res.status(404).send({ msg: "blog not found" });
    //  console.log(updateBlog)
    res.status(200).send({ status: true, msg: DeletedBlog });
  } catch (err) {
    res.status(500).send({ status: false, msg: "Error", err: err.message });
  }
};


//===============DELETE/blogs?qureyParams========================

const DeleteBlogByQuery = async function (req, res) {
  try {
    //  let blog = await blogModel.findById(blogId);
    // let blogId = req.query.blogId;
    // let Query= req.query
    // console.log(Query)
    // let deletedBlogs = await blogModel.findOneAndUpdate(
    //   {
    //     $or: [{...Query}],//shallow copy concept can be used as shown
    //   },
    //   { isDeleted: true ,deletedAt: new Date()},
    //   { new: true }
    // );
    

    let authId = req.query.authorId;
    let cat = req.query.category;
    let subcat = req.query.subcategory;
    let tag = req.query.tags;
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
    ); //update many only shows how many docs are modified but not the documents
    if (!deletedBlogs)
      return res.status(404).send({ msg: "enter valid queries" });

    res.status(200).send({ status: true, msg: deletedBlogs });
  } catch (err) {
    res.status(500).send({ status: false, msg: "Error", err: err.message });
  }
};





module.exports.createBlog = createBlog;
module.exports.GetFilteredBlog = GetFilteredBlog;
module.exports.updateBlog = updateBlog;
module.exports.DeleteBlogById = DeleteBlogById;
module.exports.DeleteBlogByQuery = DeleteBlogByQuery;

// $and
// $in
// $or
// $gte
// $gt

// const createBlog1 = async function (req, res) {
//   let authorId = req.body.authorId;
//   let validationAuthorId = await authorModel.findById(authorId);
