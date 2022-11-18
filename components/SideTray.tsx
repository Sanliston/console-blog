import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {GrHomeRounded } from "react-icons/gr";
import {RiHomeLine, RiSearch2Line, RiHashtag, RiFunctionLine, RiMoreLine, RiShareLine, RiSwordLine, RiDiscussLine, RiSlideshowLine} from 'react-icons/ri';

interface SideTrayProps {
    options: string
}

interface Option {

    icon: JSX.Element
}

const SideTray = ({options = 'homeOptions'}:SideTrayProps):JSX.Element => {

    const [trayItems, setTrayItems] = useState<any>([]);
    const [pathname, setPathName] = useState('');
    const [animation, setAnimation] = useState('');
    const router = useRouter(); 

    const iconClass = 'text-[23px]';

    const homeOptions = [
        {
            icon: <RiHomeLine className={iconClass} />
        },
        {
            icon: <RiSearch2Line className={iconClass} />
        },
        {
            icon: <RiHashtag className={iconClass} />
        },
        {
            icon: <RiFunctionLine className={iconClass} />
        },
        {
            icon: <RiMoreLine className={iconClass} />
        }
    ]

    const articleOptions = [
        {
            icon: <RiHomeLine className={iconClass} />
        },
        {
            icon: <RiSearch2Line className={iconClass} />
        },
        {
            icon: <RiShareLine className={iconClass} />
        },
        {
            icon: <RiDiscussLine className={iconClass} />
        },
        {
            icon: <RiSwordLine className={iconClass} />
        },

        {
            icon: <RiMoreLine className={iconClass} />
        }
    ];

    const updateTrayItems = () => {
        let selected = homeOptions;

        switch(options) {

            case 'homeOptions':
                selected = homeOptions;
                break; 
            
            case 'articleOptions':
                selected = articleOptions; 
                break;

            default:
                selected = homeOptions; 
                
        }

        setTrayItems(selected);
    }

    useEffect(()=>{

        updateTrayItems();

    }, []);

    useEffect(()=>{

        if(router.asPath !== pathname){
            setPathName(router.asPath);

            //execute animation as there's been a change of article
             restartAnimation();
        }

    }, [router.asPath]);

    const restartAnimation = () => {
        //Doesn't work as React18's batch state updates are ruining the party yet again
        setAnimation('');

        setAnimation('menu-item-show');
    }

    return(
        <div className='sticky h-[100vh] flex flex-col items-end justify-center'>

            <div className='border-r-[2px] border-copy-light/[0.8] dark:border-copy-dark/[0.5]  h-auto w-[70px] mr-[40px] pr-[40px] py-[50px] flex flex-col items-center justify-center'>

                {trayItems.map((item: any, index:number)=>(
                    <div 
                        key={'sideTray'+index}
                        className={animation + ' rounded-full cursor-pointer custom-animated-delay transition duration-200 flex items-center justify-center my-4 max-h-[70px] max-w-[70px] p-4 hover:bg-secondary-dark/[0.1] hover:text-secondary-dark hover:dark:text-copy-dark text-copy-light/[1] dark:text-copy-dark/[0.5] stroke-copy-light/[0.8] dark:stroke-copy-dark/[0.5] '} 
                        style={{
                            opacity: 0, //so animations don't flicker between change of state
                            '--custom-delay': index*200+'ms '
                        } as React.CSSProperties}
                    >
                        {item.icon}
                    </div>
                ))}

            </div>

        </div>
    );
}

export default SideTray;