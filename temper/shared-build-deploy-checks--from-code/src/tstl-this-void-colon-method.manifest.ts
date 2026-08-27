export function isBaseGameReceiverSurface(repoRelPath: string): boolean {
  const norm = repoRelPath.replaceAll("\\", "/")
  if (norm.includes("/types/eso/") || norm.startsWith("types/eso/")) return true
  const base = norm.slice(norm.lastIndexOf("/") + 1)
  if (/^eso-.*\.d\.ts$/.test(base)) return true
  if (base === "globals.d.ts") return true
  return false
}
