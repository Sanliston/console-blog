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
        <div className='bg-background-light dark:bg-element-dark/[0.3] text-copy-light dark:text-copy-dark  md:rounded-lg p-8 pb-12 lg:mb-8'>

            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
                Comment
            </h3>

            <div className='flex flex-col lg:flex-row justify-between'>
                <div className='grid grid-cols-1 gap-4 mb-4'>

                    <input 
                        type='text'
                        className='p-4 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-sky-400 bg-gray-100 text-gray-700 dark:bg-element-dark'
                        ref={nameEl}
                        placeholder='Your name'
                        name='name'
                    />
                </div>

                <div className='grid lg:ml-20 grid-cols-1 gap-4 mb-4'>

                    <input 
                        type='text'
                        className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-sky-400 bg-gray-100 text-gray-700 dark:bg-element-dark'
                        ref={emailEl}
                        placeholder='Your email'
                        name='email'
                    />

                </div>
            </div>

            <div className='grid grid-cols-1 gap-4 mb-4'>

                <textarea 
                    ref={commentEl} 
                    className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-sky-400 bg-gray-100 text-gray-700 dark:bg-element-dark'
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

            <div className='mt-8 flex flex-col md:flex-row items-center'>

                <button 
                    type='button' 
                    onClick={handleSubmit}
                    className='transition duration-500 ease hover:bg-black/[0.7] inline-block bg-button-color text-lg rounded-lg text-white px-8 py-3 cursor-pointer mr-5 mb-5 md:mb-0'
                >
                    Post Comment
                </button>

                {showSuccessMessage && 

                        <div className='flex flex-row items-center'>
                            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                            </svg>

                            <div className='text-[#7ac142] font-bold text-md ml-2 menu-item-show'>
                                Submitted for review!
                            </div>
                        </div>
                    
                }

            </div>


        </div>
    );
}

export default CommentsForm;