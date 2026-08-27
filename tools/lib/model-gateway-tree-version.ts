
import { createHash } from "node:crypto"
import { readFileSync, realpathSync, statSync } from "node:fs"
import { dirname, join, relative, resolve } from "node:path"

const ENTRYPOINT_REL = "model-gateway/main.ts"

const SPECIFIER = /(?:\bfrom|\bimport)\s*\(?\s*["']([^"']+)["']/g

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

function resolveImport(root: string, specifier: string, fromAbsolute: string): string {
  if (!specifier.endsWith(".ts")) {
    throw new Error(
      `model-gateway-tree-version: ${relative(root, fromAbsolute)} imports "${specifier}", a ` +
        "relative specifier carrying no `.ts` extension. This walk resolves nothing, so such an " +
        "import would leave the hash without a word — give it its extension, or teach this " +
        "module the resolution it needs."
    )
  }
  return realOrGiven(resolve(dirname(fromAbsolute), specifier))
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
