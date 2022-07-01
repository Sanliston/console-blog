import '../styles/globals.scss';
import React, {useEffect, useState} from 'react'; 
import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import { Layout } from '../components';
import {getCategories } from '../services';
import { Category } from '../components/Categories';
interface AppState {
  categories: [Category];
  [key:string]: any
}

const initialState = {
  categories: [],
}; //don't pass anonymous objects into context

export const StateContext = React.createContext(initialState);

function MyApp({ Component, pageProps }: AppProps) {

  const [appState, setAppState ] = useState(initialState);

  //getCategories
  useEffect(()=>{
    getCategories().then((result) => {
      
      setAppState({...appState, categories: result});
    
    });
  }, []);


  return (
    <StateContext.Provider value={appState}> 
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </StateContext.Provider>
  )
}

export default MyApp
