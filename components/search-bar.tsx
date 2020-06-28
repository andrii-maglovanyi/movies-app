import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";

const Search = styled.div`
  margin: 1rem 0;
  position: relative;
  width: 100%;
  z-index: 2;

  @media (min-width: 640px) {
    width: 50%;
  }

  input {
    border: 1px solid #e2e2e2;
    border-radius: 1rem;
    box-sizing: border-box;
    display: block;
    font-size: 1.3rem;
    padding: 0.7rem 2rem 0.7rem 1rem;
    width: 100%;
  }

  .icon {
    background: transparent;
    border: none;
    color: #e2e2e2;
    font-size: 1.6rem;
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.7rem;
  }
`;

type Props = {
  onSearch: (query: string) => void;
};

export const SearchBar: React.FC<Props> = ({ onSearch }) => {
  return (
    <Search>
      <DebounceInput
        minLength={3}
        placeholder="Search movies..."
        debounceTimeout={500}
        onChange={(event) => onSearch(event.target.value)}
      />
      <i className="icon icon-search"></i>
    </Search>
  );
};
