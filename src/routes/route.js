const express = require('express');
const router = express.Router();
const authorController = require("../Controller/authorController")
const blogController = require("../Controller/blogController")


router.post("/createAuthor",authorController.createAuthor)
router.post("/createBlog",blogController.createBlog)

router.get("/blogs/get",blogController.GetFilteredBlog)
router.delete("/blogs/delete",blogController.DeleteBlogByQuery)

router.put("/blog/:blogId",blogController.updateBlog)
router.delete("/blogs/:blogId",blogController.DeleteBlogById)





 module.exports=router