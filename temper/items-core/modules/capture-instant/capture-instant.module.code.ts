const MS_PER_SECOND = 1000

export function instantOf(seconds: number): string {
  return new Date(seconds * MS_PER_SECOND).toISOString()
}
