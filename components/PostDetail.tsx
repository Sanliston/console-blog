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
                return <p key={index} className="mb-8">{modifiedText.map((item:any, i:number) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;

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
        <div className=' text-copy-light dark:text-copy-dark  md:rounded-lg lg:p-0 pb-12 mb-8 mt-[70px] lg:mt-[100px] text-white/[0.8]'>

            <div className='relative overflow-hidden shadow-d shadow-lg'>

                <img 
                
                    src={post.featuredImage.url}
                    alt={post.title}
                    className='object-top h-full w-full lg:m-0 lg:rounded-lg border-box'
                />
            </div>
            

            <div className='flex text-copy-light dark:text-copy-dark flex-col items:center px-4 lg:px-0 py-4 lg:py-8'>

                <h1 className='mt-0 mb-0 text-3xl font-bold '> {post.title}</h1>

                <div className='flex flex-row relative items-center justify-start w-full my-4'>

                    <div className='flex flex-row items-center justify-center'>

                        <div className='flex items-center w-full lg:w-auto mr-2'>

                            <img 
                                alt={post.author.name}
                                height="40px"
                                width="40px"
                                className='align-middle rounded-full'
                                src={post.author.photo.url}
                            />

                        </div>
                        
                        <p className='text-lg h-full mr-4 font-bold'>
                                {post.author.name}
                        </p>
                        <div className='font-medium h-full flex flex-row align-center justify-center'>
                            <FiCalendar className=' h-full mt-[4px] mr-1 ' />
                            <span className='h-full min-w-[100px] italic'>
                                {moment(post.createdAt).format('MMM DD, YYYY')}
                            </span>
                        </div>
                    </div>
                    

                </div>

                {post.content.raw.children.map((typeObj: any, index:number)=>{

                    //we iterating over an object which looks like this: 

                    const children = typeObj.children.map((item:any, itemIndex: number)=>{
                        return createFragment(itemIndex, item.text, item);
                    })

                    return createFragment(index, children, typeObj, typeObj.type);
                })}

                <div className=' self-start flex flex-row flex-wrap w-full h-auto pb-5 mb-5 items-center justify-start border-b-[1px] border-white/[0.3]'>

                    {post.categories.map((category:any)=>(

                        <Link href={`/tags/${category.slug}`} key={category.slug}>
                            <span className="relative cursor-pointer absolute px-4 py-2 mr-2 border-[1.5px] dark:border-0 border-border-light dark:border-border-dark dark:bg-element-dark text-copy-light dark:text-copy-dark/[0.8] rounded-lg text-sm">
                                {`#${category.name}`}
                            </span>
                        </Link>
                    ))}

                </div>

            </div>

        </div>
    );
}

export default PostDetail;