export function keepDisplayTexts(this: void, list: readonly unknown[]): string[] {
  const kept: string[] = []
  for (const value of list) {
    if (typeof value === "string" && value !== "") {
      kept.push(value)
    }
  }
  return kept
}
