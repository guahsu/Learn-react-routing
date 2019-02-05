import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Posts.css'
import Post from '../../../components/Post/Post'

class Posts extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false
  }

  componentDidMount () {
    console.log(this.props)
    axios
      .get('/posts')
      .then(res => {
        const posts = res.data.slice(0, 4)
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: 'Max'
          }
        })
        this.setState({ posts: updatedPosts })
      })
      .catch(err => {
        console.log(err)
        this.setState({ error: true })
      })
  }

  postSelectedHandler = (id) => {
    this.setState({ selectedPostId: id })
  }

  postDeletePostHandler = () => {
    axios.delete(`/posts/${this.state.selectedPostId}`).then(res => {
      if (res.status === 200) {
        window.alert('Delete Post Success !')
        this.setState({
          selectedPostId: null,
          selectedPostContent: null
        })
      }
    })
  }

  render () {
    let posts = <p style={{ textAlign: 'center' }}>Something want wrong !</p>
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          <Link
            to={`/posts/${post.id}`}
            key={post.id}>
            <Post
              title={post.title}
              author={post.author}
              clicked={() => this.postSelectedHandler(post.id)}
            />
          </Link>
        )
      })
    }
    return (
      <section className='Posts'>
        {posts}
      </section>
    )
  }
}

export default Posts
