import { useRouter } from "next/router";
import Link from "next/link";

import { useEffect, useState } from "react";
import styled from "styled-components";

import { readFromList } from "../../lib/list";

import { Movie } from "../../components/movie";

const ListTitle = styled.header`
  background: white;
  border-bottom: 1px solid #e2e2e2;
  box-sizing: border-box;
  color: #222;
  margin: 0;
  padding: 1.6rem 2rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;

  a {
    float: right;
    font-size: initial;
  }
`;

const Empty = styled.div`
  width: 100%;
  color: gray;
  line-height: calc(100vh - 8rem);
  text-align: center;
`;

function List() {
  const router = useRouter();
  const { name } = router.query;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(readFromList(name));
  }, [name]);

  return (
    <>
      <ListTitle>
        <Link href="/">
          <a>
            <i className="icon icon-back"></i>Back
          </a>
        </Link>
        <h2>{name === "favorites" ? "Favorites" : "Watch later"}</h2>
      </ListTitle>
      <div className="movies">
        {movies.length ? (
          movies.map((movie) => (
            <Movie controls={false} key={movie.id} {...movie} />
          ))
        ) : (
          <Empty>
            <h2>No movies in this list.</h2>
          </Empty>
        )}
      </div>
    </>
  );
}

export default List;
