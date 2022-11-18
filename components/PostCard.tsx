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
    <div className='bg-background-light border-t-[1px] border-border-light dark:border-border-dark dark:bg-element-dark flex flex-col items-center text-copy-light dark:text-copy-dark p-4 '>
        
        <div className='flex flex-col md:flex-row items-center md:align-center md:justify-between w-full'>
          <div className='flex flex-col items-start justify-start md:mr-4'>
        
            <div className='block relative flex flex-row md:flex-row text-center items-end justify-start w-full mb-4'>

              <div className='flex items-center justify-center'>

                <img 
                  alt={post.author.name}
                  height="60px"
                  width="60px"
                  className='object-top align-middle rounded-full border-background-light dark:border-element-dark z-12'
                  src={post.author.photo.url}
                />


              </div>

              <div className='flex flex-row items-center self-end mb-[20px] justify-center ml-2 text-sm z-10 rounded-md'>

                <p className='block relative align-middle font-bold text-copy-light dark:text-copy-dark/[0.5] mr-3'>
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
            <h1 className='transition duration-300 mb-3 cursor-pointer
              text-2xl font-bold
            '>

              <Link href={`/post/${post.slug}`}>
                {post.title}
              </Link>
            </h1>

            {/* */}

            <p className='text-md text-copy-light dark:text-copy-dark/[0.8] font-light w-full'>
              {post.excerpt}
            </p>

            <div className='text-center'>
              <Link href={`/post/${post.slug}`}>
                <span className='transition duration-300 transform inline-block bg-button-color hover:bg-secondary-dark text-md rounded-lg text-copy-dark px-5 py-2 my-4 cursor-pointer'>
                  Read more
                </span>
              </Link>
            </div>
          
          </div>

          <div className='relative drop-shadow-lg overflow-hidden h-auto w-auto min-w-[350px] md:min-w-[250px] px-0'>

            <img 
              src={post.featuredImage?.url} 
              alt={post.title}
              className='h-auto w-full max-h-auto border-box md:w-auto max-w-[350px] md:max-w-[250px] rounded-lg'
              >
            
            </img>
          </div>
        </div>

        <div className=' self-center flex flex-row flex-wrap w-full h-auto mt-4 items-center justify-start'>

          {post.categories.map((category:any)=>(

              <Link href={`/tags/${category.slug}`} key={category.slug}>
                  <span className="relative cursor-pointer absolute px-4 py-2 mr-2 border-[1.5px] dark:border-0 border-border-light dark:border-border-dark dark:bg-background-dark text-copy-light dark:text-copy-dark/[0.8] rounded-lg text-sm">
                      {`#${category.name}`}
                  </span>
              </Link>
          ))}

        </div>
    </div>
  )
}

export default PostCard;