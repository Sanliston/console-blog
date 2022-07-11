import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { PostCard, Categories, PostWidget, LandingHero, MenuWidget, FeaturedCollections, SlidingCollections, CollectionsWidget } from '../components/';
import { Category } from '../components/Categories';
import FeaturedPosts from '../components/FeaturedPosts';
import TestFeatured from '../components/TestFeature';
import useScrollDirection from '../hooks/useScrollDirection';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { useWindowScrollPositions } from '../hooks/useWindowScrollPositions';
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
  const scrollDirection = useScrollDirection();
  const {windowHeight} = useWindowDimensions();
  const {scrollY} = useWindowScrollPositions();
  const [scrollTop, setScrollTop] = useState();
  const [lastScroll, setLastScroll] = useState(new Date());
  const collectionsRef = useRef<HTMLDivElement>(null);

  const scrollSnap = () => {
    window.scrollTo({top: windowHeight, behavior: 'smooth'});
    //collectionsRef.current?.scrollIntoView();
  }

  // useEffect(()=>{

  //   setLastScroll(new Date());
    

  //   if(scrollY > (windowHeight) && scrollY < (2*windowHeight) && lastScroll.getTime() < (new Date()).getTime() - 300){

  //     scrollSnap();
  //   }

  // }, [scrollY]);
  

  return (

      <div className={"container mx-auto px-0 top-[0px]"} style={{minWidth: '100vw'}}
      
      >
        <Head>
          <title>{`Console.blog();`}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>


        <div className='block shadow-lg relative w-full min-h-[120vh] lg:min-h-[100vh] bg-backgroundDark lg:h-auto top-[0px] z-10 ' style={{minWidth: '100vw'}}>
          Welcome to console blog
        </div>

        <div ref={collectionsRef} className='scroll-snap block relative w-full min-h-[120vh] lg:min-h-[100vh] lg:h-auto top-[100px] z-5 ' style={{minWidth: '100vw'}}>
          <SlidingCollections collectionsProp={collections} scrollRef={searchRef} title='Featured Collections' featured={true} windowOffset={1}/>
        </div>

        <div ref={searchRef} className='w-full min-h-[1200px] md:min-h-[1500px] lg:min-h-[1700px] h-auto top-[250vh] lg:top-[200vh] z-0' style={{minWidth: '100vw'}}>
          <LandingHero featuredPosts={featuredPosts as []}/>
        </div>

        <div style={{minWidth: '100vw'}} className={'relative bg-backgroundDark z-5'+(menu? ' blur-filter ': ' trans-500')}>

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

          <div className='container mx-auto px-0 mb-8 bg-backgroundDark'>
            
            <div className='grid grid-cols-1 lg:grid-cols-5 gap-1 pt-[10]'>

              <div className='hidden lg:block lg:col-span-1  col-span-1'>

                <div className={"transition-all duration-300 lg:sticky relative"
                    + (scrollDirection === 'up' || scrollY < 30 ?  ' lg:top-[100px]' : ' lg:top-[20px]')
                  }>

                  <CollectionsWidget />

                </div>

              </div>

              <div className="lg:col-span-3  col-span-1 px-2 lg:px-0">
                {posts.map((post:any, index) => <PostCard post={post} key={post.title}/>)}
              </div>

              <div className='lg:col-span-1 col-span-1 bg-backgroundDark'>

              

                <div className={"transition-all duration-300 lg:sticky relative"
                  + (scrollDirection === 'up' || scrollY < 30 ?  ' lg:top-[100px]' : ' lg:top-[20px]')}>

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
