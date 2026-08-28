import { mkdirSync, readdirSync, readFileSync, realpathSync, rmSync, symlinkSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { scanGlob } from "../page/glob/glob.ts"

export type Package = {
  readonly dir: string
  readonly exports: Readonly<Record<string, string>> | null
}

export type Packages = ReadonlyMap<string, Package>

export const NO_PACKAGES: Packages = new Map()

const MANIFEST = "package.json"

const SCOPE = "@"

const WILDCARD = "*"

const HERE = "./"

const SELF = "."

function manifestIn(root: string, key: string): Readonly<Record<string, unknown>> | null {
  let text: string
  try {
    text = readFileSync(`${root}/${key}`, "utf8")
  } catch {
    return null
  }
  let held: unknown
  try {
    held = JSON.parse(text)
  } catch {
    return null
  }
  if (typeof held !== "object" || held === null || Array.isArray(held)) return null
  return held as Readonly<Record<string, unknown>>
}

function exportsIn(held: unknown): Readonly<Record<string, string>> | null {
  if (typeof held !== "object" || held === null || Array.isArray(held)) return null
  const found: Record<string, string> = {}
  for (const [subpath, target] of Object.entries(held)) {
    if (typeof target === "string") found[subpath] = target
  }
  return found
}

function dirsIn(root: string, globs: readonly unknown[]): readonly string[] {
  const found = new Set<string>()
  for (const glob of globs) {
    if (typeof glob !== "string") continue
    for (const at of scanGlob(`${glob}/${MANIFEST}`, root)) {
      found.add(at.slice(0, at.length - MANIFEST.length - 1))
    }
  }
  return [...found].sort()
}

export function packagesAt(root: string): Packages {
  const manifest = manifestIn(root, MANIFEST)
  if (manifest === null) return NO_PACKAGES
  const globs = manifest.workspaces
  if (!Array.isArray(globs)) return NO_PACKAGES
  const found = new Map<string, Package>()
  for (const dir of dirsIn(root, globs)) {
    const held = manifestIn(root, `${dir}/${MANIFEST}`)
    if (held === null) continue
    const name = held.name
    if (typeof name !== "string" || name.length === 0) continue
    if (found.has(name)) continue
    found.set(name, { dir, exports: exportsIn(held.exports) })
  }
  return found
}

function splitOf(specifier: string): readonly [string, string] | null {
  const parts = specifier.split("/")
  const count = specifier.startsWith(SCOPE) ? 2 : 1
  if (parts.length < count) return null
  return [parts.slice(0, count).join("/"), parts.slice(count).join("/")]
}

function bare(target: string): string {
  return target.startsWith(HERE) ? target.slice(HERE.length) : target
}

function patternsIn(exports: Readonly<Record<string, string>>): readonly (readonly [string, string])[] {
  const found: (readonly [string, string])[] = []
  for (const [subpath, target] of Object.entries(exports)) {
    if (subpath.includes(WILDCARD)) found.push([subpath, target])
  }
  return found.sort((one, two) => two[0].indexOf(WILDCARD) - one[0].indexOf(WILDCARD))
}

function withinOf(exports: Readonly<Record<string, string>> | null, subpath: string): string | null {
  if (exports === null) return subpath === SELF ? null : bare(subpath)
  const exact = exports[subpath]
  if (exact !== undefined) return bare(exact)
  for (const [pattern, target] of patternsIn(exports)) {
    const at = pattern.indexOf(WILDCARD)
    const head = pattern.slice(0, at)
    const tail = pattern.slice(at + 1)
    if (!subpath.startsWith(head) || !subpath.endsWith(tail)) continue
    if (subpath.length < head.length + tail.length) continue
    const filled = subpath.slice(head.length, subpath.length - tail.length)
    if (!target.includes(WILDCARD)) continue
    return bare(target.replace(WILDCARD, filled))
  }
  return null
}

export function pathOf(packages: Packages, specifier: string): string | null {
  if (specifier.startsWith(SELF) || specifier.startsWith("/")) return null
  const split = splitOf(specifier)
  if (split === null) return null
  const [name, rest] = split
  const held = packages.get(name)
  if (held === undefined) return null
  const within = withinOf(held.exports, rest === "" ? SELF : `${HERE}${rest}`)
  return within === null ? null : `${held.dir}/${within}`
}

const HELD = new Map<string, Packages>()

export function packagesFor(root: string): Packages {
  const held = HELD.get(root)
  if (held !== undefined) return held
  const found = packagesAt(root)
  HELD.set(root, found)
  return found
}

const MODULES = "node_modules"

function linkAt(real: string, at: string): void {
  mkdirSync(dirname(at), { recursive: true })
  rmSync(at, { recursive: true, force: true })
  symlinkSync(real, at)
}

function entriesIn(dir: string): readonly string[] {
  try {
    return readdirSync(dir)
  } catch {
    return []
  }
}

function holdersIn(root: string): readonly string[] {
  return ["", ...[...packagesAt(root).values()].map((held) => `${held.dir}/`)]
}

export function installedInto(root: string, dir: string): readonly string[] {
  const made: string[] = []
  for (const head of holdersIn(root)) {
    const from = `${root}/${head}${MODULES}`
    const into = `${dir}/${head}${MODULES}`
    for (const name of entriesIn(from)) {
      if (!name.startsWith(SCOPE)) {
        linkAt(`${from}/${name}`, `${into}/${name}`)
        made.push(`${head}${name}`)
        continue
      }
      for (const under of entriesIn(`${from}/${name}`)) {
        linkAt(`${from}/${name}/${under}`, `${into}/${name}/${under}`)
        made.push(`${head}${name}/${under}`)
      }
    }
  }
  return made.sort()
}

export function linkedInto(dir: string): readonly string[] {
  const made: string[] = []
  for (const [name, held] of packagesAt(dir)) {
    const target = resolve(dir, held.dir)
    let real: string
    try {
      real = realpathSync(target)
    } catch {
      continue
    }
    linkAt(real, `${dir}/${MODULES}/${name}`)
    made.push(name)
  }
  return made.sort()
}
