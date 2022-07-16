import React, {useState, useEffect, useContext} from 'react';
import Link from 'next/link';
import { getCategories } from '../services';
import { StateContext } from '../pages/_app';


export type Category = {
    name?: string,
    slug?: string
}
interface CategoriesProps {
    
}

const Categories  = (props: CategoriesProps): JSX.Element => {

    const { categories } = useContext(StateContext);

    return (
        <div className='rounded-lg p-6 m-4 dark:m-0  min-w-[300px] mb-8 bg-background-light dark:bg-background-dark border-[1px] dark:border-0 border-border-light'>

            <h3 className='text-xl mb-8 border-b pb-4 text-copy-light dark:text-copy-dark'>
                Popular Tags
            </h3>

            {categories.map((category:Category) => (
                <div key={category.name} className='flex flex-row items-center w-full lg:py-2 py-1' > 


                    <Link className='txt-md' href={`/tags/${category.slug}`}>

                        <span className='cursor-pointer px-3 py-1 mx-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full text-sm'>
                            {`#${category.name}`}
                        </span>
                        
                    </Link>
                    

                </div>
            ))}
        
        </div>
    );
}

export default Categories; 