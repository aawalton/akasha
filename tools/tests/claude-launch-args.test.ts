import { describe } from "bun:test"
import {
  after,
  count,
  holdAgainstStanding,
  type Scenario,
} from "./claude-launch-args-arm.ts"
import {
  buildInteractiveCLIArgs,
  type InteractiveCLIArgsOpts,
} from "../lib/claude-launch-args.ts"
import { disallowedToolsForLaunch } from "../lib/supervisor-spawn-agents.ts"

const baseOpts: InteractiveCLIArgsOpts = {
  mcpConfigPath: null,
  tools: null,
  disallowedTools: [],
  resume: { resume: false } as const,
  sessionId: "test-session-id",
  systemPromptFile: "/tmp/agent-boot-prompt-test.md",
  model: "opus[1m]",
  fallbackModel: null,
  settingsPath: "/tmp/agent-settings-test.json",
  agentsJson: null,
}

const AGENTS_JSON = '{"general-purpose":{"description":"d","prompt":"p"}}'
const COMPOSED_PROMPT = "/tmp/agent-boot-prompt-019f73b5.md"
const DECLARED_DISALLOWED = ["Read", "CronCreate"]

const SCENARIOS: readonly Scenario[] = [
  {
    name: "agents carried verbatim",
    ported: () => {
      const argv = buildInteractiveCLIArgs({ ...baseOpts, agentsJson: AGENTS_JSON })
      return {
        agentsIndexFound: argv.indexOf("--agents") >= 0,
        valueAfterAgents: after(argv, "--agents"),
      }
    },
    standing: { agentsIndexFound: true, valueAfterAgents: AGENTS_JSON },
  },
  {
    name: "agents omitted when unreadable",
    ported: () => ({ containsAgents: buildInteractiveCLIArgs(baseOpts).includes("--agents") }),
    standing: { containsAgents: false },
  },
  {
    name: "settings carries the payload path",
    ported: () => {
      const argv = buildInteractiveCLIArgs(baseOpts)
      return {
        settingsIndexFound: argv.indexOf("--settings") >= 0,
        valueAfterSettings: after(argv, "--settings"),
      }
    },
    standing: { settingsIndexFound: true, valueAfterSettings: "/tmp/agent-settings-test.json" },
  },
  {
    name: "settings emitted exactly once",
    ported: () => ({
      settingsCount: count(
        buildInteractiveCLIArgs({ ...baseOpts, tools: [], disallowedTools: ["Bash"] }),
        "--settings"
      ),
    }),
    standing: { settingsCount: 1 },
  },
  {
    name: "head is skip-permissions",
    ported: () => ({ head: buildInteractiveCLIArgs(baseOpts)[0] ?? null }),
    standing: { head: "--dangerously-skip-permissions" },
  },
  {
    name: "new session emits session-id",
    ported: () => {
      const argv = buildInteractiveCLIArgs(baseOpts)
      return {
        containsSessionIdFlag: argv.includes("--session-id"),
        containsSessionIdValue: argv.includes("test-session-id"),
        containsResume: argv.includes("--resume"),
      }
    },
    standing: { containsSessionIdFlag: true, containsSessionIdValue: true, containsResume: false },
  },
  {
    name: "resume arm emits resume",
    ported: () => {
      const argv = buildInteractiveCLIArgs({
        ...baseOpts,
        resume: { resume: true, driver: "argv-prompt" } as const,
        sessionId: "last-session",
      })
      return {
        containsResume: argv.includes("--resume"),
        containsSessionValue: argv.includes("last-session"),
        containsSessionIdFlag: argv.includes("--session-id"),
      }
    },
    standing: { containsResume: true, containsSessionValue: true, containsSessionIdFlag: false },
  },
  {
    name: "a spawn that is not resuming emits a fresh session-id",
    ported: () => {
      const argv = buildInteractiveCLIArgs({
        ...baseOpts,
        resume: { resume: false } as const,
        sessionId: "post-reset-fresh-id",
      })
      return {
        containsSessionIdFlag: argv.includes("--session-id"),
        containsFreshValue: argv.includes("post-reset-fresh-id"),
        containsResume: argv.includes("--resume"),
      }
    },
    standing: { containsSessionIdFlag: true, containsFreshValue: true, containsResume: false },
  },
  {
    name: "mcp config emits its flags",
    ported: () => {
      const argv = buildInteractiveCLIArgs({ ...baseOpts, mcpConfigPath: "/tmp/mcp-config.json" })
      return {
        containsMcpConfig: argv.includes("--mcp-config"),
        containsMcpConfigPath: argv.includes("/tmp/mcp-config.json"),
        containsStrictMcp: argv.includes("--strict-mcp-config"),
        containsDevChannels: argv.includes("--dangerously-load-development-channels"),
        containsMessagesChannel: argv.includes("server:messages"),
      }
    },
    standing: {
      containsMcpConfig: true,
      containsMcpConfigPath: true,
      containsStrictMcp: true,
      containsDevChannels: true,
      containsMessagesChannel: true,
    },
  },
  {
    name: "no mcp config emits no mcp flags",
    ported: () => {
      const argv = buildInteractiveCLIArgs(baseOpts)
      return {
        containsMcpConfig: argv.includes("--mcp-config"),
        containsStrictMcp: argv.includes("--strict-mcp-config"),
        containsDevChannels: argv.includes("--dangerously-load-development-channels"),
      }
    },
    standing: { containsMcpConfig: false, containsStrictMcp: false, containsDevChannels: false },
  },
  {
    name: "disallowed tools emitted joined",
    ported: () => {
      const argv = buildInteractiveCLIArgs({
        ...baseOpts,
        disallowedTools: ["TodoWrite", "TodoRead"],
      })
      return {
        containsDisallowedFlag: argv.includes("--disallowed-tools"),
        containsJoinedValue: argv.includes("TodoWrite,TodoRead"),
      }
    },
    standing: { containsDisallowedFlag: true, containsJoinedValue: true },
  },
  {
    name: "no seat carries a plugin",
    ported: () => ({
      containsPluginDir: buildInteractiveCLIArgs(baseOpts).includes("--plugin-dir"),
    }),
    standing: { containsPluginDir: false },
  },
  {
    name: "empty disallowed omits the flag",
    ported: () => ({
      containsDisallowedFlag: buildInteractiveCLIArgs(baseOpts).includes("--disallowed-tools"),
    }),
    standing: { containsDisallowedFlag: false },
  },
  {
    name: "tools null omits the flag",
    ported: () => ({ containsToolsFlag: buildInteractiveCLIArgs(baseOpts).includes("--tools") }),
    standing: { containsToolsFlag: false },
  },
  {
    name: "tools empty emits an empty value",
    ported: () => {
      const argv = buildInteractiveCLIArgs({ ...baseOpts, tools: [] })
      return {
        toolsIndexFound: argv.indexOf("--tools") >= 0,
        valueAfterTools: after(argv, "--tools"),
      }
    },
    standing: { toolsIndexFound: true, valueAfterTools: "" },
  },
  {
    name: "tools subset emits the comma-joined subset",
    ported: () => {
      const argv = buildInteractiveCLIArgs({ ...baseOpts, tools: ["Read", "Grep", "Glob"] })
      return {
        toolsIndexFound: argv.indexOf("--tools") >= 0,
        valueAfterTools: after(argv, "--tools"),
      }
    },
    standing: { toolsIndexFound: true, valueAfterTools: "Read,Grep,Glob" },
  },
  {
    name: "system prompt file carried",
    ported: () => {
      const argv = buildInteractiveCLIArgs({ ...baseOpts, systemPromptFile: COMPOSED_PROMPT })
      return {
        promptIndexFound: argv.indexOf("--system-prompt-file") >= 0,
        valueAfterPromptFile: after(argv, "--system-prompt-file"),
      }
    },
    standing: { promptIndexFound: true, valueAfterPromptFile: COMPOSED_PROMPT },
  },
  {
    name: "no composed prompt omits the flag",
    ported: () => ({
      containsPromptFileFlag: buildInteractiveCLIArgs({
        ...baseOpts,
        systemPromptFile: null,
      }).includes("--system-prompt-file"),
    }),
    standing: { containsPromptFileFlag: false },
  },
  {
    name: "model always emitted",
    ported: () => {
      const argv = buildInteractiveCLIArgs({ ...baseOpts, model: "opus[1m]" })
      return {
        modelIndexFound: argv.indexOf("--model") >= 0,
        valueAfterModel: after(argv, "--model"),
      }
    },
    standing: { modelIndexFound: true, valueAfterModel: "opus[1m]" },
  },
  {
    name: "a stated fallback model is emitted",
    ported: () => {
      const argv = buildInteractiveCLIArgs({ ...baseOpts, fallbackModel: "sonnet" })
      return {
        fallbackIndexFound: argv.indexOf("--fallback-model") >= 0,
        valueAfterFallback: after(argv, "--fallback-model"),
      }
    },
    standing: { fallbackIndexFound: true, valueAfterFallback: "sonnet" },
  },
  {
    name: "no fallback model omits the flag",
    ported: () => ({
      containsFallbackFlag: buildInteractiveCLIArgs(baseOpts).includes("--fallback-model"),
    }),
    standing: { containsFallbackFlag: false },
  },
  {
    name: "a launch whose definitions composed carries them and leaves delegation alone",
    ported: () => ({
      argv: buildInteractiveCLIArgs({
        ...baseOpts,
        disallowedTools: disallowedToolsForLaunch(DECLARED_DISALLOWED, AGENTS_JSON),
        agentsJson: AGENTS_JSON,
      }),
    }),
    standing: {
      argv: [
        "--dangerously-skip-permissions",
        "--system-prompt-file",
        "/tmp/agent-boot-prompt-test.md",
        "--model",
        "opus[1m]",
        "--settings",
        "/tmp/agent-settings-test.json",
        "--agents",
        AGENTS_JSON,
        "--disallowed-tools",
        "Read,CronCreate",
        "--session-id",
        "test-session-id",
      ],
    },
  },
  {
    name: "a launch whose definitions did not compose disallows the delegation tool",
    ported: () => ({
      argv: buildInteractiveCLIArgs({
        ...baseOpts,
        disallowedTools: disallowedToolsForLaunch(DECLARED_DISALLOWED, null),
        agentsJson: null,
      }),
    }),
    standing: {
      argv: [
        "--dangerously-skip-permissions",
        "--system-prompt-file",
        "/tmp/agent-boot-prompt-test.md",
        "--model",
        "opus[1m]",
        "--settings",
        "/tmp/agent-settings-test.json",
        "--disallowed-tools",
        "Read,CronCreate,Agent",
        "--session-id",
        "test-session-id",
      ],
    },
  },
]

describe("buildInteractiveCLIArgs, held against what the code repository answers", () => {
  holdAgainstStanding(SCENARIOS)
})
