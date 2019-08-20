import React from "react";
import "./App.css";
import { SearchBox } from "./SearchBox";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import { AnimesQuery, AnimesQueryVariables } from "./generated/AnimesQuery";

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

function useDebounce(value: any, time: number) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  const tid = React.useRef(0);

  React.useEffect(() => {
    clearTimeout(tid.current);
    tid.current = window.setTimeout(() => setDebouncedValue(value), time);
  }, [value, time]);

  return debouncedValue;
}

export default function App() {
  const [search, setSearch] = React.useState("");
  const searchDebounced = useDebounce(search, 300);

  return (
    <ApolloProvider client={client}>
      <SearchBox value={search} onChange={setSearch} />
      <AnimeList search={searchDebounced} />
    </ApolloProvider>
  );
}
