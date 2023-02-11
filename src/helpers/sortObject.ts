export const sortObject = (obj: any, name: any, direction: any) =>
  obj.sort((a: any, b: any) => {
    if (typeof a[name] === "string") {
      a = a[name].toLowerCase();
      b = b[name].toLowerCase();
    }

    if (typeof a[name] === "number") {
      a = a[name];
      b = b[name];
    }

    if (direction === 1 ? a < b : a > b) return -1;
  });
