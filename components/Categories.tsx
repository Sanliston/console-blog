import React, {useState, useEffect, useContext} from 'react';
import Link from 'next/link';
import { getCategories } from '../services';
import { StateContext } from '../pages/_app';


export type Category = {
    name?: string,
    slug?: string
}
interface CategoriesProps {
    nested?:boolean
}

const Categories  = ({nested = false}: CategoriesProps): JSX.Element => {

    const { categories } = useContext(StateContext);

    return (
        <div className={'rounded-lg p-6 my-4 dark:m-0 mb-8 bg-background-light dark:bg-element-dark ' + (nested ? '' : 'border-[1px] dark:border-0 border-border-light')}>

            <h3 className='text-xl mb-8 border-b pb-4 text-copy-light dark:text-copy-dark'>
                Popular Tags
            </h3>

            {categories.map((category:Category) => (
                <div key={category.name} className='flex flex-row items-center w-full lg:py-2 py-1' > 


                    <Link className='txt-md' href={`/tags/${category.slug}`}>

                        <span className='relative cursor-pointer absolute px-4 py-2 mr-2 border-[1.5px] dark:border-0 border-border-light dark:border-border-dark dark:bg-background-dark text-copy-light dark:text-copy-dark/[0.8] rounded-lg text-sm'>
                            {`#${category.name}`}
                        </span>
                        
                    </Link>
                    

                </div>
            ))}
        
        </div>
    );
}

export default Categories; 