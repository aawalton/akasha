export function mapOf<T extends readonly unknown[], U>(
  arr: T,
  fn: (item: T[number]) => U
): readonly U[] {
  return arr.map(fn)
}
