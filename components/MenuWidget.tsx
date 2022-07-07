import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getRecentPosts, getSimilarPosts } from '../services';
import {FaHome, FaColumns, FaRobot, FaFeather, FaQuestionCircle, FaLayerGroup } from "react-icons/fa";
import { StateContext } from '../pages/_app';


const MenuWidget = (): JSX.Element=> {

    const appState = useContext(StateContext);
    const [visibleItems, setVisibleItems] = useState([]);

    const handleClick = () => {

      appState.setAppState({
        ...appState,
        menu: !appState.menu
      });
    }

    useEffect(()=>{

      if(appState.menu){

        updateVisibleItems(menuItems as []);
      }else {
        updateVisibleItems([]);
      }

    }, [appState.menu]);

    var menuItems = [
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
          name: "Collections",
          path: "/collections",
          icon: <FaLayerGroup />
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

    const updateVisibleItems = (items: []) => {

        setVisibleItems( [
          ...items
        ]);

      
    }

  return (
    
    <div className='rounded-lg p-8 mb-8'>

      <h3 className='text-xl mb-8 border-b pb-4 text-white'>
        {'Menu'}
      </h3>
      
      {menuItems.map((item: any, index: number)=>(

        
          <Link className='text-md text-white' key={item.name} href={`${item.path}`}>
            <div 
              className={'custom-animated-delay transition-all flex flex-grow flex-row mb-2 cursor-pointer duration-300 hover:bg-black/[0.2] py-3 px-4 rounded-full' + (appState.menu ? ' menu-item-show': ' menu-item-hide')}
              style={{
                opacity: appState.menu ? 0 : 1, //so animations don't flicker between change of state
                '--custom-delay': index*50+'ms '
              } as React.CSSProperties}
              key={item.name} onClick={handleClick}
              
              > 

              
  
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
