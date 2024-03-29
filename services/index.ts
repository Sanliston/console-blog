import { graphql } from 'graphql';
import { request, gql } from 'graphql-request'; 
import { now } from 'lodash';
import { TiThLarge } from 'react-icons/ti';
import { HOUR_MS, sanitizeString, setWithExpiry } from '../utils/utils';

const graphqlAPI:string = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string; //type assertion

export const getPosts = async () : Promise<[]> => {

    const query:string = gql`
        query GetPosts () {

            posts(
                orderBy: createdAt_DESC
                last: 10
            ){
                
                author {
                    bio
                    id
                    name
                    photo {
                    url
                    }
                }
                categories {
                    name
                    slug
                }
                excerpt
                featuredImage {
                    url
                }
                createdAt
                featuredPost
                slug
                title
                id
                      
            }
            
        }
    `;

    const results = await request(graphqlAPI, query);

    return results.posts; 

}



export const getRecentPosts = async (): Promise<[]> => {

    const query = gql`
        query GetRecentPosts () {
            posts(
                orderBy: createdAt_DESC
                last: 6
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `;

    const result = await request(graphqlAPI, query);

    return result.posts;
}

export const getSimilarPosts = async (categories?: [string], slug?: string ): Promise<[]> => {

    const query = gql`
        query GetSimilarPosts($categories: [String!], $slug: String!) {
            posts(
                where: {
                    slug_not: $slug, 
                    AND: {
                        categories_some: {
                            slug_in: $categories
                        }
                    }
                }
                orderBy: createdAt_DESC
                last: 6
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug 
            }
        }
    `; 

    const result = await request(graphqlAPI, query, {categories, slug});

    return result.posts;
}

export const searchPosts = async (searchQuery: string, max: number = 6): Promise<[]> => {

    searchQuery = sanitizeString(searchQuery);

    const query = gql`
        query SearchPosts($searchQuery: String!, $max: Int!) {
            posts(
                where : {
                    _search: $searchQuery       
                }
                last: $max
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                excerpt
                slug 
                id
                categories {
                    name
                    slug
                }
                author {
                    bio
                    id
                    name
                    photo {
                    url
                    }
                }
            }
        }
    `; 

    const result = await request(graphqlAPI, query, {searchQuery, max});

    return result.posts;
}

export const getCategories = async () : Promise<[]> => {

    const query = gql`
        query GetCategories () {
            categories(
                orderBy: createdAt_ASC
            ) {
                name
                slug 
            }
        }
    `;

    const result = await request(graphqlAPI, query);
    return result.categories;
}

export const getPostDetails = async (slug: string): Promise<{}> => {

    const query = gql`
        query GetPostDetails ($slug: String!) {
            post(
                where: {
                    slug: $slug
                }
            ) {
                author {
                    bio
                    id
                    name
                    photo {
                        url
                    }
                }
                categories {
                    name
                    slug
                }
                excerpt
                featuredImage {
                    url
                }
                createdAt
                slug
                title
                id
                content {
                    raw
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, { slug });
    return result.post;
}

export const submitComment = async (obj: any) => {

    const result = await fetch('/api/comments', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    });

    return result.json();

}

export const getComments = async (slug: string): Promise<[]> => {

    const query = gql`
        query GetComments ($slug: String!) {
            comments(
                where: {
                    post: {
                        slug: $slug
                    }
                }
            ) {
                name,
                createdAt,
                comment
            }
        }
    `;

    const result = await request(graphqlAPI, query, {slug});
    return result.comments;

}

export const getTagPosts = async (slug:string) : Promise<[]> => {
    const query = gql`
      query GetCategoryPost($slug: String!) {
        postsConnection(where: {categories_some: {slug: $slug}}) {
          edges {
            cursor
            node {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }
    `;
  
    const result = await request(graphqlAPI, query, { slug });
  
    return result.postsConnection.edges;
  };
  
  export const getCollections = async (max:number = 4): Promise<[]> => {

    const query = gql`
        query GetCollections ($max: Int!) {
            collections(
                orderBy: createdAt_ASC
                last: $max
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, {max});
    return result.collections;

}

export const getCollection = async (slug:string): Promise<{}> => {

    const query = gql`
        query GetCollection ($slug: String!) {
            collection(
                where: {slug: $slug}
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                },
                posts {
                    title
                    featuredImage {
                        url
                    }
                    createdAt
                    excerpt
                    author {
                        name
                        photo {
                            url
                        }
                    }
                    slug 
                    categories {
                        name
                        slug
                    }
                    
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, {slug});

    return result.collection;

}

// export const getCollectionPosts = async (slug:string) : Promise<[]> => {
//     const query = gql`
//       query GetCollectionPosts($slug: String!) {
//             posts(
//                 where: {
//                     categories_some: {
//                         slug: $slug
//                     }
//                 }
                
//                 orderBy: createdAt_DESC
//                 last: 10
//             ) {
//                 title
//                 featuredImage {
//                     url
//                 }
//                 createdAt
//                 slug 
//             }
//       }
//     `;
  
//     const result = await request(graphqlAPI, query, { slug });
  
//     return result.posts;
//   };
