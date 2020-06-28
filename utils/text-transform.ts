export const textTruncate = (
  str: string,
  numWords = 20,
  ending = "..."
): string => {
  const count = str.split(" ").length;
  return (
    str.split(" ").splice(0, numWords).join(" ") +
    (count > numWords ? ending : "")
  );
};
