const express = require('express');
const router = express.Router();
const authorController = require("../Controller/authorController")
const blogController = require("../Controller/blogController")


router.post("/createAuthor",authorController.createAuthor)
router.post("/createBlog",blogController.createBlog)

router.get("/blogs",blogController.GetFilteredBlog)

router.put("/blog/:blogId",blogController.updateBlog)




 module.exports=router