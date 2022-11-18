import Link from 'next/link';
import { off } from 'process';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { BsCloudMoonFill } from "react-icons/bs";
import { StateContext } from '../pages/_app';
import { searchPosts } from '../services';
import { truncate } from '../utils/utils'; 
import Image from 'next/image'; 
import softwareDevSvg from '../public/images/softwaredev.svg';
import moment from 'moment';

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
            return; 
        }

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

        setInitialPosts(featuredPosts.filter((post:any, index:number)=>index < 3));
        
    }, [featuredPosts]);

    return (

        <>

        <div 
            className={'block w-full h-auto landing-hero bg-background-light dark:bg-element-dark pb-[100px] transition-all duration-300 bg-cover'+(menu? ' blur-filter ': ' trans-500')}

            >

                <div className='px-0 flex flex-col items-center justify-center w-full lg:px-[20px]'>


                    <div className='flex flex-col items-center justify-center text-copy-light dark:text-copy-dark mb-4'>

                        <Image
                            src={softwareDevSvg}
                            alt='Software dev image'
                            height='500'
                            width='500'
                        />

                    </div>

                    <div className='landing-title flex flex-col items-center justify-center col-span-1 lg:col-span-6 mb-0 md:mb-15 w-full'>
                        <div className='flex flex-col items-center justify-center text-copy-light dark:text-copy-dark mb-5'>

                            {/* <div className=' text-[90px] md:text-[150px] lg:text-[250px]  mb-5'>
                                <BsCloudMoonFill/>
                            </div> */}

                            <span className='text-2xl md:text-3xl lg:text-[40px] font-[900] text-copy-light dark:text-copy-dark pt-[20px] text-center font-inter'>
                                Console
                                <span className='text-sky-400'>
                                .blog()
                                </span>
                            </span>
                            
                        </div>

                    </div>

                    <div className='landing-description flex-row items-center justify-center col-span-1 lg:col-span-6 mb-0 md:mb-15'>
                        <div className='flex flex-col items-center justify-center text-copy-light dark:text-copy-dark mb-5'>

                            <span className='text-xl md:text-3xl lg:text-[22px] font-[500] text-copy-light dark:text-copy-dark text-center font-inter'>
                                {'Something a little '}
                                
                                <span
                                    className='text-sky-400'
                                > 
                                    {'simple.'}
                                </span>
                            </span>
                            
                        </div>

                    </div>

                    <div className='h-[1px] w-[60%] dark:bg-background-light bg-border-light my-[50px]'>

                    </div>

                    <div className='landing-title w-full row-span-2 col-span-1 lg:col-span-6 lg:col-start-1  rounded-lg lg:mx-3'>
                        <div className='flex flex-col h-full w-full items-center justify-center pt-[30px]'>

                            <span className='text-3xl md:text-3xl lg:text-[40px] font-[900] dark:text-copy-dark text-xl font-inter'>
                                {'How about a '} 
                                    <span className='text-sky-400'>
                                        search?
                                    </span>
                            </span>
                            
                            <input 
                                type='text'
                                className='transition-all duration-500 mt-[50px] p-4 px-4 m-4 outline-none w-[90vw] md:w-[50%] bg-black/[0.1] dark:bg-black/[0.3] rounded-full focus:ring-2 focus:ring-sky-400 text-lg text-copy-light dark:text-copy-dark/[0.6] text-center'
                                placeholder='Search for articles'
                                name='search'
                                ref={searchEl}
                                onKeyUp={()=>{submitSearch(false)}}
                            />

                            {posts.length > 0 ?
                            
                            
                                <div className='flex flex-col items-center justify-center w-full min-h-[800px] pt-[50px]'>

                                    <span className='text-copy-light dark:text-copy-dark text-xl font-semibold pb-5'>
                                        Articles matching your search:  
                                    </span>

                                    <div className='w-full text-md flex flex-col items-center justify-center'>
                                        {posts.map((post:any, index:number)=>(

                                            <Link href={`/post/${post.slug}`} key={post.id}>
                                                <div className='search-result-show h-auto p-6 bg-cover border-0 hover:duration-300 transition flex flex-col md:flex-row justify-items-start md:justify-between items-center w-full mb-1 lg:mb-4 bg-element-light/[0.7] dark:bg-background-dark/[0.4] lg:rounded-lg cursor-pointer'
                                                    style={{
                                                        opacity: 0,
                                                        '--custom-delay': index*50+'ms',
                                                        //backgroundImage: `url(${post.featuredImage.url})`
                                                    }as React.CSSProperties}
                                                >
                                                    
                                                    <div className='text-copy-light dark:text-copy-dark h-auto flex flex-col justify-start self-start'>

                                                        <div className='flex-row mb-4 relative items-end h-[50px]'> 
                                                            <img 
                                                                className='align-middle rounded-full inline-block mr-2'
                                                                alt={post.title}
                                                                height='50px'
                                                                width='50px'
                                                                src={post.author.photo.url}
                                                            />

                                                            <span className='font-[600]'>
                                                                {post.author.name}
                                                            </span>

                                                            <span className='h-full min-w-[100px] ml-2'>
                                                                {moment(post.createdAt).format('MMM DD, YYYY')}
                                                            </span>
                                                        </div>
                                                        
                                                        <span className='font-semibold text-xl pb-2'>
                                                            {post.title}
                                                        </span>

                                                        <span className='hidden xl:block text-copy-light dark:text-copy-dark/[0.7]'>
                                                            {truncate(post.excerpt, 100)}
                                                        </span>

                                                        <span className='block md:hidden text-copy-light dark:text-copy-dark/[0.7]'>
                                                            {truncate(post.excerpt, 100)}
                                                        </span>

                                                        <span className='hidden md:block xl:hidden text-copy-light dark:text-copy-dark/[0.7]'>
                                                            {truncate(post.excerpt, 100)}
                                                        </span>
                                                        
                                                    </div>

                                                    <img
                                                        className='h-auto w-full max-h-auto border-box md:w-auto max-w-[350px] md:max-w-[250px] rounded-lg mt-4 md:mt-0 md:ml-4'
                                                        src={post.featuredImage.url}
                                                    />
                                                    
                                                </div>
                                            </Link>
                                        
                                        ))}
                                    </div>

                                    {morePosts && 

                                        <Link href={{ pathname: '/search', query: { searchQuery: lastQuery } }}>
                                            <div className='relative transition-all duration-500 cursor-pointer button bg-button-color soft-glow text-white p-3 hover:px-10 px-6 rounded-lg mt-[25px]'> 
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
                                    <span className='text-copy-light dark:text-copy-dark text-xl'>
                                        No results
                                    </span>
                                </div>
                                
                                :

                                ''
                            }
                            


                            {initialPosts.length > 0 && posts.length == 0 ?
                                
                                <div className='flex flex-col items-center justify-start w-full pt-[50px]'>
                                    <span className='text-copy-light dark:text-copy-dark text-xl font-semibold pb-5'>
                                        Articles you may like  
                                    </span>

                                    <div className='w-full text-md flex flex-col items-center justify-center'>
                                        {initialPosts.map((post:any, index:number)=>(

                                            <Link href={`/post/${post.slug}`} key={post.id}>
                                                <div className='search-result-show h-auto p-6 bg-cover border-0 hover:duration-300 transition flex flex-col md:flex-row justify-items-start md:justify-between items-center w-full mb-1 lg:mb-4 bg-element-light/[0.7] dark:bg-background-dark/[0.4] lg:rounded-lg cursor-pointer'
                                                    style={{
                                                        opacity: 0,
                                                        '--custom-delay': index*50+'ms',
                                                        //backgroundImage: `url(${post.featuredImage.url})`
                                                    }as React.CSSProperties}
                                                >
                                                    
                                                    <div className='text-copy-light dark:text-copy-dark h-auto flex flex-col justify-start self-start'>

                                                        <div className='flex-row mb-4 relative items-end h-[50px]'> 
                                                            <img 
                                                                className='align-middle rounded-full inline-block mr-2'
                                                                alt={post.title}
                                                                height='50px'
                                                                width='50px'
                                                                src={post.author.photo.url}
                                                            />

                                                            <span className='font-[600]'>
                                                                {post.author.name}
                                                            </span>

                                                            <span className='h-full min-w-[100px] ml-2'>
                                                                {moment(post.createdAt).format('MMM DD, YYYY')}
                                                            </span>
                                                        </div>
                                                        
                                                        <span className='font-semibold text-xl pb-2'>
                                                            {post.title}
                                                        </span>

                                                        <span className='hidden xl:block text-copy-light dark:text-copy-dark/[0.7]'>
                                                            {truncate(post.excerpt, 100)}
                                                        </span>

                                                        <span className='block md:hidden text-copy-light dark:text-copy-dark/[0.7]'>
                                                            {truncate(post.excerpt, 100)}
                                                        </span>

                                                        <span className='hidden md:block xl:hidden text-copy-light dark:text-copy-dark/[0.7]'>
                                                            {truncate(post.excerpt, 100)}
                                                        </span>
                                                        
                                                    </div>

                                                    <img
                                                        className='h-auto w-full max-h-auto border-box md:w-auto max-w-[350px] md:max-w-[250px] rounded-lg mt-4 md:mt-0 md:ml-4'
                                                        src={post.featuredImage.url}
                                                    />
                                                    
                                                </div>
                                            </Link>
                                        
                                        ))}
                                    </div>

                                    {moreInitialPosts ? 

                                        <Link href={{ pathname: '/search', query: { searchQuery: 'featured' } }}>
                                            <div className='transition-all duration-500 cursor-pointer button bg-button-color soft-glow text-white p-3 hover:px-10 px-6 rounded-lg mt-[25px]'> 
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