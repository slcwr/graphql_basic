import {
  ApolloClient,
  ApolloLink,
  HttpLink, 
  InMemoryCache,
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: "http://localhost:3000/graphql",
  credentials: "include",
});

const authLink = new ApolloLink((operation, forword) => {
  const token = localStorage.getItem("token");

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }));
  return forword(operation);
});

export const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});
