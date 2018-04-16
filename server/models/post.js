//requires file system
const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const file = path.join(__dirname, 'blogPost.json')

function getAll() {
  const contents = fs.readFileSync(file, 'utf-8')
  const posts = JSON.parse(contents)
  return {data: posts}
}

function getOne(id) {
  const contents = fs.readFileSync(file, 'utf-8')
  const posts = JSON.parse(contents)
  const post = posts.find(post => post.id === id)
  if (post) {
    return {data: post}
  } else {
    return {error: 'Post Not Found'}
  }
}

function create(title, content) {
  const contents = fs.readFileSync(file, 'utf-8')
  const posts = JSON.parse(contents)
  const post = { id: uuid(), title, content}
  posts.push(post)
  const json = JSON.stringify(posts)
  fs.writeFileSync(file, json)
  return {data: post}
}


function update(id, title, content) {
  const contents = fs.readFileSync(file, 'utf-8')
  const posts = JSON.parse(contents)
  const post = posts.find(post => post.id === id)
  if (post) {
    console.log(id, title, content)
    post.title = title || post.title
    post.content = content || post.content
    const json = JSON.stringify(posts)
    fs.writeFileSync(file, json)
    return { data: post }
  } else {
    return { error: 'Post Not Found'}
  }
}


function remove(id) {
  const contents = fs.readFileSync(file, 'utf-8')
  let posts = JSON.parse(contents)
  const post = posts.find(post => post.id === id)
  if (post) {
    posts = posts.filter(post => post.id !== id)
    delete post.id
    const json = JSON.stringify(posts)
    fs.writeFileSync(file, json)
    return {data: post}
  } else {
    return {error: "Post Not Found"}
  }
}

module.exports = {getAll, getOne, create, update, remove}
