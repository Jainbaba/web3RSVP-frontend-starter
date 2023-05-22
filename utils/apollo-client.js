import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/jainbaba/web3rsvps",
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default client;
