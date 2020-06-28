import { useState } from "react";
import styled from "styled-components";
import ProgressBar from "react-customizable-progressbar";

import { textTruncate } from "../utils/text-transform";

const Wrapper = styled.section`
  border: 1px solid #e2e2e2;
  border-radius: 0.5rem;
  padding: 0;
  position: relative;
  max-width: 480px;
`;

const Controls = styled.div`
  position: relative;
  margin-top: 1rem;
  text-align: right;
`;

const Button = styled.button`
  background: white;
  border: none;
  cursor: pointer;
  position: relative;
  color: #666666;

  &:last-of-type {
    margin-right: 1rem;
  }
`;

const Indicator = styled.div`
  font-size: 0.9rem;
  display: flex;
  justify-content: center;
  text-align: center;
  position: absolute;
  top: 1.6rem;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0;

  p {
    font-weight: bold;
    margin: 0;
    padding: 0;
    color: #5d9cec;
    cursor: default;
  }
`;

const Figure = styled.figure`
  max-height: 330px;
  overflow: hidden;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  margin: 0;
  position: relative;

  img {
    width: 100%;
  }

  figcaption {
    position: absolute;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    width: 100%;
  }
`;

const Title = styled.h4`
  color: white;
  margin: 0;
  padding: 0.5rem;
`;

const Overview = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  padding: 0 0.75rem;
  color: #666666;
`;

type Props = {
  backdrop_path: string;
  overview: string;
  poster_path: string;
  title: string;
  inFavorites: boolean;
  inWatchLater: boolean;
  controls: boolean;
  vote_average: number;
  addToFavorites: (movie: Props) => void;
  removeFromFavorites: (movie: Props) => void;
  addToWatchLater: (movie: Props) => void;
  removeFromWatchLater: (movie: Props) => void;
};

export const Movie: React.FC<Props> = (props) => {
  const {
    overview,
    poster_path,
    title,
    controls = true,
    vote_average,
    addToFavorites,
    removeFromFavorites,
    addToWatchLater,
    removeFromWatchLater,
  } = props;

  const [inFavorites, setInFavorites] = useState(props.inFavorites);
  const [inWatchLater, setInWatchLater] = useState(props.inWatchLater);

  const toggleFavorites = (movie) => {
    if (inFavorites) {
      setInFavorites(false);
      removeFromFavorites(movie);
    } else {
      setInFavorites(true);
      addToFavorites(movie);
    }
  };

  const toggleWatchLater = (movie) => {
    if (inWatchLater) {
      setInWatchLater(false);
      removeFromWatchLater(movie);
    } else {
      setInWatchLater(true);
      addToWatchLater(movie);
    }
  };

  const poster = poster_path
    ? "https://image.tmdb.org/t/p/w220_and_h330_face/" + poster_path
    : "/no-poster.png";

  return (
    <Wrapper data-testid="movie">
      <Figure>
        <img src={poster} alt={title} />
        <figcaption>
          <Title>{title}</Title>
        </figcaption>
      </Figure>

      <ProgressBar
        className="rating"
        radius={16}
        progress={vote_average * 10}
        strokeWidth={4}
        strokeColor="#5d9cec"
        trackStrokeWidth={6}
        trackStrokeColor="white"
        fillColor="white"
      >
        <Indicator>
          <p>{vote_average}</p>
        </Indicator>
      </ProgressBar>

      {controls ? (
        <Controls>
          <Button onClick={() => toggleFavorites(props)}>
            {inFavorites ? (
              <>
                <i className="icon icon-liked"></i> Liked
              </>
            ) : (
              <>
                <i className="icon icon-like"></i> Like
              </>
            )}
          </Button>

          <Button onClick={() => toggleWatchLater(props)}>
            {inWatchLater ? (
              <>
                <i className="icon icon-list"></i> In list
              </>
            ) : (
              <>
                <i className="icon icon-add"></i> Watch later
              </>
            )}
          </Button>
        </Controls>
      ) : null}
      <Overview>
        {overview ? textTruncate(overview, 30) : "No overview..."}
      </Overview>
    </Wrapper>
  );
};
