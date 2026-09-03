import { existsSync } from "node:fs"
import type { SeatResume } from "@akasha/seat-system/supervisor-args"
import { flagsAlwaysPassed, flagsPassedWithMcpConfig } from "./launch-flags.ts"
import { alwaysAllowedTools } from "./tool-access.ts"

export type McpServerConfig =
  | { type: "http"; url: string; headers?: Record<string, string> }
  | {
      type: "stdio"
      command: string
      args: readonly string[]
      env?: Record<string, string | undefined>
    }

export type InteractiveCLIArgsOpts = {
  mcpConfigPath: string | null
  tools: readonly string[] | null
  disallowedTools: readonly string[]
  resume: SeatResume
  sessionId: string
  systemPromptFile: string | null
  model: string
  fallbackModel: string | null
  settingsPath: string
  agentsJson: string | null
}

export function buildInteractiveCLIArgs(opts: InteractiveCLIArgsOpts): readonly string[] {
  const cliArgs: string[] = [...flagsAlwaysPassed()]

  if (opts.systemPromptFile !== null) {
    cliArgs.push("--system-prompt-file", opts.systemPromptFile)
  }
  cliArgs.push("--model", opts.model)

  if (opts.fallbackModel !== null) {
    cliArgs.push("--fallback-model", opts.fallbackModel)
  }

  cliArgs.push("--settings", opts.settingsPath)

  if (opts.agentsJson !== null) {
    cliArgs.push("--agents", opts.agentsJson)
  }

  if (opts.mcpConfigPath != null) {
    cliArgs.push("--mcp-config", opts.mcpConfigPath, ...flagsPassedWithMcpConfig())
  }

  if (opts.tools !== null) {
    cliArgs.push("--tools", opts.tools.join(","))
  }

  if (opts.disallowedTools.length > 0) {
    cliArgs.push("--disallowed-tools", opts.disallowedTools.join(","))
  }

  if (opts.resume.resume) {
    cliArgs.push("--resume", opts.sessionId)
  } else {
    cliArgs.push("--session-id", opts.sessionId)
  }

  return cliArgs
}

export function buildClaudeArgv(opts: {
  readonly flags: readonly string[]
  readonly prompt?: string
}): readonly string[] {
  const positional = opts.prompt !== undefined && opts.prompt !== "" ? [opts.prompt] : []
  return [
    "claude",
    `--allowed-tools=${alwaysAllowedTools().join(",")}`,
    ...opts.flags,
    ...positional,
  ]
}

export function refuseMissingCwd(cwd: string, argv: readonly string[]): void {
  if (existsSync(cwd)) return
  const executable = argv[0] ?? "the child"
  throw new Error(
    `the working directory ${cwd} is not there, so ${executable} cannot start in it — what is missing is that directory rather than ${executable} itself`
  )
}

export function computeMcpConfigContent(
  registry: Record<string, McpServerConfig>,
  extraServers?: Record<string, McpServerConfig>
): { mcpServers: Record<string, McpServerConfig> } | null {
  const mcpServers: Record<string, McpServerConfig> = { ...registry, ...extraServers }
  if (Object.keys(mcpServers).length === 0) return null
  return { mcpServers }
}

export function configPathForAccount(instancesDir: string, account: string): string {
  return `${instancesDir}/${account}`
}
