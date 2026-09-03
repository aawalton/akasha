import type { IdleObservation } from "@akasha/seat-system/supervisor-idle-decide"
import {
  INITIAL_PROXY_LIVENESS_STATE,
  type ProxyLivenessState,
} from "@akasha/seat-system/supervisor-proxy-liveness-decide"
import { bool, maybe, num, obj, oneOf, str } from "./narrow.ts"
import type {
  ChildExitClassification,
  ChildExitObservation,
  ChildExitStatus,
} from "./supervisor-child-exit-decide.ts"
import { STOP_REASON } from "./supervisor-child-exit-decide.ts"
import {
  type DeferredRestartConfig,
  type DeferredRestartObservation,
  type DeferredRestartState,
  INITIAL_DEFERRED_RESTART_STATE,
} from "./supervisor-deferred-restart-decide.ts"

export function idleObservation(value: unknown, path: string): IdleObservation {
  const o = obj(value, path)
  return {
    inFlight: maybe(o.inFlight, `${path}.inFlight`, num),
    busyChildren: maybe(o.busyChildren, `${path}.busyChildren`, num),
    inFlightDispatchChildren: maybe(
      o.inFlightDispatchChildren,
      `${path}.inFlightDispatchChildren`,
      num
    ),
    claudePresent: bool(o.claudePresent, `${path}.claudePresent`),
  }
}

export function childExitStatus(value: unknown, path: string): ChildExitStatus {
  const o = obj(value, path)
  return {
    exitCode: maybe(o.exitCode, `${path}.exitCode`, num),
    signal: maybe(o.signal, `${path}.signal`, str),
  }
}

export function childExitClassification(value: unknown, path: string): ChildExitClassification {
  const o = obj(value, path)
  return {
    crashed: bool(o.crashed, `${path}.crashed`),
    stopReason: oneOf(o.stopReason, `${path}.stopReason`, [
      STOP_REASON.deliberate,
      STOP_REASON.reaped,
      STOP_REASON.crashReaped,
      STOP_REASON.childCrashed,
    ]),
    reason: str(o.reason, `${path}.reason`),
    status: childExitStatus(o.status, `${path}.status`),
  }
}

export function childExitObservation(value: unknown, path: string): ChildExitObservation {
  const o = obj(value, path)
  return {
    status: childExitStatus(o.status, `${path}.status`),
    supervisorKilled: bool(o.supervisorKilled, `${path}.supervisorKilled`),
    shuttingDown: bool(o.shuttingDown, `${path}.shuttingDown`),
  }
}

export function deferredRestartState(value: unknown, path: string): DeferredRestartState {
  if (value === null) return INITIAL_DEFERRED_RESTART_STATE
  const o = obj(value, path)
  return {
    idleStreak: num(o.idleStreak, `${path}.idleStreak`),
    elapsedTicks: num(o.elapsedTicks, `${path}.elapsedTicks`),
    staleStreak: num(o.staleStreak, `${path}.staleStreak`),
    prevBusyReason: maybe(o.prevBusyReason, `${path}.prevBusyReason`, str),
    prevTranscriptMtimeMs: maybe(o.prevTranscriptMtimeMs, `${path}.prevTranscriptMtimeMs`, num),
  }
}

export function deferredRestartObservation(
  value: unknown,
  path: string
): DeferredRestartObservation {
  const o = obj(value, path)
  const obs: DeferredRestartObservation = { idle: bool(o.idle, `${path}.idle`) }
  if (o.busyReason !== undefined) obs.busyReason = str(o.busyReason, `${path}.busyReason`)
  if (o.transcriptMtimeMs !== undefined)
    obs.transcriptMtimeMs = maybe(o.transcriptMtimeMs, `${path}.transcriptMtimeMs`, num)
  return obs
}

export function deferredRestartConfig(value: unknown, path: string): DeferredRestartConfig {
  const o = obj(value, path)
  const config: DeferredRestartConfig = {}
  if (o.ceilingTicks !== undefined)
    config.ceilingTicks = num(o.ceilingTicks, `${path}.ceilingTicks`)
  if (o.staleTicks !== undefined) config.staleTicks = num(o.staleTicks, `${path}.staleTicks`)
  return config
}

export function proxyLivenessState(value: unknown, path: string): ProxyLivenessState {
  if (value === null) return INITIAL_PROXY_LIVENESS_STATE
  const o = obj(value, path)
  return {
    consecutiveFailures: num(o.consecutiveFailures, `${path}.consecutiveFailures`),
    consecutiveRespawns: num(o.consecutiveRespawns, `${path}.consecutiveRespawns`),
    gaveUp: bool(o.gaveUp, `${path}.gaveUp`),
  }
}

export function rawEnv(value: unknown, path: string): string | undefined {
  const raw = maybe(value, path, str)
  return raw === null ? undefined : raw
}
