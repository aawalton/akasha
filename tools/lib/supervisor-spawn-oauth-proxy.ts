
import { modelGatewayEntrypoint } from "./model-gateway-tree-version.ts"
import { pidAliveOrRefuse } from "./pid-signal.ts"
import { type OAuthProxyState, readProxyState } from "./seat-proxy-state.ts"
import { readAdoptedClaudeProxyPort } from "./supervisor-adopted-claude-port.ts"
import { supervisorSocketPath } from "./supervisor-log-path.ts"
import type { ProxyAdoptionRuleSource } from "./supervisor-proxy-adoption-rule.ts"
import { stopByPid, stopProxyIfOwned } from "./supervisor-proxy-ownership.ts"
import { PORT_READ_BUDGET_MS, readFirstLineAsPort } from "./supervisor-proxy-port-line.ts"

const STALE_PROXY_SHUTDOWN_BUDGET_MS = 5_000

const POLL_INTERVAL_MS = 100

const HEALTHZ_TIMEOUT_MS = 1_000

function assertNever(value: never): never {
  const rendered = typeof value === "string" ? value : JSON.stringify(value)
  throw new Error(`assertNever: unhandled variant ${rendered}`)
}

async function fetchHealthzOk(port: number): Promise<boolean> {
  try {
    const res = await fetch(`http://localhost:${port}/healthz`, {
      signal: AbortSignal.timeout(HEALTHZ_TIMEOUT_MS),
    })
    return res.ok
  } catch {
    return false
  }
}

export type SupervisorOAuthProxyHandle = {
  pid: number
  port: number
  socketPath: string
  adopted: boolean
  stop: () => undefined
}

export type SpawnOAuthProxyArgs = {
  agentId: string
  registrationAccount: string
  logDir: string
  oauthProxyVersion: string
  adoptedClaudePid?: number | null
}

export async function spawnOrAdoptOAuthProxy(
  args: SpawnOAuthProxyArgs,
  proxyAdoptionRule: ProxyAdoptionRuleSource
): Promise<SupervisorOAuthProxyHandle> {
  const { agentId, oauthProxyVersion } = args

  const state = readProxyState(agentId)
  if (state != null && pidAliveOrRefuse(state.pid)) {
    const versionMatches = state.oauthProxyVersion === oauthProxyVersion
    const healthy = versionMatches ? true : await fetchHealthzOk(state.port)
    const { value: decision } = await proxyAdoptionRule({
      hasLiveProxy: true,
      versionMatches,
      healthy,
    })
    switch (decision) {
      case "adopt":
      case "adopt-with-drift": {
        if (decision === "adopt-with-drift") {
          console.log(
            `[supervisor] oauth-proxy tree-version drift — adopting live proxy ` +
              `(running ${state.oauthProxyVersion} != current ${oauthProxyVersion}); ` +
              `drift surfaces via 'ops model-gateway status', apply with ` +
              `'ops model-gateway swap' (#14982)`
          )
        }
        return {
          pid: state.pid,
          port: state.port,
          socketPath: supervisorSocketPath(agentId),
          adopted: true,
          stop: () => stopProxyIfOwned(agentId, state.pid),
        }
      }
      case "spawn-fresh":
        return await respawnOAuthProxy(args, state)
      default:
        return assertNever(decision)
    }
  }

  const requiredPort =
    args.adoptedClaudePid != null ? (readAdoptedClaudeProxyPort(args.adoptedClaudePid) ?? 0) : 0
  if (requiredPort !== 0) {
    console.log(
      `[supervisor] oauth-proxy state stale/missing — binding fresh proxy to adopted Claude's port ${requiredPort}`
    )
  }
  return await spawnFreshProxy(args, requiredPort)
}

export async function respawnOAuthProxy(
  args: SpawnOAuthProxyArgs,
  currentState: OAuthProxyState
): Promise<SupervisorOAuthProxyHandle> {
  stopByPid(currentState.pid)
  await waitForPidGone(currentState.pid, STALE_PROXY_SHUTDOWN_BUDGET_MS)
  return await spawnFreshProxy(args, currentState.port)
}

async function spawnFreshProxy(
  args: SpawnOAuthProxyArgs,
  requestedPort: number
): Promise<SupervisorOAuthProxyHandle> {
  const entrypoint = resolveEntrypoint()
  const proc = Bun.spawn(["bun", entrypoint], {
    stdio: ["ignore", "pipe", "inherit"],
    env: {
      ...process.env,
      OAUTH_PROXY_AGENT_ID: args.agentId,
      OAUTH_PROXY_REGISTRATION_ACCOUNT: args.registrationAccount,
      OAUTH_PROXY_LOG_DIR: args.logDir,
      OAUTH_PROXY_VERSION: args.oauthProxyVersion,
      OAUTH_PROXY_PORT: String(requestedPort),
    },
  })
  const pid = proc.pid
  if (typeof pid !== "number") {
    throw new Error("oauth-proxy spawn: Bun.spawn returned no pid")
  }
  let port: number
  try {
    port = await readFirstLineAsPort(proc.stdout, PORT_READ_BUDGET_MS)
  } catch (err) {
    stopByPid(pid)
    throw err
  }
  proc.unref()
  return {
    pid,
    port,
    socketPath: supervisorSocketPath(args.agentId),
    adopted: false,
    stop: () => stopProxyIfOwned(args.agentId, pid),
  }
}

function resolveEntrypoint(): string {
  return modelGatewayEntrypoint()
}

async function waitForPidGone(pid: number, budgetMs: number): Promise<boolean> {
  const deadline = Date.now() + budgetMs
  while (Date.now() < deadline) {
    if (!pidAliveOrRefuse(pid)) return true
    await sleep(POLL_INTERVAL_MS)
  }
  return !pidAliveOrRefuse(pid)
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}


