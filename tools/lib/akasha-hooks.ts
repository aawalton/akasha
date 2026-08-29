import { existsSync } from "node:fs"
import { createRequire } from "node:module"
import { join } from "node:path"

import { everyOfType, indexIn } from "../../akasha/pages-system/index/index-reading.module.code.ts"

const PAGE_TYPE = "agent-hook"

const ENDING = ".ts"

const CODE = ".code.ts"

const TIMEOUT = 5

const HOME_ROOT = "$HOME/repos/akasha"

const BUN = "$HOME/.bun/bin/bun"

const HOOKS_AT = ".git/data/index/identity/agent-hook/slug"

export interface HookCommand {
  readonly type: "command"
  readonly command: string
  readonly timeout: number
}

export interface HookRegistration {
  readonly matcher: string
  readonly hooks: readonly HookCommand[]
}

const reach = createRequire(import.meta.url)

function pageAt(root: string, path: string): Record<string, unknown> {
  let mod: Record<string, unknown>
  try {
    mod = reach(join(root, path)) as Record<string, unknown>
  } catch (cause) {
    throw new Error(
      `${path} is an agent hook page and would not load, so what it registers could not be read: ` +
        `${cause instanceof Error ? cause.message : String(cause)}`
    )
  }
  for (const value of Object.values(mod)) {
    if (value === null || typeof value !== "object" || Array.isArray(value)) continue
    const said = value as Record<string, unknown>
    if (said["pageTypeSlug"] === PAGE_TYPE) return said
  }
  throw new Error(`${path} is an agent hook page and answers to no page a reader can register`)
}

function namesIn(said: unknown): readonly string[] | null {
  if (!Array.isArray(said)) return null
  return said.every((one) => typeof one === "string" && one !== "")
    ? (said as readonly string[])
    : null
}

export function commandFor(codePath: string): string {
  return `${BUN} ${HOME_ROOT}/${codePath}`
}

export function hooksFrom(root: string): Record<string, HookRegistration[]> {
  if (!existsSync(join(indexIn(root), "identity", PAGE_TYPE, "slug"))) {
    throw new Error(
      `\`${HOOKS_AT}\` is not there, so which hooks stand could not be answered — an index that ` +
        "is missing is not an index naming no hook"
    )
  }
  const found: Record<string, HookRegistration[]> = {}
  const seen = new Set<string>()
  for (const standing of everyOfType(root, PAGE_TYPE)) {
    if (seen.has(standing.path)) continue
    seen.add(standing.path)
    const page = pageAt(root, standing.path)
    const slug = page["slug"]
    const runsAt = namesIn(page["runsAt"])
    if (runsAt === null || runsAt.length === 0) {
      throw new Error(`\`${String(slug)}\` is an agent hook and names no event it runs at`)
    }
    const overTools = namesIn(page["overTools"])
    if (!standing.path.endsWith(ENDING)) {
      throw new Error(`\`${String(slug)}\` is an agent hook and its page is not named \`${ENDING}\``)
    }
    const codePath = `${standing.path.slice(0, -ENDING.length)}${CODE}`
    if (!existsSync(join(root, codePath))) {
      throw new Error(`\`${String(slug)}\` is an agent hook and ${codePath} is not there to run`)
    }
    const command: HookCommand = { type: "command", command: commandFor(codePath), timeout: TIMEOUT }
    for (const event of runsAt) {
      const into = found[event] ?? []
      into.push({ matcher: overTools === null ? "" : overTools.join("|"), hooks: [command] })
      found[event] = into
    }
  }
  if (seen.size === 0) {
    throw new Error(
      `\`${HOOKS_AT}\` names no hook, so nothing would guard any tool call and a clean launch ` +
        "would mean nothing"
    )
  }
  return found
}

export function hooksMerged(
  stated: unknown,
  derived: Record<string, HookRegistration[]>
): Record<string, unknown> {
  const held: Record<string, unknown> =
    stated !== null && typeof stated === "object" && !Array.isArray(stated)
      ? { ...(stated as Record<string, unknown>) }
      : {}
  for (const [event, registrations] of Object.entries(derived)) {
    const standing = held[event]
    held[event] = Array.isArray(standing) ? [...standing, ...registrations] : [...registrations]
  }
  return held
}
