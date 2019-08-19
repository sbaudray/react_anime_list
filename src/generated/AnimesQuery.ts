/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AnimesQuery
// ====================================================

export interface AnimesQuery_Page_media_title {
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

export interface AnimesQuery_Page_media {
  __typename: "Media";
  /**
   * The id of the media
   */
  id: number;
  /**
   * The official titles of the media in various languages
   */
  title: AnimesQuery_Page_media_title | null;
}

export interface AnimesQuery_Page {
  __typename: "Page";
  media: (AnimesQuery_Page_media | null)[] | null;
}

export interface AnimesQuery {
  Page: AnimesQuery_Page | null;
}

export interface AnimesQueryVariables {
  search: string;
}
