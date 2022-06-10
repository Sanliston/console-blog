import React from 'react';

export interface Post {
    post: {
        title: string,
        excerpt: string
    }
}

const PostCard = ({ post }: Post): JSX.Element => {
  return (
    <div>
        {post.title}
        {post.excerpt}
    </div>
  )
}

export default PostCard;