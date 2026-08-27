export function luaStringContains(haystack: string, needle: string): boolean {
  const [pos] = string.find(haystack, needle, 1, true)
  return pos !== undefined
}
