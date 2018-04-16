const display = document.querySelector('#displayallposts')
axios.get('http://localhost:3000/posts')
  .then(function(response) {
    let postTitles = []
    let posts = response.data.data
    for (let i = 0; i <= posts.length - 1; i++) {
      const b = createButton(posts[i])
      display.appendChild(b)
    }
  })

function createButton(post) {
  const newBtn = document.createElement('button')
  newBtn.classList.add("list-group-item")
  newBtn.classList.add("list-group-item-action")
  newBtn.id = post.id
  newBtn.innerHTML = post.title
  newBtn.addEventListener("click", renderPost)
  return newBtn
}

function renderPost() {
  event.preventDefault()
  let postId = this.id
  let display = document.querySelector('#carddisplay')
  let titleHeader = document.querySelector('#posttitle')
  let contentPosts = document.querySelector('#contentPosts')
  let formdisplay = document.querySelector('#formdisplay')
  formdisplay.style.display = "none"
  axios.get(`http://localhost:3000/posts/${postId}`)
    .then(function(response) {
      const post = response.data.data
      let title = post.title
      let content = post.content
      display.value = post.id
      titleHeader.innerHTML = title
      display.style.display = "block"
      contentPosts.innerHTML = content
    })
    .catch(function(error) { const { status, message } = error.response.data
    })
}


document.querySelector('#createPost').addEventListener('click', function(event) {
  event.preventDefault()
  let carddisplay = document.querySelector('#carddisplay')
  let formdisplay = document.querySelector('#formdisplay')
  carddisplay.style.display = "none"
  formdisplay.style.display = "block"
  let titleHeader = document.querySelector('#posttitle')
  let contentPosts = document.querySelector('#contentPosts')

  document.querySelector('#formSubmit').addEventListener("click", function(event) {
    let title = document.querySelector('#formTitle').value
    let content = document.querySelector('#formContent').value
    if (title && content) {
      axios.post(`http://localhost:3000/posts`, {
          title,
          content
        })
        .then(function(response) {
          const post = response.data.data
          let title = post.title
          let content = post.content
          formdisplay.style.display = "none"
          carddisplay.style.display = "block"
          titleHeader.innerHTML = title
          contentPosts.innerHTML = content
          location.reload()
        })
        .catch(function(error) {
          const {
            status,
            message
          } = error.response.data
        })
    }
  })
})

document.querySelector('#editPost').addEventListener('click', function(event) {
  event.preventDefault()
  const postID = event.target.parentNode.value
  let carddisplay = document.querySelector('#carddisplay')
  let formdisplay = document.querySelector('#formdisplay')
  let titleHeader = document.querySelector('#posttitle').innerHTML
  let contentPosts = document.querySelector('#contentPosts').innerHTML
  let formTitle = document.querySelector('#formTitle')
  let formcontent = document.querySelector('formContent')
  carddisplay.style.display = "none"
  formdisplay.style.display = "block"
  formTitle.value = titleHeader
  formContent.innerHTML = contentPosts
  console.log(postID)
  document.querySelector('#formSubmit').addEventListener('click', function(event) {
    let title = document.querySelector('#formTitle').value
    let content = document.querySelector('#formContent').value
    axios.put(`http://localhost:3000/posts/${postID}`, {title, content})
      .then(function(response) {
        const post = response.data.data
        let title = post.title
        let content = post.content
        titleHeader.innerHTML = title
        contentPosts.innerHTML = content
        formdisplay.style.display = "none"
        carddisplay.style.display = "block"
        location.reload()
      })
      .catch(function(error) {
        const { status, message} = error.response.data
      })
  })
})

document.querySelector('#removePost').addEventListener('click', function(event) {
  event.preventDefault()
  const postID = event.target.parentNode.value

  axios.delete(`http://localhost:3000/posts/${postID}`)
    .then(function(response) {
      location.reload()
    })
    .catch(function(error) {
      const {
        status,
        message
      } = error.response.data
    })
})
