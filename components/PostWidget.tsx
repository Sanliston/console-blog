import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getRecentPosts, getSimilarPosts } from '../services';

export type Post = {
  title?: string,
  
}
interface PostWidgetProps {
  categories?: [string],
  slug?: string
}

const PostWidget = ({categories, slug}: PostWidgetProps): JSX.Element=> {

  const [ relatedPosts, setRelatedPosts ] = useState<[]>([]);

  console.log("Post Widget slug: ", slug);

  useEffect(()=>{

    if(slug){
      //means we are looking at a specific post
      getSimilarPosts(categories, slug).then((result: []) => setRelatedPosts(result));
    }else {
      //show most recent posts
      getRecentPosts().then((result: []) => setRelatedPosts(result));
    }



    
  }, [slug]);

  console.log("related posts: ", relatedPosts);

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8 '>

      <h3 className='text-xl mb-8 border-b pb-4'>
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>

      {relatedPosts.map((post:any) => (
        <div key={post.title} className='flex flex-row items-center w-full lg:py-2 py-1' > 

          <div className='w-16 flex-none'> 
            <img 
              className='align-middle rounded-full'
              alt={post.title}
              height='60px'
              width='60px'
              src={post.featuredImage.url}
            />
          </div>

          <div className='flex-grow ml-4'> 
            <p className='text-gray-500 text-xs'>
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </p>
            <Link className='txt-md' key={post.title} href={`/post/${post.slug}`}>
              {post.title}
            </Link>
          </div>


        </div>
      ))}
      
    </div>
  )
}

export default PostWidget;
