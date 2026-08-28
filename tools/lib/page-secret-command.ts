import { existsSync, readFileSync, statSync } from "node:fs"
import { defaultMessage, fail, land, toRelPath } from "./command.ts"
import { type Landing } from "../../repo/land/land"
import { diskFileTree } from "../../page/file-tree.ts"
import { compiledPageTypeFor } from "../../page/property/frontmatter.ts"
import { registryOf } from "../../page/property/registry.ts"
import { cipherFor, keysIn, sidecarFor, valuesIn, type Values } from "./page-secret.ts"
import { claimant } from "../../page/page-types.ts"
import { repoOf } from "./payload.ts"
import { type Roots } from "../../page/page"
import { resolveRoots, targetRepo, targetRoot } from "../../repo/roots/roots"
import { decodeUtf8 } from "../../utf8-body/utf8-body.ts"
import { notUtf8 } from "./utf8-body.ts"

const STDIN = "-"

export interface Target {
  readonly roots: Roots
  readonly root: string
  readonly relPath: string
  readonly sidecar: string
  readonly declared: readonly string[]
}

export interface Landed {
  readonly verb: string
  readonly message: string | undefined
  readonly dryRun: boolean
}

function secretsOn(relPath: string, roots: Roots): readonly string[] {
  const repo = targetRepo(roots)
  const tree = diskFileTree(roots)
  const claim = claimant(relPath, registryOf(tree))
  const type = claim.type
  if (type === null) {
    fail(
      `${relPath} in ${repo} — ${claim.why}, so nothing declares which of its properties are secret`
    )
  }
  const { properties, why } = compiledPageTypeFor(type, tree)
  if (properties === null) fail(`\`${type.slug}\` states no property set this can read: ${why}`)
  return properties
    .filter((one) => one.secret)
    .map((one) => one.name)
    .sort()
}

export function targetOf(filePath: string): Target {
  const roots = resolveRoots(repoOf(["--file-path", filePath]))
  const root = targetRoot(roots)
  const relPath = toRelPath(filePath, roots)
  const sidecar = sidecarFor(relPath)
  if (sidecar === null)
    fail(`${relPath} is not a \`.md\` page, and a sops file stands beside a page`)
  const at = `${root}/${relPath}`
  if (!existsSync(at) || !statSync(at).isFile()) {
    fail(`${relPath} is not a file here — a secret belongs to a page that stands`)
  }
  return { roots, root, relPath, sidecar, declared: secretsOn(relPath, roots) }
}

export function keysHeld(target: Target): readonly string[] {
  const at = `${target.root}/${target.sidecar}`
  return existsSync(at) ? keysIn(readFileSync(at, "utf8")) : []
}

export function heldIn(target: Target): Values {
  const at = `${target.root}/${target.sidecar}`
  if (!existsSync(at)) return new Map()
  const read = valuesIn(target.root, target.sidecar, readFileSync(at, "utf8"))
  if (read.values === null) fail(read.why)
  return read.values
}

export function refuseUndeclared(key: string, target: Target): void {
  if (target.declared.includes(key)) return
  const named =
    target.declared.length === 0 ? "declares none" : `declares ${target.declared.join(", ")}`
  fail(`\`${key}\` is no secret of ${target.relPath}'s page type, which ${named}`)
}

async function textGiven(valueFile: string | undefined): Promise<string> {
  if (valueFile === undefined || valueFile === STDIN) {
    const given = await Bun.stdin.bytes()
    return decodeUtf8(given) ?? fail(notUtf8("stdin", given))
  }
  const bytes = readFileSync(valueFile)
  return decodeUtf8(bytes) ?? fail(notUtf8(valueFile, bytes))
}

export async function valueGiven(valueFile: string | undefined): Promise<string> {
  const text = await textGiven(valueFile)
  const value = text.endsWith("\n") ? text.slice(0, -1) : text
  if (value === "")
    fail("the value arrived empty — a secret's value is taken on stdin or at --value-file")
  if (value.includes("\n")) fail("a secret's value is one line, and what arrived holds a newline")
  return value
}

export async function valuesGiven(valueFile: string | undefined, target: Target): Promise<Values> {
  const text = (await textGiven(valueFile)).trim()
  if (text === "") {
    fail(
      "the payload arrived empty — --json takes an object of key to value on stdin or at --value-file"
    )
  }
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch (thrown) {
    fail(
      `--json takes one JSON object and what arrived does not parse: ${thrown instanceof Error ? thrown.message : thrown}`
    )
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    fail("--json takes one JSON object of key to value, and what arrived is something else")
  }
  const given = new Map<string, string>()
  for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
    refuseUndeclared(key, target)
    if (typeof value !== "string")
      fail(`a secret's value is text, and \`${key}\` carries something else`)
    if (value === "") fail(`\`${key}\` arrived empty`)
    if (value.includes("\n")) fail(`a secret's value is one line, and \`${key}\` holds a newline`)
    given.set(key, value)
  }
  if (given.size === 0)
    fail("--json takes at least one key, and the object that arrived holds none")
  return given
}

function messageFor(target: Target, landed: Landed): string {
  const spelled = landed.message
  if (spelled !== undefined && spelled.trim() !== "") return spelled.trim()
  return defaultMessage(target.roots, landed.verb, [target.sidecar])
}

export function landing(target: Target, next: Values, landed: Landed): void {
  const composed = cipherFor(target.root, target.sidecar, next)
  if (composed.text === null) fail(composed.why)
  const back = valuesIn(target.root, target.sidecar, composed.text)
  if (back.values === null)
    fail(`what was composed for ${target.sidecar} does not read back: ${back.why}`)
  const unread = [...next.keys()].filter((key) => back.values.get(key) !== next.get(key))
  if (unread.length > 0 || back.values.size !== next.size) {
    fail(
      `${target.sidecar} does not read back what it was given for ${unread.map((key) => `\`${key}\``).join(", ")} — ` +
        "nothing was written"
    )
  }
  const entries: readonly Landing[] = [{ relPath: target.sidecar, body: composed.text }]
  land(target.roots, entries, messageFor(target, landed), landed.dryRun)
}

export function removing(target: Target, landed: Landed): void {
  land(target.roots, [], messageFor(target, landed), landed.dryRun, [target.sidecar])
}
