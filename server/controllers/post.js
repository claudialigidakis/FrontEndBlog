const model = require('../models/post')

function getAll(req, res, next){
  const posts = model.getAll()
  return res.status(200).send({ data: posts.data })
}

function getOne(req, res, next){
  const post = model.getOne(req.params.id)
  if(post.data){
    return res.status(200).send({ data: post.data })
  }
  else if(post.error){
    return next({ status: 404, message: post.error })
  }
}

function create(req, res, next){
  if(!req.body.content || !req.body.title){
    return next({ status: 400, message:'Bad Request'})
  }
  const post = model.create(req.body.title, req.body.content)
  if(post.data){
    return res.status(201).send({ data: post.data })
  }
}

function update(req, res, next){
  if(!req.body){
    return next({ status: 400, message: "Need content and title" })
  }
  const post = model.update(req.params.id, req.body.title, req.body.content)
  if(post.data){
    return res.status(200).send({ data: post.data })
  }
  else if(post.error) {
    return next({ status: 404, message: post.error })
  }
}

function remove(req, res, next){
  const post = model.remove(req.params.id)
  if(post.data){
    return res.status(200).send({ data: post.data })
  }
  else if(post.error){
      return next({ status: 404, message: post.error })
  }
}

module.exports = { getAll, getOne, create, update, remove }
