const unscoped = (pkgName: string): string => {
  if (!pkgName.startsWith("@")) return pkgName
  const slash = pkgName.indexOf("/")
  if (slash < 0) return pkgName
  return pkgName.slice(slash + 1)
}

export const toBinCommands = (value: unknown, name: string | undefined): readonly string[] => {
  if (value === null || value === undefined) return []
  if (typeof value === "string") {
    if (name === undefined || name === "") return []
    return [unscoped(name)]
  }
  if (typeof value !== "object") return []
  if (Array.isArray(value)) return []
  const out: string[] = []
  for (const [k, v] of Object.entries(value)) {
    if (typeof v !== "string") continue
    out.push(k)
  }
  return out
}
