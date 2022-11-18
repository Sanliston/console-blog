import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getCollections, getRecentPosts, getSimilarPosts } from '../services';
import {FaHome, FaColumns, FaRobot, FaFeather, FaQuestionCircle} from "react-icons/fa";
import { getWithExpiry, HOUR_MS, setWithExpiry } from '../utils/utils';

interface CollectionsWidgetProps {
  nested?:boolean
}

const CollectionsWidget = ({nested=false}: CollectionsWidgetProps): JSX.Element=> {

    const [collections, setCollections] = useState([]);

    useEffect(()=>{

        let localCollections = getWithExpiry('collections');
        if(localCollections){
          setCollections(JSON.parse(localCollections));

          return;
        }

        getCollections(10).then((results)=>{
            setCollections(results);

            setWithExpiry('collections', JSON.stringify(results), HOUR_MS);
        });
    }, []); //forgot the [] and it cost me 300,000 API calls - while developing for an hour!

  return (
    <div className={'lg:rounded-lg p-6 my-4 mb-8 text-copy-light dark:text-copy-dark bg-background-light dark:bg-element-dark '+ (nested ? '' : ' my-4 mb-8 border-[1px] dark:border-0 border-border-light')}>

      <h3 className='text-xl mb-8 border-b border-border-light dark:border-copy-dark pb-4 pl-3'>
        {'Article Collections'}
      </h3>
      
      {collections.map((item: any)=>(

        <Link className='text-md text-copy-light dark:text-copy-dark' key={item.title} href={`/collections/${item.slug}`}>

            <div className='flex flex-grow flex-row cursor-pointer transition duration-300 hover:bg-black/[0.2] py-3 pl-3 rounded-full' key={item.name}> 
                    

                    <span className=''>
                        {item.title}
                    </span>
                
            </div> 
        </Link>       
      ))}

      
    </div>
  )
}

export default CollectionsWidget;
