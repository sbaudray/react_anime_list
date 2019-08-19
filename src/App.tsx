import React from "react";
import "./App.css";
import { SearchBox } from "./SearchBox";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import { AnimesQuery, AnimesQueryVariables } from "./generated/AnimesQuery";

function debounce(func: Function, time: number) {
  let tid: number;

  return function(...args: any[]) {
    clearTimeout(tid);
    tid = window.setTimeout(() => func(...args), time);
  };
}

const client = new ApolloClient({
  uri: "https://graphql.anilist.co"
});

const query = gql`
  query AnimesQuery($search: String!) {
    Page(page: 1, perPage: 5) {
      media(search: $search) {
        id
        title {
          english
          native
        }
      }
    }
  }
`;

interface AnimeListProps {
  search: string;
}

function AnimeList({ search }: AnimeListProps) {
  const { loading, error, data } = useQuery<AnimesQuery, AnimesQueryVariables>(
    query,
    {
      skip: !search,
      variables: { search }
    }
  );

  if (error) {
    return <div>error</div>;
  }

  if (loading) {
    return <div>loading</div>;
  }

  const media = data && data.Page && data.Page.media;

  return (
    <div>
      {media
        ? media.map(item => {
            return (
              item && (
                <div>
                  {item.id}
                  {item.title && item.title.english}
                  {item.title && item.title.native}
                </div>
              )
            );
          })
        : "no media"}
    </div>
  );
}

export default function App() {
  const [search, setSearch] = React.useState("");

  return (
    <ApolloProvider client={client}>
      <SearchBox onChange={debounce(setSearch, 400)} />
      <AnimeList search={search} />
    </ApolloProvider>
  );
}
