// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLClient, gql} from 'graphql-request';
import { graphql } from 'graphql';

type Data = {
  name: string
}

const graphqlAPI:string = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string; //type assertion

const comments = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) => {

    const {name, email, slug, comment} = req.body;

    const graphQLClient = new GraphQLClient(graphqlAPI, {
        headers: {
            authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`
        }
    });
    
    const query = gql`
        mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
            createComment(data: {
                name: $name, 
                email: $email, 
                comment: $comment, 
                post: { 
                    connect: {
                        slug: $slug
                    }
                }
            }) {id}
        }
    `;

    let result = {
        name: ""
    };

    let resStatus = 200; 

    try {

        result = await graphQLClient.request(query, {
            name: name,
            email: email,
            slug: slug,
            comment: comment
        });

    }catch(error){

        resStatus = 400; 

        result = {
            name: 'error'
        }

    }


    

    return res.status(resStatus).send(result);
}

export default comments; 

