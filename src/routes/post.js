const express = require('express');
router = express.Router();

const PostController = require("../controller/posts");

router.get("/", async (req, res) => {
  const posts = await PostController.findAll()
  res.json(posts);

});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const post = await PostController.find(id)
  res.json(post)
});

module.exports = router;