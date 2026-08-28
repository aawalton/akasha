export const tool = {
  summary: "Rename a TypeScript token and every reference the compiler resolves to it",
  path: "refactor rename-token",
} as const

import { existsSync, readFileSync, realpathSync, statSync } from "node:fs"
import { git } from "../repo/git/git.ts"
import { rejectUnknownFlags, repoFlag } from "./lib/payload.ts"
import { agentId } from "./lib/read-record.ts"
import { RENAME_TOKEN_HELP } from "./lib/rename-token-help.ts"
import { type Roots } from "../page/page.ts"
import { resolveRoots, targetRoot } from "../repo/roots/roots.ts"
import { codeRoot } from "./lib/code-root.ts"
import { defaultMessage, fail, land, operational, recordOwnRead } from "./lib/command.ts"
import { type Landing } from "../repo/land/land.ts"

const TAKES_VALUE = ["--repo", "--old", "--new", "--at", "--message", "--message-file"]
const STANDALONE = ["--dry-run"]

const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/
const IDENTIFIER_CHAR = /[A-Za-z0-9_$]/

interface Span {
  readonly start: number
  readonly length: number
}

interface Located {
  readonly fileName: string
  readonly textSpan: Span
}

interface Spot extends Located {
  readonly prefixText?: string
  readonly suffixText?: string
}

interface Service {
  getDefinitionAtPosition(fileName: string, position: number): readonly Located[] | undefined
  findRenameLocations(
    fileName: string,
    position: number,
    findInStrings: boolean,
    findInComments: boolean,
    preferences: { readonly providePrefixAndSuffixTextForRename: boolean }
  ): readonly Spot[] | undefined
}

interface Host {
  getScriptFileNames(): readonly string[]
  getScriptVersion(fileName: string): string
  getScriptSnapshot(fileName: string): unknown
  getCurrentDirectory(): string
  getCompilationSettings(): Record<string, unknown>
  getDefaultLibFileName(options: Record<string, unknown>): string
  fileExists(path: string): boolean
  readFile(path: string): string | undefined
}

interface Compiler {
  createLanguageService(host: Host): Service
  ScriptSnapshot: { fromString(text: string): unknown }
  getDefaultLibFilePath(options: Record<string, unknown>): string
  sys: { fileExists(path: string): boolean; readFile(path: string): string | undefined }
  ModuleKind: { Preserve: number }
  ScriptTarget: { ESNext: number }
}

interface Installed {
  readonly ts: Compiler
  readonly typeRoot: string
}

interface Rewrite extends Landing {
  readonly spots: number
  readonly at: number
}

interface Sighting {
  readonly fileName: string
  readonly at: number
}

async function installed(): Promise<Installed | null> {
  const beside = `${process.env.HOME ?? "/nonexistent"}/.bun/bin/tsc`
  const onPath = existsSync(beside) ? beside : Bun.which("tsc")
  const roads = [`${codeRoot()}/node_modules`]
  if (onPath !== null && existsSync(onPath)) {
    const segments = realpathSync(onPath).split("/")
    const at = segments.lastIndexOf("node_modules")
    if (at !== -1) roads.push(segments.slice(0, at + 1).join("/"))
  }
  for (const modules of roads) {
    const entry = `${modules}/typescript/lib/typescript.js`
    if (!existsSync(entry)) continue
    const loaded = (await import(entry)) as { readonly default?: Compiler }
    const ts = loaded.default ?? (loaded as unknown as Compiler)
    if (typeof ts.createLanguageService !== "function") continue
    return { ts, typeRoot: `${modules}/@types` }
  }
  return null
}

function sources(root: string): readonly string[] {
  const listed = git(root, ["ls-files", "-z"])
  if (listed.code !== 0) operational(`git could not list what ${root} tracks: ${listed.stderr}`)
  return listed.stdout.split("\0").filter((relPath) => relPath.endsWith(".ts"))
}

function bodyOf(path: string): string | null {
  try {
    return readFileSync(path, "utf8")
  } catch {
    return null
  }
}

function service(ts: Compiler, root: string, files: readonly string[], typeRoot: string): Service {
  const host: Host = {
    getScriptFileNames: () => files.map((relPath) => `${root}/${relPath}`),
    getScriptVersion: () => "1",
    getScriptSnapshot: (fileName) => {
      const text = bodyOf(fileName)
      return text === null ? undefined : ts.ScriptSnapshot.fromString(text)
    },
    getCurrentDirectory: () => root,
    getCompilationSettings: () => ({
      strict: true,
      noEmit: true,
      module: ts.ModuleKind.Preserve,
      target: ts.ScriptTarget.ESNext,
      allowImportingTsExtensions: true,
      types: ["bun"],
      typeRoots: [typeRoot],
      skipLibCheck: true,
    }),
    getDefaultLibFileName: (options) => ts.getDefaultLibFilePath(options),
    fileExists: (path) => ts.sys.fileExists(path),
    readFile: (path) => ts.sys.readFile(path),
  }
  return ts.createLanguageService(host)
}

function occurrencesIn(body: string, name: string): readonly number[] {
  const found: number[] = []
  let at = body.indexOf(name)
  while (at !== -1) {
    const before = at === 0 ? "" : body.slice(at - 1, at)
    const after = body.slice(at + name.length, at + name.length + 1)
    if (!IDENTIFIER_CHAR.test(before) && !IDENTIFIER_CHAR.test(after)) found.push(at)
    at = body.indexOf(name, at + 1)
  }
  return found
}

function keyOf(found: readonly Located[]): string {
  return found.map((one) => `${one.fileName}:${one.textSpan.start}`).sort().join(" ")
}

function lineOf(body: string, at: number): number {
  return body.slice(0, at).split("\n").length
}

function applied(body: string, spots: readonly Spot[], next: string): string {
  let out = body
  for (const spot of [...spots].sort((a, b) => b.textSpan.start - a.textSpan.start)) {
    const before = out.slice(0, spot.textSpan.start)
    const after = out.slice(spot.textSpan.start + spot.textSpan.length)
    out = `${before}${spot.prefixText ?? ""}${next}${spot.suffixText ?? ""}${after}`
  }
  return out
}

function currentMtime(root: string, relPath: string): number | null {
  try {
    return statSync(`${root}/${relPath}`).mtimeMs
  } catch {
    return null
  }
}

function flagOf(argv: readonly string[], name: string): string | null {
  const at = argv.indexOf(name)
  if (at === -1) return null
  const value = argv[at + 1]
  if (value === undefined) fail(`${name} needs a value`)
  return value
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2)
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(RENAME_TOKEN_HELP)
    return
  }
  rejectUnknownFlags(argv, TAKES_VALUE, STANDALONE)
  const roots: Roots = resolveRoots(repoFlag(argv))
  const root = targetRoot(roots)
  if (!existsSync(`${root}/.git`)) fail(`${root} is not a git repo`)

  const old = flagOf(argv, "--old")
  const next = flagOf(argv, "--new")
  if (old === null) fail("--old names the identifier to rename, and none was given")
  if (next === null) fail("--new names what it becomes, and none was given")
  if (!IDENTIFIER.test(old)) fail(`--old ${old} is not a legal TypeScript identifier`)
  if (!IDENTIFIER.test(next)) fail(`--new ${next} is not a legal TypeScript identifier`)
  if (old === next) fail("--old and --new are identical, so this asks for no change")

  const reachable = await installed()
  if (reachable === null) {
    fail(
      "no TypeScript carrying a language service is reachable — neither " +
        `\`node_modules/typescript\` under ${codeRoot()} nor whatever stands behind \`tsc\` on PATH. The 7.x native preview ` +
        "resolves symbols over LSP alone and is not one. This command will not fall back to bytes"
    )
    return
  }
  const files = sources(root)
  const bodies = new Map<string, string>()
  for (const relPath of files) {
    const body = bodyOf(`${root}/${relPath}`)
    if (body !== null) bodies.set(`${root}/${relPath}`, body)
  }

  const sightings: Sighting[] = []
  for (const [fileName, body] of bodies) {
    for (const at of occurrencesIn(body, old)) sightings.push({ fileName, at })
  }
  if (sightings.length === 0) fail(`no tracked TypeScript file under ${root} spells ${old}`)

  const resolver = service(reachable.ts, root, files, reachable.typeRoot)
  const declarations = new Map<string, readonly Located[]>()
  const unresolved: Sighting[] = []
  for (const sighting of sightings) {
    const found = resolver.getDefinitionAtPosition(sighting.fileName, sighting.at)
    if (found === undefined || found.length === 0) {
      unresolved.push(sighting)
      continue
    }
    declarations.set(keyOf(found), found)
  }
  if (declarations.size === 0) {
    fail(
      `${old} is spelled in ${sightings.length} place(s) and declares nothing the compiler can ` +
        "resolve — it is text rather than a symbol, so `replace.ts` is the command for it"
    )
  }
  const standing = [...declarations.values()]
  const whereOf = (found: readonly Located[]): string => {
    const one = found[0] as Located
    const body = bodies.get(one.fileName) ?? ""
    return `${one.fileName.slice(root.length + 1)}:${lineOf(body, one.textSpan.start)}`
  }
  const listed = standing.map((found) => `        ${whereOf(found)}`).sort().join("\n")
  const anchoredAt = flagOf(argv, "--at")
  const chosen =
    anchoredAt === null ? standing : standing.filter((found) => whereOf(found) === anchoredAt)
  if (chosen.length === 0) {
    fail(`--at ${anchoredAt} names no declaration of ${old}. These are the ones standing:\n${listed}`)
  }
  if (chosen.length > 1) {
    fail(
      `${old} names ${chosen.length} separate declarations, so name the one you mean with ` +
        `--at <path>:<line>:\n${listed}`
    )
  }

  const declared = chosen[0] as readonly Located[]
  const anchor = declared[0] as Located
  const spots = resolver.findRenameLocations(anchor.fileName, anchor.textSpan.start, false, false, {
    providePrefixAndSuffixTextForRename: true,
  })
  if (spots === undefined || spots.length === 0) {
    fail(`the compiler resolved ${old} but offered no position to rename, so nothing was written`)
    return
  }

  const grouped = new Map<string, Spot[]>()
  for (const spot of spots) {
    grouped.set(spot.fileName, [...(grouped.get(spot.fileName) ?? []), spot])
  }
  const foreign = [...grouped.keys()].filter((fileName) => !bodies.has(fileName))
  if (foreign.length > 0) {
    fail(
      `renaming ${old} would reach ${foreign.join(", ")}, which this repo does not track — the ` +
        "name is declared outside it and is not ours to rename"
    )
  }

  const found: Rewrite[] = []
  for (const [fileName, spotsHere] of grouped) {
    const relPath = fileName.slice(root.length + 1)
    const body = bodies.get(fileName) as string
    found.push({
      relPath,
      body: applied(body, spotsHere, next),
      spots: spotsHere.length,
      at: statSync(fileName).mtimeMs,
    })
  }

  const renamed = found.reduce((sum, one) => sum + one.spots, 0)
  process.stderr.write(
    [
      `rename: ${found.length} file(s), ${renamed} reference(s) to ${old}`,
      ...found.map((one) => `        ${one.relPath}  ${one.spots}`),
    ].join("\n") + "\n"
  )
  if (unresolved.length > 0) {
    const where = new Set(unresolved.map((one) => one.fileName.slice(root.length + 1)))
    process.stderr.write(
      `left alone: ${unresolved.length} spelling(s) of ${old} in ${where.size} file(s) resolve to ` +
        `no symbol — comments, strings and unrelated names. \`replace.ts\` is the command for those:\n` +
        [...where].sort().map((relPath) => `        ${relPath}`).join("\n") + "\n"
    )
  }

  const agent = agentId()
  for (const one of found) recordOwnRead(agent, one.relPath, roots)

  const moved = found.filter((one) => currentMtime(root, one.relPath) !== one.at)
  if (moved.length > 0) {
    fail(
      `${moved.map((one) => one.relPath).join(", ")} changed after this call read it, so the body ` +
        "composed for it is not the body on disk — nothing was written; run it again"
    )
  }

  const messageFile = flagOf(argv, "--message-file")
  const paths = found.map((one) => one.relPath)
  const message =
    messageFile !== null
      ? readFileSync(messageFile, "utf8").trim()
      : (flagOf(argv, "--message") ?? defaultMessage(roots, "rename-token", paths))
  land(roots, found, message, argv.includes("--dry-run"), [], [], true)
}

if (import.meta.main) await main()
