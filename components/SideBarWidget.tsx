import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getRecentPosts, getSimilarPosts } from '../services';
import PostWidget from './PostWidget';
import Categories from './Categories';
import { FaGithub } from "react-icons/fa";

export type Post = {
  title?: string,
  
}
interface PostWidgetProps {
  categories?: [string],
  slug?: string,
  recentPosts?:[]
}

const SideBarWidget = ({categories, slug, recentPosts}: PostWidgetProps): JSX.Element=> {

  return (
    <div className='lg:rounded-lg m-0  mb-4 bg-background-light dark:bg-element-dark border-[1px] dark:border-0 border-border-light'>

        <PostWidget recentPosts={recentPosts} nested={true} slug={slug} categories={categories}/>
        <Categories nested={true} passedCategories={categories} />

        <div className={' p-6 dark:m-0 my-4 mb-8 w-full'}>

            <div className='text-copy-light dark:text-copy-dark font-normal border-t border-border-light dark:border-copy-dark pt-6 min-w-[100%] flex flex-col justify-start align-start text-sm'>
                <span className=''>
                    This website is still in development and may be subject to change.
                </span> 

                <span className='mt-[20px]'>
                    Made with &#10084;&#65039; using NextJS, Tailwind, and GraphCMS
                </span>

                <span className='mt-[20px] italic'>
                    &copy; 2022 Console.blog()
                </span> 

                <span className='mt-[20px] text-2xl'>

                    <a target='_blank' href='https://github.com/Sanliston/console-blog'>
                        <FaGithub />
                    </a>
                    
                </span>
                
            </div>
        </div>
        
    </div>
  )
}

export default SideBarWidget;
