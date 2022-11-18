import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getRecentPosts, getSimilarPosts, searchPosts } from '../services';
import PostWidget from './PostWidget';
import Categories from './Categories';
import { useRouter } from 'next/router';
import { truncate } from '../utils/utils';

export type Post = {
  title?: string,
  
}
interface SearchWidgetProps {
  slug?: string
}

const SearchWidget = ({slug}: SearchWidgetProps): JSX.Element=> {

    const [ relatedPosts, setRelatedPosts ] = useState<[]>([]);

    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const [debounce, setDebounce] = useState(false);
    const [morePosts, setMorePosts] = useState(false);
    

    const searchEl = useRef<HTMLInputElement>(null);
    useEffect(()=>{

        if(typeof router.query.searchQuery === 'string'){
            setSearchQuery(router.query.searchQuery as string); 
            searchPosts(searchQuery, 3).then((results: any)=>{

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

            if(morePosts){
                setMorePosts(false);
            }
            
            return; 
        }

        searchPosts(searchQuery, 4).then((searchResults:any)=>{

            if(searchResults.length > 3 && searchQuery.length > 0){
                setMorePosts(true);
            }else{
                setMorePosts(false);
            }

            setPosts(searchResults.filter((post:any, index:number)=>index < 3));
        });
    }
  

    return (
        <div className='lg:rounded-lg m-0  mb-4 bg-background-light dark:bg-element-dark  flex flex-col items-center '>

            <div className='flex flex-col w-full h-full items-center justify-center pt-[50px]'>

                <input 
                    type='text'
                    className='transition-all duration-500 p-4 px-4 m-4 outline-none w-full w-[90%] bg-element-dark/[0.1] dark:bg-black/[0.3] rounded-full focus:ring-2 focus:ring-sky-400 focus:dark:text-white text-lg text-center'
                    placeholder='Search Articles'
                    name='search'
                    ref={searchEl}
                    onKeyUp={()=>{submitSearch(false)}}
                />

            </div>

            <div className="col-span-1 lg:col-span-6">
                {posts.map((post:any, index:number) => (
                    <Link href={`/post/${post.slug}`} key={post.id}>
                    <div className='search-result-show h-auto p-6 py-4 bg-cover border-0 hover:duration-300 transition flex flex-col md:flex-row justify-items-start md:justify-between items-center w-full mb-1 lg:mb-0 dark:bg-element-dark lg:rounded-lg cursor-pointer'
                        style={{
                            opacity: 0,
                            '--custom-delay': index*50+'ms',
                            //backgroundImage: `url(${post.featuredImage.url})`
                        }as React.CSSProperties}
                    >
                        
                        <div className='text-copy-light dark:text-copy-dark h-auto flex flex-col justify-start self-start'>

                            {/* <div className='flex-row mb-4 relative items-end h-[50px]'> 
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
                            </div> */}
                            
                            <span className='font-semibold text-lg pb-0'>
                                {post.title}
                            </span>

                            <span className='hidden xl:block text-copy-light dark:text-copy-dark/[0.7]'>
                                {truncate(post.excerpt, 70)}
                            </span>

                            <span className='block md:hidden text-copy-light dark:text-copy-dark/[0.7]'>
                                {truncate(post.excerpt, 70)}
                            </span>

                            <span className='hidden md:block xl:hidden text-copy-light dark:text-copy-dark/[0.7]'>
                                {truncate(post.excerpt, 70)}
                            </span>
                            
                        </div>

                        {/* <img
                            className='h-auto w-full max-h-auto border-box md:w-auto max-w-[350px] md:max-w-[250px] rounded-lg mt-4 md:mt-0 md:ml-4'
                            src={post.featuredImage.url}
                        /> */}
                        
                    </div>
                </Link>
                ))}
            </div>

            {morePosts && 

                <Link href={{ pathname: '/search', query: { searchQuery: searchQuery } }}>
                    <div className='relative transition-all duration-500 cursor-pointer button bg-button-color text-white p-3 hover:px-10 px-6 rounded-lg mt-[25px]'> 
                        View More
                    </div>
                </Link>

            }
        
        </div>
    )
}

export default SearchWidget;
