import React, {useContext, useState, useEffect} from "react";
import Link from 'next/link';
import Categories, { Category } from "./Categories";
import { getCategories } from "../services";
import { StateContext } from "../pages/_app";
import { BsCloudMoonFill } from "react-icons/bs";

interface HeaderProps {

}

const Header = ({}:HeaderProps) : JSX.Element => {

    const { categories } = useContext(StateContext);

    return (
        <div className="container  fixed top-[0px] t-0 z-10 mb-8 w-full " style={{minWidth: '100vw'}}>
            
            <div className=" w-full px-[10vw] h-[80px] py-6 box-border xl:px-[20vw] grid grid-cols-1 lg:grid-cols-5 gap-1 py-8" >

                <div className="lg:col-span-3 lg:col-start-1 col-span-1 ">

                    <Link href="/">

                        <div className="flex flex-row items-end justify-start cursor-pointer font-bold text-2xl text-white">
                            <BsCloudMoonFill className="text-4xl mb-3 text-white"/>

                            <span className="ml-5 text-white font-labelle">
                            {`Console.blog()`}
                            </span>
                            
                        </div>
                    </Link>

                </div>

                <div className="hidden md:col-span-2 md:col-start-4 md:flex md:flex-row md:align-end md:justify-end">

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