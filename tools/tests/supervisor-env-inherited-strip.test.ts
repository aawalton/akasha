
import { describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import {
  buildSupervisorEnv,
  isInheritedAnthropicRoutingEnvKey,
  isInheritedClaudeSessionEnvKey,
  type SupervisorEnvOpts,
} from "../lib/supervisor-env.ts"

const BASE: SupervisorEnvOpts = {
  baseEnv: {},
  agentId: "a",
  sessionId: "s",
  configDir: "/config/dir",
  headless: false,
  subagentSpawnDepth: "5",
  toolTimeout: "600000",
  resumeThresholdMinutes: "2147483647",
  resumeTokenThreshold: "2147483647",
}

const RC = {
  socketPath: "/run/sock/oauth-proxy.sock",
  oauthToken: "sk-ant-oat-xyz",
  scopes: "user:inference user:mcp_servers user:profile user:sessions:claude_code",
  credsFile: "/config/dir/.credentials.json",
}

const LEAKED_SOCKET = "/parent/leaked-oauth-proxy.sock"
const LEAKED_BASE_URL = "http://localhost:41215/"

const RC_KEYS = [
  "ANTHROPIC_UNIX_SOCKET",
  "CLAUDE_CODE_OAUTH_TOKEN",
  "CLAUDE_CODE_OAUTH_SCOPES",
  "CLAUDE_CODE_HOST_CREDS_FILE",
  "CLAUDE_CODE_SDK_HAS_HOST_AUTH_REFRESH",
] as const

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
    name: "emits all five RC vars when remoteControl is provided (#14520)",
    observe: () => pick(buildSupervisorEnv({ ...BASE, remoteControl: RC }), RC_KEYS),
    standing: {
      ANTHROPIC_UNIX_SOCKET: RC.socketPath,
      CLAUDE_CODE_OAUTH_TOKEN: RC.oauthToken,
      CLAUDE_CODE_OAUTH_SCOPES: RC.scopes,
      CLAUDE_CODE_HOST_CREDS_FILE: RC.credsFile,
      CLAUDE_CODE_SDK_HAS_HOST_AUTH_REFRESH: "1",
    },
  },
  {
    name: "omits all five RC vars when remoteControl is undefined (#14520)",
    observe: () => pick(buildSupervisorEnv(BASE), RC_KEYS),
    standing: {
      ANTHROPIC_UNIX_SOCKET: null,
      CLAUDE_CODE_OAUTH_TOKEN: null,
      CLAUDE_CODE_OAUTH_SCOPES: null,
      CLAUDE_CODE_HOST_CREDS_FILE: null,
      CLAUDE_CODE_SDK_HAS_HOST_AUTH_REFRESH: null,
    },
  },
  {
    name: "the four CLAUDE_CODE_* RC members survive the strip even when baseEnv carried stale copies (#14520)",
    observe: () =>
      pick(
        buildSupervisorEnv({
          ...BASE,
          baseEnv: {
            CLAUDE_CODE_OAUTH_TOKEN: "stale-token",
            CLAUDE_CODE_OAUTH_SCOPES: "user:inference",
            CLAUDE_CODE_HOST_CREDS_FILE: "/stale/creds.json",
            CLAUDE_CODE_SDK_HAS_HOST_AUTH_REFRESH: "0",
          },
          remoteControl: RC,
        }),
        [
          "CLAUDE_CODE_OAUTH_TOKEN",
          "CLAUDE_CODE_OAUTH_SCOPES",
          "CLAUDE_CODE_HOST_CREDS_FILE",
          "CLAUDE_CODE_SDK_HAS_HOST_AUTH_REFRESH",
        ]
      ),
    standing: {
      CLAUDE_CODE_OAUTH_TOKEN: RC.oauthToken,
      CLAUDE_CODE_OAUTH_SCOPES: RC.scopes,
      CLAUDE_CODE_HOST_CREDS_FILE: RC.credsFile,
      CLAUDE_CODE_SDK_HAS_HOST_AUTH_REFRESH: "1",
    },
  },
  {
    name: "isInheritedClaudeSessionEnvKey matches the family but not CLAUDE_CONFIG_DIR (#13411)",
    observe: () => ({
      CLAUDECODE: isInheritedClaudeSessionEnvKey("CLAUDECODE"),
      CLAUDE_CODE_SESSION_ID: isInheritedClaudeSessionEnvKey("CLAUDE_CODE_SESSION_ID"),
      CLAUDE_CODE_CHILD_SESSION: isInheritedClaudeSessionEnvKey("CLAUDE_CODE_CHILD_SESSION"),
      CLAUDE_CODE_ANYTHING_ELSE: isInheritedClaudeSessionEnvKey("CLAUDE_CODE_ANYTHING_ELSE"),
      CLAUDE_CONFIG_DIR: isInheritedClaudeSessionEnvKey("CLAUDE_CONFIG_DIR"),
      CLAUDE_EFFORT: isInheritedClaudeSessionEnvKey("CLAUDE_EFFORT"),
      HOME: isInheritedClaudeSessionEnvKey("HOME"),
      ANTHROPIC_BASE_URL: isInheritedClaudeSessionEnvKey("ANTHROPIC_BASE_URL"),
    }),
    standing: {
      CLAUDECODE: true,
      CLAUDE_CODE_SESSION_ID: true,
      CLAUDE_CODE_CHILD_SESSION: true,
      CLAUDE_CODE_ANYTHING_ELSE: true,
      CLAUDE_CONFIG_DIR: false,
      CLAUDE_EFFORT: false,
      HOME: false,
      ANTHROPIC_BASE_URL: false,
    },
  },
  {
    name: "strips inherited ANTHROPIC_UNIX_SOCKET from a headless child's env (#14616)",
    observe: () =>
      pick(
        buildSupervisorEnv({
          ...BASE,
          baseEnv: { HOME: "/home/walton", ANTHROPIC_UNIX_SOCKET: LEAKED_SOCKET },
          configDir: "/d",
          headless: true,
          anthropicBaseUrl: "http://localhost:41215/",
        }),
        ["ANTHROPIC_UNIX_SOCKET", "HOME"]
      ),
    standing: { ANTHROPIC_UNIX_SOCKET: null, HOME: "/home/walton" },
  },
  {
    name: "interactive remoteControl re-sets ANTHROPIC_UNIX_SOCKET authoritatively over a leaked inherited value (#14616)",
    observe: () => {
      const env = buildSupervisorEnv({
        ...BASE,
        baseEnv: { ANTHROPIC_UNIX_SOCKET: LEAKED_SOCKET },
        remoteControl: RC,
      })
      return {
        value: env.ANTHROPIC_UNIX_SOCKET,
        isLeaked: env.ANTHROPIC_UNIX_SOCKET === LEAKED_SOCKET,
      }
    },
    standing: { value: RC.socketPath, isLeaked: false },
  },
  {
    name: "strips inherited ANTHROPIC_BASE_URL when no anthropicBaseUrl opt re-sets it (#14616)",
    observe: () =>
      pick(
        buildSupervisorEnv({
          ...BASE,
          baseEnv: { ANTHROPIC_BASE_URL: LEAKED_BASE_URL },
          configDir: "/d",
          headless: true,
        }),
        ["ANTHROPIC_BASE_URL"]
      ),
    standing: { ANTHROPIC_BASE_URL: null },
  },
  {
    name: "anthropicBaseUrl opt re-sets ANTHROPIC_BASE_URL authoritatively over a leaked inherited value (#14616)",
    observe: () => {
      const env = buildSupervisorEnv({
        ...BASE,
        baseEnv: { ANTHROPIC_BASE_URL: LEAKED_BASE_URL },
        configDir: "/d",
        headless: true,
        anthropicBaseUrl: "http://localhost:54321/",
      })
      return { value: env.ANTHROPIC_BASE_URL, isLeaked: env.ANTHROPIC_BASE_URL === LEAKED_BASE_URL }
    },
    standing: { value: "http://localhost:54321/", isLeaked: false },
  },
  {
    name: "isInheritedAnthropicRoutingEnvKey matches the socket + base-url leak family only (#14616)",
    observe: () => ({
      ANTHROPIC_UNIX_SOCKET: isInheritedAnthropicRoutingEnvKey("ANTHROPIC_UNIX_SOCKET"),
      ANTHROPIC_BASE_URL: isInheritedAnthropicRoutingEnvKey("ANTHROPIC_BASE_URL"),
      ANTHROPIC_AUTH_TOKEN: isInheritedAnthropicRoutingEnvKey("ANTHROPIC_AUTH_TOKEN"),
      CLAUDE_CONFIG_DIR: isInheritedAnthropicRoutingEnvKey("CLAUDE_CONFIG_DIR"),
      HOME: isInheritedAnthropicRoutingEnvKey("HOME"),
    }),
    standing: {
      ANTHROPIC_UNIX_SOCKET: true,
      ANTHROPIC_BASE_URL: true,
      ANTHROPIC_AUTH_TOKEN: false,
      CLAUDE_CONFIG_DIR: false,
      HOME: false,
    },
  },
]

describe("buildSupervisorEnv's RC block and leak strips, held against what the code repository asserts", () => {
  for (const scenario of SCENARIOS) {
    it(scenario.name, () => {
      const answered = decided("ported", { value: scenario.observe(), notice: null })
      expect(hold(scenario.name, scenario.standing, answered).matches).toBe(true)
    })
  }
})
