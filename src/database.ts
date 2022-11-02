// For now lets just use a purely in-memory database with string keys
// We can layer in a more complex datastore later.
const MEMORY_DB = {} as { [keyof: string]: any };

const dbGet = <T>(key: string): T | undefined => {
  if (dbHasKey(key)) {
    return MEMORY_DB[key] as T;
  } else {
    return undefined;
  }
};

const dbSet = <T>(key: string, item: T) => {
  MEMORY_DB[key] = item;
};

const dbHasKey = (key: string): boolean => {
  return MEMORY_DB[key] !== undefined && MEMORY_DB[key] !== null;
};

export { dbGet, dbSet, dbHasKey };
