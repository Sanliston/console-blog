import React, { useContext } from 'react';
import { getPosts, getPostDetails } from '../../services'; 
import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader, MenuWidget, CollectionsWidget, SideTray } from '../../components'; 
import { useRouter } from 'next/router';
import { StateContext } from '../_app';
import { useWindowScrollPositions } from '../../hooks/useWindowScrollPositions';
import useScrollDirection from '../../hooks/useScrollDirection';
import Head from 'next/head';
import SideBarWidget from '../../components/SideBarWidget';
import RightBarWidget from '../../components/RightBarWidget';

export interface PostDetailsProps {
    post: {} | any
}

const PostDetails = ( { post } : PostDetailsProps) : JSX.Element => {

    const router = useRouter();
    const {menu} = useContext(StateContext);
    const scrollDirection = useScrollDirection();
    const {scrollY} = useWindowScrollPositions();

    if(router.isFallback){
        return <Loader />;
    }

    return (
        <div className={'container bg-backfall-light dark:bg-background-dark mx-auto md:px-10 mb-8'+(menu?' blur-filter': ' trans-500')}>

            <Head>
                <title>{`${post.title}`}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>

                <div className='hidden lg:block lg:col-span-3'>
                    <div className={'relative lg:sticky transition-all duration-300 lg:top-[100px] '}>
                        <SideBarWidget 
                            slug={post.slug}
                            categories={post.categories.map((category: any) => category.slug) }
                        />
                    </div>
                    
                </div>

                <div className='col-span-1 lg:col-span-6 flex flex-col '>

                    <PostDetail post={post}/>
                    <Author author={post.author}/>
                    <CommentsForm slug={post.slug}/>
                    <Comments slug={post.slug}/>

                </div>

                <div className='hidden lg:block lg:col-span-3  col-span-1'>

                  <div className="transition-all duration-300 lg:sticky relative lg:top-[100px]">

                    
                    <RightBarWidget />

                  </div>

                </div>

                <div className='block lg:hidden lg:col-span-3  col-span-1'>

                  <div className="transition-all duration-300 lg:sticky relative lg:top-[100px]">

                    
                    <SideBarWidget 
                        slug={post.slug}
                        categories={post.categories.map((category: any) => category.slug) }
                    />

                  </div>

                </div>

            </div>
        </div>
    );
}

export const getStaticProps = async ({params}: any) : Promise<{}> => {

    const data = await getPostDetails(params.slug);
  
    return {
      props: { post: data }
    }
  }

export const getStaticPaths = async () : Promise<{}> => {

    const posts = await getPosts();

    return {
        paths: posts.map(({ slug }) => ({ params: {slug}})),
        fallback: true
    }
}

export default PostDetails; 