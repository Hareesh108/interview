type Movie = {
  id: number;
  name: string;
  language: string[];
};

type Showtime = {
  movieId: number;
  cinemaId: number;
  showtime: number;
  availableSeat: number;
};

type InputData = {
  movies: Movie[];
  showtimes: Showtime[];
};

type Filters = {
  languages?: string[];
  showtime?: number;
  minAvailableSeat?: number;
};

type FilteredResult = {
  name: string;
  cinemaId: number;
};

const input1: InputData = {
  movies: [
    {
      id: 123,
      name: "XYZ",
      language: ["Hindi", "English"],
    },
  ],
  showtimes: [
    {
      movieId: 123,
      cinemaId: 345,
      showtime: 1700,
      availableSeat: 10,
    },
  ],
};

function filterMovies1(input: InputData, filters: Filters): FilteredResult[] {
  const { movies, showtimes } = input;
  const { languages, showtime, minAvailableSeat } = filters;

  const movieMap = movies.reduce<Record<number, Movie>>((acc, movie) => {
    acc[movie.id] = movie;
    return acc;
  }, {});

  return showtimes
    .filter((item) => {
      const movie = movieMap[item.movieId];
      if (!movie) return false;

      if (languages && !languages.some((lang) => movie.language.includes(lang)))
        return false;

      if (showtime !== undefined && item.showtime !== showtime) return false;

      if (
        minAvailableSeat !== undefined &&
        item.availableSeat < minAvailableSeat
      )
        return false;

      return true;
    })
    .map((item) => ({
      name: movieMap[item.movieId].name,
      cinemaId: item.cinemaId,
    }));
}

