const express = require('express');
const router = express.Router();
const authorController = require("../Controller/authorController")
const blogController = require("../Controller/blogController")

router.post("/createAuthor",authorController.createAuthor)
router.post("/createBlog",blogController.createBlog)
// router.post("/createBlog1",blogController.createBlog1)




 module.exports=router