export const ObjectKeys = <O extends object>(obj: O): (keyof O)[] => {
  const array: (keyof O)[] = [];
  for (const key in obj) array.push(key);
  return array;
};

export const ObjectValues = <O extends object>(obj: O): Array<O[keyof O]> => {
  const array: Array<O[keyof O]> = [];
  for (const key in obj) array.push(obj[key]);
  return Array.from(new Set(array));
};

export const getKeyByValue = <K extends string, T>(
  obj: Record<K, T>,
  value: T
): K[] => {
  const array: K[] = [];
  for (const key in obj) if (obj[key] === value) array.push(key);
  return Array.from(new Set(array));
};
