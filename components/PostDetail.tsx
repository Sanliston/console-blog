import React, { ReactNode } from 'react';
import moment from 'moment';
import { FiCalendar } from 'react-icons/fi'; 
import Link from 'next/link';

interface PostDetailProps {
    post: {}| any
}

const PostDetail = ({ post } : PostDetailProps) : JSX.Element => {

    const createFragment = (index:any, text:any, obj:any, type?:any) => {

        let modifiedText = text;

        if(obj) {
            
            if (obj.bold) {
                modifiedText = (<b key={index}>{text}</b>);
            }
    
            if (obj.italic) {
                modifiedText = (<em key={index}>{text}</em>);
            }
    
            if (obj.underline) {
                modifiedText = (<u key={index}>{text}</u>);
            }
   
        }

        switch (type) {

            case 'heading-three':
                return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item:any, i:number) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;

            case 'paragraph':
                return <p key={index} className="mb-8 font-light">{modifiedText.map((item:any, i:number) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;

            case 'heading-four':
                return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item:any, i:number) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;

            case 'image':
                return (
                    <img
                        key={index}
                        alt={obj.title}
                        height={obj.height}
                        width={obj.width}
                        src={obj.src}
                        className='shadow-lg rounded-lg'
                    />
                );
            default:
              return modifiedText;
        }
    }

    return (
        <div className=' text-copy-light dark:text-copy-dark  md:rounded-lg lg:p-0 pb-12 mb-8 mt-[100px] text-white/[0.8]'>

            <div className='relative overflow-hidden shadow-d shadow-lg'>

                <img 
                
                    src={post.featuredImage.url}
                    alt={post.title}
                    className='object-top h-full w-full md:rounded-lg'
                />
            </div>

            <div className='flex text-copy-light dark:text-copy-dark flex-col items:center p-4 lg:p-8'>

                <div className='flex flex-row relative items-center justify-start mt-[-85px] w-full'>

                    <div className='flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8'>

                        <img 
                            alt={post.author.name}
                            height="100px"
                            width="100px"
                            className='align-middle rounded-full border-[10px] border-backfall-light dark:border-background-dark'
                            src={post.author.photo.url}
                        />

                    </div>

                    <div className='flex flex-row align-start justify-end self-end mb-4'>
                        <p className=' self-end text-lg h-full mr-4 font-bold'>
                                {post.author.name}
                        </p>

                        <div className='font-medium h-full flex flex-row align-center self-end justify-center'>
                            <FiCalendar className=' h-full mt-[3px] mr-3 ml-3' />
                            <span className='h-full min-w-[100px]'>
                                {moment(post.createdAt).format('MMM DD, YYYY')}
                            </span>
                        </div>
                    </div>
                    

                </div>

                <h1 className='mt-8 mb-8 text-3xl font-bold '> {post.title}</h1>

                <div className=' self-start flex flex-row flex-wrap w-full h-auto pb-5 mb-5 items-center justify-start border-b-[1px] border-white/[0.3]'>

                    {post.categories.map((category:any)=>(

                        <Link href={`/tags/${category.slug}`} key={category.slug}>
                            <span className="relative cursor-pointer absolute px-4 py-2 mr-2 border-[1.5px] dark:border-0 border-border-light dark:border-border-dark dark:bg-element-dark text-copy-light dark:text-copy-dark/[0.8] rounded-lg text-sm">
                                {`#${category.name}`}
                            </span>
                        </Link>
                    ))}

                </div>

                {post.content.raw.children.map((typeObj: any, index:number)=>{

                    //we iterating over an object which looks like this: 

                    const children = typeObj.children.map((item:any, itemIndex: number)=>{
                        return createFragment(itemIndex, item.text, item);
                    })

                    return createFragment(index, children, typeObj, typeObj.type);
                })}

            </div>

        </div>
    );
}

export default PostDetail;