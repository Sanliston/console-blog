import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { PostCard, Categories, PostWidget, LandingHero, MenuWidget, FeaturedCollections, SlidingCollections } from '../components/';
import { Category } from '../components/Categories';
import FeaturedPosts from '../components/FeaturedPosts';
import TestFeatured from '../components/TestFeature';
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

  return (

      <div className="container mx-auto px-0 mb-8 top-[0px]" style={{minWidth: '100vw'}}>
        <Head>
          <title>{`Console.blog();`}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div 
                className='w-full top-0 fixed min-h-[2300px]  z-0 landing-hero pb-15 mb-15 bg-cover'

                style={{ backgroundImage: `url('/images/gerald-berliner-blur.jpg')` }} 
                >
                
        </div>

        <div className='hidden lg:block relative w-full h-0 lg:min-h-[100vh] lg:h-auto top-[0px] z-5 ' style={{minWidth: '100vw'}}>
          <SlidingCollections />
        </div>

        <div className='w-full  min-h-[2300px] h-auto top-[0px] lg:top-[100vh] z-0' style={{minWidth: '100vw'}}>
          <LandingHero />
        </div>
        

        <div style={{minWidth: '100vw'}} className='relative bg-[#282e34] z-5'>
          <div className='container mx-auto px-0 mb-8 bg-[#282e34]'>
            <FeaturedPosts posts={posts}/>

            <div className='grid grid-cols-1 lg:grid-cols-5 gap-1'>

              <div className='hidden lg:block lg:col-span-1  col-span-1'>

                <div className="lg:sticky relative top-[100px]">

                  <MenuWidget />

                </div>

              </div>

              <div className="lg:col-span-3  col-span-1">
                {posts.map((post:any, index) => <PostCard post={post} key={post.title}/>)}
              </div>

              <div className='lg:col-span-1  col-span-1'>

                <div className="lg:sticky relative top-[100px]">

                  <PostWidget />
                  <Categories />

                </div>
              
              </div>
              
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
