const express = require('express');
const router = express.Router();

const authorController = require("../Controller/authorController")
const blogController = require("../Controller/blogController")
const authentication = require("../middlewares/authentication")
const authorisation = require("../middlewares/authorisation")

//*!---APIs To Perform CURD Operation--------

router.post("/authors",authorController.createAuthor)

router.post("/createBlog/:authorId",authentication.authentication,blogController.createBlog)

router.get("/blogs/get",blogController.GetFilteredBlog)

router.put("/blog/:blogId/:authorId",authentication.authentication,authorisation.authorisation,blogController.updateBlog)




router.delete("/blogs/delete/:authorId",authentication.authentication,authorisation.authorisation,blogController.DeleteBlogByQuery)

router.delete("/blogs/:blogId/:authorId",authentication.authentication,authorisation.authorisation,blogController.DeleteBlogById)


router.post("/login", authorController.loginAuthor)


 module.exports=router