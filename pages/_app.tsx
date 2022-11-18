import '../styles/globals.scss';
import React, {useEffect, useState} from 'react'; 
import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import { Layout } from '../components';
import {getCategories } from '../services';
import { Category } from '../components/Categories';
import { getWithExpiry, HOUR_MS, setWithExpiry } from '../utils/utils';
import Script from 'next/script'; 
interface AppState {
  categories: [] | never[]
  menu: boolean
  [key:string]: any
}

const initialState: AppState = {
  categories: [],
  menu: false,
  darkMode: true, 
}; //don't pass anonymous objects into context

export const StateContext = React.createContext(initialState);

function MyApp({ Component, pageProps }: AppProps) {

  const [appState, setAppState ] = useState<AppState>(initialState);

  //getCategories
  useEffect(()=>{

    let localCategories = getWithExpiry('categories');

    if(localCategories){
      setAppState({
          ...appState, 
          categories: JSON.parse(localCategories),
          setAppState: setAppState
        }
      );

      return;
    }


    getCategories().then((result) => {
      
      setAppState({
          ...appState, 
          categories: result,
          setAppState: setAppState
        }
      );

      setWithExpiry('categories', JSON.stringify(result), HOUR_MS);
    
    });

  }, []);


  return (
    <>
      <StateContext.Provider value={appState}> 
          <Script id="cookieyes" src='https://cdn-cookieyes.com/client_data/56b1f6e0127bd168b8b98c1d/script.js'/>
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </StateContext.Provider>
    </>
  )
}

export default MyApp
