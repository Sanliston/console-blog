import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getRecentPosts, getSimilarPosts } from '../services';
import PostWidget from './PostWidget';
import Categories from './Categories';
import CollectionsWidget from './CollectionsWidget';
import SearchWidget from './SearchWidget';

export type Post = {
  title?: string,
  
}
interface PostWidgetProps {
  categories?: [string],
  slug?: string
}

const RightBarWidget = ({categories, slug}: PostWidgetProps): JSX.Element=> {

    return (
        <div className='lg:rounded-lg m-0 mb-4 bg-background-light dark:bg-element-dark border-[1px] dark:border-0 border-border-light'>

            <SearchWidget />
            <CollectionsWidget nested={true} />
        
        </div>
    )
}

export default RightBarWidget;
