import React, {useContext, useState, useEffect} from "react";
import Link from 'next/link';
import Categories, { Category } from "./Categories";
import { getCategories } from "../services";
import { StateContext } from "../pages/_app";

interface HeaderProps {

}

const Header = ({}:HeaderProps) : JSX.Element => {

    const { categories } = useContext(StateContext);
    console.log("Header Categories: ", categories);

    return (
        <div className="container mx-auto px-10 mb-8">
            
            <div className="border-b w-full inline-block border-blue-400 py-8">

                <div className="md:float-left block">

                    <Link href="/">

                        <span className="cursoe-pointer font-bold text-4xl text-white">
                            {`Console.blog()`}
                        </span>
                    </Link>

                </div>

                <div className="hidden md:float-left md:contents">

                    {categories.map((category: Category, index) => ( 
                        <Link key={category.slug} href={`/category/${category.slug}`} >
                            <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
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