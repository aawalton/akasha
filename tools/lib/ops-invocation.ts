import { existsSync } from "node:fs"
import { akashaPathFor } from "../ops/akasha.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots"

const COMMAND_DIR = "/tools/commands/"

const TS_SUFFIX = ".ts"

const AKASHA_PAGE_SUFFIX = ".command.md"

const DISPATCHER = "tools/ops/cli.ts"

export interface OpsInvocation {
  readonly root: string
  readonly path: readonly string[]
}

function akashaInvocationOf(entryPath: string): OpsInvocation | null {
  const page = `${entryPath.slice(0, -TS_SUFFIX.length)}${AKASHA_PAGE_SUFFIX}`
  if (!existsSync(page)) return null
  const path = akashaPathFor(page)
  if (path === null) return null
  try {
    return { root: rootFor(resolveRoots(), AKASHA), path }
  } catch {
    return null
  }
}

export function opsInvocationOf(entryPath: string): OpsInvocation | null {
  if (!entryPath.endsWith(TS_SUFFIX)) return null
  const marked = entryPath.startsWith("/") ? entryPath : `/${entryPath}`
  const at = marked.lastIndexOf(COMMAND_DIR)
  if (at !== -1) {
    const under = marked.slice(at + COMMAND_DIR.length, -TS_SUFFIX.length)
    if (under !== "") return { root: marked.slice(0, at), path: under.split("/") }
  }
  return akashaInvocationOf(marked)
}

export function opsSpelling(invocation: OpsInvocation): string {
  return `ops ${invocation.path.join(" ")}`
}

export function opsArgv(invocation: OpsInvocation): readonly string[] {
  const root = invocation.root === "" ? "." : invocation.root
  return ["bun", `${root}/${DISPATCHER}`, ...invocation.path]
}
