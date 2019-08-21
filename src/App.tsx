import React from "react";
import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { useDebounce } from "./useDebounce";
import { AnimeResults } from "./AnimeResults";

const client = new ApolloClient({
  uri: "https://graphql.anilist.co"
});

export default function App() {
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 300);

  return (
    <ApolloProvider client={client}>
      <input value={search} onChange={e => setSearch(e.target.value)} />
      <AnimeResults search={debouncedSearch} />
    </ApolloProvider>
  );
}
