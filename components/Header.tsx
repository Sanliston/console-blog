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

interface HeaderProps {

}

const Header = ({}:HeaderProps) : JSX.Element => {

    const { categories } = useContext(StateContext);
    const {scrollX, scrollY} = useWindowScrollPositions(); 
    const {windowHeight, windowWidth } = useWindowDimensions(); 
    const [menu, setMenu] = useState(false);
    
    const toggleMenu = () => {

        console.log('menu toggled');
        setMenu(!menu);
    }
    return (
        <div className="container  fixed top-[0px] t-0 z-10 mb-8 w-full " style={{minWidth: '100vw'}}>
            
            <div className={
                "transition-all duration-700 w-full px-[10vw] h-[80px] box-border xl:px-[20vw] grid grid-cols-1 lg:grid-cols-5 gap-1 " 
                + ( scrollY > 30 ? ' backdrop-blur-md bg-[#282e34]/[0.6]' : '')
                }>

                <div className="fixed top-[20px] left-[30px] md:left-[60px] z-[50] text-white"
                >
                    <Burger3 click={toggleMenu}/>
                </div>

                <div className={
                    "fixed h-[100vh] w-0 overflow-hidden bouncy-animation pt-[60px] max-w-[500px] top-0 left-0 transition-all duration-500 shadow-lg z-[40] bg-black/[0.9] "
                    +(menu ? ' w-[100vw] pl-10 left-0' : ' left-[-20px]')
                    
                    }
                    // onClick={()=>toggleMenu()}
                    >

                        <MenuWidget />

                </div>

                <div className="lg:col-span-3 lg:col-start-1 col-span-1 flex items-center justify-start">

                    <Link href="/">

                        <div className={"transition-all duration-500 absolute absolute flex flex-row items-end justify-start cursor-pointer font-bold text-2xl text-white top-5  " 
                                    
                                    }>
                            <BsCloudMoonFill className={" transition-all duration-500 text-4xl mb-3 text-white "}/>

                            <span className="ml-5 text-white font-labelle">
                            {`Console.blog()`}
                            </span>
                            
                        </div>
                    </Link>

                </div>

                <div className={
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

                </div>
            </div>

        </div>
    );
}

export default Header; 