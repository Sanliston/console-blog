import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getRecentPosts, getSimilarPosts } from '../services';
import PostWidget from './PostWidget';
import Categories from './Categories';

export type Post = {
  title?: string,
  
}
interface PostWidgetProps {
  categories?: [string],
  slug?: string
}

const SideBarWidget = ({categories, slug}: PostWidgetProps): JSX.Element=> {

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
    <div className='lg:rounded-lg my-4 dark:m-0  mb-4 bg-background-light dark:bg-element-dark border-[1px] dark:border-0 border-border-light'>

      <PostWidget nested={true} slug={slug} categories={categories}/>
      <Categories nested={true} />
      
    </div>
  )
}

export default SideBarWidget;
