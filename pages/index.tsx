import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { PostCard, Categories, PostWidget } from '../components/';
import { Category } from '../components/Categories';
import {getCategories, getPosts } from '../services'; 

interface HomeProps {
  posts: []
}

//augmenting console object
declare global {
  interface Console {
    blog: any
  }
}

console.blog = (userName: string) => {

  console.log("Console.blog for ", userName);
}

const Home: NextPage<HomeProps> = ({ posts }: HomeProps): JSX.Element => {
  console.log("Home component up, posts: ", posts);

  return (

      <div className="container mx-auto px-10 mb-8">
        <Head>
          <title>{`Console.blog();`}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>

          <div className="lg:col-span-8 col-span-1">
            {posts.map((post:any, index) => <PostCard post={post.node} key={post.node.title}/>)}
          </div>

          <div className='lg:col-span-4 col-span-1'>

            <div className="lg:sticky relative top-8">

              <PostWidget />
              <Categories />

            </div>
          
          </div>
          
        </div>

        
        
      </div>
  )
}

export const getStaticProps = async () : Promise<{}> => {

  const posts = (await getPosts()) || [];

  return {
    props: { posts }
  }
}

export default Home
