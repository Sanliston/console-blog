import React, { useContext } from 'react';
import { useRouter } from 'next/router';

import { getCategories, getTagPosts } from '../../services';
import { PostCard, Categories, Loader, MenuWidget, CollectionsWidget, SideTray } from '../../components';
import { StateContext } from '../_app';
import Link from 'next/link';
import useScrollDirection from '../../hooks/useScrollDirection';
import { useWindowScrollPositions } from '../../hooks/useWindowScrollPositions';
import SideBarWidget from '../../components/SideBarWidget';

interface TagPostProps {
    posts: [],
    tag: string
}

const TagPost = ({ posts, tag }: TagPostProps) : JSX.Element => {
  const router = useRouter();
  const { categories, menu } = useContext(StateContext);
  const {scrollY} = useWindowScrollPositions();
  const scrollDirection = useScrollDirection();

  if (router.isFallback) {
    return <Loader />;
  }

  console.log("categories: ", categories, " tag: ", tag);

  return (
    <div className={"container text-copy-light dark:text-copy-dark flex flex-col items-center mx-auto px-2 md:px-10 mb-8 pt-[100px]"+(menu?' blur-filter': ' trans-500 pb-[200px]')}>

      <h1 className=' font-bold text-4xl py-10 font-inter'>
       {`#${tag} Articles`}
      </h1>

      <div className='flex flex-row w-[80%] items-center justify-center p-4 lg:p-8'>

          <div className=' self-center flex flex-row flex-wrap w-[80%] h-auto pb-5 mb-5 items-center justify-center border-b-[1px] border-white/[0.3]'>

              {categories.map((category:any)=>(

                  <Link href={`/tags/${category.slug}`} key={category.slug}>
                      <span className={`relative cursor-pointer absolute px-3 py-2 m-2 bg-element-light dark:bg-element-dark hover:bg-slate-700 text-gray rounded-lg text-sm dark:border-white ${tag === category.slug? ' bg-secondary-dark dark:bg-secondary-dark p-[20px] text-white ': 'border-[0px]'}`}>
                          {`#${category.name}`}
                      </span>
                  </Link>
              ))}

          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

      <div className='hidden lg:block lg:col-span-3  col-span-1'>

        <div className={"lg:sticky relative transition-all duration-300 lg:top-[100px]"}>

          <SideBarWidget />

        </div>

      </div>

        <div className="col-span-1 lg:col-span-6 p-4 py-[50px] bg-background-light dark:bg-element-dark rounded-lg border-[1px] dark:border-0 border-border-light">
          {posts.map((post:any, index:number) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>

        <div className="col-span-1 lg:col-span-3">
          <div className={ "relative lg:sticky transition-all duration-300 lg:top-[100px]"}>
            <CollectionsWidget />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TagPost;

// Fetch data at build time
export async function getStaticProps({ params }:any) {

    console.log("params: ", params);
  const posts = await getTagPosts(params.tag);

  return {
    props: { posts, tag: params.tag },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths(): Promise<{}>{
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { tag: slug } })),
    fallback: true,
  };
}