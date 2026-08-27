
import { describe, expect, test } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import {
  buildHandoffEnv,
  parseSupervisorHandoffEnv,
  PROXY_OWNER_AGENT_ID_ENV,
  resolveProxyOwnerAgentId,
  SUPERVISOR_HANDOFF_ENV_KEYS,
} from "../lib/supervisor-handoff-env.ts"

function agrees(name: string, standing: unknown, got: unknown): void {
  expect(hold(name, standing, decided("ported", { value: got, notice: null })).matches).toBe(true)
}

function withSilencedWarn<T>(fn: () => T): { value: T; warned: boolean } {
  let warned = false
  const original = console.warn
  console.warn = () => {
    warned = true
  }
  try {
    return { value: fn(), warned }
  } finally {
    console.warn = original
  }
}

const VALID_CLAUDE_ENV = {
  _SUPERVISOR_INHERIT_CLAUDE_PID: "12345",
  _SUPERVISOR_INHERIT_CLAUDE_PROCESS_ID: "abcd1234",
  _SUPERVISOR_INHERIT_CLAUDE_ACCOUNT: "aawalton",
  _SUPERVISOR_INHERIT_CLAUDE_CONFIG_DIR: "/home/test/.claude/accounts/aawalton",
  _SUPERVISOR_INHERIT_CLAUDE_AGENT_ID: "aaaa1111-2222-3333-4444-555555555555",
  _SUPERVISOR_INHERIT_CLAUDE_SESSION_ID: "bbbb6666-7777-8888-9999-000000000000",
}

describe("parseSupervisorHandoffEnv — claude", () => {
  test("all six env vars present → parsed", () => {
    agrees(
      "claude slice parsed",
      {
        pid: 12345,
        processId: "abcd1234",
        account: "aawalton",
        configDir: "/home/test/.claude/accounts/aawalton",
        agentId: "aaaa1111-2222-3333-4444-555555555555",
        sessionId: "bbbb6666-7777-8888-9999-000000000000",
      },
      parseSupervisorHandoffEnv(VALID_CLAUDE_ENV).claude
    )
  })

  test("all six absent → claude: null (no warning)", () => {
    const run = withSilencedWarn(() => parseSupervisorHandoffEnv({}))
    agrees(
      "fresh boot is quiet",
      { claude: null, warned: false },
      { claude: run.value.claude, warned: run.warned }
    )
  })

  test("ignores unrelated env keys", () => {
    agrees(
      "unrelated keys",
      { claude: null, proxyOwnerAgentId: null },
      parseSupervisorHandoffEnv({ HOME: "/home/test", PATH: "/usr/bin" })
    )
  })

  test("malformed pid (non-numeric) → null with warning", () => {
    const run = withSilencedWarn(() =>
      parseSupervisorHandoffEnv({
        ...VALID_CLAUDE_ENV,
        _SUPERVISOR_INHERIT_CLAUDE_PID: "not-a-pid",
      })
    )
    agrees(
      "non-numeric pid",
      { claude: null, warned: true },
      { claude: run.value.claude, warned: run.warned }
    )
  })

  test("malformed pid (zero rejected — pids are positive) → null", () => {
    const run = withSilencedWarn(() =>
      parseSupervisorHandoffEnv({ ...VALID_CLAUDE_ENV, _SUPERVISOR_INHERIT_CLAUDE_PID: "0" })
    )
    agrees("zero pid", { claude: null }, { claude: run.value.claude })
  })

  test("malformed pid (negative) → null", () => {
    const run = withSilencedWarn(() =>
      parseSupervisorHandoffEnv({ ...VALID_CLAUDE_ENV, _SUPERVISOR_INHERIT_CLAUDE_PID: "-1" })
    )
    agrees("negative pid", { claude: null }, { claude: run.value.claude })
  })

  test("partial — pid set, agentId missing → null with warning", () => {
    const partial: Record<string, string | undefined> = { ...VALID_CLAUDE_ENV }
    delete partial._SUPERVISOR_INHERIT_CLAUDE_AGENT_ID
    const run = withSilencedWarn(() => parseSupervisorHandoffEnv(partial))
    agrees(
      "partial slice",
      { claude: null, warned: true },
      { claude: run.value.claude, warned: run.warned }
    )
  })

  test("empty string for one field → null", () => {
    const run = withSilencedWarn(() =>
      parseSupervisorHandoffEnv({ ...VALID_CLAUDE_ENV, _SUPERVISOR_INHERIT_CLAUDE_ACCOUNT: "" })
    )
    agrees("empty account", { claude: null }, { claude: run.value.claude })
  })

  test("SUPERVISOR_HANDOFF_ENV_KEYS lists exactly the keys parsed", () => {
    agrees(
      "handoff env keys",
      [
        "_SUPERVISOR_INHERIT_CLAUDE_PID",
        "_SUPERVISOR_INHERIT_CLAUDE_PROCESS_ID",
        "_SUPERVISOR_INHERIT_CLAUDE_ACCOUNT",
        "_SUPERVISOR_INHERIT_CLAUDE_CONFIG_DIR",
        "_SUPERVISOR_INHERIT_CLAUDE_AGENT_ID",
        "_SUPERVISOR_INHERIT_CLAUDE_SESSION_ID",
        "_SUPERVISOR_INHERIT_OAUTH_PROXY_OWNER_AGENT_ID",
      ],
      [...SUPERVISOR_HANDOFF_ENV_KEYS]
    )
  })
})

describe("parseSupervisorHandoffEnv — proxyOwnerAgentId", () => {
  test("present → parsed as the owner id", () => {
    agrees(
      "owner id present",
      "aaaa1111-2222-3333-4444-555555555555",
      parseSupervisorHandoffEnv({
        [PROXY_OWNER_AGENT_ID_ENV]: "aaaa1111-2222-3333-4444-555555555555",
      }).proxyOwnerAgentId
    )
  })

  test("absent → null (fresh boot)", () => {
    agrees("owner id absent", null, parseSupervisorHandoffEnv({}).proxyOwnerAgentId)
  })

  test("empty string → null", () => {
    agrees(
      "owner id empty",
      null,
      parseSupervisorHandoffEnv({ [PROXY_OWNER_AGENT_ID_ENV]: "" }).proxyOwnerAgentId
    )
  })

  test("independent of the claude slice — owner present, claude absent", () => {
    agrees(
      "owner without claude",
      { claude: null, proxyOwnerAgentId: "owner-A" },
      parseSupervisorHandoffEnv({ [PROXY_OWNER_AGENT_ID_ENV]: "owner-A" })
    )
  })
})

describe("resolveProxyOwnerAgentId", () => {
  test("(a) fresh boot / no rotation — no carried owner → session id", () => {
    agrees(
      "fresh boot",
      "A",
      resolveProxyOwnerAgentId({ handoffProxyOwnerAgentId: null, sessionAgentId: "A" })
    )
  })

  test("(b) rotation then re-exec — carried owner A wins over rotated session B", () => {
    agrees(
      "carried owner wins",
      "A",
      resolveProxyOwnerAgentId({ handoffProxyOwnerAgentId: "A", sessionAgentId: "B" })
    )
  })

  test("(c) re-exec with no rotation — carried owner equals session id", () => {
    agrees(
      "no rotation",
      "A",
      resolveProxyOwnerAgentId({ handoffProxyOwnerAgentId: "A", sessionAgentId: "A" })
    )
  })
})

describe("buildHandoffEnv", () => {
  const CLAUDE = {
    pid: 12345,
    processId: "abcd1234",
    account: "aawalton",
    configDir: "/home/test/.claude/accounts/aawalton",
    agentId: "aaaa1111-2222-3333-4444-555555555555",
    sessionId: "bbbb6666-7777-8888-9999-000000000000",
  }

  test("no inputs → empty object", () => {
    agrees("nothing to inherit", {}, buildHandoffEnv({}))
  })

  test("claude → all six env vars set", () => {
    agrees("claude slice built", VALID_CLAUDE_ENV, buildHandoffEnv({ claude: CLAUDE }))
  })

  test("claude round-trips through parseSupervisorHandoffEnv", () => {
    const claude = {
      pid: 99999,
      processId: "deadbeef",
      account: "alanwalton",
      configDir: "/tmp/cfg",
      agentId: "11111111-1111-1111-1111-111111111111",
      sessionId: "22222222-2222-2222-2222-222222222222",
    }
    agrees(
      "claude round trip",
      {
        pid: 99999,
        processId: "deadbeef",
        account: "alanwalton",
        configDir: "/tmp/cfg",
        agentId: "11111111-1111-1111-1111-111111111111",
        sessionId: "22222222-2222-2222-2222-222222222222",
      },
      parseSupervisorHandoffEnv(buildHandoffEnv({ claude })).claude
    )
  })

  test("proxyOwnerAgentId → owner env var set, no claude keys", () => {
    agrees(
      "owner only",
      { [PROXY_OWNER_AGENT_ID_ENV]: "owner-A" },
      buildHandoffEnv({ proxyOwnerAgentId: "owner-A" })
    )
  })

  test("claude keys unchanged when no proxyOwnerAgentId is passed", () => {
    const built = buildHandoffEnv({ claude: CLAUDE })
    agrees(
      "no stray owner key",
      { ownerKeyAbsent: true },
      { ownerKeyAbsent: built[PROXY_OWNER_AGENT_ID_ENV] === undefined }
    )
  })

  test("proxyOwnerAgentId round-trips through parseSupervisorHandoffEnv", () => {
    agrees(
      "owner round trip",
      "aaaa1111-owner",
      parseSupervisorHandoffEnv(buildHandoffEnv({ proxyOwnerAgentId: "aaaa1111-owner" }))
        .proxyOwnerAgentId
    )
  })
})
