const stripDotSlash = (target: string): string =>
  target.startsWith("./") ? target.slice(2) : target

const joinPackageRel = (packagePath: string, target: string): string => {
  const t = stripDotSlash(target)
  if (packagePath === "") return t
  return `${packagePath}/${t}`
}

type ResolvePackageExportArgs = {
  readonly subPath: string | null
  readonly exports: Record<string, string> | null
  readonly packagePath: string
  readonly bareImportCandidates: readonly string[]
  readonly subPathExtensions: readonly string[]
  readonly acceptResolved: (path: string) => boolean
  readonly exists: (path: string) => boolean
}

const resolveExplicit = (
  target: string,
  packagePath: string,
  acceptResolved: (p: string) => boolean,
  exists: (p: string) => boolean
): string | null => {
  const resolved = joinPackageRel(packagePath, target)
  if (!acceptResolved(resolved)) return null
  if (!exists(resolved)) return null
  return resolved
}

const resolveWildcard = (
  subPath: string,
  exports: Record<string, string>,
  packagePath: string,
  acceptResolved: (p: string) => boolean,
  exists: (p: string) => boolean
): string | null => {
  for (const [pattern, target] of Object.entries(exports)) {
    if (!pattern.includes("*")) continue
    const starIdx = pattern.indexOf("*")
    const prefix = pattern.slice(0, starIdx)
    const suffix = pattern.slice(starIdx + 1)
    if (!subPath.startsWith(prefix)) continue
    if (suffix !== "" && !subPath.endsWith(suffix)) continue
    const matched = subPath.slice(
      prefix.length,
      suffix !== "" ? subPath.length - suffix.length : undefined
    )
    if (matched.includes("/")) continue

    const targetStarIdx = target.indexOf("*")
    if (targetStarIdx === -1) continue
    const resolvedTarget =
      target.slice(0, targetStarIdx) + matched + target.slice(targetStarIdx + 1)
    const resolved = joinPackageRel(packagePath, resolvedTarget)
    if (!acceptResolved(resolved)) return null
    if (!exists(resolved)) return null
    return resolved
  }
  return null
}

export const resolvePackageExport = (args: ResolvePackageExportArgs): string | null => {
  const {
    subPath,
    exports,
    packagePath,
    bareImportCandidates,
    subPathExtensions,
    acceptResolved,
    exists,
  } = args

  if (subPath === null) {
    if (exports !== null) {
      const dot = exports["."]
      if (typeof dot !== "string") return null
      return resolveExplicit(dot, packagePath, acceptResolved, exists)
    }
    for (const candidate of bareImportCandidates) {
      const resolved = joinPackageRel(packagePath, candidate)
      if (acceptResolved(resolved) && exists(resolved)) return resolved
    }
    return null
  }

  if (exports !== null) {
    const explicit = exports[subPath]
    if (typeof explicit === "string") {
      return resolveExplicit(explicit, packagePath, acceptResolved, exists)
    }
    return resolveWildcard(subPath, exports, packagePath, acceptResolved, exists)
  }

  const subPathBare = stripDotSlash(subPath)
  const lastSlash = subPathBare.lastIndexOf("/")
  const lastSegment = lastSlash >= 0 ? subPathBare.slice(lastSlash + 1) : subPathBare
  const hasExtension = lastSegment.includes(".")
  for (const ext of subPathExtensions) {
    if (ext !== "" && hasExtension) continue
    const resolved = joinPackageRel(packagePath, subPathBare + ext)
    if (acceptResolved(resolved) && exists(resolved)) return resolved
  }
  return null
}
