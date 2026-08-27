declare namespace table {
  function concat(
    this: void,
    list: Record<number, string | undefined>,
    sep?: string,
    i?: number,
    j?: number
  ): string
}
