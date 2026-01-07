# 🎬 Movie & Showtime Filter Utility

## 📌 Objective

Create a JavaScript function that processes **movie** and **showtime** data to produce **filtered results** based on user-defined criteria such as language, showtime, and seat availability.

This problem simulates a **real-world movie booking scenario**, where movies are shown in multiple cinemas with different showtimes and availability.

---

## 📥 Input Structure

```js
const input = {
  movies: [
    {
      id: 123,
      name: "XYZ",
      language: ["Hindi", "English"]
    }
  ],
  showtimes: [
    {
      movieId: 123,
      cinemaId: 345,
      showtime: 1700,
      availableSeat: 10
    }
  ]
};
````

---

## 📤 Expected Output

```js
const output = [
  {
    name: "XYZ",
    cinemaId: 345
  }
];
```

---

## ⚙️ Key Requirements

The function should support **optional filtering** based on one or more of the following attributes:

* **Language**
  Filter movies by their spoken languages (e.g., English, Hindi)

* **Showtime**
  Filter movies by a specific showtime (e.g., 1700)

* **Available Seats**
  Filter movies based on minimum seat availability

---

## 🧠 Solution Approach

1. Normalize the movie list into a lookup map using `movieId`
2. Join `movies` and `showtimes` data efficiently
3. Apply conditional filters based on user input
4. Return only the required output structure

This approach avoids nested loops and ensures **O(n)** time complexity.

---

## 🧩 Implementation

```js
function filterMovies(input, filters = {}) {
  const { languages, showtime, minAvailableSeat } = filters;

  const movieMap = {};
  let showTimes = [];

  // Extract movies and showtimes using Object.entries
  Object.entries(input).forEach(([key, values]) => {
    if (key === "movies") {
      values.forEach(movie => {
        movieMap[movie.id] = movie;
      });
    }

    if (key === "showtimes") {
      showTimes = values;
    }
  });

  return showTimes
    .filter(item => {
      const movie = movieMap[item.movieId];
      if (!movie) return false;

      if (
        languages &&
        !languages.some(lang => movie.language.includes(lang))
      ) return false;

      if (showtime && item.showtime !== showtime) return false;

      if (
        minAvailableSeat &&
        item.availableSeat < minAvailableSeat
      ) return false;

      return true;
    })
    .map(item => ({
      name: movieMap[item.movieId].name,
      cinemaId: item.cinemaId
    }));
}
```

---

## ▶️ Example Usage

```js
const result = filterMovies(input, {
  languages: ["English"],
  showtime: 1700,
  minAvailableSeat: 5
});

console.log(result);
```

### Output

```js
[
  { name: "XYZ", cinemaId: 345 }
]
```

---

## 🧪 Edge Cases Covered

* Movie without matching showtime
* Showtime without matching movie
* Multiple filters applied together
* Optional filters (can use one or all)

---

