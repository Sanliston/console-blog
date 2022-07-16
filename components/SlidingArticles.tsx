import Link from 'next/link';
import React, {useState, useEffect, useRef, useContext} from 'react';
import * as ReactDOM from 'react-dom';
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";
import { FiArrowDownCircle } from "react-icons/fi";
import { getCollections } from '../services';
import { truncate } from '../utils/utils';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { useWindowScrollPositions } from '../hooks/useWindowScrollPositions';
import { StateContext } from '../pages/_app';

interface SlidingArticlesProps  {
    posts: []
}

const SlidingArticles = ({posts}: SlidingArticlesProps):JSX.Element => {
    

    return (
        <div className='container '>

        </div>
    );
}

export default SlidingArticles; 