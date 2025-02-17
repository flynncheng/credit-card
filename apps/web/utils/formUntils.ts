export const preventInvalidNumberKeys = (
  e: React.KeyboardEvent<HTMLInputElement>,
) => {
  if (e.key === "e" || e.key === "E" || e.key === "-") {
    e.preventDefault();
  }
};
