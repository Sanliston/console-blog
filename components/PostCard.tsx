import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import { FiCalendar } from 'react-icons/fi'; 

export interface Post {
    post: {
        title: string,
        excerpt: string,
        featuredImage: {
          url: string
        },
        slug: string,
        author: {
          name: string,
          photo: {
            url: string
          }
        },
        createdAt: string,
        categories: []
    }
}

const PostCard = ({ post }: Post): JSX.Element => {

  return (
    <div className='bg-background-light border-[1px] border-border-light dark:border-0 dark:bg-element-dark flex flex-col items-center text-copy-light dark:text-copy-dark rounded-lg p-0 lg:pb-20 pb-12 mb-8 '>
        
        {/*Image div */}
        <div className='relative drop-shadow-lg overflow-hidden h-80 w-full lg:h-[400px] pb-80 px-0 mb-6 rounded-tl-lg rounded-tr-lg'>

          <img 
            src={post.featuredImage?.url} 
            alt={post.title}
            className='object-top relative h-80 lg:h-[400px] w-full object-cover rounded-t-lg'
            >
          
          </img>
        </div>

        <div className='block relative flex mt-[-75px] flex-row md:flex-row text-center items-center justify-start px-4 lg:px-10 mb-8 w-full'>

          <div className='flex items-center justify-center'>

            <img 
              alt={post.author.name}
              height="100px"
              width="100px"
              className='object-top align-middle rounded-full border-[10px] border-background-light dark:border-element-dark z-12'
              src={post.author.photo.url}
            />


          </div>

          <div className='flex flex-row items-center self-end mb-[20px] justify-center ml-[10px] text-sm z-10 rounded-md'>

            <p className='block relative align-middle font-bold text-copy-light dark:text-copy-dark/[0.5] mr-5'>
              {post.author.name}
            </p>

            <div className='block font-medium text-sm text-copy-light dark:text-copy-dark/[0.5] flex flex-row align-center justify-center'>
              <FiCalendar className='mt-[3px] mr-3' />
              <span className=''>
                {moment(post.createdAt).format('MMM DD, YYYY')}
              </span>
            </div>
          </div>

          


        </div>

        {/* title*/}
        <h1 className='transition duration-300 text-center mb-8 cursor-pointer
           text-2xl font-bold px-4 lg:px-10
        '>

          <Link href={`/post/${post.slug}`}>
            {post.title}
          </Link>
        </h1>

        {/* */}

        <p className='text-md text-copy-light dark:text-copy-dark/[0.8] font-light px-4 lg:px-10 mb-8 w-full'>
          {post.excerpt}
        </p>

        <div className='text-center'>
          <Link href={`/post/${post.slug}`}>
            <span className='transition duration-300 transform inline-block bg-button-color hover:bg-secondary-dark text-md font-light rounded-full text-copy-dark px-8 py-2 cursor-pointer'>
              Read more
            </span>
          </Link>
        </div>

        <div className=' self-center flex flex-row flex-wrap w-[80%] h-auto pt-10 mt-10 items-center justify-center border-t-[1px] border-copy-light dark:border-white/[0.3]'>

          {post.categories.map((category:any)=>(

              <Link href={`/tags/${category.slug}`} key={category.slug}>
                  <span className="relative cursor-pointer absolute px-3 py-1 mx-2 bg-slate-400 dark:bg-slate-800 hover:bg-slate-700 text-white rounded-full text-sm">
                      {`#${category.name}`}
                  </span>
              </Link>
          ))}

        </div>

    </div>
  )
}

export default PostCard;