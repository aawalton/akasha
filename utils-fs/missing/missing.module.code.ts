export function isMissing(thrown: unknown): boolean {
  if (thrown === null || typeof thrown !== "object" || !("code" in thrown)) return false
  const code = thrown.code
  return code === "ENOENT" || code === "ENOTDIR"
}
