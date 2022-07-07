import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { PostCard, Categories, PostWidget, LandingHero, MenuWidget, FeaturedCollections, SlidingCollections, CollectionsWidget } from '../components/';
import { Category } from '../components/Categories';
import FeaturedPosts from '../components/FeaturedPosts';
import TestFeatured from '../components/TestFeature';
import {getCategories, getCollections, getPosts } from '../services'; 
import { StateContext } from './_app';

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
  const featuredPosts = posts.filter((post:any)=> post.featuredPost); 
  const {menu} = useContext(StateContext);
  

  return (

      <div className={"container mx-auto px-0 top-[0px]"} style={{minWidth: '100vw'}}
      
      >
        <Head>
          <title>{`Console.blog();`}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className=' block relative w-full min-h-[120vh] lg:min-h-[100vh] lg:h-auto top-[0px] z-5 ' style={{minWidth: '100vw'}}>
          <SlidingCollections collectionsProp={collections} scrollRef={searchRef} title='Featured Collections' featured={true} />
        </div>

        <div ref={searchRef} className='w-full  min-h-[1200px] md:min-h-[1500px] lg:min-h-[1700px] h-auto top-[150vh] lg:top-[100vh] z-0' style={{minWidth: '100vw'}}>
          <LandingHero featuredPosts={featuredPosts as []}/>
        </div>

        <div style={{minWidth: '100vw'}} className={'relative bg-[#282e34] z-5'+(menu? ' blur-filter ': ' trans-500')}>

          <div
              className='divider mb-[100px] w-full flex flex-row items-center justify-center  text-[30px] md:text-[40px] py-5 font-staatliches text-white'
            >
                <div className='w-[10%] min-w-[100px] h-[1px] bg-white rounded-full'>

                </div>

                <span className='px-3'>
                  Latest Posts
                </span>

                <div className='w-[10%] min-w-[100px] h-[1px] bg-white rounded-full'>

                </div>
                  
          </div>

          <div className='container mx-auto px-0 mb-8 bg-[#282e34]'>
            
            <div className='grid grid-cols-1 lg:grid-cols-5 gap-1 pt-[10]'>

              <div className='hidden lg:block lg:col-span-1  col-span-1'>

                <div className="lg:sticky relative top-[100px]">

                  <CollectionsWidget />

                </div>

              </div>

              <div className="lg:col-span-3  col-span-1 px-2 lg:px-0">
                {posts.map((post:any, index) => <PostCard post={post} key={post.title}/>)}
              </div>

              <div className='lg:col-span-1 col-span-1 bg-[#282e34]'>

              

                <div className="lg:sticky relative lg:top-[100px]">

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
