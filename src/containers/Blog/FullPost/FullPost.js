import React from 'react'

import './FullPost.css'

const fullPost = props => {
  let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>
  if (props.selectedPostLoading) {
    post = <p style={{ textAlign: 'center' }}>Loading...!</p>
  }
  if (!props.selectedPostLoading && props.content) {
    post = (
      <div className='FullPost'>
        <h1>{props.content.title}</h1>
        <p>{props.content.body}</p>
        <div className='Edit'>
          <button
            className='Delete'
            onClick={props.deleted}>
            Delete
          </button>
        </div>
      </div>
    )
  }
  return post
}

export default fullPost
