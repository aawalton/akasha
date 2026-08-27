
import { type Dirent, existsSync, readdirSync, readFileSync } from "node:fs"
import { REPOS as ADDRESSABLE, akashaRoot } from "../../repo/roots/roots.ts"
import { declarationIn, type ToolDeclaration } from "../lib/tool-declaration.ts"
import type { Command, CommandModule } from "./surface.ts"
import type { ForwardRepo } from "./tool-forward.ts"

const TOOLS_DIR = "tools"
const EXT = ".ts"

interface DeclaringTool {
  readonly name: string
  readonly declaration: ToolDeclaration
}

function declaringTools(root: string): readonly DeclaringTool[] {
  const dir = `${root}/${TOOLS_DIR}`
  if (!existsSync(dir)) return []
  const entries: readonly Dirent[] = readdirSync(dir, { withFileTypes: true })
  const files = entries
    .filter((one) => one.isFile() && one.name.endsWith(EXT) && one.name.length > EXT.length)
    .map((one) => one.name)
    .sort()
  const found: DeclaringTool[] = []
  for (const fileName of files) {
    const declaration = declarationIn(readFileSync(`${dir}/${fileName}`, "utf8"))
    if (declaration === null) continue
    found.push({ name: fileName.slice(0, -EXT.length), declaration })
  }
  return found
}

function forwarder(
  name: string,
  summary: string,
  repo: ForwardRepo | null,
  path: readonly string[]
): Command {
  return {
    path,
    summary,
    load: async (): Promise<CommandModule> => {
      const { forwardHelp, forwardRunner } = await import("./tool-forward.ts")
      return { default: forwardRunner(name, repo), help: forwardHelp(name, summary, repo) }
    },
  }
}

function forwardNamespaces(tools: readonly DeclaringTool[]): readonly ForwardRepo[] {
  const declared = new Set<string>()
  for (const tool of tools) {
    for (const repo of tool.declaration.repos ?? []) declared.add(repo)
  }
  return ADDRESSABLE.filter((repo) => declared.has(repo))
}

export function forwarderCommands(root: string = akashaRoot()): readonly Command[] {
  const tools = declaringTools(root)
  const addressed = forwardNamespaces(tools)
  const addresses = (tool: DeclaringTool, repo: ForwardRepo): boolean =>
    (tool.declaration.repos ?? []).includes(repo)
  const collapsed = tools
    .filter((tool) => tool.declaration.collapsed === true)
    .filter((tool) => addressed.some((repo) => addresses(tool, repo)))
    .map((tool) => forwarder(tool.name, tool.declaration.summary, null, [tool.name]))
  const namespaced = addressed.flatMap((repo) =>
    tools
      .filter((tool) => tool.declaration.collapsed !== true && addresses(tool, repo))
      .map((tool) => forwarder(tool.name, tool.declaration.summary, repo, [repo, tool.name]))
  )
  const standing: Command[] = []
  for (const tool of tools) {
    const path = tool.declaration.path
    if (path === undefined) continue
    standing.push(forwarder(tool.name, tool.declaration.summary, null, path))
  }
  return [...collapsed, ...namespaced, ...standing]
}
