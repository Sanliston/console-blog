import React from 'react'; 

interface FeaturedGridProps {
    posts: []
}

const FeaturedGrid = ({posts}:FeaturedGridProps):JSX.Element => {

    const featuredTags = [

        {
            title: 'JavaScript'
        }
    ]


    return (
        <div>

            <div
                className='text-[40px] py-10 font-staatliches text-copy-light dark:text-copy-dark w-full flex flex-col items-center'
            >
                <span>
                    Featured Tags
                </span>
            </div>

            <div className='flex flex-row flex-wrap items-center justify-center p-4 md:p-10'>

                {posts.map((post:any)=>(
                    <div key={post.slug} className='w-[250px] m-4 h-[250px] bg-center'
                        style={{
                            
                        }}
                    >

                        <div className='absolute no-repeat bg-cover bg-center bg-gradient-to-b from-black/[0.3] to-black/[0.7] w-[250px] h-[250px]'
                            style={{
                                backgroundImage: `url(${post.featuredImage.url})`
                            }}
                        >

                        </div>

                        <div className='absolute no-repeat bg-cover bg-center bg-gradient-to-b from-black/[0.3] to-black/[0.7] w-[250px] h-[250px]'>

                        </div>



                    </div>
                ))}
            </div>
        </div>
    );
}

export default FeaturedGrid; 