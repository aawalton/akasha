
import { afterEach, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { decided, hold } from "../lib/digest-harness.ts"
import { resolveRemoteControlEnv } from "../lib/supervisor-remote-control-env.ts"

const FULL_RC_SCOPES = "user:inference user:mcp_servers user:profile user:sessions:claude_code"

const PROXY_OWNER_ID = "agent-A-proxy-owner"

const ROTATED_CURRENT_ID = "agent-B-rotated-successor"

const SCRATCH = "/var/tmp/instructions-rc-env-test"

const made: string[] = []

function scratch(prefix: string): string {
  mkdirSync(SCRATCH, { recursive: true })
  const path = mkdtempSync(`${SCRATCH}/${prefix}-`)
  made.push(path)
  return path
}

afterEach(() => {
  for (const path of made.splice(0)) rmSync(path, { recursive: true, force: true })
})

function socketPathOf(baseDir: string, agentId: string): string {
  return join(baseDir, agentId, "oauth-proxy.sock")
}

interface Creds {
  readonly accessToken: string
  readonly scopes?: readonly string[]
}

interface Vector {
  readonly wanted: boolean
  readonly socket: "seeded" | "absent"
  readonly creds: Creds | null
  readonly log?: boolean
}

interface Trace {
  readonly rc: Record<string, unknown> | null
  readonly socketPath: string | null
  readonly scopes: string | null
  readonly pointsAtRotatedSocket: boolean
  readonly loggedCount: number
  readonly firstLogNamesAbsentSocket: boolean
}

function run(vector: Vector): Trace {
  const baseDir = scratch("rc-base")
  const configDir = scratch("rc-cfg")

  const socketPath = socketPathOf(baseDir, PROXY_OWNER_ID)
  if (vector.socket === "seeded") {
    mkdirSync(join(baseDir, PROXY_OWNER_ID), { recursive: true })
    writeFileSync(socketPath, "")
  }
  if (vector.creds !== null) {
    writeFileSync(
      join(configDir, ".credentials.json"),
      JSON.stringify({
        claudeAiOauth: {
          accessToken: vector.creds.accessToken,
          refreshToken: "refresh-tok",
          expiresAt: 9_999_999_999_999,
          ...(vector.creds.scopes != null ? { scopes: vector.creds.scopes } : {}),
        },
      })
    )
  }

  const logged: string[] = []
  const rc = resolveRemoteControlEnv({
    remoteControlWanted: vector.wanted,
    socketPath,
    configDir,
    ...(vector.log === true ? { log: (msg: string) => logged.push(msg) } : {}),
  })

  const token = (text: string): string =>
    text.split(socketPath).join("<PROXY_SOCKET>").split(configDir).join("<CFG>")

  return {
    rc:
      rc === undefined
        ? null
        : {
            socketPath: token(rc.socketPath),
            oauthToken: rc.oauthToken,
            scopes: rc.scopes,
            credsFile: token(rc.credsFile),
          },
    socketPath: rc === undefined ? null : token(rc.socketPath),
    scopes: rc === undefined ? null : rc.scopes,
    pointsAtRotatedSocket: rc?.socketPath === socketPathOf(baseDir, ROTATED_CURRENT_ID),
    loggedCount: logged.length,
    firstLogNamesAbsentSocket: logged[0]?.includes("proxy unix socket absent") ?? false,
  }
}

interface Scenario {
  readonly name: string
  readonly vector: Vector
  readonly standing: Record<string, unknown>
}

const SCENARIOS: readonly Scenario[] = [
  {
    name: "resolves the full RC block when RC wanted + socket exists + creds readable",
    vector: {
      wanted: true,
      socket: "seeded",
      creds: { accessToken: "sk-ant-oat-live", scopes: ["user:inference", "user:sessions:claude_code"] },
    },
    standing: {
      rc: {
        socketPath: "<PROXY_SOCKET>",
        oauthToken: "sk-ant-oat-live",
        scopes: "user:inference user:sessions:claude_code",
        credsFile: "<CFG>/.credentials.json",
      },
    },
  },
  {
    name: "resolves to the proxy-owner socket even after the current agent id rotated",
    vector: { wanted: true, socket: "seeded", creds: { accessToken: "sk-ant-oat-live", scopes: ["user:inference"] } },
    standing: { socketPath: "<PROXY_SOCKET>", pointsAtRotatedSocket: false },
  },
  {
    name: "returns undefined when RC is not wanted, even when socket + creds are present",
    vector: { wanted: false, socket: "seeded", creds: { accessToken: "sk-ant-oat-live", scopes: ["user:inference"] } },
    standing: { rc: null },
  },
  {
    name: "returns undefined when the proxy socket is absent (pre-respawn proxy)",
    vector: { wanted: true, socket: "absent", creds: { accessToken: "sk-ant-oat-live", scopes: ["user:inference"] } },
    standing: { rc: null },
  },
  {
    name: "returns undefined when the credential file is missing",
    vector: { wanted: true, socket: "seeded", creds: null },
    standing: { rc: null },
  },
  {
    name: "returns undefined when the credential access token is empty",
    vector: { wanted: true, socket: "seeded", creds: { accessToken: "", scopes: ["user:inference"] } },
    standing: { rc: null },
  },
  {
    name: "falls back to the full RC scope set when creds carry no scopes array",
    vector: { wanted: true, socket: "seeded", creds: { accessToken: "sk-ant-oat-live" } },
    standing: { scopes: FULL_RC_SCOPES },
  },
  {
    name: "logs the skip reason for RC-wanted-but-unmet cases via the log sink",
    vector: {
      wanted: true,
      socket: "absent",
      creds: { accessToken: "sk-ant-oat-live", scopes: ["user:inference"] },
      log: true,
    },
    standing: { loggedCount: 1, firstLogNamesAbsentSocket: true },
  },
]

function projected(trace: Trace, shape: Record<string, unknown>): Record<string, unknown> {
  const picked: Record<string, unknown> = {}
  for (const key of Object.keys(shape)) picked[key] = (trace as unknown as Record<string, unknown>)[key]
  return picked
}

describe("resolveRemoteControlEnv, held against what the code repository's suite asserts", () => {
  for (const scenario of SCENARIOS) {
    it(scenario.name, () => {
      const trace = decided("ported", { value: run(scenario.vector), notice: null })
      const verdict = hold(scenario.name, scenario.standing, projected(trace, scenario.standing))
      expect(verdict.matches).toBe(true)
    })
  }

  it("compares something in every scenario, so no case passes on an empty projection", () => {
    for (const scenario of SCENARIOS) {
      expect(Object.keys(scenario.standing).length).toBeGreaterThan(0)
    }
  })
})
