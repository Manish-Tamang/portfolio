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
