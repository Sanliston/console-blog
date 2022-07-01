import Link from 'next/link';
import React, {useState, useEffect, useRef} from 'react';
import * as ReactDOM from 'react-dom';
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";

const SlidingCollections = ():JSX.Element => {
    const [collections, setCollections] = useState<[] | any>([]);
    const [parentBackgroundImage, setParentBackgroundImage] = useState('https://media.graphassets.com/PE2C3O7SLAs15PHcLvpA');
    const parentRef = useRef<HTMLDivElement>(null);
    const innerContainerRef = useRef<HTMLDivElement>(null);

    let dummyCollections = [

        {
            backgroundImage: 'https://media.graphassets.com/PE2C3O7SLAs15PHcLvpA',
            title: 'Javascript',
            subtitle: 'test subtitle',
            description: 'This is a test description',
            slug: 'tsdsd1',
            focused: true
        },
        {
            backgroundImage: 'https://media.graphassets.com/dMhhYSlRxWqAwqcXuQGG',
            title: 'Typescript',
            subtitle: 'test subtitle',
            description: 'This is a test description',
            slug: 'sdsdsd',
            focused: false
        },
        {
            backgroundImage: 'https://media.graphassets.com/aKBvD1RGRUOQwXOARuv5',
            title: 'React',
            subtitle: 'test subtitle',
            description: 'This is a test description',
            slug: 'sdsdsdsdfdfd',
            focused: false
        },
        {
            backgroundImage: 'https://media.graphassets.com/aKBvD1RGRUOQwXOARuv5',
            title: 'NodeJS',
            subtitle: 'test subtitle',
            description: 'This is a test description',
            slug: 'tesasasdst4',
            focused: false
        }
    ];

    useEffect(()=>{

        setCollections(dummyCollections.map((collection: any, index:number)=>{

            collection.cleanup = false; 
            return collection; 
        }));
        
    }, []);


    const focusCollection = (targetIndex:number) => {

        //grab the target background image
        var backgroundImage = collections[targetIndex].backgroundImage; 
        let buriedCollections: []| any = [];
        let updatedCollections = collections.map((collection:any, index:number)=>{

            //flag old focused for cleanup
            if(collection.focused){
                collection.cleanup = true; 
            }

            //remove all previous focused collections
            collection.focused = false; 

            if(index == targetIndex){

                collection.focused = true; 

            }

            //put collections index < target index in buried collections

            if(index < targetIndex){
                buriedCollections.push(collection)
            }

            return collection; 
        });

        ReactDOM.flushSync(()=>{
            setCollections(updatedCollections);
        });


        //move targetIndex to start of list
        let newCollections = [
            ...collections.filter((c:any, index:number)=>index == targetIndex), 

            //add non buried collections
            ...collections.filter((c:any, index:number)=>index > targetIndex),

            //add the buried collection to end of list
            ...buriedCollections

        ]

        console.log('new collections: ', newCollections);

        setTimeout(()=>{
            ReactDOM.flushSync(()=>{
                setCollections(newCollections.map((collection:any, index:number)=>{

                    //remove cleanup flag
                    if(collection.cleanup){
                        collection.cleanup = false; 
                    }
    
                    return collection; 
                }));
            });
        }, 700);
        
        setTimeout(()=>{

            //set the background image of the parent to match the current focus
            ReactDOM.flushSync(()=>{
                setParentBackgroundImage(backgroundImage);

                /*Why am I doing this?
                    So that when the next focus happens, the current focus'
                    image will be the background, however it will be the parent div background
                    and not the actual element. Creating the illusion of an infinte rotating parent
                    child list. 
                */
            });
            
        }, 1500);



        

        
    }

    //experiment with setting this to fixed when you get the chance
    const focusedStyle = 'absolute focused-animation-transition featured-collection-widget w-full h-full duration-10';
    const unfocusedStyle = 'absolute animation-transition featured-collection-widget rounded-lg 2xl:w-[250px] 2xl:h-[400px]  xl:w-[200px] xl:h-[300px] lg:w-[150px] lg:h-[250px] flex flex-col items-sart justify-end';
    const cleanupStyle = 'duration-0 opacity-0';


    const getLayout = (params:any) => {

        return collections.map((collection:any, index:number)=>{

            let marginBottom = params.marginBottom; //150; 
            let marginLeft = params.marginLeft; //10; 
            let offset = params.offset

            return (

                <div
                    key={collection.slug}
                    className={
                            ' bg-cover overflow-hidden '
                            + (collection.focused ? 
                                focusedStyle : 
                                collection.cleanup ? '' : unfocusedStyle)
                            + (collection.cleanup ? cleanupStyle : '') 
                            + (collection.focused ? '' :' custom-animation-delay : '+index*300+50+'ms ' )}
                            
                    style={{
                        backgroundImage: `url('${collection.backgroundImage}')`,
                        left: collection.focused ? 
                            '0px' : 
                            (parentRef!.current!.clientWidth - offset + index*(270+marginLeft)) + 'px',
                        bottom: collection.focused ? '0px' : marginBottom+10+'px',
                        opacity: collection.focused ? 1 : 0,
                        '--custom-delay': index*200+50+'ms '
                    } as React.CSSProperties}

                    onClick={()=>focusCollection(index)}
                >

                    <div
                        
                        className={(collection.focused ? ' overflow-hidden max-h-full max-w-full h-full w-full p-[60px] xl:p-[80px] 2xl:p-[150px] ': 'max-h-[0px] max-w-full') + ' focused-info bg-gradient-to-b from-black/[0.6] to-transparent'}
                            
                        style={{
                            //for animating disappearing when focused
                            

                            opacity: collection.focused ? 1 : 0,
                        } as React.CSSProperties}
                    >

                        { collection.focused && 
                        
                            <div

                                className={
                                    ' flex flex-col h-full w-full items-start justify-center'
                                    + (collection.focused ? ' collection-background-info-show ': '')
                                }

                                >

                                <div
                                    className={'text-white text-[60px] lg:text-[80px] xl:text-[100px] 2xl:text-[140px] font-bold font-staatliches'+ (collection.focused ? ' collection-background-info-show ': '')}

                                    style={{
                                        //for animating disappearing when focused
    
                                        opacity: collection.focused ? 0 : 1,
                                    } as React.CSSProperties}
                                    >

                                    {collection.title}

                                </div>

                                <div
                                    className='w-[100px] h-[1px] bg-white my-5'
                                >

                                </div>

                                <div
                                    className={'text-white text-md font-light delay-400 mb-5 '+ (collection.focused ? ' collection-background-info-show ': '')}

                                    style={{
                                        //for animating disappearing when focused
    
                                        opacity: collection.focused ? 0 : 1,
                                    } as React.CSSProperties}
                                >

                                    {collection.subtitle}

                                </div>

                                <div
                                    className={'text-white text-sm lg:text-md xl:text-md font-light delay-800 mb-5'+ (collection.focused ? ' collection-background-info-show ': '')}

                                    style={{
                                        //for animating disappearing when focused
    
                                        opacity: collection.focused ? 0 : 1,
                                    } as React.CSSProperties}
                                >

                                    {collection.description}

                                </div>


                                <Link href={`/collections/${collection.slug}`}>
                                    <div className='button border-2 rounded-full cursor-pointer px-5 py-3 bg-transparent text-white text-xs xl:text-xs 2xl:text-sm'>
                                        <span>
                                            Discover Collection
                                        </span>
                                    </div>
                                </Link>
                            </div>  
                        }
                        
                        
                        

                    </div>

                    <div 
                        className={
                            'cursor-pointer flex flex-col h-full w-full items-start justify-start bg-gradient-to-b from-transparent to-black/[0.6] p-5 2xl:p-10'
                            + (collection.focused ? ' collection-card-info-hide ': '')
                        }
                        style={{
                            //for animating disappearing when focused

                            opacity: collection.focused ? 0 : 1,
                        } as React.CSSProperties}
                        > 
                        <div className='text-white text-xs lg:text-xs xl:text-md font-light 2xl:pt-[250px] xl:pt-[200px] lg:pt-[130px] pt-[50px]'> 
                            {collection.subtitle}
                        </div>

                        <div className='font-staatliches font-light text-white text-xl xl:text-2xl 2xl:text-4xl font-bold'> 
                            {collection.title}
                        </div> 
                    </div>
                    

                    

                </div>

            );
            
        });
    }

    return (
        <div 
            className='relative overflow-x-hidden overflow-y-visible bg-cover min-h-[100vh] min-w-[100vw] bg-white flex flex-row items-end justify-end after:bg-gradient-to-b from-black/[0.4] to-transparent after:w-full after:block after:min-h-full after:content-[""]'
            style={{
                backgroundImage: `url('${parentBackgroundImage}')`
            }}
            ref={parentRef}
            >


            <div 
                className='hidden transition-all lg:flex xl:hidden 2xl:hidden flex-row overflow-hidden'
                ref={innerContainerRef}
                >
                {getLayout({
                    marginLeft: -90,
                    marginBottom: 70,
                    offset: 700
                })}
            </div>

            <div 
                className='hidden transition-all xl:flex 2xl:hidden flex-row overflow-hidden'
                ref={innerContainerRef}
                >
                {getLayout({
                    marginLeft: -50,
                    marginBottom: 120,
                    offset: 900
                })}
            </div>

            <div 
                className='hidden transition-all xl:hidden 2xl:flex flex-row overflow-hidden'
                ref={innerContainerRef}
                >
                {getLayout({
                    marginLeft: 10,
                    marginBottom: 130,
                    offset: 1100
                })}
            </div>

            <div
                    className=' text-white nav-buttons absolute flex flex-row space-x-[60px] w-[300px] right-[20vw] bottom-[70px] text-xs xl:text-xs 2xl:text-sm'
                >

                    <div
                        className='transition-all duration-300 button px-5 py-2 border-2 xl:border-[3px] rounded-full cursor-pointer flex flex-row hover:bg-white hover:text-black/[0.5] hover:border-3'
                        onClick={()=>focusCollection(collections.length - 1)}
                    >
                        <TiArrowLeftThick />
                        
                        
                    </div>

                    <div
                        className='transition-all duration-300 button px-5 py-2 border-2 xl:border-[3px] rounded-full cursor-pointer flex flex-row hover:bg-white hover:text-black/[0.5] hover:border-3'
                        onClick={()=>focusCollection(1)}
                    >
                        
                        <TiArrowRightThick />
                    </div>

            </div>
            

        </div>
    );

}

export default SlidingCollections; 