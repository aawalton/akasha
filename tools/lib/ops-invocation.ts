const COMMAND_DIR = "/tools/commands/"

const TS_SUFFIX = ".ts"

const DISPATCHER = "tools/ops/cli.ts"

export interface OpsInvocation {
  readonly root: string
  readonly path: readonly string[]
}

export function opsInvocationOf(entryPath: string): OpsInvocation | null {
  if (!entryPath.endsWith(TS_SUFFIX)) return null
  const marked = entryPath.startsWith("/") ? entryPath : `/${entryPath}`
  const at = marked.lastIndexOf(COMMAND_DIR)
  if (at === -1) return null
  const under = marked.slice(at + COMMAND_DIR.length, -TS_SUFFIX.length)
  if (under === "") return null
  return { root: marked.slice(0, at), path: under.split("/") }
}

export function opsSpelling(invocation: OpsInvocation): string {
  return `ops ${invocation.path.join(" ")}`
}

export function opsArgv(invocation: OpsInvocation): readonly string[] {
  const root = invocation.root === "" ? "." : invocation.root
  return ["bun", `${root}/${DISPATCHER}`, ...invocation.path]
}
