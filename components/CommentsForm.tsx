import React, {useState, useEffect, useRef} from 'react';
import { submitComment } from '../services'; 

interface CommentsFormProps {
    slug: string
}

const CommentsForm = ( {slug} : CommentsFormProps ) : JSX.Element => {

    const [error, setError ] = useState(false);
    const [localStorage, setLocalStorage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    //declaring refs so we can access them later instead of storing the values in state
    const commentEl = useRef<HTMLTextAreaElement>(null);
    const nameEl = useRef<HTMLInputElement | any>(null);
    const emailEl = useRef<HTMLInputElement | any>(null);
    const storageDataEl = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        nameEl!.current!.value = window.localStorage.getItem('name');
        emailEl!.current!.value = window.localStorage.getItem('email');
    }, []);

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        setError(false);

        if(!emailEl!.current!.value || !nameEl!.current!.value || !commentEl!.current!.value){
            setError(true);
            return; 
        }

        const commentObj = {
            name: nameEl!.current!.value, 
            email: emailEl!.current!.value, 
            comment: commentEl!.current!.value,
            slug
        }

        if(storageDataEl!.current!.checked) {
            window.localStorage.setItem('name', nameEl!.current!.value);
            window.localStorage.setItem('email', emailEl!.current!.value);
        }else{
            window.localStorage.removeItem('name');
            window.localStorage.removeItem('email');
        }

        submitComment(commentObj).then((res) => {
            setShowSuccessMessage(true);

            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 5000);
        });

    }

    return (
        <div className='bg-[#4A5A6A]/[0.3] text-white md:rounded-lg p-8 pb-12 mb-8'>

            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
                Comment
            </h3>

            <div className='flex flex-col lg:flex-row justify-between'>
                <div className='grid grid-cols-1 gap-4 mb-4'>

                    <input 
                        type='text'
                        className='p-4 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
                        ref={nameEl}
                        placeholder='Your name'
                        name='name'
                    />
                </div>

                <div className='grid lg:ml-20 grid-cols-1 gap-4 mb-4'>

                    <input 
                        type='text'
                        className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
                        ref={emailEl}
                        placeholder='Your email'
                        name='email'
                    />

                </div>
            </div>

            <div className='grid grid-cols-1 gap-4 mb-4'>

                <textarea 
                    ref={commentEl} 
                    className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
                    placeholder='Your Comment'
                    name='comment'
                >

                </textarea>

            </div>

            <div className='grid grid-cols-1 gap-4 mb-4'>
                <div>
                    <input 
                        ref={storageDataEl} 
                        type='checkbox'
                        id='storeData'
                        name='storeData'
                        value='true'
                    />

                    <label className='text-gray-500 cursor-pointer ml-2' htmlFor='storeData'>
                        Save my e-mail and name for the next time I comment
                    </label>
                </div>
            </div>

            {error && 
                <p className='text-xs text-red-500'> 
                    All fields are required
                </p>
            }

            <div className='mt-8'>

                <button 
                    type='button' 
                    onClick={handleSubmit}
                    className='transition duration-500 ease hover:bg-black/[0.7] inline-block bg-black/[0.4] text-lg rounded-full text-white px-8 py-3 cursor-pointer'
                >
                    Post Comment
                </button>

                {showSuccessMessage && 
                    <span className='text-xl float-right font-semibold mt-3 text-green-500'>
                        Comment submitted for review
                    </span>
                }

            </div>


        </div>
    );
}

export default CommentsForm;