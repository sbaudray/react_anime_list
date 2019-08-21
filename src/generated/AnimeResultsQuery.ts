/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AnimeResultsQuery
// ====================================================

export interface AnimeResultsQuery_Page_media_title {
  __typename: "MediaTitle";
  /**
   * The official english title
   */
  english: string | null;
  /**
   * Official title in it's native language
   */
  native: string | null;
}

export interface AnimeResultsQuery_Page_media {
  __typename: "Media";
  /**
   * The id of the media
   */
  id: number;
  /**
   * The official titles of the media in various languages
   */
  title: AnimeResultsQuery_Page_media_title | null;
}

export interface AnimeResultsQuery_Page {
  __typename: "Page";
  media: (AnimeResultsQuery_Page_media | null)[] | null;
}

export interface AnimeResultsQuery {
  Page: AnimeResultsQuery_Page | null;
}

export interface AnimeResultsQueryVariables {
  search: string;
}
