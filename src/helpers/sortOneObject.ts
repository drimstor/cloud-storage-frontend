export const sortOneObject = (obj: any, direction: number) => {
  const sortedObj = Object.entries(obj).sort((a: any, b: any) =>
    direction === 1 ? a[1] - b[1] : b[1] - a[1]
  );

  return Object.fromEntries(sortedObj);
};
