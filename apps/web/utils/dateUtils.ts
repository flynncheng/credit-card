export const getDateYearsAgo = (years: number) => {
  const today = new Date();
  return new Date(
    today.getFullYear() - years,
    today.getMonth(),
    today.getDate(),
  );
};

export const formatISODate = (dateStr: string) => {
  const date = new Date(dateStr);
  // function to add leading zeros
  const padNum = (num: number) => String(num).padStart(2, "0");

  // format Date object to 'yyyy-mm-dd hh:mm:ss' string
  const formatted = `${date.getUTCFullYear()}-${padNum(
    date.getUTCMonth() + 1,
  )}-${padNum(date.getUTCDate())} ${padNum(date.getUTCHours())}:${padNum(
    date.getUTCMinutes(),
  )}:${padNum(date.getUTCSeconds())}`;

  return formatted;
};
