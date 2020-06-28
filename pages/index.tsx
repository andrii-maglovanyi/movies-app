import { useCallback, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import * as R from "ramda";
import styled from "styled-components";
import Link from "next/link";

import {
  addToList,
  readFromList,
  removeFromList,
  containsMovie,
} from "../lib/list";

import { fetchMovies } from "../api";
import useApi from "../hooks/use-api";

import { Movie } from "../components/movie";
import { SearchBar } from "../components/search-bar";
import { Spinner } from "../components/spinner";

const Header = styled.header`
  background: white;
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  border-bottom: 1px solid #e2e2e2;
  z-index: 2;
  padding: 0 2rem;
  top: 0;

  a {
    float: right;
    font-size: initial;
    margin: 1.5rem 0 0 1rem;
  }
`;

const Empty = styled.div`
  width: 100%;
  color: gray;
  line-height: calc(100vh - 8rem);
  text-align: center;
`;

const addToFavorites = R.curry(addToList)("favorites");
const removeFromFavorites = R.curry(removeFromList)("favorites");
const addToWatchLater = R.curry(addToList)("watch-later");
const removeFromWatchLater = R.curry(removeFromList)("watch-later");

function Index({ initialData }) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [watchLater, setWatchLater] = useState([]);

  useEffect(() => {
    setFavorites(readFromList("favorites"));
    setWatchLater(readFromList("watch-later"));
  }, []);

  const getResults = useCallback(
    R.pipe(fetchMovies, R.andThen(R.pick(["results", "total_pages"]))),
    []
  );

  const params = useMemo(
    () => ({
      page,
      query,
    }),
    [page, query]
  );
  const { data, total, loading, error } = useApi(
    initialData,
    getResults,
    params
  );

  const onFetch = async (page) => {
    setPage(page + 1);
  };

  const handleSearch = (query) => {
    setPage(1);
    setQuery(query);
  };

  return (
    <>
      <Header>
        <Link href="/lists/favorites">
          <a>
            <i className="icon icon-liked"></i>Liked movies
          </a>
        </Link>
        <Link href="/lists/watch-later">
          <a>
            {" "}
            <i className="icon icon-list"></i>Watch later
          </a>
        </Link>
        <SearchBar onSearch={handleSearch} />
      </Header>

      {error ? (
        <Empty>
          <h2>Panic! Try later please.</h2>
        </Empty>
      ) : (
        <InfiniteScroll
          data-testid="movies-list"
          className="movies"
          initialLoad={false}
          loadMore={onFetch}
          loader={<Spinner key={0} />}
          hasMore={!loading && page < total}
        >
          {data.length ? (
            data.map((movie) => (
              <Movie
                key={movie.id}
                inFavorites={containsMovie(favorites, movie)}
                inWatchLater={containsMovie(watchLater, movie)}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                addToWatchLater={addToWatchLater}
                removeFromWatchLater={removeFromWatchLater}
                {...movie}
              />
            ))
          ) : (
            <Empty>
              <h2>No movies found.</h2>
            </Empty>
          )}
        </InfiniteScroll>
      )}
    </>
  );
}

export async function getStaticProps() {
  const json = await fetchMovies();

  return {
    props: {
      initialData: json,
    },
  };
}

export default Index;
