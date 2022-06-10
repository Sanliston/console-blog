import React, {useContext} from "react";
import Link from 'next/link';
import Categories from "./Categories";


const categories : Array<{name: string, slug: string}> = [
    {
        name: 'React',
        slug: 'react'
    },
    {
        name: 'Webdev',
        slug: 'webdev'
    },
    {
        name: 'Dummy',
        slug: 'dummy'
    }
];

interface HeaderProps {

}

const Header = ({}:HeaderProps) : JSX.Element => {

    return (
        <div className="container mx-auto px-10 mb-8">
            
            <div className="border-b w-full inline-block border-blue-400 py-8">

                <div className="md:float-left block">

                    <Link href="/">

                        <span className="cursoe-pointer font-bold text-4xl text-white">
                            Console.blog
                        </span>
                    </Link>

                </div>

                <div className="hidden md:float-left md:contents">

                    {categories.map((category, index) => ( 
                        <Link key={category.slug} href={`/category/${category.slug}`} >
                            <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold curoser-pointer">
                                {category.name}
                            </span>
                        </Link> 
                    ))}

                </div>
            </div>
        </div>
    );
}

export default Header; 