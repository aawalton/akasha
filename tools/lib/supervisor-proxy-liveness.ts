import { LOG } from "@akasha/seat-system/supervisor-config"
import { guardTick } from "@akasha/seat-system/supervisor-guard-tick"
import {
  HEALTHZ_TIMEOUT_MS,
  respawnOAuthProxy,
  type SupervisorOAuthProxyHandle,
} from "@akasha/seat-system/supervisor-spawn-oauth-proxy"
import { setOAuthProxyHandle } from "@akasha/seat-system/supervisor-state"
import { pidAliveOrRefuse } from "@akasha/utils-process/pid-signal"
import { computeModelGatewayTreeVersion } from "./model-gateway-tree-version"
import { type OAuthProxyState, readProxyState } from "./seat-proxy-state.ts"
import type {
  ProxyLivenessRuleSource,
  ProxyLivenessState,
} from "./supervisor-proxy-liveness-rule.ts"

export const PROXY_LIVENESS_INTERVAL_MS = 30_000

// The deadline stands with the spawner, so the adopt path and this monitor judge a gateway alive by
// the same measure.

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

export function startProxyLivenessMonitor(opts: {
  getProxyHandle: () => SupervisorOAuthProxyHandle | null
  getAgentId: () => string | null
  registrationAccount: string
  getLogDir: () => string
  proxyLivenessRule: ProxyLivenessRuleSource
}): { stop: () => void } {
  let state: ProxyLivenessState | null = null
  let tickInFlight = false

  const respawn = async (handle: SupervisorOAuthProxyHandle): Promise<undefined> => {
    const agentId = opts.getAgentId()
    if (agentId == null) {
      console.error(`${LOG} proxy-liveness: respawn skipped — no current agent id`)
      return
    }
    try {
      const oauthProxyVersion = computeModelGatewayTreeVersion()
      const currentState: OAuthProxyState = readProxyState(agentId) ?? {
        pid: handle.pid,
        port: handle.port,
        oauthProxyVersion,
      }
      console.log(
        `${LOG} proxy-liveness: proxy unhealthy (pid=${handle.pid} port=${handle.port}) — respawning`
      )
      const newProxy = await respawnOAuthProxy(
        {
          agentId,
          registrationAccount: opts.registrationAccount,
          logDir: opts.getLogDir(),
          oauthProxyVersion,
        },
        currentState
      )
      setOAuthProxyHandle(newProxy)
      console.log(
        `${LOG} proxy-liveness: respawned oauth-proxy pid=${newProxy.pid} port=${newProxy.port}`
      )
    } catch (err) {
      console.error(`${LOG} proxy-liveness: respawn failed:`, err)
    }
  }

  const tick = async (): Promise<undefined> => {
    if (tickInFlight) return
    tickInFlight = true
    try {
      const handle = opts.getProxyHandle()
      if (handle == null) return
      const healthy = pidAliveOrRefuse(handle.pid) && (await fetchHealthzOk(handle.port))
      const { value: result } = await opts.proxyLivenessRule(state, healthy)
      state = result.state
      switch (result.action) {
        case "none":
          break
        case "respawn":
          await respawn(handle)
          break
        case "give-up":
          console.error(
            `${LOG} proxy-liveness: GIVING UP — proxy on port ${handle.port} still unhealthy after repeated respawns; agents on this supervisor may be credential-less until the proxy recovers or the supervisor restarts`
          )
          break
        default:
          assertNever(result.action)
      }
    } finally {
      tickInFlight = false
    }
  }

  const timer = setInterval(() => {
    guardTick(tick, (err) => console.error(`${LOG} proxy-liveness: tick error:`, err))
  }, PROXY_LIVENESS_INTERVAL_MS)
  return {
    stop: () => {
      clearInterval(timer)
    },
  }
}
