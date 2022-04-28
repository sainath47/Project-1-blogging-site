const express = require('express');
const router = express.Router();
const authorController = require("../Controller/authorController")
const blogController = require("../Controller/blogController")
const authentication = require("../middlewares/authentication")
const authorisation = require("../middlewares/authorisation")



router.post("/createAuthor",authorController.createAuthor)

router.post("/createBlog",blogController.createBlog)

router.get("/blogs/get",blogController.GetFilteredBlog)

router.put("/blog/:blogId",blogController.updateBlog)

router.delete("/blogs/:blogId/:authorId",authentication,authorisation,blogController.DeleteBlogById)

router.delete("/blogs/delete/:authorId",blogController.DeleteBlogByQuery)

//-----------Phase_2,APIs----------------------------
router.post("/login", authorController.loginAuthor)




 module.exports=router