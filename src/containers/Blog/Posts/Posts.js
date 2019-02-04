import React, { Component } from 'react'
import axios from 'axios'
import './Posts.css'
// import FullPost from '../../components/FullPost/FullPost'
// import NewPost from '../../components/NewPost/NewPost'
import Post from '../../../components/Post/Post'

class Posts extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    selectedPostContent: null,
    selectedPostLoading: false,
    error: false
  }

  componentDidMount () {
    // const random = Math.random().toFixed(1)
    // const url = random >= 0.3 ? '/posts' : 'WrongUrl'
    // console.log(`if random < 0.3, get wrong url, random: ${random}, url: ${url}`)
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

  postSelectedHandler = id => {
    if (this.state.selectedPostId !== id) {
      this.setState({ selectedPostLoading: true })
      axios.get(`/posts/${id}`).then(res => {
        this.setState({
          selectedPostId: id,
          selectedPostContent: res.data,
          selectedPostLoading: false
        })
      })
    }
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
          <Post
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
            key={post.id}
          />
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
