import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { PostCard, Categories, PostWidget, LandingHero, MenuWidget, FeaturedCollections, SlidingCollections, CollectionsWidget, IntroBanner } from '../components/';
import { Category } from '../components/Categories';
import FeaturedPosts from '../components/FeaturedPosts';
import TestFeatured from '../components/TestFeature';
import useScrollDirection from '../hooks/useScrollDirection';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { useWindowScrollPositions } from '../hooks/useWindowScrollPositions';
import {getCategories, getCollections, getPosts } from '../services'; 
import { StateContext } from './_app';
import createScrollSnap from 'scroll-snap';
import { BsCloudMoonFill } from "react-icons/bs";
import useOnScreen from '../hooks/useOnScreen';
import _ from 'lodash'; 

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
  const [scrollTop, setScrollTop] = useState(0);
  const [lastScroll, setLastScroll] = useState(new Date());
  const collectionsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); 
  const collectionOnScreen = useOnScreen(collectionsRef); 
  const [snapping, setSnapping] = useState(false);
  
  

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

    if(collectionOnScreen && (scrollY > (collectionsRef.current!.offsetTop-collectionsRef.current!.offsetHeight)+500 && scrollY <  collectionsRef.current!.offsetTop+300)){

      
    }

  // }, [collectionOnScreen, scrollY]);

  const snapCollections = (top:number) => {

    console.log('scrollY: ', top, " collections top: ", collectionsRef.current!.offsetTop, " offsetHeight: ", collectionsRef.current!.offsetHeight);
    if((top > (collectionsRef.current!.offsetTop-collectionsRef.current!.offsetHeight)+(0.5 * collectionsRef.current!.offsetHeight) && top <  collectionsRef.current!.offsetTop+(0.5 * collectionsRef.current!.offsetHeight ))){

      console.log('collections in view');

      setSnapping(true);
      window.scrollTo({
        top: collectionsRef.current?.offsetTop,
        behavior: 'smooth'
      });

      setTimeout(()=>{
        //stop any further scroll animations for 2 seconds

        setSnapping(false);
      }, 500);
    }
  }

  const theBounce = useCallback(_.debounce((top:number)=>{
        
        return snapCollections(top);

    }, 500), []);

  useEffect(()=>{
    console.log('scrolling');
    setScrollTop(scrollY);

    if(!snapping){
      theBounce(scrollY);
    }
    
  }, [scrollY]);
  

  return (

      <div ref={containerRef} className={"container scroll-snap-parent mx-auto px-0 top-[0px] relative"} style={{minWidth: '100vw'}}
      
      >
        <Head>
          <title>{`Console.blog();`}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>


        <section className='block shadow-lg relative w-full min-h-[320vh] lg:min-h-[300vh] bg-backgroundDark top-[0px] z-10 flex flex-col' style={{minWidth: '100vw'}}>

          <div className={'block h-[100vh] flex flex-col items-center justify-center'}>

            <div className={`${scrollY < windowHeight*1.5 ? 'block ': ' hidden '}` + 'transition-none duration-0 min-h-[100vh] h-[100vh] w-[100vw]'}>
              <IntroBanner collectionsProp={collections} scrollRef={searchRef} title='Featured Collections' featured={true} windowOffset={0} />
            </div>
            


          </div>

          <div className='h-[100vh] relative landing-gradient block z-11'>

            <div className='py-[20px]'>
              <FeaturedPosts posts={posts} />
            </div>
            

          </div>
          <div className='h-[100vh] relative bg-backgroundDark block z-11'>

            <div className='py-[20px]'>
              <FeaturedPosts posts={posts} />
            </div>
            

          </div>

        </section>

        <section ref={collectionsRef} className={`${scrollY > windowHeight*1.5 ? 'block ': ' hidden '}` + ' transition-none duration-0 relative w-full min-h-[120vh] lg:min-h-[100vh] z-5 '} style={{minWidth: '100vw'}}>
          <SlidingCollections collectionsProp={collections} scrollRef={searchRef} title='Featured Collections' featured={true} windowOffset={3}/>
        </section>

        <section ref={searchRef} className='block relative w-full bg-backgroundDark transition-all duration-300 h-auto z-10' style={{minWidth: '100vw'}}>
          <LandingHero featuredPosts={featuredPosts as []}/>
        </section>

        <section style={{minWidth: '100vw'}} className={'relative block bg-backgroundDark z-5'+(menu? ' blur-filter ': ' trans-500')}>

          <div
              className='block relative divider py-[100px] w-full flex flex-row items-center justify-center  text-[30px] md:text-[40px] py-5 font-staatliches text-white'
            >
                <div className='w-[10%] min-w-[100px] h-[1px] bg-white rounded-full'>

                </div>

                <span className='px-3'>
                  Latest Posts
                </span>

                <div className='w-[10%] min-w-[100px] h-[1px] bg-white rounded-full'>

                </div>
                  
          </div>

          <div className='container mx-auto px-0 mb-8 '>
            
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
        </section>



        
        
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
