import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { AnimeResultsQuery, AnimeResultsQueryVariables } from "./generated/AnimeResultsQuery";

const query = gql`
  query AnimeResultsQuery($search: String!) {
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

interface Props {
  search: string;
}

export function AnimeResults({ search }: Props) {
  const { loading, error, data } = useQuery<AnimeResultsQuery, AnimeResultsQueryVariables>(
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
