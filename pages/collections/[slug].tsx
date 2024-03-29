import React, { useContext, useRef } from 'react';
import { useRouter } from 'next/router';

import { getCategories, getCollection, getCollections, getTagPosts } from '../../services';
import { PostCard, Categories, Loader, MenuWidget, SideTray, PostWidget } from '../../components';
import { StateContext } from '../_app';
import Link from 'next/link';
import { truncate } from '../../utils/utils';
import { useWindowScrollPositions } from '../../hooks/useWindowScrollPositions';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { FiArrowDownCircle } from 'react-icons/fi';
import CollectionsWidget from '../../components/CollectionsWidget';
import useScrollDirection from '../../hooks/useScrollDirection';
import SideBarWidget from '../../components/SideBarWidget';
import RightBarWidget from '../../components/RightBarWidget';

interface TagPostProps {
    slug: string,
    collection: any
}

const TagPost = ({ slug, collection }: TagPostProps) : JSX.Element => {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const {menu} = useContext(StateContext);

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center  mb-8 ">

      <div className={' fixed bg-cover min-w-[100vw] min-h-[100vh] flex flex-col items-center justify-center shadow-xl'+(menu?' blur-filter': ' trans-100')}

        style={{
          backgroundImage: `url(${collection.image.url})`
        }}
      >


        <div className='bg-gradient-to-b from-black/[0.6] to-black/[0.3] w-full min-h-[100vh] h-auto p-5 flex flex-col justify-center items-center px-10'>

        
          <div

          className={
              'transition-all trans-100 flex flex-col h-full w-full duration-300 items-center md:justify-start sm-short:pt-[30px] pt-[15vh] md:pt-[15vh] lg:pt-0 lg:justify-center collection-background-info-show'
          }

          >

            <div
                className={
                    'text-white/[0.4] mb-0 text-[16px] md:text-[20px] lg:text-[20px] xl:text-[30px] 2xl:text-[40px] font-bold font-labelle'+ (collection.focused ? ' collection-background-info-show ': '')
                }

                style={{
                    //for animating disappearing when focused

                    '--custom-delay': 10+'ms ',
                    opacity: collection.focused ? 0 : 1,
                } as React.CSSProperties}
                >

                Collection

            </div>

            <div
                className={'text-white mb-0 text-[40px] md:text-[60px] lg:text-[80px] xl:text-[100px] 2xl:text-[140px] font-bold font-staatliches'+ (collection.focused ? ' collection-background-info-show ': '')}

                style={{
                    //for animating disappearing when focused

                    '--custom-delay': 100+'ms ',
                    opacity: collection.focused ? 0 : 1,
                } as React.CSSProperties}
                >

                {collection.title}

            </div>

            <div
                className={'w-[100px] h-[1px] bg-white mb-[5px] md:mb-[30px]'+ (collection.focused ? ' collection-background-info-show ': '')}
                style={{
                    //for animating disappearing when focused

                    '--custom-delay': 150+'ms ',
                    opacity: collection.focused ? 0 : 1,
                } as React.CSSProperties}
                
            >

            </div>

            <div
                className={'text-white text-xs md:text-md font-light delay-400 mb-5 max-w-[300px] '+ (collection.focused ? ' collection-background-info-show ': '')}

                style={{
                    //for animating disappearing when focused
                    '--custom-delay': 200+'ms ',
                    opacity: collection.focused ? 0 : 1,
                } as React.CSSProperties}
            >

                {collection.subtitle}

            </div>

            <div
                className={'hidden md:block text-white text-xs md:text-sm lg:text-md xl:text-lg font-light delay-800 mb-5 md:max-w-[60vw] lg:max-w-[40vw]'+ (collection.focused ? ' collection-background-info-show ': '')}

                style={{
                    //for animating disappearing when focused
                    '--custom-delay': 250+'ms ',
                    opacity: collection.focused ? 0 : 1,
                } as React.CSSProperties}
            >

                {collection.description}

            </div>

            <div
                className={' md:hidden text-white text-xs md:text-sm lg:text-md xl:text-md font-light delay-800 mb-5 md:max-w-[60vw] lg:max-w-[40vw]'+ (collection.focused ? ' collection-background-info-show ': '')}

                style={{
                    //for animating disappearing when focused
                    '--custom-delay': 250+'ms ',
                    opacity: collection.focused ? 0 : 1,
                } as React.CSSProperties}
            >

                {collection.description}

            </div>

          </div>

          <div
                className={'cursor-pointer mt-[100px] hover:text-white right-[46vw] text-white/[0.6] mb-0 font-bold ' + (collection.focused ? ' collection-background-info-show ': '')}
                onClick={()=>scrollRef!.current?.scrollIntoView({behavior: 'smooth'})}
                style={{
                  //for animating disappearing when focused
                  '--custom-delay': 300+'ms ',
                } as React.CSSProperties}
                >

                    <div 
                        className={'button border-2 rounded-full cursor-pointer px-5 py-3 bg-transparent text-white text-sm xl:text-sm 2xl:text-sm'  }
                        
                        >
                        <span>
                            View Collection Articles
                        </span>
                    </div>

          </div>


          <div
                className={'cursor-pointer mt-[20px] hover:text-white right-[46vw] text-white/[0.6] mb-0 font-bold ' + (collection.focused ? ' collection-background-info-show ': '')}
                style={{
                  //for animating disappearing when focused
                  '--custom-delay': 300+'ms ',
                } as React.CSSProperties}
                >
                  <Link href={`/collections`}>

                    <div 
                        className={'button border-2 rounded-full cursor-pointer px-5 py-3 bg-transparent text-white text-sm xl:text-sm 2xl:text-sm'  }
                        
                        >
                        <span>
                            Discover More Collections
                        </span>
                    </div>
                  </Link>

          </div>

        </div> 

      </div>

      <div className={'container relative top-[100vh] min-w-[100vw] bg-element-light dark:bg-background-dark container flex flex-col items-center mx-auto lg:px-3 pb-[200px] '+(menu?' blur-filter': ' trans-100')}
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px'
        }}
      >
        <h1 ref={scrollRef} className=' text-copy-light dark:text-copy-dark font-bold text-4xl py-10 pt-[120px] font-inter'>
          {`${collection.title} Collection`}
        </h1>

          <div className="container grid grid-cols-1 lg:grid-cols-12 gap-4 ">

            <div className='hidden lg:block lg:col-span-3  col-span-1'>

              <div className={"lg:sticky relative transition-all duration-300 lg:top-[100px]"}>

                <SideBarWidget/>

              </div>

            </div>

            <div className="col-span-1 lg:col-span-6 p-4 py-[50px] bg-background-light dark:bg-element-dark lg:rounded-lg border-[1px] dark:border-0 border-border-light">
              {collection.posts.map((post:any, index:number) => (
                <PostCard key={index} post={post} />
              ))}
            </div>

            <div className='hidden lg:block lg:col-span-3  col-span-1'>

                <div className="transition-all duration-300 lg:sticky relative lg:top-[100px]">

                  
                  <RightBarWidget />

                </div>

              </div>

              <div className='block lg:hidden lg:col-span-3  col-span-1'>

                <div className="transition-all duration-300 lg:sticky relative lg:top-[100px]">

                  
                  <SideBarWidget />

                </div>

              </div>
          </div>
        
      </div>

      

      
    </div>
  );
};
export default TagPost;

// Fetch data at build time
export async function getStaticProps({ params }:any) {
    const collection = await getCollection(params.slug);

  return {
    props: { slug: params.slug, collection },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths(): Promise<{}>{
  const collections = await getCollections();
  return {
    paths: collections.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}