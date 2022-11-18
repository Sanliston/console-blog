import React, { useState, useEffect, useRef, useContext } from 'react';
import { useRouter } from 'next/router';

import { getCategories, getTagPosts, searchPosts } from '../services';
import { PostCard, Categories, Loader, MenuWidget, CollectionsWidget } from '../components';
import Link from 'next/link';
import { truncate } from '../utils/utils';
import { StateContext } from './_app';
import { BsCloudMoonFill } from "react-icons/bs";
import moment from 'moment';
import SideBarWidget from '../components/SideBarWidget';

interface SearchPostProps {
    posts: [],
    tag: string
}

const SearchPosts = () : JSX.Element => {

    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const [debounce, setDebounce] = useState(false);
    const [morePosts, setMorePosts] = useState(false);
    const {menu} = useContext(StateContext);
    const [initialPosts, setInitialPosts] = useState([]);
    const [moreInitialPosts, setMoreInitialPosts] = useState(false);
    const [lastQuery, setLastQuery] = useState('');
    const [userSearched, setUserSearched] = useState(false);

    const searchEl = useRef<HTMLInputElement>(null);
    useEffect(()=>{

        if(typeof router.query.searchQuery === 'string'){
            setSearchQuery(router.query.searchQuery as string); 
            searchPosts(searchQuery, 10).then((results: any)=>{

                setPosts(results)
            });
        }
            
    }, []);

    

    const submitSearch = (force:boolean = false) => {

        const searchQuery:string = searchEl!.current!.value; 

        if(debounce && !force){
            return; 
        }

        setDebounce(true);
        setTimeout(()=>{
            setDebounce(false);

            let updatedQuery:string = searchEl!.current!.value;
            //search after debounce if query has changed -- searchEl gives up to date value
            if(updatedQuery !== searchQuery){
                updatePosts(updatedQuery);
            }
            
        }, 2000);

        updatePosts(searchQuery);
    }

    const updatePosts = (searchQuery:string):void => {

        setSearchQuery(searchQuery);


        //check if contains only white space
        if(/^\s*$/.test(searchQuery)){
            setPosts([]);

            return; 
        }

        searchPosts(searchQuery, 10).then((searchResults:any)=>{

            if(searchResults.length > 10){
                setMorePosts(true);
            }else{
                setMorePosts(false);
            }

            setPosts(searchResults.filter((post:any, index:number)=>index < 10));
        });
    }

    if (router.isFallback) {
        return <Loader />;
    }

    return (
        <div className={"lg:px-10 mb-8 text-copy-light dark:text-copy-dark trans-500 flex flex-col items-center"+(menu? ' blur-filter': '')}>



            {
            //New code
            }

            <div 
                className={'min-w-[100vw] shadow-sm pt-[100px] h-auto landing-hero dark:bg-transparent bg-background-light border-[1px] dark:border-0 pb-15 mb-15 bg-cover grid grid-cols-1 lg:grid-cols-6 gap-1'+(menu? ' blur-filter ': ' trans-500')}

                >

                    <div className='container mx-auto px-0 py-[70px] md:py-[100px] col-span-1 lg:col-span-4 lg:col-start-2'>

                        <div className='landing-title hidden md:flex flex-col items-center justify-center col-span-1 lg:col-span-6 mb-0 md:mb-15'>
                            <div className='flex flex-col items-center justify-center mb-5'>

                                <div className=' text-[50px] md:text-[100px] lg:text-[150px]  mb-5'>
                                    <BsCloudMoonFill/>
                                </div>

                                <span className='text-2xl md:text-4xl font-[900] pt-[20px] text-center font-inter'>
                                    Console.blog()
                                </span>
                                
                            </div>

                        </div>

                        <div className='landing-title col-span-1 lg:col-span-6 rounded-lg mx-3'>
                            <div className='flex flex-col w-full h-full items-center justify-center pt-[50px]'>

                                <span className='text-xl font-light'>
                                    Search Articles
                                </span>
                                
                                <input 
                                    type='text'
                                    className='transition-all duration-500 p-4 px-4 m-4 outline-none w-full md:w-[70%] bg-element-dark/[0.1] dark:bg-black/[0.3] rounded-full focus:ring-2 focus:ring-sky-400 text-lg text-center'
                                    placeholder='Your query'
                                    name='search'
                                    ref={searchEl}
                                    onKeyUp={()=>{submitSearch(false)}}
                                />
                                


                                
                                
                                
                            </div>
                        </div>
                        
                        
                        
                    </div>



            </div>

            
            {
                //END OF NEW CODE
            }
            <h1 className='font-bold text-2xl py-10'>
                {posts.length > 0 ? 'Results for: '+ searchQuery : 'No results'}
            </h1>

            <div className="container grid grid-cols-1 lg:grid-cols-12 gap-4">

                <div className='hidden lg:block lg:col-span-3  col-span-1'>

                    <div className="lg:sticky relative top-[100px]">

                        <SideBarWidget />

                    </div>

                </div>

                <div className="col-span-1 lg:col-span-6">
                    {posts.map((post:any, index:number) => (
                        <Link href={`/post/${post.slug}`} key={post.id}>
                        <div className='search-result-show h-auto p-6 bg-cover border-0 hover:duration-300 transition flex flex-col md:flex-row justify-items-start md:justify-between items-center w-full mb-1 lg:mb-4 bg-element-light dark:bg-element-dark lg:rounded-lg cursor-pointer'
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

                <div className="hidden lg:block col-span-1 lg:col-span-3">
                    <div className="relative lg:sticky top-[100px]">
                        <CollectionsWidget />
                    </div>
                </div>
                <div className='block lg:hidden lg:col-span-3  col-span-1'>

                  <div className="transition-all duration-300 lg:sticky relative lg:top-[90px]">

                    
                    <SideBarWidget />

                  </div>

                </div>
            </div>
        </div>
    );
};
export default SearchPosts;