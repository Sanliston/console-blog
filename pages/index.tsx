import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { PostCard, Categories, PostWidget, LandingHero, MenuWidget, FeaturedCollections, SlidingCollections, CollectionsWidget, IntroBanner, FeaturedGrid, SideTray } from '../components/';
import { Category } from '../components/Categories';
import FeaturedPosts from '../components/FeaturedPosts';
import TestFeatured from '../components/TestFeature';
import useScrollDirection from '../hooks/useScrollDirection';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { useWindowScrollPositions } from '../hooks/useWindowScrollPositions';
import {getCategories, getCollections, getPosts, getRecentPosts } from '../services'; 
import { StateContext } from './_app';
import createScrollSnap from 'scroll-snap';
import { BsCloudMoonFill } from "react-icons/bs";
import useOnScreen from '../hooks/useOnScreen';
import _ from 'lodash'; 
import SideBarWidget from '../components/SideBarWidget';
import RightBarWidget from '../components/RightBarWidget';
import Script from 'next/script';

interface HomeProps {
  posts: [],
  collections: [],
  recentPosts: [],
  categories: [string],
  passedFeaturedPosts: []
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

const Home: NextPage<HomeProps> = ({ posts, collections, recentPosts, categories }: HomeProps): JSX.Element => {

  const featuredPosts = posts.filter((post:any)=> post.featuredPost); //for SSR
  const {menu} = useContext(StateContext);
  const containerRef = useRef<HTMLDivElement>(null); 

  // const collectionOnScreen = useOnScreen(collectionsRef); 
  
  

  // const bindScrollSnap = () => {
  //   const element: HTMLElement = collectionsRef.current as HTMLElement; 
  //   createScrollSnap(element, {
  //     snapDestinationY: '90%',
  //   }, () => console.log('snapped'))
  // }

  // useEffect(()=>{
  //   //bindScrollSnap();

  // }, []);

  // useEffect(()=>{

  //   //if collectionsRef is 50% in view scroll to it
  //   console.log('collections is in view, scrollY: ', scrollY, " collections top: ", collectionsRef.current!.offsetTop, " offsetHeight: ", collectionsRef.current!.offsetHeight);

    // if(collectionOnScreen && (scrollY > (collectionsRef.current!.offsetTop-collectionsRef.current!.offsetHeight)+500 && scrollY <  collectionsRef.current!.offsetTop+300)){

      
    // }

  // }, [collectionOnScreen, scrollY]);


  //EVerything below is disabled for now but should be enabled when put the collections banner back
  // const snapCollections = (top:number) => {

  //   console.log('scrollY: ', top, " collections top: ", collectionsRef.current!.offsetTop, " offsetHeight: ", collectionsRef.current!.offsetHeight);
  //   if((top > (collectionsRef.current!.offsetTop-collectionsRef.current!.offsetHeight)+(0.5 * collectionsRef.current!.offsetHeight) && top <  collectionsRef.current!.offsetTop+(0.5 * collectionsRef.current!.offsetHeight ))){

  //     console.log('collections in view');

  //     setSnapping(true);
  //     window.scrollTo({
  //       top: collectionsRef.current?.offsetTop,
  //       behavior: 'smooth'
  //     });

  //     setTimeout(()=>{
  //       //stop any further scroll animations for 2 seconds

  //       setSnapping(false);
  //     }, 500);
  //   }
  // }

  // const theBounce = useCallback(_.debounce((top:number)=>{
        
  //       return snapCollections(top);

  //   }, 500), []);

  // useEffect(()=>{
  //   console.log('scrolling');
  //   setScrollTop(scrollY);

  //   if(!snapping){
  //     theBounce(scrollY);
  //   }
    
  // }, [scrollY]);
  

  return (

      <div ref={containerRef} className={"container flex flex-col items-center justify-center scroll-snap-parent mx-auto px-0 top-[0px] relative pb-[300px]"} style={{minWidth: '100vw'}}
      
      >
        <Head>
          <title>{`Console.blog();`}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* <section className={ ' transition-none duration-0 relative w-full min-h-[120vh] lg:min-h-[100vh] z-11 '} style={{minWidth: '100vw'}}>
          <div className={`${scrollY < windowHeight*1.5 ? 'block ': ' hidden '}`}>
            
          </div>
          
        </section> */}


        

        {/* <section ref={collectionsRef} className={' transition-none duration-0 relative w-full min-h-[120vh] lg:min-h-[100vh] z-5 '} style={{minWidth: '100vw'}}>
          <div className={`${scrollY > windowHeight*1.5 ? 'block ': ' hidden '}`}>
            <IntroBanner collectionsProp={collections} scrollRef={searchRef} title='Featured Collections' featured={true} windowOffset={3} />
          </div>
          
        </section> */}

        <section 
          style={{
            width: '100vw', 
            maxWidth: '1500px', 
          }} 
          className={'relative pt-[50px] flex flex-col items-center justify-center z-5 mx-0'+(menu? ' blur-filter ': ' trans-500')}
          >


          <div className='grid grid-cols-1 lg:grid-cols-12 gap-4 pt-[10]'>

            <div className='hidden lg:block lg:col-span-3  col-span-1'>

              <div className="transition-all duration-300 lg:sticky relative lg:top-[90px]">

                
                <SideBarWidget categories={categories} recentPosts={recentPosts} />

                {/* <SideTray options='homeOptions'/> */}

              </div>

            </div>

            

            <div className="relative lg:col-span-9  col-span-1 px-0 lg:top-[40px]">

              <div className='block lg:rounded-lg relative w-auto flex flex-col bg-background-light dark:bg-background-dark md:border-[1px] dark:border-0 border-border-light overflow-hidden'>
                <LandingHero featuredPosts={featuredPosts as []}/>
              </div>
              

              <div className='grid grid-cols-1 lg:grid-cols-9 gap-4 '> 

                <div className='lg:rounded-lg col-span1 lg:col-span-6 bg-background-light dark:bg-element-dark relative md:top-[15px] md:border-[1px] dark:border-0 border-border-light p-2 md:p-4 pb-[100px]'>
                  {/* <section className='block rounded-lg relative w-auto top-0 md:top-[15px] z-10 flex flex-col bg-background-light dark:bg-background-dark border-[1px] dark:border-0 border-border-light overflow-hidden' style={{}}>

                    <div className='relative bg-background-light dark:bg-background-dark block z-11'>

                      <div className='py-[20px]'>
                        <FeaturedGrid posts={posts} />
                      </div>
                      

                    </div>

                  </section> */}

                  <div
                    className='block relative divider lg:pt-[50px] pb-[50px] w-full flex flex-row items-center justify-center  text-[30px] md:text-[40px] font-inter font-[600] text-copy-light dark:text-copy-dark'
                    >

                      <span className='px-3'>
                        Latest Posts
                      </span>
                        
                  </div>

                  {posts.map((post:any, index) => <PostCard post={post} key={post.title}/>)}
                </div>

                <div className='hidden lg:block lg:col-span-3  col-span-1'>

                  <div className="transition-all duration-300 my-4 lg:sticky relative lg:top-[90px]">

                    
                    <RightBarWidget collections={collections} />

                  </div>

                </div>

                <div className='block lg:hidden lg:col-span-3  col-span-1'>

                  <div className="transition-all duration-300 lg:sticky relative lg:top-[90px]">

                    
                    <SideBarWidget />

                  </div>

                </div>

              </div>

              

              
            </div>

            

          </div>

          
        </section>
        
      </div>
  )
}

export const getStaticProps = async () : Promise<{}> => {

  try {
    const posts = (await getPosts()) || [];
    const collections = (await getCollections(6)) || [];
    const recentPosts = (await getRecentPosts()) || [];
    const categories = (await getCategories()) || [];
    const featuredPosts = posts.filter((post:any)=> post.featuredPost); 

    return {
      props: { posts, collections, recentPosts, categories, featuredPosts }
    }
  }catch (e) {

    console.log('error: ', e);

    return Promise<{}>; 
  }
}

export default Home
