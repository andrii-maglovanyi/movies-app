import { textTruncate } from "./text-transform";

describe("Text Transform Util", () => {
  test("Should pluralize word", () => {
    expect(
      textTruncate(
        "Here is another nice starter home. Modern kitchen, toilet and bathroom. The house is stylishly finished, completely contemporary. You can go in! An interesting middle house for starters and young families."
      )
    ).toBe(
      "Here is another nice starter home. Modern kitchen, toilet and bathroom. The house is stylishly finished, completely contemporary. You can..."
    );

    expect(
      textTruncate(
        "Here is another nice starter home. Modern kitchen, toilet and bathroom."
      )
    ).toBe(
      "Here is another nice starter home. Modern kitchen, toilet and bathroom."
    );

    expect(
      textTruncate(
        "Here is another nice starter home. Modern kitchen, toilet and bathroom. The house is stylishly finished, completely contemporary. You can go in! An interesting middle house for starters and young families.",
        10
      )
    ).toBe("Here is another nice starter home. Modern kitchen, toilet and...");
  });
});
