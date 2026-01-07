function filterMovies(input, filters) {
  const { languages, showtime, minAvailableSeat } = filters;

  const movieMap = {};
  let showTimes = [];

  Object.entries(input).forEach(([key, values]) => {
    if (key === "movies") {
      values.forEach((movie) => {
        movieMap[movie.id] = movie;
      });
    }

    if (key === "showtimes") {
      showTimes = values;
    }
  });

  return showTimes
    .filter((item) => {
      const movie = movieMap[item.movieId];
      if (!movie) return false;

      if (languages && !languages.some((lang) => movie.language.includes(lang)))
        return false;

      if (showtime && item.showtime !== showtime) return false;

      if (minAvailableSeat && item.availableSeat < minAvailableSeat)
        return false;

      return true;
    })
    .map((item) => ({
      name: movieMap[item.movieId].name,
      cinemaId: item.cinemaId,
    }));
}

const result = filterMovies(input, {
  languages: ["English"],
  showtime: 1700,
  minAvailableSeat: 5,
});

console.log(result);
