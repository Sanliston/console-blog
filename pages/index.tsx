import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { PostCard, Categories, PostWidget, LandingHero, MenuWidget, FeaturedCollections, SlidingCollections } from '../components/';
import { Category } from '../components/Categories';
import FeaturedPosts from '../components/FeaturedPosts';
import TestFeatured from '../components/TestFeature';
import {getCategories, getCollections, getPosts } from '../services'; 

interface HomeProps {
  posts: [],
  collections: []
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

const Home: NextPage<HomeProps> = ({ posts, collections }: HomeProps): JSX.Element => {

  const searchRef = useRef(null);
  

  return (

      <div className="container mx-auto px-0 mb-8 top-[0px]" style={{minWidth: '100vw'}}>
        <Head>
          <title>{`Console.blog();`}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className='hidden lg:block relative w-full h-0 lg:min-h-[100vh] lg:h-auto top-[0px] z-5 ' style={{minWidth: '100vw'}}>
          <SlidingCollections collectionsProp={collections} scrollRef={searchRef} />
        </div>

        <div ref={searchRef} className='w-full  min-h-[1200px] md:min-h-[1500px] lg:min-h-[1800px] h-auto top-[0px] lg:top-[100vh] z-0' style={{minWidth: '100vw'}}>
          <LandingHero />
        </div>
        

        <div style={{minWidth: '100vw'}} className='relative bg-[#282e34] z-5'>
          <div className='container mx-auto px-0 mb-8 bg-[#282e34]'>
            <FeaturedPosts posts={posts}/>

            

            <div className='grid grid-cols-1 lg:grid-cols-5 gap-1 pt-[10]'>

              <div className='hidden lg:block lg:col-span-1  col-span-1'>

                <div className="lg:sticky relative top-[100px]">

                  <MenuWidget />

                </div>

              </div>

              <div className="lg:col-span-3  col-span-1 px-2 lg:px-0">
                <div
                      className='text-[40px] py-10 font-staatliches text-white'
                    >
                        Latest Posts
                </div>
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
  const collections = (await getCollections()) || [];

  return {
    props: { posts, collections }
  }
}

export default Home
