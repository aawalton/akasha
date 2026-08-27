
import { describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import { buildSupervisorEnv, type SupervisorEnvOpts } from "../lib/supervisor-env.ts"

const BASE: SupervisorEnvOpts = {
  baseEnv: {},
  agentId: "a",
  sessionId: "s",
  configDir: "/d",
  headless: false,
  subagentSpawnDepth: "5",
  toolTimeout: "600000",
  resumeThresholdMinutes: "2147483647",
  resumeTokenThreshold: "2147483647",
}

function pick(
  env: Record<string, string | undefined>,
  keys: readonly string[]
): Record<string, string | null> {
  const projected: Record<string, string | null> = {}
  for (const key of keys) projected[key] = env[key] ?? null
  return projected
}

interface Scenario {
  readonly name: string
  readonly observe: () => unknown
  readonly standing: unknown
}

const SCENARIOS: readonly Scenario[] = [
  {
    name: "merges base env with supervisor keys",
    observe: () =>
      pick(
        buildSupervisorEnv({
          ...BASE,
          baseEnv: { HOME: "/home/test", PATH: "/usr/bin" },
          agentId: "agent-123",
          sessionId: "session-456",
          configDir: "/config/dir",
        }),
        [
          "HOME",
          "PATH",
          "CLAUDE_CODE_EFFORT_LEVEL",
          "CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH",
          "CLAUDE_CODE_AUTO_COMPACT_WINDOW",
          "AGENT_ID",
          "SESSION_ID",
          "CLAUDE_CONFIG_DIR",
        ]
      ),
    standing: {
      HOME: "/home/test",
      PATH: "/usr/bin",
      CLAUDE_CODE_EFFORT_LEVEL: null,
      CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH: "5",
      CLAUDE_CODE_AUTO_COMPACT_WINDOW: null,
      AGENT_ID: "agent-123",
      SESSION_ID: "session-456",
      CLAUDE_CONFIG_DIR: "/config/dir",
    },
  },
  {
    name: "emits SUPERVISOR_PID conditionally and AGENT_LAUNCH always",
    observe: () => ({
      pidWhenGiven: buildSupervisorEnv({ ...BASE, supervisorPid: 4242 }).SUPERVISOR_PID ?? null,
      pidWhenOmitted: buildSupervisorEnv(BASE).SUPERVISOR_PID ?? null,
      headlessLaunch: buildSupervisorEnv({ ...BASE, headless: true }).AGENT_LAUNCH ?? null,
      interactiveLaunch: buildSupervisorEnv(BASE).AGENT_LAUNCH ?? null,
      headlessAgentHeadless: buildSupervisorEnv({ ...BASE, headless: true }).AGENT_HEADLESS ?? null,
    }),
    standing: {
      pidWhenGiven: "4242",
      pidWhenOmitted: null,
      headlessLaunch: "spawned",
      interactiveLaunch: "opened",
      headlessAgentHeadless: null,
    },
  },
  {
    name: "emits the stated MCP_TOOL_TIMEOUT bound when baseEnv carries none (#13917)",
    observe: () => {
      const env = buildSupervisorEnv({ ...BASE, baseEnv: { HOME: "/home/test" } })
      return { value: env.MCP_TOOL_TIMEOUT, matchesStatedTimeout: env.MCP_TOOL_TIMEOUT === "600000" }
    },
    standing: { value: "600000", matchesStatedTimeout: true },
  },
  {
    name: "a non-empty baseEnv MCP_TOOL_TIMEOUT override wins over the stated one",
    observe: () =>
      buildSupervisorEnv({ ...BASE, baseEnv: { MCP_TOOL_TIMEOUT: "120000" } }).MCP_TOOL_TIMEOUT,
    standing: "120000",
  },
  {
    name: "an empty-string baseEnv MCP_TOOL_TIMEOUT falls back to the stated one",
    observe: () => {
      const env = buildSupervisorEnv({ ...BASE, baseEnv: { MCP_TOOL_TIMEOUT: "" } })
      return { matchesStatedTimeout: env.MCP_TOOL_TIMEOUT === "600000" }
    },
    standing: { matchesStatedTimeout: true },
  },
  {
    name: "uses the autoCompactWindow opt when provided (#14057)",
    observe: () =>
      buildSupervisorEnv({ ...BASE, autoCompactWindow: "500000" }).CLAUDE_CODE_AUTO_COMPACT_WINDOW,
    standing: "500000",
  },
  {
    name: "omits CLAUDE_CODE_AUTO_COMPACT_WINDOW entirely when the opt is omitted",
    observe: () => {
      const env = buildSupervisorEnv(BASE)
      return {
        value: env.CLAUDE_CODE_AUTO_COMPACT_WINDOW ?? null,
        keyPresent: "CLAUDE_CODE_AUTO_COMPACT_WINDOW" in env,
      }
    },
    standing: { value: null, keyPresent: false },
  },
  {
    name: "uses the effortLevel opt when provided (#15782)",
    observe: () => buildSupervisorEnv({ ...BASE, effortLevel: "high" }).CLAUDE_CODE_EFFORT_LEVEL,
    standing: "high",
  },
  {
    name: "omits CLAUDE_CODE_EFFORT_LEVEL entirely when the effortLevel opt is omitted",
    observe: () => {
      const env = buildSupervisorEnv(BASE)
      return {
        value: env.CLAUDE_CODE_EFFORT_LEVEL ?? null,
        keyPresent: "CLAUDE_CODE_EFFORT_LEVEL" in env,
      }
    },
    standing: { value: null, keyPresent: false },
  },
  {
    name: "emits the stated CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH for both interactive and headless (#15887)",
    observe: () => ({
      interactive: buildSupervisorEnv({ ...BASE, headless: false })
        .CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH,
      headless: buildSupervisorEnv({ ...BASE, headless: true })
        .CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH,
    }),
    standing: { interactive: "5", headless: "5" },
  },
  {
    name: "re-sets CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH even when baseEnv carried a stale inherited copy (#15887)",
    observe: () =>
      buildSupervisorEnv({ ...BASE, baseEnv: { CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH: "1" } })
        .CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH,
    standing: "5",
  },
  {
    name: "supervisor keys override base env",
    observe: () =>
      pick(
        buildSupervisorEnv({
          ...BASE,
          baseEnv: { AGENT_ID: "old", SESSION_ID: "old" },
          agentId: "new-agent",
          sessionId: "new-session",
          configDir: "/config",
        }),
        ["AGENT_ID", "SESSION_ID"]
      ),
    standing: { AGENT_ID: "new-agent", SESSION_ID: "new-session" },
  },
  {
    name: "sets ANTHROPIC_BASE_URL only when anthropicBaseUrl is provided (#13130)",
    observe: () => ({
      withUrl:
        buildSupervisorEnv({ ...BASE, anthropicBaseUrl: "http://100.64.0.2:11434/" })
          .ANTHROPIC_BASE_URL ?? null,
      without: buildSupervisorEnv(BASE).ANTHROPIC_BASE_URL ?? null,
    }),
    standing: { withUrl: "http://100.64.0.2:11434/", without: null },
  },
  {
    name: "sets ANTHROPIC_AUTH_TOKEN only when anthropicAuthToken is provided (#13130)",
    observe: () => ({
      withTok:
        buildSupervisorEnv({ ...BASE, anthropicAuthToken: "ollama" }).ANTHROPIC_AUTH_TOKEN ?? null,
      without: buildSupervisorEnv(BASE).ANTHROPIC_AUTH_TOKEN ?? null,
    }),
    standing: { withTok: "ollama", without: null },
  },
  {
    name: "strips inherited CLAUDECODE + CLAUDE_CODE_* parent-session vars from baseEnv (#13411)",
    observe: () =>
      pick(
        buildSupervisorEnv({
          ...BASE,
          baseEnv: {
            HOME: "/home/walton",
            PATH: "/usr/bin",
            CLAUDECODE: "1",
            CLAUDE_CODE_SESSION_ID: "parent-sid-aaaa",
            CLAUDE_CODE_CHILD_SESSION: "1",
            CLAUDE_CODE_ENTRYPOINT: "cli",
            CLAUDE_CODE_EXECPATH: "/some/claude/2.1.177",
            CLAUDE_CODE_SSE_PORT: "52960",
            CLAUDE_CODE_RESUME_THRESHOLD_MINUTES: "2147483647",
          },
          agentId: "agent-123",
          sessionId: "child-sid-bbbb",
          configDir: "/config/dir",
        }),
        [
          "CLAUDECODE",
          "CLAUDE_CODE_SESSION_ID",
          "CLAUDE_CODE_CHILD_SESSION",
          "CLAUDE_CODE_ENTRYPOINT",
          "CLAUDE_CODE_EXECPATH",
          "CLAUDE_CODE_SSE_PORT",
          "CLAUDE_CODE_RESUME_THRESHOLD_MINUTES",
          "HOME",
          "PATH",
          "AGENT_ID",
          "SESSION_ID",
          "CLAUDE_CONFIG_DIR",
        ]
      ),
    standing: {
      CLAUDECODE: null,
      CLAUDE_CODE_SESSION_ID: null,
      CLAUDE_CODE_CHILD_SESSION: null,
      CLAUDE_CODE_ENTRYPOINT: null,
      CLAUDE_CODE_EXECPATH: null,
      CLAUDE_CODE_SSE_PORT: null,
      CLAUDE_CODE_RESUME_THRESHOLD_MINUTES: null,
      HOME: "/home/walton",
      PATH: "/usr/bin",
      AGENT_ID: "agent-123",
      SESSION_ID: "child-sid-bbbb",
      CLAUDE_CONFIG_DIR: "/config/dir",
    },
  },
  {
    name: "strips inherited copies of the two opt-driven CLAUDE_CODE_ vars rather than passing them through (#13411)",
    observe: () =>
      pick(
        buildSupervisorEnv({
          ...BASE,
          baseEnv: { CLAUDE_CODE_EFFORT_LEVEL: "low", CLAUDE_CODE_AUTO_COMPACT_WINDOW: "1" },
        }),
        ["CLAUDE_CODE_EFFORT_LEVEL", "CLAUDE_CODE_AUTO_COMPACT_WINDOW"]
      ),
    standing: { CLAUDE_CODE_EFFORT_LEVEL: null, CLAUDE_CODE_AUTO_COMPACT_WINDOW: null },
  },
  {
    name: "headless emits both resume-menu suppression pins at INT32_MAX (#13932)",
    observe: () =>
      pick(buildSupervisorEnv({ ...BASE, headless: true }), [
        "CLAUDE_CODE_RESUME_THRESHOLD_MINUTES",
        "CLAUDE_CODE_RESUME_TOKEN_THRESHOLD",
      ]),
    standing: {
      CLAUDE_CODE_RESUME_THRESHOLD_MINUTES: "2147483647",
      CLAUDE_CODE_RESUME_TOKEN_THRESHOLD: "2147483647",
    },
  },
  {
    name: "headless resume pins survive the CLAUDE_CODE_* strip even when baseEnv carried low inherited values (#13932)",
    observe: () =>
      pick(
        buildSupervisorEnv({
          ...BASE,
          baseEnv: {
            CLAUDE_CODE_RESUME_THRESHOLD_MINUTES: "70",
            CLAUDE_CODE_RESUME_TOKEN_THRESHOLD: "100000",
          },
          headless: true,
        }),
        ["CLAUDE_CODE_RESUME_THRESHOLD_MINUTES", "CLAUDE_CODE_RESUME_TOKEN_THRESHOLD"]
      ),
    standing: {
      CLAUDE_CODE_RESUME_THRESHOLD_MINUTES: "2147483647",
      CLAUDE_CODE_RESUME_TOKEN_THRESHOLD: "2147483647",
    },
  },
  {
    name: "resume pins parse as positive base-10 integers (the CLI uses parseInt(_, 10)) (#13932)",
    observe: () => {
      const env = buildSupervisorEnv({ ...BASE, headless: true })
      const parsedFor = (key: string): { notANumber: boolean; positive: boolean } => {
        const parsed = Number.parseInt(env[key] ?? "", 10)
        return { notANumber: Number.isNaN(parsed), positive: parsed > 0 }
      }
      return {
        CLAUDE_CODE_RESUME_THRESHOLD_MINUTES: parsedFor("CLAUDE_CODE_RESUME_THRESHOLD_MINUTES"),
        CLAUDE_CODE_RESUME_TOKEN_THRESHOLD: parsedFor("CLAUDE_CODE_RESUME_TOKEN_THRESHOLD"),
      }
    },
    standing: {
      CLAUDE_CODE_RESUME_THRESHOLD_MINUTES: { notANumber: false, positive: true },
      CLAUDE_CODE_RESUME_TOKEN_THRESHOLD: { notANumber: false, positive: true },
    },
  },
  {
    name: "interactive (headless=false) does NOT emit the resume pins — the menu is preserved (#13932)",
    observe: () =>
      pick(buildSupervisorEnv(BASE), [
        "CLAUDE_CODE_RESUME_THRESHOLD_MINUTES",
        "CLAUDE_CODE_RESUME_TOKEN_THRESHOLD",
      ]),
    standing: {
      CLAUDE_CODE_RESUME_THRESHOLD_MINUTES: null,
      CLAUDE_CODE_RESUME_TOKEN_THRESHOLD: null,
    },
  },
  {
    name: "emits CLAUDE_CODE_SUBAGENT_MODEL for NEITHER interactive nor headless (#17368)",
    observe: () => ({
      interactive:
        buildSupervisorEnv({ ...BASE, headless: false }).CLAUDE_CODE_SUBAGENT_MODEL ?? null,
      headless: buildSupervisorEnv({ ...BASE, headless: true }).CLAUDE_CODE_SUBAGENT_MODEL ?? null,
    }),
    standing: { interactive: null, headless: null },
  },
  {
    name: "strips an INHERITED CLAUDE_CODE_SUBAGENT_MODEL rather than passing it through (#17368)",
    observe: () => {
      const base = { ...BASE, baseEnv: { CLAUDE_CODE_SUBAGENT_MODEL: "opus[1m]" } }
      return {
        interactive:
          buildSupervisorEnv({ ...base, headless: false }).CLAUDE_CODE_SUBAGENT_MODEL ?? null,
        headless: buildSupervisorEnv({ ...base, headless: true }).CLAUDE_CODE_SUBAGENT_MODEL ?? null,
      }
    },
    standing: { interactive: null, headless: null },
  },
]

describe("buildSupervisorEnv, held against what the code repository asserts", () => {
  for (const scenario of SCENARIOS) {
    it(scenario.name, () => {
      const answered = decided("ported", { value: scenario.observe(), notice: null })
      expect(hold(scenario.name, scenario.standing, answered).matches).toBe(true)
    })
  }
})
