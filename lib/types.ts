import { MDXRemoteSerializeResult } from "next-mdx-remote";

export enum Form {
  Initial,
  Loading,
  Success,
  Error,
}

export type FormState = {
  state: Form;
  message?: string;
};

export type Views = {
  total: number;
};

export type Song = {
  songUrl: string;
  artist: string;
  cover: string;
  title: string;
};

export type NowPlayingSong = {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

export type TopTracks = {
  tracks: Song[];
};
export type TopArtists = {
  artists: Artist[];
};

export type Artist = {
  name: string;
  image: string;
  url: string;
};

export type Post = {
  _id: string;
  slug: string;
  content: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  readingTime: string;
  tweets: any[];
};

export type BlogPostStats = {
  slug: string;
  title: string;
  thumbsUp: number;
  heart: number;
  trophy: number;
  bookmark: number;
  views: number;
  totalReactions: number;
};
