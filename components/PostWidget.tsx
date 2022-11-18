import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getRecentPosts, getSimilarPosts } from '../services';
import { getWithExpiry, HOUR_MS, setWithExpiry } from '../utils/utils';

export type Post = {
  title?: string,
  
}
interface PostWidgetProps {
  categories?: [string],
  slug?: string,
  nested?:boolean
}

const PostWidget = ({categories, slug, nested=false}: PostWidgetProps): JSX.Element=> {

  const [ relatedPosts, setRelatedPosts ] = useState<[]>([]);

  useEffect(()=>{

    console.log('post widget');

    if(slug){
      //means we are looking at a specific post

      //get cached posts if present
      let localPosts = getWithExpiry('getPosts'+slug);

      if(localPosts){
        return setRelatedPosts(JSON.parse(localPosts));
      }

      getSimilarPosts(categories, slug).then((result: []) => {
        setRelatedPosts(result)
      
        //cache
        setWithExpiry('getPosts'+slug, JSON.stringify(result), HOUR_MS);
      });

    }else {
      //show most recent posts
      //get cached posts if present
      let localPosts = getWithExpiry('getRecentPosts');

      if(localPosts){
        return setRelatedPosts(JSON.parse(localPosts));
      }

      getRecentPosts().then((result: []) => {
        setRelatedPosts(result)
      
        //cache
        setWithExpiry('getRecentPosts', JSON.stringify(result), HOUR_MS);
      });
    }


    
  }, [slug]);

  return (
    <div className={'rounded-lg p-6 dark:m-0 bg-background-light dark:bg-element-dark '+ (nested ? '' : ' my-4 mb-8 border-[1px] dark:border-0 border-border-light')}>

      <h3 className='text-xl mb-8 border-b border-border-light dark:border-copy-dark pb-4 text-copy-light dark:text-copy-dark'>
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
                <span className='text-copy-light dark:text-copy-dark font-normal'>
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
