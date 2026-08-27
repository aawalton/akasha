
import type { IdleObservation } from "../lib/supervisor-idle-rule.ts"
import { deferredRestartRuleDouble, idleRuleDouble } from "./supervisor-rule-test-helpers.ts"

export const IDLE_OBS: IdleObservation = {
  inFlight: 0,
  busyChildren: 0,
  inFlightDispatchChildren: 0,
  claudePresent: true,
}

export const BUSY_OBS: IdleObservation = {
  inFlight: 1,
  busyChildren: 0,
  inFlightDispatchChildren: 0,
  claudePresent: true,
}

export const OWN_STATE_IDLE_WITH_CHILDREN: IdleObservation = {
  inFlight: 0,
  busyChildren: 0,
  inFlightDispatchChildren: 2,
  claudePresent: true,
}

export const NEVER: () => Promise<IdleObservation> = () => new Promise<IdleObservation>(() => {})

export const THROWS: () => Promise<IdleObservation> = () =>
  Promise.reject(new Error("observe boom"))

export const noProbe = {
  getClaudePid: () => null,
  getProxyPort: () => null,
  getAgentId: () => null,
  idleRule: idleRuleDouble(),
  deferredRestartRule: deferredRestartRuleDouble(),
}

export function waitFor(predicate: () => boolean, timeoutMs: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const start = Date.now()
    const iv = setInterval(() => {
      if (predicate()) {
        clearInterval(iv)
        resolve()
      } else if (Date.now() - start > timeoutMs) {
        clearInterval(iv)
        reject(new Error(`waitFor timed out after ${timeoutMs}ms`))
      }
    }, 2)
  })
}
