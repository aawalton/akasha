
import { createHash } from "node:crypto"
import { readFileSync, realpathSync, statSync } from "node:fs"
import { dirname, join, relative, resolve } from "node:path"

const ENTRYPOINT_REL = "model-gateway/main.ts"

// An import is a statement, so the keyword opening one stands at the head of its line. Anchoring
// there is what keeps a specifier QUOTED INSIDE A BODY out of the closure: `seat-page-akasha.ts`
// composes a seat page whose first line is an import, and read as one it named a file in `tools/`
// that has never existed, which crashed every supervisor boot rather than leaving the hash short.
const SPECIFIER = /^[^\S\n]*(?:import|export)\b[^;'"`]*?["']([^"']+)["']/gm

function realOrGiven(path: string): string {
  try {
    return realpathSync(path)
  } catch {
    return path
  }
}

function libDir(): string {
  return realOrGiven(dirname(new URL(import.meta.url).pathname))
}

function instructionsRoot(): string {
  return resolve(libDir(), "..", "..")
}

export function modelGatewayEntrypoint(): string {
  return join(libDir(), ENTRYPOINT_REL)
}

function isRelative(specifier: string): boolean {
  return specifier.startsWith("./") || specifier.startsWith("../")
}

function readSource(absolute: string, reachedFrom: string | null): string {
  try {
    if (!statSync(absolute).isFile()) throw new Error("not a file")
    return readFileSync(absolute, "utf8")
  } catch {
    const via = reachedFrom === null ? "the entrypoint" : `imported by ${reachedFrom}`
    throw new Error(
      `model-gateway-tree-version: ${absolute} (${via}) is not a readable file. The version ` +
        "stamp is what tells a supervisor its gateway changed, so a member of the closure that " +
        "cannot be read leaves the hash and its edits stop respawning anything."
    )
  }
}

function isFileAt(absolute: string): boolean {
  try {
    return statSync(absolute).isFile()
  } catch {
    return false
  }
}

// Most of this repository writes a relative import with its `.ts` on, and hundreds of them leave it
// off, which the runtime resolves either way. So this walk resolves it the same way rather than
// refusing: the extension as written, then `<specifier>.ts`, then `<specifier>/index.ts`. A
// specifier none of those find is still refused, because a member the walk cannot name leaves the
// hash short and a gateway edit under it stops respawning anything.
function resolveImport(root: string, specifier: string, fromAbsolute: string): string {
  const at = resolve(dirname(fromAbsolute), specifier)
  for (const candidate of [at, `${at}.ts`, `${at}/index.ts`]) {
    if (isFileAt(candidate)) return realOrGiven(candidate)
  }
  throw new Error(
    `model-gateway-tree-version: ${relative(root, fromAbsolute)} imports "${specifier}", which ` +
      "names no file as written, with `.ts` on it, or as a directory holding `index.ts`. This walk " +
      "resolves nothing further, so such an import would leave the hash without a word — teach " +
      "this module the resolution it needs."
  )
}

export function collectVersionTreeFilesFrom(root: string, entrypoint: string): readonly string[] {
  const seen = new Set<string>()
  const queue: { absolute: string; reachedFrom: string | null }[] = [
    { absolute: entrypoint, reachedFrom: null },
  ]
  while (queue.length > 0) {
    const next = queue.shift()
    if (next === undefined || seen.has(next.absolute)) continue
    seen.add(next.absolute)
    const source = readSource(next.absolute, next.reachedFrom)
    const here = relative(root, next.absolute)
    for (const match of source.matchAll(SPECIFIER)) {
      const specifier = match[1]
      if (specifier === undefined || !isRelative(specifier)) continue
      const absolute = resolveImport(root, specifier, next.absolute)
      if (!seen.has(absolute)) queue.push({ absolute, reachedFrom: here })
    }
  }
  return [...seen].map((absolute) => relative(root, absolute)).toSorted()
}

export function computeVersionTreeHashFrom(root: string, entrypoint: string): string {
  const perFileLines = collectVersionTreeFilesFrom(root, entrypoint).map((rel) => {
    const hash = createHash("sha256").update(readFileSync(join(root, rel))).digest("hex")
    return `${hash}  ${rel}`
  })
  return createHash("sha256")
    .update(`${perFileLines.join("\n")}\n`)
    .digest("hex")
}

export function collectModelGatewayVersionTreeFiles(): readonly string[] {
  return collectVersionTreeFilesFrom(instructionsRoot(), modelGatewayEntrypoint())
}

export function computeModelGatewayTreeVersion(): string {
  return computeVersionTreeHashFrom(instructionsRoot(), modelGatewayEntrypoint())
}
