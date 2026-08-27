declare namespace table {
  function insert<T>(this: void, list: Record<number, T>, value: T): void
  function sort<T>(this: void, list: Record<number, T>, comp?: (a: T, b: T) => boolean): void
}
