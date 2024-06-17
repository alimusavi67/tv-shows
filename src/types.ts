export interface Show {
  id: number;
  name: string;
  genres: string[];
  premiered: string;
  rating: { average: number };
  image: { medium: string; original: string };
  language?: string;
  status?: string;
}

export interface Season {
  id: number;
  number: number;
  episodeOrder: number;
  premiereDate: string;
  image: { medium: string };
}

export interface Episode {
  id: number;
  name: string;
  airstamp?: string;
  summary: string;
  season?: number;
  image?: { medium: string; original?: string };
  _embedded?: {
    show: Show;
  };
}

export interface ShowWithEmbedded extends Show {
  _embedded?: {
    seasons: {
      id: number;
      image: { medium: string };
      number: number;
      episodeOrder: number;
      premiereDate: string;
      endDate: string;
      network: {
        name: string;
        country: {
          name: string;
          code: string;
          timezone: string;
        };
      };
      webChannel: null | {
        name: string;
        country: {
          name: string;
          code: string;
          timezone: string;
        };
      };
    }[];
  };
}
