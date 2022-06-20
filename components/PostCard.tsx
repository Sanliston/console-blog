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
        createdAt: string
    }
}

const PostCard = ({ post }: Post): JSX.Element => {

  console.log('post: ', post);
  return (
    <div className='bg-white shadow-lg rounded-lg p-0 lg:pb-20 pb-12 mb-8 '>
        
        {/*Image div */}
        <div className='relative overflow-hidden shadow-md pb-80 px-0 mb-6 rounded-tl-lg rounded-tr-lg'>

          <img 
            src={post.featuredImage?.url} 
            alt={post.title}
            className='object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg'
            >
          
          </img>
        </div>

        {/* title*/}
        <h1 className='transition duration-300 text-center mb-8 cursor-pointer
          hover:text-pink-600 text-3xl
        '>

          <Link href={`/post/${post.slug}`}>
            {post.title}
          </Link>
        </h1>

        {/* */}
        <div className='block lg:flex flex-col text-center items-center justify-center  mb-8 w-full'>

          <div className='flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8'>

            <img 
              alt={post.author.name}
              height="30px"
              width="30px"
              className='align-middle rounded-full'
              src={post.author.photo.url}
            />

            <p className='inline align-middle text-gray-700 ml-3 text-lg'>
              {post.author.name}
            </p>

          </div>

          <div className='font-medium text-gray-700 flex flex-row align-center justify-center m-5'>
            <FiCalendar className='mt-[3px] mr-3' />
            <span className=''>
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </span>
          </div>
          

        </div>

        <p className='text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8'>
          {post.excerpt}
        </p>

        <div className='text-center'>
          <Link href={`/post/${post.slug}`}>
            <span className='transition duration-300 transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer'>
              Read more
            </span>
          </Link>
        </div>

    </div>
  )
}

export default PostCard;