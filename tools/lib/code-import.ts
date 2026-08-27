
import { existsSync } from "node:fs"
import { createRequire } from "node:module"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots.ts"
import { codeRoot } from "./code-root.ts"

export class CodeImportError extends Error {}

const PATH_ENDING = ".ts"

export type CodeRefKind = "path" | "specifier"

export function codeRefKind(ref: string): CodeRefKind {
  return ref.endsWith(PATH_ENDING) ? "path" : "specifier"
}

function besideCode(): readonly string[] {
  const roots = resolveRoots()
  return [rootFor(roots, AKASHA)].filter((one): one is string => typeof one === "string")
}

export function codeRefFile(ref: string, root: string = codeRoot()): string {
  if (codeRefKind(ref) === "path") {
    const here = `${root}/${ref}`
    if (existsSync(here)) return here
    for (const other of besideCode()) {
      if (existsSync(`${other}/${ref}`)) return `${other}/${ref}`
    }
    return here
  }
  try {
    return Bun.resolveSync(ref, root)
  } catch {}
  // The packages are moving out of the code repository. While a name stands in
  // more than one place, a specifier the code root cannot resolve is looked for
  // where they are landing and where they are leaving, so no verb dies mid-move
  // just because its module has already gone on ahead.
  for (const other of besideCode()) {
    try {
      return Bun.resolveSync(ref, other)
    } catch {}
  }
  throw new CodeImportError(
    `\`${ref}\` resolves to nothing from ${root}, nor from ${besideCode().join(" or ")} — a reference without a \`.ts\` ending is read as a package specifier through that package's own \`exports\` map, never as a file path`
  )
}

export async function codeModule<T>(ref: string, root: string = codeRoot()): Promise<T> {
  const file = codeRefFile(ref, root)
  try {
    return (await import(file)) as T
  } catch (err) {
    throw new CodeImportError(
      `\`${ref}\` could not be loaded from ${root}: ${err instanceof Error ? err.message : String(err)}`
    )
  }
}

const requireHere = createRequire(import.meta.url)

export function codeModuleSync<T>(ref: string, root: string = codeRoot()): T {
  const file = codeRefFile(ref, root)
  try {
    return requireHere(file) as T
  } catch (err) {
    throw new CodeImportError(
      `\`${ref}\` could not be loaded synchronously from ${root}: ${err instanceof Error ? err.message : String(err)}`
    )
  }
}
