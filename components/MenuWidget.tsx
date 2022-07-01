import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getRecentPosts, getSimilarPosts } from '../services';
import {FaHome, FaColumns, FaRobot, FaFeather, FaQuestionCircle} from "react-icons/fa";


const MenuWidget = (): JSX.Element=> {

    const menuItems = [
        {
            name: "Home",
            path: "/",
            icon: <FaHome />
        },
        {
            name: "Tags",
            path: "/tags",
            icon: <FaColumns />
        },
        {
            name: "About",
            path: "/about",
            icon: <FaRobot />
        },
        {
            name: "Contact",
            path: "/contact",
            icon: <FaFeather />
        },
        {
            name: "FAQs",
            path: "/faqs",
            icon: <FaQuestionCircle />
        }
    ];

  return (
    <div className='rounded-lg p-8 mb-8'>

      <h3 className='text-xl mb-8 border-b pb-4 text-white'>
        {/* {'Menu'} */}
      </h3>
      
      {menuItems.map((item: any)=>(

        <Link className='text-md text-white' key={item.name} href={`${item.path}`}>

            <div className='flex flex-grow flex-row mb-2 cursor-pointer transition duration-300 hover:bg-black/[0.2] py-3 px-4 rounded-full' key={item.name}> 

                    <div className='text-2xl text-white'>
                        {item.icon}
                    </div>
                    

                    <span className='text-white ml-3'>
                        {item.name}
                    </span>
                
            </div> 
        </Link>       
      ))}

      
    </div>
  )
}

export default MenuWidget;
