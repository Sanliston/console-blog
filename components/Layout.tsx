import React, { ReactNode } from 'react';
import {Header } from './';

export type LayoutProps = React.PropsWithChildren<{

}>;

const Layout: React.FunctionComponent<LayoutProps> = ({ children }: LayoutProps): JSX.Element => {

    return (
        <>

            <Header />

            {children}

        </>
    );
}

export default Layout; 