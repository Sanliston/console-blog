import React, { useContext } from 'react';
import { useRouter } from 'next/router';

import { getCategories, getTagPosts } from '../../services';
import { PostCard, Categories, Loader, MenuWidget } from '../../components';
import { StateContext } from '../_app';
import Link from 'next/link';

interface TagPostProps {
    posts: [],
    tag: string
}

const TagPost = ({ posts, tag }: TagPostProps) : JSX.Element => {
  const router = useRouter();
  const { categories } = useContext(StateContext);

  if (router.isFallback) {
    return <Loader />;
  }

  console.log("categories: ", categories, " tag: ", tag);

  return (
    <div className="container flex flex-col items-center mx-auto px-10 mb-8 pt-[100px]">

      <h1 className='text-white font-bold text-4xl py-10'>
       {`#${tag} Articles`}
      </h1>

      <div className='flex flex-row w-[80%] items-center justify-center p-4 lg:p-8'>

          <div className=' self-center flex flex-row flex-wrap w-[80%] h-auto pb-5 mb-5 items-center justify-center border-b-[1px] border-white/[0.3]'>

              {categories.map((category:any)=>(

                  <Link href={`/tags/${category.slug}`} key={category.slug}>
                      <span className={`relative cursor-pointer absolute px-3 py-1 mx-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full text-sm border-white ${tag === category.slug? 'border-[2px] p-5 ': 'border-[0px]'}`}>
                          {`#${category.name}`}
                      </span>
                  </Link>
              ))}

          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-1">

      <div className='hidden lg:block lg:col-span-1  col-span-1'>

        <div className="lg:sticky relative top-[100px]">

            <MenuWidget />

        </div>

      </div>

        <div className="col-span-1 lg:col-span-3">
          {posts.map((post:any, index:number) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>

        <div className="col-span-1">
          <div className="relative lg:sticky top-[100px]">
            <Categories />
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