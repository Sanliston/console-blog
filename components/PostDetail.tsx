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
        <div className='dark:bg-element-dark/[0.3] md:rounded-lg lg:p-0 pb-12 mb-8 mt-[150px] text-white/[0.8]'>

            <div className='relative overflow-hidden shadow-d shadow-lg'>

                <img 
                
                    src={post.featuredImage.url}
                    alt={post.title}
                    className='object-top h-full w-full md:rounded-t-lg'
                />
            </div>

            <div className='flex flex-col items:center p-4 lg:p-8'>

                <div className=' self-center flex flex-row flex-wrap w-[80%] h-auto pb-5 mb-5 items-center justify-center border-b-[1px] border-white/[0.3]'>

                    {post.categories.map((category:any)=>(

                        <Link href={`/tags/${category.slug}`} key={category.slug}>
                            <span className="relative cursor-pointer absolute px-3 py-1 mx-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full text-sm">
                                {`#${category.name}`}
                            </span>
                        </Link>
                    ))}

                </div>

                <div className='flex items-center mb-8 w-full'>

                    <div className='flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8'>

                        <img 
                            alt={post.author.name}
                            height="30px"
                            width="30px"
                            className='align-middle rounded-full'
                            src={post.author.photo.url}
                        />

                        <p className='inline align-middle text-white/[0.6] ml-3 text-lg'>
                            {post.author.name}
                        </p>

                    </div>

                    <div className='font-medium text-white/[0.6] flex flex-row align-center justify-center m-5'>
                        <FiCalendar className='mt-[3px] mr-3' />
                        <span className=''>
                            {moment(post.createdAt).format('MMM DD, YYYY')}
                        </span>
                    </div>

                </div>

                <h1 className='mb-8 text-3xl font-bold text-white'> {post.title}</h1>

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