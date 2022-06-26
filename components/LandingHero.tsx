import Link from 'next/link';
import { off } from 'process';
import React, { useRef, useState } from 'react';
import { BsCloudMoonFill } from "react-icons/bs";
import { searchPosts } from '../services';



const LandingHero = (): JSX.Element => {

    const [posts, setPosts] = useState([]);
    const [debounce, setDebounce] = useState(false);
    const [morePosts, setMorePosts] = useState(false);
    const [lastQuery, setLastQuery] = useState('');

    const searchEl = useRef<HTMLInputElement>(null);

    const submitSearch = (force:boolean = false) => {

        const searchQuery:string = searchEl!.current!.value; 

        if(debounce && !force){
            console.log("debounced");
            return; 
        }

        console.log("searched, searchEl: ", searchEl!.current!.value);

        setDebounce(true);
        setTimeout(()=>{
            setDebounce(false);

            let updatedQuery:string = searchEl!.current!.value;
            //search for debounced value -- searchEl gives up to date value
            if(updatedQuery !== searchQuery){
                updatePosts(updatedQuery);
            }
            
        }, 2000);

        updatePosts(searchQuery);
    }

    const updatePosts = (searchQuery:string):void => {

        setLastQuery(searchQuery);
        console.log("last query set: ", searchQuery);


        //check if contains only white space
        if(/^\s*$/.test(searchQuery)){
            setPosts([]);

            return; 
        }

        searchPosts(searchQuery, 6).then((searchResults:any)=>{

            if(searchResults.length > 3){
                setMorePosts(true);
            }else{
                setMorePosts(false);
            }

            setPosts(searchResults.filter((post:any, index:number)=>index < 3));
        });
    }

    return (

        <>
            <div 
                className='w-full fixed min-h-[150vh] min-h-[2250px]  z-0 landing-hero pb-15 mb-15 bg-cover'

                style={{ backgroundImage: `url('/images/gerald-berliner-blur.jpg')` }} 
                >
                
            </div>

            <div 
                className='absolute top-0 w-full min-h-[150vh] min-h-[2250px]  h-full landing-hero pb-15 mb-15 bg-cover '

                >

                    <div className='container  mx-auto px-0 grid grid-cols-1 lg:grid-cols-6 grid-rows-6 gap-1 gap-y-6 pt-[200px]'>

                        <div className='landing-title flex flex-col items-center justify-center row-span-1 col-span-1 lg:col-span-6 mb-15'>
                            <div className='flex flex-col items-center justify-center text-white mb-5'>

                                <div className=' text-[150px] lg:text-[250px]  mb-5'>
                                    <BsCloudMoonFill/>
                                </div>

                                <span className='text-4xl lg:text-[60px] font-[900] text-white text-center'>
                                    Console.blog();
                                </span>
                                
                            </div>

                            <div className='flex flex-col items-center justify-center'>

                                <span className='text-l lg:text-xl font-light text-white text-center'>
                                        <span>A simple </span>
                                        <span className='text-[#286bae] font-semibold'>blog </span> 
                                        <span>for <i>slightly </i> less simple </span>
                                        <span className='text-[#286bae] font-semibold'>concepts</span>.
                                </span>
                                
                            </div>
                        </div>

                        <div className='landing-title row-span-2 col-span-1 lg:col-span-6 lg:col-start-1  rounded-lg mx-3'>
                            <div className='flex flex-col h-full items-center pt-[100px]'>

                                <span className='text-white/[0.5] text-2xl font-semibold'>
                                    Search Articles
                                </span>
                                
                                <input 
                                    type='text'
                                    className='p-4 px-4 m-4 outline-none w-[50%] rounded-full focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 text-center'
                                    placeholder='Maybe Javascript?'
                                    name='search'
                                    ref={searchEl}
                                    onKeyUp={()=>{submitSearch(false)}}
                                />

                                {posts.length > 0 ?
                                
                                    <div className='flex flex-col items-center justify-start w-full pt-[50px]'>
                                        <span className='text-white text-2xl font-semibold pb-5'>
                                            Your search results 
                                        </span>

                                        <div className='w-full'>
                                            {posts.map((post:any, index:number)=>(

                                                <Link href={`/post/${post.slug}`} key={post.id}>
                                                    <div className='flex flex-row justify-items-start items-center w-full mb-4 bg-[#4A5A6A]/[0.3] rounded-lg overflow-hidden cursor-pointer'>

                                                        <img
                                                            className=" w-[180px] h-[180px] object-cover md:h-auto md:rounded-none mr-5" 
                                                            src={post.featuredImage.url} 
                                                        />
                                                        
                                                        <div className='text-white flex flex-col '>
                                                            <span className='font-semibold pb-2'>
                                                                {post.title}
                                                            </span>

                                                            <span className='text-white/[0.5]'>
                                                                {post.excerpt}
                                                            </span>
                                                            
                                                        </div>
                                                        
                                                    </div>
                                                </Link>
                                            
                                            ))}
                                        </div>

                                        {morePosts && 

                                            <Link href={{ pathname: '/search', query: { searchQuery: lastQuery } }}>
                                                <div className='button bg-white text-gray p-3 px-6 rounded-full'> 
                                                    View More
                                                </div>
                                            </Link>
                                            
                                        }
                                        
                                    </div>

                                    :

                                    <div> 

                                    </div>
                                }
                                
                                
                            </div>
                        </div>

                        <div className='landing-title row-span-1 col-span-1 lg:col-span-6 lg:col-start-1 bg-[#4A5A6A]/[0.3] rounded-lg mx-3'>
                            <figure className="md:flex h-full w-full overflow-hidden rounded-lg md:p-0">
                                <img 
                                    className=" md:w-[400px] object-cover md:h-auto md:rounded-none mx-auto" 
                                    src="/images/dummy.jpeg" 
                                    alt=""  />
                                <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                                    <blockquote>
                                        <p className="text-lg font-medium text-white">
                                            “Tailwind CSS is the only framework that I've seen scale
                                            on large teams. It's easy to customize, adapts to any design,
                                            and the build size is tiny.”
                                        </p>
                                    </blockquote>
                                    <figcaption className="font-medium">
                                        <div className="text-sky-500 dark:text-sky-400">
                                            Sarah Dayan
                                        </div>
                                        <div className="text-slate-700 dark:text-slate-500">
                                            Staff Engineer, Algolia
                                        </div>
                                    </figcaption>
                                </div>
                            </figure>
                        </div>

                        <div className='landing-title row-span-1 col-span-1 lg:col-span-6 lg:col-start-1 bg-[#4A5A6A]/[0.3] rounded-lg mx-3'>
                            <div className='flex flex-col items-center justify-center'>

                                
                                
                            </div>
                        </div>
                        
                        
                    </div>



            </div>
        </>
    );
}

export default LandingHero;