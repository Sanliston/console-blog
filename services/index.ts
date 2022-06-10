import { graphql } from 'graphql';
import { request, gql } from 'graphql-request'; 

export const getPosts = async () : Promise<{}> => {

    const graphqlAPI: string = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string; //type assertion

    const query:string = gql`
        query MyQuery {
            postsConnection {
            edges {
                node {
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
                }
            }
            }
        }
    `;

    const results = await request(graphqlAPI, query);

    return results.postsConnection.edges.node; 


}