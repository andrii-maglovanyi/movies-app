export const fetchMovies = async ({ page = 1, query = "" } = {}) => {
  const path = query ? "search" : "discover";

  const res = await fetch(
    `https://api.themoviedb.org/3/${path}/movie?sort_by=popularity.desc&query=${encodeURIComponent(
      query
    )}&page=${page}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  return res.json();
};
