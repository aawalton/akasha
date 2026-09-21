export function oneLine(said: string): string {
  return said.replace(/\s+/g, " ").trim()
}
