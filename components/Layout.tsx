import React, { ReactNode, useContext } from 'react';
import { StateContext } from '../pages/_app';
import {Header } from './';

export type LayoutProps = React.PropsWithChildren<{

}>;

const Layout: React.FunctionComponent<LayoutProps> = ({ children }: LayoutProps): JSX.Element => {

    const {darkMode} = useContext(StateContext);

    return (
        <div className={darkMode ? 'dark': ' w-full min-h-[100vh] text-copy-light dark:text-copy-dark bg-element-light dark:bg-background-dark'}>

            <Header />

            {children}

        </div>
    );
}

export default Layout; 