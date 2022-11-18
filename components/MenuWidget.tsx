import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getRecentPosts, getSimilarPosts } from '../services';
import {FaHome, FaColumns, FaRobot, FaFeather, FaQuestionCircle, FaLayerGroup } from "react-icons/fa";
import { StateContext } from '../pages/_app';

interface MenuWidgetProps {
  popUp?: boolean
}

const MenuWidget = ({popUp = true}: MenuWidgetProps): JSX.Element=> {

    const appState = useContext(StateContext);
    const [visibleItems, setVisibleItems] = useState([]);

    const handleClick = () => {

      if(!popUp){
        return; 
      }

      appState.setAppState({
        ...appState,
        menu: !appState.menu
      });
    }

    useEffect(()=>{

      if(!popUp){

        return; 

      }

      if(appState.menu){

        updateVisibleItems(menuItems as []);
      }else {
        updateVisibleItems([]);
      }

    }, [appState.menu]);


    useEffect(()=>{

      if(!popUp){
        updateVisibleItems(menuItems as []);
      }

    }, []); 

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

    const toggleDarkMode = () => {
      console.log('toggling darkMode: ', appState.darkMode);
      appState.setAppState({
        ...appState,
        darkMode: !appState.darkMode
      });
    }

  return (
    
    <div className='rounded-lg p-8 mb-8'>

      {
        popUp &&

        <h3 className='text-xl mb-8 border-b pb-4 text-copy-light dark:text-copy-dark'>
          {'Menu'}
        </h3>
      }
      
      
      {menuItems.map((item: any, index: number)=>(

        
          <Link className='text-md text-copy-light dark:text-copy-dark' key={item.name} href={`${item.path}`}>
            <div 
              className={'custom-animated-delay transition-all flex flex-grow flex-row mb-2 cursor-pointer duration-300 hover:bg-black/[0.2] py-3 px-4 rounded-full' + (appState.menu || !popUp ? ' menu-item-show': ' menu-item-hide')}
              style={{
                opacity: appState.menu || !popUp ? 0 : 1, //so animations don't flicker between change of state
                '--custom-delay': index*50+'ms '
              } as React.CSSProperties}
              key={item.name} onClick={handleClick}
              
              > 

              
  
                    <div className='text-2xl text-copy-light dark:text-copy-dark'>
                        {item.icon}
                    </div>
                    

                    <span className='text-copy-light dark:text-copy-dark ml-3'>
                        {item.name}
                    </span>
                
            </div> 
          </Link>     
      ))}

      <h3 className={'text-xl mb-8 border-b pb-4 text-copy-light dark:text-copy-dark'+ (appState.menu || !popUp ? ' menu-item-show': ' menu-item-hide')}
        style={{
          opacity: appState.menu || !popUp ? 0 : 1, //so animations don't flicker between change of state
          '--custom-delay': menuItems.length*50+50+'ms '
        } as React.CSSProperties}
        key={'darkModeTitle'}
      >
      </h3>

      <div 
        className={'custom-animated-delay transition-all flex flex-grow flex-row mb-2 duration-300 py-3 px-4 rounded-full' + (appState.menu || !popUp ? ' menu-item-show': ' menu-item-hide')}
        style={{
          opacity: appState.menu || !popUp ? 0 : 1, //so animations don't flicker between change of state
          '--custom-delay': menuItems.length*50+100+'ms '
        } as React.CSSProperties}
        key={'darkMode'}
        
        > 

        
        <label htmlFor='theme' className="theme cursor-pointer">
          <span className='text-copy-light dark:text-copy-dark'>Light</span>
          <span className="theme__toggle-wrap">
            <input id="theme" className="theme__toggle" type="checkbox" role="switch" name="theme" value="dark" defaultChecked={appState.darkMode} onChange={toggleDarkMode} />
            
            <span className="theme__icon">
              <span className="theme__icon-part"></span>
              <span className="theme__icon-part"></span>
              <span className="theme__icon-part"></span>
              <span className="theme__icon-part"></span>
              <span className="theme__icon-part"></span>
              <span className="theme__icon-part"></span>
              <span className="theme__icon-part"></span>
              <span className="theme__icon-part"></span>
              <span className="theme__icon-part"></span>
            </span>
          </span>
          <span className='text-copy-light dark:text-copy-dark'>Dark</span>
        </label>
          
          
      </div>

      
    </div>
  )
}

export default MenuWidget;
