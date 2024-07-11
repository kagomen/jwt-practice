const router = require('express').Router()
const { publicPosts, privatePosts } = require('../db/posts')
const jwt = require('jsonwebtoken')
const checkJwt = require('../middleware/checkJwt')

// Public Posts
router.get('/public', (req, res) => {
  res.json(publicPosts)
})

// Private Posts
router.get('/private', (req, res) => {
  res.json(privatePosts)
})

module.exports = router
