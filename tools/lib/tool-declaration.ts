
import { type Repo as Addressable } from "../../page/document/types"
import { isAddressable } from "../../repo/roots/roots"

const DECLARED =
  /^export const tool = \{\n  summary: (".*"),\n  repos: (\[.*\]),\n(  collapsed: true,\n)?\} as const$/m

const STANDING = /^export const tool = \{\n  summary: (".*"),\n  path: (".*"),\n\} as const$/m

export interface ToolDeclaration {
  readonly summary: string
  readonly repos?: readonly Addressable[]
  readonly collapsed?: true
  readonly path?: readonly string[]
}

function parsed(text: string): unknown {
  try {
    return JSON.parse(text)
  } catch {
    return undefined
  }
}

function summaryIn(text: string): string | null {
  const summary = parsed(text)
  return typeof summary === "string" && summary.trim() !== "" ? summary : null
}

function underRepos(source: string): ToolDeclaration | null {
  const found = source.match(DECLARED)
  if (found === null) return null
  const summary = summaryIn(found[1] as string)
  if (summary === null) return null
  const named = parsed(found[2] as string)
  if (!Array.isArray(named)) return null
  const repos = named.filter((one): one is Addressable => typeof one === "string" && isAddressable(one))
  if (repos.length === 0) return null
  return found[3] === undefined ? { summary, repos } : { summary, repos, collapsed: true }
}

function atItsOwnPath(source: string): ToolDeclaration | null {
  const found = source.match(STANDING)
  if (found === null) return null
  const summary = summaryIn(found[1] as string)
  if (summary === null) return null
  const where = parsed(found[2] as string)
  if (typeof where !== "string") return null
  const path = where.split(" ").filter((one) => one !== "")
  return path.length === 0 ? null : { summary, path }
}

export function declarationIn(source: string): ToolDeclaration | null {
  return underRepos(source) ?? atItsOwnPath(source)
}

export function declaresCommand(source: string): boolean {
  return declarationIn(source) !== null
}
