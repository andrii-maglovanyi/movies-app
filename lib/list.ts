export const containsMovie = (list, movie) =>
  list.some(({ id }) => id === movie.id);

export const addToList = (listName, movie) => {
  const movies = readFromList(listName);
  if (!containsMovie(movies, movie)) {
    movies.push(movie);
    localStorage[listName] = JSON.stringify(movies);
  }
};

export const readFromList = (listName) =>
  JSON.parse(
    typeof window !== "undefined" ? localStorage[listName] || "[]" : "[]"
  );

export const removeFromList = (listName, movie) => {
  const movies = readFromList(listName).filter(({ id }) => id !== movie.id);
  localStorage[listName] = JSON.stringify(movies);
};
