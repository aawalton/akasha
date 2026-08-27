import { existsSync, readFileSync } from "node:fs"
import { codeRoot } from "./code-root.ts"
import { commas, evaluate, mappingsIn, opens, through } from "./code-literal.ts"
import { ownTypeScript } from "./own-typescript.ts"
import { isAddressable } from "../../repo/roots/roots"

const FIXTURES = "tools/tests/"

const TESTS = ".test.ts"

const REACHERS = ["codeModule", "codeModuleSync"]

const DEFINES = new RegExp(`^export (?:async )?function (?:${REACHERS.join("|")})\\b`, "m")

const BINDING = /^(?:export )?const ([A-Za-z_$][\w$]*)(?::[^=\n]*)? =([^\n]*(?:\n[ \t][^\n]*)*)/gm

const IMPORTED = /^import\s*(?:type\s*)?\{([\s\S]*?)\}\s*from\s*"([^"]+)"/gm


const NAMED = /(packages\/[A-Za-z0-9._@/-]*\.ts)\b/g

const NAMED_OTHER =
  /(packages\/[A-Za-z0-9._@/-]*\.(?:tsx|sh|mjs|cjs|js|py|json|ya?ml|css|crt|sql|toml))\b/g

const OWN_FILE = /\.{1,2}\/$/

const TEMPLATE = /`(?:[^`\\]|\\[\s\S])*`/g

const CODE_REPO = "code"

const NODE_ID_PREFIX = /([a-z0-9-]+):([a-z][a-z0-9-]*):$/

const PREFIX_WINDOW = 80

const NODE_ID_HOLE = new RegExp(`^\`[a-z0-9-]+:${CODE_REPO}:[^\`]*\\$\\{`)

const FIELD = /^[A-Za-z_$][\w$]*\.([A-Za-z_$][\w$]*)$/

const NAME = /^[A-Za-z_$][\w$]*$/

// A REF ENDING `.ts` IS A PATH AND ANYTHING ELSE A PACKAGE SPECIFIER, read through that
// package's own `exports` map.
export type CodeRefKind = "path" | "specifier"

export function codeRefKind(ref: string): CodeRefKind {
  return ref.endsWith(".ts") ? "path" : "specifier"
}

export interface Reach {
  readonly ref: string
  readonly kind: CodeRefKind
  readonly sites: readonly string[]
  readonly handed: readonly string[]
}

export interface Unfollowed {
  readonly site: string
  readonly expression: string
}

export interface Reaches {
  readonly scanned: number
  readonly reaches: readonly Reach[]
  readonly ambiguous: readonly Reach[]
  readonly unfollowed: readonly Unfollowed[]
}


function normalize(path: string): string {
  const out: string[] = []
  for (const part of path.split("/")) {
    if (part === "" || part === ".") continue
    if (part === "..") out.pop()
    else out.push(part)
  }
  return out.join("/")
}






export function codeReachFiles(root: string): readonly string[] {
  return ownTypeScript(root).filter(
    (relPath) => !relPath.startsWith(FIXTURES) && !relPath.endsWith(TESTS)
  )
}

export interface ReachSource {
  readonly files: readonly string[]
  readonly read: (relPath: string) => string
  readonly holdsHere: (relPath: string) => boolean
  readonly holdsThere: (relPath: string) => boolean
}

export function diskReachSource(root: string, there?: string): ReachSource {
  const other = there ?? codeRoot()
  return {
    files: codeReachFiles(root),
    read: (relPath) => {
      try {
        return readFileSync(`${root}/${relPath}`, "utf8")
      } catch {
        return ""
      }
    },
    holdsHere: (relPath) => existsSync(`${root}/${relPath}`),
    holdsThere: (relPath) => existsSync(`${other}/${relPath}`),
  }
}

export function codeReaches(from: string | ReachSource, there?: string): Reaches {
  const source = typeof from === "string" ? diskReachSource(from, there) : from
  const files = source.files
  const bodies = new Map<string, string>()
  const read = (relPath: string): string => {
    const had = bodies.get(relPath)
    if (had !== undefined) return had
    const body = source.read(relPath)
    bodies.set(relPath, body)
    return body
  }

  const importsOf = (relPath: string): readonly (readonly [string, string, string])[] => {
    const dir = relPath.split("/").slice(0, -1).join("/")
    const found: (readonly [string, string, string])[] = []
    for (const match of read(relPath).matchAll(IMPORTED)) {
      const spec = match[2] as string
      if (!spec.startsWith(".") || !spec.endsWith(".ts")) continue
      const target = normalize(`${dir}/${spec}`)
      for (const clause of (match[1] as string).split(",")) {
        const named = clause.trim().replace(/^type\s+/, "")
        if (named === "") continue
        const split = named.split(/\s+as\s+/)
        const from = (split[0] as string).trim()
        found.push([target, from, (split[1] ?? from).trim()])
      }
    }
    return found
  }

  const known = new Map<string, ReadonlyMap<string, string>>()
  const open = new Set<string>()
  const bindings = (relPath: string): ReadonlyMap<string, string> => {
    const had = known.get(relPath)
    if (had !== undefined) return had
    if (open.has(relPath)) return new Map()
    open.add(relPath)
    const env = new Map<string, string>()
    for (const [target, from, as] of importsOf(relPath)) {
      const held = bindings(target).get(from)
      if (held !== undefined) env.set(as, held)
    }
    for (const match of read(relPath).matchAll(BINDING)) {
      const value = evaluate(match[2] as string, env)
      if (value !== null) env.set(match[1] as string, value)
    }
    open.delete(relPath)
    known.set(relPath, env)
    return env
  }

  const sitesOf = new Map<string, Set<string>>()
  const handedOf = new Map<string, Set<string>>()
  const unfollowed: Unfollowed[] = []
  const wrappers = new Map<string, Map<string, string>>()
  const note = (ref: string, site: string): void => {
    const sites = sitesOf.get(ref) ?? new Set<string>()
    sites.add(site)
    sitesOf.set(ref, sites)
  }
  const certain = new Set<string>()
  const bothHold = (ref: string): boolean => source.holdsHere(ref) && source.holdsThere(ref)
  const hand = (ref: string, site: string): void => {
    note(ref, site)
    certain.add(ref)
    const sites = handedOf.get(ref) ?? new Set<string>()
    sites.add(site)
    handedOf.set(ref, sites)
  }

  let scanned = 0
  for (const relPath of files) {
    scanned++
    const source = read(relPath)
    if (DEFINES.test(source)) continue
    const calls = importsOf(relPath)
      .filter(([, from]) => REACHERS.includes(from))
      .map(([, , as]) => as)
    if (calls.length === 0) continue
    const env = bindings(relPath)
    const mapped = mappingsIn(source)
    const reaching = new RegExp(`\\b(?:${calls.join("|")})\\b`, "g")
    for (const match of source.matchAll(reaching)) {
      const from = opens(source, (match.index as number) + (match[0] as string).length)
      if (from === null) continue
      const argument = through(source, from, ",")
      const value = evaluate(argument, env)
      if (value !== null) {
        hand(value, relPath)
        continue
      }
      if (NAME.test(argument)) {
        const over = mapped
          .filter((one) => one.param === argument && one.from < from)
          .sort((a, b) => b.from - a.from)[0]
        const values = over === undefined ? null : commas(over.over).map((part) => evaluate(part, env))
        if (values !== null && values.every((one) => one !== null) && values.length > 0) {
          for (const one of values) hand(one as string, relPath)
          continue
        }
      }
      const field = argument.match(FIELD)
      if (field !== null) {
        const fields = wrappers.get(relPath) ?? new Map<string, string>()
        fields.set(field[1] as string, argument)
        wrappers.set(relPath, fields)
        continue
      }
      unfollowed.push({ site: relPath, expression: argument })
    }
  }

  for (const [wrapper, fields] of wrappers) {
    for (const [field, expression] of fields) {
      const carries = new RegExp(`\\b${field}:\\s*`, "g")
      let found = 0
      for (const relPath of files) {
        if (relPath === wrapper) continue
        if (!importsOf(relPath).some(([target]) => target === wrapper)) continue
        const source = read(relPath)
        const env = bindings(relPath)
        for (const match of source.matchAll(carries)) {
          const value = evaluate(through(source, (match.index as number) + (match[0] as string).length, ",}"), env)
          if (value === null) continue
          hand(value, relPath)
          found++
        }
      }
      if (found === 0) unfollowed.push({ site: wrapper, expression })
    }
  }

  const namesOwnFile = (body: string, at: number): boolean =>
    OWN_FILE.test(body.slice(Math.max(0, at - 3), at))

  const repoNamed = (text: string, at: number): string | null => {
    const found = NODE_ID_PREFIX.exec(text.slice(Math.max(0, at - PREFIX_WINDOW), at))
    const repo = found?.[2]
    return repo !== undefined && isAddressable(repo) ? repo : null
  }

  const namesOneTree = (repo: string | null, ref: string): boolean =>
    repo === CODE_REPO || (repo === null && !bothHold(ref))

  const alreadyLoud = new Set<string>()
  const namesIn = (text: string, site: string, guarded: boolean): void => {
    for (const match of text.matchAll(NAMED)) {
      const ref = match[1]
      if (ref === undefined) continue
      const at = match.index as number
      if (guarded && namesOwnFile(text, at)) continue
      const repo = repoNamed(text, at)
      if (repo !== null && repo !== CODE_REPO) continue
      note(ref, site)
      if (namesOneTree(repo, ref)) certain.add(ref)
    }
    for (const match of text.matchAll(NAMED_OTHER)) {
      const ref = match[1]
      if (ref === undefined) continue
      const at = match.index as number
      if (guarded && namesOwnFile(text, at)) continue
      if (!namesOneTree(repoNamed(text, at), ref)) continue
      const loud = `${site}\t${ref}`
      if (alreadyLoud.has(loud)) continue
      alreadyLoud.add(loud)
      unfollowed.push({ site, expression: ref })
    }
  }

  for (const relPath of files) {
    const body = read(relPath)
    namesIn(body, relPath, true)
    const env = bindings(relPath)
    for (const match of body.matchAll(TEMPLATE)) {
      const template = match[0] as string
      const joined = evaluate(template, env)
      if (joined !== null) {
        namesIn(joined, relPath, false)
        continue
      }
      if (!NODE_ID_HOLE.test(template)) continue
      const at = `${relPath}\t${template}`
      if (alreadyLoud.has(at)) continue
      alreadyLoud.add(at)
      unfollowed.push({ site: relPath, expression: template })
    }
  }

  const found = [...sitesOf.entries()]
    .sort(([one], [two]) => (one < two ? -1 : one > two ? 1 : 0))
    .map(([ref, sites]) => ({
      ref,
      kind: codeRefKind(ref),
      sites: [...sites].sort(),
      handed: [...(handedOf.get(ref) ?? [])].sort(),
    }))
  return {
    scanned,
    reaches: found.filter((one) => certain.has(one.ref)),
    ambiguous: found.filter((one) => !certain.has(one.ref)),
    unfollowed: unfollowed.sort((one, two) =>
      one.site === two.site ? (one.expression < two.expression ? -1 : 1) : one.site < two.site ? -1 : 1
    ),
  }
}
