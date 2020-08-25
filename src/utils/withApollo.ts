import { ApolloClient, InMemoryCache } from "@apollo/client";
import { withApollo as createWithApollo } from "next-apollo";
import { PaginatedPosts } from "../generated/graphql";

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            keyArgs: [], // if we have search query, we can put it in ["query"], that means ["cursor"] wont work
            merge(
              existing: PaginatedPosts | undefined,
              incoming: PaginatedPosts
            ): PaginatedPosts {
              console.log(existing, incoming);
              return {
                ...incoming,
                posts: [...(existing?.posts || []), ...incoming.posts],
              };
            },
          },
        },
      },
    },
  }),
});

export const withApollo = createWithApollo(client);
