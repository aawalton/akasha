export function renderConstOrNull(value: string | null): string {
  return value === null ? "null" : `${JSON.stringify(value)} as const`
}
