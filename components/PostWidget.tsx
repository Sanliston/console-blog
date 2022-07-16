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

  useEffect(()=>{

    if(slug){
      //means we are looking at a specific post
      getSimilarPosts(categories, slug).then((result: []) => setRelatedPosts(result));
    }else {
      //show most recent posts
      getRecentPosts().then((result: []) => setRelatedPosts(result));
    }



    
  }, [slug]);

  return (
    <div className='rounded-lg p-6 m-4 dark:m-0  min-w-[300px] mb-8 bg-background-light dark:bg-background-dark border-[1px] dark:border-0 border-border-light'>

      <h3 className='text-xl mb-8 border-b border-copy-light dark:border-copy-dark pb-4 text-copy-light dark:text-copy-dark'>
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>

      {relatedPosts.map((post:any) => (

        <Link key={post.slug} href={`/post/${post.slug}`}>
          <div key={post.slug} className='cursor-pointer flex flex-row items-center w-full lg:py-2 py-1' > 

            <div className='flex-none'> 
              <img 
                className='align-middle rounded-full max-h-[50px] min-h-[50px] max-w-[50px] inline-block'
                alt={post.title}
                height='50px'
                width='50px'
                src={post.featuredImage.url}
              />
            </div>

            <div className='flex-grow ml-4'> 
              <p className='text-copy-light/[0.7] dark:text-copy-dark/[0.7] text-xs'>
                {moment(post.createdAt).format('MMM DD, YYYY')}
              </p>
                <span className='text-copy-light dark:text-copy-dark text-sm font-semibold'>
                  {post.title}
                </span>
            </div>
          </div>
        </Link>
        
      ))}
      
    </div>
  )
}

export default PostWidget;
