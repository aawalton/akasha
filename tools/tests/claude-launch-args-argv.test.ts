
import { describe } from "bun:test"
import { has, holdAgainstStanding, type Scenario } from "./claude-launch-args-arm.ts"
import {
  buildClaudeArgv,
  computeMcpConfigContent,
  configPathForAccount,
  type McpServerConfig,
} from "../lib/claude-launch-args.ts"

const SEARCH_TOOL = "Grep"

function namedTools(argv: readonly string[]): readonly string[] {
  return (
    argv
      .find((a) => a.startsWith("--allowed-tools="))
      ?.slice("--allowed-tools=".length)
      .split(",") ?? []
  )
}

const mockRegistry: Record<string, McpServerConfig> = {
  messages: { type: "stdio", command: "bun", args: ["run", "/path/to/messages"] },
  playwright: { type: "stdio", command: "npx", args: ["-y", "@playwright/mcp@0.0.76"] },
}
const sparseRegistry: Record<string, McpServerConfig> = {
  messages: { type: "stdio", command: "bun", args: ["run", "/path"] },
}
const extraServers: Record<string, McpServerConfig> = {
  custom: { type: "http", url: "https://custom.example.com" },
}

const SCENARIOS: readonly Scenario[] = [
  {
    name: "argv heads with the binary",
    ported: () => ({ head: buildClaudeArgv({ flags: [] })[0] ?? null }),
    standing: { head: "claude" },
  },
  {
    name: "search tool named even with no caller tools",
    ported: () => ({
      namesSearchTool: namedTools(buildClaudeArgv({ flags: ["--model", "opus"] })).includes(
        SEARCH_TOOL
      ),
    }),
    standing: { namesSearchTool: true },
  },
  {
    name: "allowed-tools value is fused",
    ported: () => {
      const argv = buildClaudeArgv({ flags: ["--resume", "s"], prompt: "carry on" })
      return {
        containsBareFlag: argv.includes("--allowed-tools"),
        fusedCount: argv.filter((a) => a.startsWith("--allowed-tools=")).length,
      }
    },
    standing: { containsBareFlag: false, fusedCount: 1 },
  },
  {
    name: "prompt goes last and an empty one is omitted",
    ported: () => {
      const withPrompt = buildClaudeArgv({ flags: ["--resume", "s"], prompt: "carry on" })
      const empty = buildClaudeArgv({ flags: ["--resume", "s"], prompt: "" })
      const none = buildClaudeArgv({ flags: ["--resume", "s"] })
      return {
        last: withPrompt[withPrompt.length - 1] ?? null,
        emptyPromptCarriesIt: empty.includes("carry on"),
        lengthWithoutPrompt: none.length,
        lengthWithPrompt: withPrompt.length,
      }
    },
    standing: {
      last: "carry on",
      emptyPromptCarriesIt: false,
      lengthWithoutPrompt: 4,
      lengthWithPrompt: 5,
    },
  },
  {
    name: "caller flags keep their order",
    ported: () => ({ tail: buildClaudeArgv({ flags: ["--resume", "s", "-p", "go"] }).slice(2) }),
    standing: { tail: ["--resume", "s", "-p", "go"] },
  },

  {
    name: "worker profile draws its servers from the registry",
    ported: () => {
      const result = computeMcpConfigContent(mockRegistry)
      return {
        isNull: result === null,
        hasMessages: result !== null && has(result.mcpServers, "messages"),
        hasPlaywright: result !== null && has(result.mcpServers, "playwright"),
      }
    },
    standing: { isNull: false, hasMessages: true, hasPlaywright: true },
  },
  {
    name: "extra servers merge in",
    ported: () => {
      const result = computeMcpConfigContent(mockRegistry, extraServers)
      return {
        isNull: result === null,
        hasCustom: result !== null && has(result.mcpServers, "custom"),
        custom: result === null ? null : (result.mcpServers["custom"] ?? null),
      }
    },
    standing: {
      isNull: false,
      hasCustom: true,
      custom: { type: "http", url: "https://custom.example.com" },
    },
  },
  {
    name: "the config carries exactly the registry it was handed",
    ported: () => {
      const result = computeMcpConfigContent(sparseRegistry)
      return {
        isNull: result === null,
        hasMessages: result !== null && has(result.mcpServers, "messages"),
        hasPlaywright: result !== null && has(result.mcpServers, "playwright"),
      }
    },
    standing: { isNull: false, hasMessages: true, hasPlaywright: false },
  },
  {
    name: "an empty registry still carries the extras",
    ported: () => {
      const result = computeMcpConfigContent({}, extraServers)
      return {
        isNull: result === null,
        hasCustom: result !== null && has(result.mcpServers, "custom"),
      }
    },
    standing: { isNull: false, hasCustom: true },
  },
  {
    name: "an empty registry with no extras answers null",
    ported: () => ({ isNull: computeMcpConfigContent({}) === null }),
    standing: { isNull: true },
  },

  {
    name: "config path joins dir and account",
    ported: () => ({ path: configPathForAccount("/home/user/.claude/accounts", "aawalton") }),
    standing: { path: "/home/user/.claude/accounts/aawalton" },
  },
]

describe("the argv head and the config builders, held against what the code repository answers", () => {
  holdAgainstStanding(SCENARIOS)
})
