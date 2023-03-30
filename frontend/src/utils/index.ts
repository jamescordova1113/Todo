export const formatTime = (time?: number) => {
  if (!time) return "";
  const date = new Date(time);
  const month = date.getMonth();
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();
  return `${month}/${dayOfMonth}/${year}`;
};

export const stringifyQs = (filters: any) => {
  Object.keys(filters).forEach((key) => {
    if (filters[key] === undefined) delete filters[key];
  });
  return new URLSearchParams(filters).toString();
};
