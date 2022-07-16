import React, {useContext, useState, useEffect} from "react";
import Link from 'next/link';
import Categories, { Category } from "./Categories";
import { getCategories } from "../services";
import { StateContext } from "../pages/_app";
import { BsCloudMoonFill } from "react-icons/bs";
import { useWindowScrollPositions } from "../hooks/useWindowScrollPositions";
import useWindowDimensions from "../hooks/useWindowDimensions";
import MenuWidget from "./MenuWidget";
import {Burger3} from "./Icons"; 
import useScrollDirection from "../hooks/useScrollDirection";
import { useRouter } from "next/router";

interface HeaderProps {

}

const Header = ({}:HeaderProps) : JSX.Element => {

    const { categories, menu } = useContext(StateContext);
    const {scrollX, scrollY} = useWindowScrollPositions(); 
    const {windowHeight, windowWidth } = useWindowDimensions(); 
    const scrollDirection = useScrollDirection(); 
    const router = useRouter(); 
    
    return (
        <div className="container  fixed top-[0px] t-0 z-[15] mb-8 w-full " style={{minWidth: '100vw'}}>

            <div className={
                "fixed h-[100vh] overflow-hidden bouncy-animation pt-[60px] max-w-[500px] top-0 left-0 transition-all duration-500 shadow-lg z-[40] bg-background-light dark:bg-background-dark/[0.9] border-r-[10px] border-white/[0.7]"
                +(menu ? ' w-[100vw] pl-10 left-0 ' : ' w-0 left-[-20px]')
                
                }
                // onClick={()=>toggleMenu()}
                >

                    <MenuWidget />

            </div>

            <div className={"fixed transition-all duration-200 left-[30px] md:left-[60px] z-[50] text-white overflow-hidden"
                        +(scrollY < windowHeight && scrollY > 20 ? ' top-[15px]': ' top-[15px]')
                        + (scrollDirection === 'up' || scrollY < windowHeight*0.7 || menu ?  ' h-[80px]' : '  h-[0px] md:h-[80px]')
                        + (menu? ' text-copy-light dark:text-copy-dark ': '')
                    }
                >
                    <Burger3 />
            </div>
            
            <div className={
                "transition-all duration-200 w-full px-[10vw] box-border xl:px-[20vw] grid grid-cols-1 lg:grid-cols-5 gap-1 overflow-hidden whitespace-nowrap" 
                + (scrollDirection === 'up' || scrollY < windowHeight ?  ' h-[80px]' : ' h-[0px] md:h-[80px] ')
                + (scrollY > windowHeight*0.9 ? ' landing-gradient shadow-lg': (router.pathname == '/' ? ' bg-transparent' : ' landing-gradient shadow-lg' ))
                }>

                

                <div className={
                    "lg:col-span-5 col-span-1 flex items-center justify-center "
                    + (scrollY > windowHeight ? ' block': (router.pathname == '/' ?' md:flex hidden' : ' flex' ))
                    }>

                    <Link href="/">

                        <div className={"transition-all duration-500 flex flex-row items-end justify-start cursor-pointer font-bold text-2xl text-white top-5  " 
                                        
                                    }>
                            <BsCloudMoonFill className={" transition-all duration-500 text-4xl mb-3 text-white "}/>

                            <span className="ml-5 text-white font-labelle">
                            {`Console.blog()`}
                            </span>
                            
                        </div>
                    </Link>

                </div>

                {/* <div className={
                    " absolute right-[10vw] transition-all duration-500 hidden md:flex md:flex-row justify-center items-center top-5  rounded-full w-[200px]"
                    
                    + ( scrollY > 30 ? ' px-10 py-4 opacity-1' : '')
                    }>

                    {categories.map((category: Category, index) => ( 
                        <Link key={category.slug} href={`/category/${category.slug}`} >
                            <span className="align-middle text-white font-light ml-4 font-semibold cursor-pointer">
                                {category.name}
                            </span>
                        </Link> 
                    ))}

                </div> */}
            </div>

        </div>
    );
}

export default Header; 