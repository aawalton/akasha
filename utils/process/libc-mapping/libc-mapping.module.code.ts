import { readFileSync } from "node:fs"

const MAPS = "/proc/self/maps"

const MAPPING = /^(libc\.so\.|libc-|libc\.musl-|ld-musl-)/

export function resolveMappedLibc(): string {
  for (const line of readFileSync(MAPS, "utf8").split("\n")) {
    const slash = line.indexOf("/")
    if (slash < 0) continue
    const path = line.slice(slash).replace(/ \(deleted\)$/, "")
    const base = path.slice(path.lastIndexOf("/") + 1)
    if (MAPPING.test(base)) return path
  }
  throw new Error(`no C library is mapped in ${MAPS}`)
}
