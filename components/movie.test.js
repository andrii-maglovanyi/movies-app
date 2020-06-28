import { cleanup, fireEvent, render } from "@testing-library/react";

import { Movie } from "./movie.tsx";

const mockMovie = {
  inFavorites: false,
  inWatchLater: false,
  poster_path: "/h4VB6m0RwcicVEZvzftYZyKXs6K.jpg",
  id: 495764,
  title: "Birds of Prey (and the Fantabulous Emancipation of One Harley Quinn)",
  overview:
    "Harley Quinn joins forces with a singer, an assassin and a police detective to help a young girl who had a hit placed on her after she stole a rare diamond from a crime lord.",
};

afterEach(cleanup);

describe("Movie", () => {
  it("Should render the component", () => {
    const container = render(<Movie {...mockMovie} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("Should call handlers", async () => {
    mockMovie.addToFavorites = jest.fn();
    mockMovie.removeFromFavorites = jest.fn();
    mockMovie.addToWatchLater = jest.fn();
    mockMovie.removeFromWatchLater = jest.fn();

    const { getByText } = render(<Movie {...mockMovie} />);

    const title = getByText(
      "Birds of Prey (and the Fantabulous Emancipation of One Harley Quinn)"
    );
    expect(title).toBeTruthy();

    const likeButton = getByText("Like");
    expect(mockMovie.addToFavorites).not.toHaveBeenCalled();
    fireEvent.click(likeButton);
    expect(mockMovie.addToFavorites).toHaveBeenCalledTimes(1);
    expect(mockMovie.addToFavorites).toHaveBeenCalledWith(mockMovie);

    const dislikeButton = getByText("Liked");
    expect(mockMovie.removeFromFavorites).not.toHaveBeenCalled();
    fireEvent.click(dislikeButton);
    expect(mockMovie.removeFromFavorites).toHaveBeenCalledTimes(1);
    expect(mockMovie.removeFromFavorites).toHaveBeenCalledWith(mockMovie);

    fireEvent.click(likeButton);
    expect(mockMovie.addToFavorites).toHaveBeenCalledTimes(2);
    expect(mockMovie.addToFavorites).toHaveBeenCalledWith(mockMovie);

    const watchLaterButton = getByText("Watch Later");
    expect(mockMovie.addToWatchLater).not.toHaveBeenCalled();
    fireEvent.click(watchLaterButton);
    expect(mockMovie.addToWatchLater).toHaveBeenCalledTimes(1);
    expect(mockMovie.addToWatchLater).toHaveBeenCalledWith(mockMovie);

    const inListButton = getByText("In list");
    expect(mockMovie.removeFromWatchLater).not.toHaveBeenCalled();
    fireEvent.click(inListButton);
    expect(mockMovie.removeFromWatchLater).toHaveBeenCalledTimes(1);
    expect(mockMovie.removeFromWatchLater).toHaveBeenCalledWith(mockMovie);

    fireEvent.click(watchLaterButton);
    expect(mockMovie.addToWatchLater).toHaveBeenCalledTimes(2);
    expect(mockMovie.addToWatchLater).toHaveBeenCalledWith(mockMovie);
  });
});
