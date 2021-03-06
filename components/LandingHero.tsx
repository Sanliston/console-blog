import Link from 'next/link';
import { off } from 'process';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { BsCloudMoonFill } from "react-icons/bs";
import { StateContext } from '../pages/_app';
import { searchPosts } from '../services';
import { truncate } from '../utils/utils';

interface LandingHeroInterface {
    featuredPosts: []
}

const LandingHero = ({featuredPosts}:LandingHeroInterface): JSX.Element => {

    const [posts, setPosts] = useState([]);
    const [initialPosts, setInitialPosts] = useState([]);
    const [debounce, setDebounce] = useState(false);
    const [morePosts, setMorePosts] = useState(false);
    const [moreInitialPosts, setMoreInitialPosts] = useState(false);
    const [lastQuery, setLastQuery] = useState('');
    const [userSearched, setUserSearched] = useState(false);
    const {menu} = useContext(StateContext);

    const searchEl = useRef<HTMLInputElement>(null);

    const submitSearch = (force:boolean = false) => {

        //flag that user has now searched
        if(!userSearched){
            setUserSearched(true);
        }

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

    useEffect(()=>{
        //initial search on component load
         

        if(featuredPosts.length > 3){
            setMoreInitialPosts(true);
        }else{
            setMoreInitialPosts(false);
        }

        console.log('initial posts: ', featuredPosts);

        setInitialPosts(featuredPosts.filter((post:any, index:number)=>index < 3));
        
    }, []);

    return (

        <>
        <div 
            className={'skew-y-[20deg] absolute lg:top-[133vh] bg-gradient-to-br from-[#282e34]/[0.7] via-[#282e34] to-[#282e34] w-full min-h-[1800px] shadow-lg h-auto landing-hero pb-15 mb-15 bg-cover grid grid-cols-1 lg:grid-cols-6 gap-1'+(menu? ' blur-filter ': ' trans-500')}
        >

        </div>

        <div 
            className={'absolute lg:top-[100vh] w-full min-h-[1800px] h-auto landing-hero  pb-15 mb-15 bg-cover grid grid-cols-1 lg:grid-cols-6 gap-1'+(menu? ' blur-filter ': ' trans-500')}

            >

                <div className='container  mx-auto px-0 pt-[120px] md:pt-[200px] col-span-1 lg:col-span-4 lg:col-start-2'>

                    <div className='landing-title hidden md:flex flex-col items-center justify-center col-span-1 lg:col-span-6 mb-0 md:mb-15'>
                        <div className='flex flex-col items-center justify-center text-white mb-5'>

                            <div className=' text-[90px] md:text-[150px] lg:text-[250px]  mb-5'>
                                <BsCloudMoonFill/>
                            </div>

                            <span className='text-2xl md:text-4xl lg:text-[60px] font-[900] text-white pt-[20px] text-center font-labelle'>
                                Console.blog();
                            </span>
                            
                        </div>

                    </div>

                    <div className='landing-title row-span-2 col-span-1 lg:col-span-6 lg:col-start-1  rounded-lg mx-3'>
                        <div className='flex flex-col h-full items-center justify-center pt-[100px]'>

                            <span className='text-white/[0.5] text-xl font-light'>
                                Search Articles
                            </span>
                            
                            <input 
                                type='text'
                                className='transition-all duration-500 p-4 px-4 m-4 outline-none w-[90vw] md:w-[50%] bg-black/[0.3] rounded-full focus:ring-2 focus:ring-white/[0.3] text-lg text-white/[0.6] text-center'
                                placeholder='Your query'
                                name='search'
                                ref={searchEl}
                                onKeyUp={()=>{submitSearch(false)}}
                            />

                            {posts.length > 0 ?
                            
                            
                                <div className='flex flex-col items-center justify-start w-full pt-[50px]'>

                                    <span className='text-white text-xl font-semibold pb-5'>
                                        Articles matching your search:  
                                    </span>

                                    <div className='w-full text-md'>
                                        {posts.map((post:any, index:number)=>(

                                            <Link href={`/post/${post.slug}`} key={post.id}>
                                                <div className='search-result-show h-[200px] max-h-[250px] bg-cover border-0 hover:border-2 hover:duration-300 hover:box-content transition flex flex-row md:flex-row justify-items-start items-center w-full mb-4 bg-[#4A5A6A]/[0.3] rounded-lg overflow-hidden cursor-pointer'
                                                    style={{
                                                        opacity: 0,
                                                        '--custom-delay': index*50+'ms',
                                                        //backgroundImage: `url(${post.featuredImage.url})`
                                                    }as React.CSSProperties}
                                                >

                                                    <div className='min-h-[300px] min-w-[25%] bg-cover'
                                                        style={{
                                                            height: '100%',
                                                            backgroundImage: `url(${post.featuredImage.url})`
                                                        }as React.CSSProperties}
                                                    > 
                                                    </div>
                                                    
                                                    <div className='text-white h-[200px] flex flex-col p-4 md:p-6 bg-black/[0.4] md:bg-black/[0.4]'>
                                                        <span className='font-semibold pb-2'>
                                                            {post.title}
                                                        </span>

                                                        <span className='hidden xl:block text-white/[0.7]'>
                                                            {truncate(post.excerpt, 500)}
                                                        </span>

                                                        <span className='block md:hidden text-white/[0.7]'>
                                                            {truncate(post.excerpt, 100)}
                                                        </span>

                                                        <span className='hidden md:block xl:hidden text-white/[0.7]'>
                                                            {truncate(post.excerpt, 300)}
                                                        </span>
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </Link>
                                        
                                        ))}
                                    </div>

                                    {morePosts && 

                                        <Link href={{ pathname: '/search', query: { searchQuery: lastQuery } }}>
                                            <div className='transition-all duration-500 cursor-pointer button bg-white text-gray p-3 hover:px-10 px-6 rounded-full'> 
                                                View More
                                            </div>
                                        </Link>
                                        
                                    }
                                    
                                </div>

                                :
                                ''
                            }

                            {userSearched && posts.length == 0 ?

                                <div className='flex flex-col items-center justify-start w-full pt-[20px]'> 
                                    <span className='text-white text-xl'>
                                        No results
                                    </span>
                                </div>
                                
                                :

                                ''
                            }
                            


                            {initialPosts.length > 0 && posts.length == 0 ?
                                
                                <div className='flex flex-col items-center justify-start w-full pt-[50px]'>
                                    <span className='text-white text-xl font-semibold pb-5'>
                                        Articles you may like  
                                    </span>

                                    <div className='w-full text-md'>
                                        {initialPosts.map((post:any, index:number)=>(

                                            <Link href={`/post/${post.slug}`} key={post.id}>
                                                <div className='search-result-show h-[200px] max-h-[250px] bg-cover border-0 hover:border-2 hover:duration-300 hover:box-content transition flex flex-row md:flex-row justify-items-start items-center w-full mb-4 bg-[#4A5A6A]/[0.3] rounded-lg overflow-hidden cursor-pointer'
                                                    style={{
                                                        opacity: 0,
                                                        '--custom-delay': index*50+'ms',
                                                        //backgroundImage: `url(${post.featuredImage.url})`
                                                    }as React.CSSProperties}
                                                >

                                                    <div className='min-h-[300px] min-w-[25%] bg-cover'
                                                        style={{
                                                            height: '100%',
                                                            backgroundImage: `url(${post.featuredImage.url})`
                                                        }as React.CSSProperties}
                                                    > 
                                                    </div>
                                                    
                                                    <div className='text-white h-[200px] flex flex-col p-4 md:p-6 bg-black/[0.4] md:bg-black/[0.4]'>
                                                        <span className='font-semibold pb-2'>
                                                            {post.title}
                                                        </span>

                                                        <span className='hidden xl:block text-white/[0.7]'>
                                                            {truncate(post.excerpt, 500)}
                                                        </span>

                                                        <span className='block md:hidden text-white/[0.7]'>
                                                            {truncate(post.excerpt, 100)}
                                                        </span>

                                                        <span className='hidden md:block xl:hidden text-white/[0.7]'>
                                                            {truncate(post.excerpt, 300)}
                                                        </span>
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </Link>
                                        
                                        ))}
                                    </div>

                                    {moreInitialPosts ? 

                                        <Link href={{ pathname: '/search', query: { searchQuery: 'featured' } }}>
                                            <div className='transition-all duration-500 cursor-pointer button bg-white text-gray p-3 hover:px-10 px-6 rounded-full'> 
                                                View More
                                            </div>
                                        </Link>

                                        :

                                        ''
                                        
                                    }
                                    
                                </div>

                                :

                                ''
                            }
                            
                            
                        </div>
                    </div>
                    
                    
                    
                </div>



        </div>
        </>
    );
}

export default LandingHero;