import { containsMovie, addToList, readFromList, removeFromList } from "./list";

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

const moviesList = [
  { id: 1, name: "One" },
  { id: 2, name: "Two" },
];

beforeEach(() => {
  localStorage.setItem("favorites", JSON.stringify(moviesList));
});

describe("List", () => {
  test("containsMovie", () => {
    const list = readFromList("favorites");

    expect(list).toEqual(moviesList);
    expect(containsMovie(list, { id: 1 })).toBeTruthy();
    expect(containsMovie(list, { id: 3 })).toBeFalsy();
  });

  test("containsMovie", () => {
    const list = readFromList("favorites");

    expect(containsMovie(list, { id: 1 })).toBeTruthy();
    expect(containsMovie(list, { id: 3 })).toBeFalsy();
  });

  test("addToList", () => {
    expect(containsMovie(readFromList("favorites"), { id: 3 })).toBeFalsy();
    addToList("favorites", { id: 3 });
    expect(containsMovie(readFromList("favorites"), { id: 3 })).toBeTruthy();
  });

  test("removeFromList", () => {
    expect(readFromList("favorites").length).toBe(2);
    expect(containsMovie(readFromList("favorites"), { id: 2 })).toBeTruthy();
    removeFromList("favorites", { id: 3 });
    expect(containsMovie(readFromList("favorites"), { id: 2 })).toBeTruthy();
    expect(readFromList("favorites").length).toBe(2);
    removeFromList("favorites", { id: 2 });
    expect(containsMovie(readFromList("favorites"), { id: 1 })).toBeTruthy();
    expect(containsMovie(readFromList("favorites"), { id: 2 })).toBeFalsy();
    expect(readFromList("favorites").length).toBe(1);
    removeFromList("favorites", { id: 1 });
    expect(containsMovie(readFromList("favorites"), { id: 1 })).toBeFalsy();
    expect(containsMovie(readFromList("favorites"), { id: 2 })).toBeFalsy();
    expect(readFromList("favorites").length).toBe(0);
  });
});
