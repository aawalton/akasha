
import type { ChildExitRuleSource } from "../lib/supervisor-child-exit-rule.ts"
import type {
  DeferredRestartFireReason,
  DeferredRestartRuleSource,
  DeferredRestartState,
} from "../lib/supervisor-deferred-restart-rule.ts"
import type { IdleObservation, IdleRuleSource } from "../lib/supervisor-idle-rule.ts"
import type { PreCliffRestartRuleSource } from "../lib/supervisor-precliff-restart-rule.ts"
import type {
  ProxyAdoptionInput,
  ProxyAdoptionRuleSource,
} from "../lib/supervisor-proxy-adoption-rule.ts"
import type { SelfHealJitterRuleSource } from "../lib/supervisor-self-heal-jitter-rule.ts"

function refuse(which: string): never {
  throw new Error(
    `${which}: this suite injected the throwing double, so reaching a decision here is the ` +
      "defect rather than a missing fixture. Either the code under test should not be " +
      "deciding on this path, or the test means to supply a working double and has not."
  )
}

function decided<T>(value: T): Promise<{ value: T; notice: null }> {
  return Promise.resolve({ value, notice: null })
}

export const unusedIdleRule: IdleRuleSource = {
  ignoredMcpCmdlines: () => refuse("idle rule"),
  preservingRestart: () => refuse("idle rule"),
  pastCliff: () => refuse("idle rule"),
}

export const unusedChildExitRule: ChildExitRuleSource = {
  decodeWaitStatus: () => refuse("child-exit rule"),
  collapse: () => refuse("child-exit rule"),
  classify: () => refuse("child-exit rule"),
  shutdownWrite: () => refuse("child-exit rule"),
}

export function idleRuleDouble(): IdleRuleSource {
  const isIdle = (obs: IdleObservation): boolean =>
    obs.inFlight === 0 && obs.busyChildren === 0 && obs.claudePresent
  const isIdlePastCliff = (obs: IdleObservation): boolean => obs.inFlight === 0 && obs.claudePresent
  const busyReason = (obs: IdleObservation, ignoreBusyChildren: boolean): string => {
    const parts: string[] = []
    if (obs.inFlight !== 0) parts.push(`inFlight=${obs.inFlight ?? "unread"}`)
    if (!ignoreBusyChildren && obs.busyChildren !== 0)
      parts.push(`busyChildren=${obs.busyChildren ?? "unread"}`)
    if (!obs.claudePresent) parts.push("claude-absent")
    return parts.length === 0 ? "idle" : parts.join(", ")
  }
  return {
    ignoredMcpCmdlines: (cmdlines) => decided(cmdlines.map(() => false)),
    preservingRestart: (obs) => decided({ idle: isIdle(obs), reason: busyReason(obs, false) }),
    pastCliff: (obs) => decided({ idle: isIdlePastCliff(obs), reason: busyReason(obs, true) }),
  }
}

export function childExitRuleDouble(): ChildExitRuleSource {
  return {
    decodeWaitStatus: (raw) => decided({ exitCode: raw, signal: null }),
    collapse: (status) => decided(status.exitCode ?? 0),
    classify: (observation) =>
      decided({
        crashed: false,
        stopReason: "deliberate" as const,
        reason: "double",
        status: observation.status,
      }),
    shutdownWrite: () =>
      decided({
        stampCleanExit: true,
        stopReason: "deliberate" as const,
        recordCrash: false,
      }),
  }
}

export function selfHealJitterRuleDouble(): SelfHealJitterRuleSource {
  const DEFAULT_MAX_JITTER_MS = 60_000
  const resolveMax = (raw: string | undefined): number => {
    if (raw == null || raw.trim() === "") return DEFAULT_MAX_JITTER_MS
    const parsed = Number(raw)
    if (!Number.isFinite(parsed) || parsed < 0) return DEFAULT_MAX_JITTER_MS
    return Math.floor(parsed)
  }
  return (randFloat, rawMaxJitterMs) => {
    const maxJitterMs = resolveMax(rawMaxJitterMs)
    const clamped = Number.isFinite(randFloat) && randFloat > 0 ? Math.min(randFloat, 1) : 0
    const value = maxJitterMs <= 0 ? 0 : Math.floor(clamped * maxJitterMs)
    return Promise.resolve({ value, notice: null })
  }
}

export function proxyAdoptionRuleDouble(): ProxyAdoptionRuleSource {
  return (input: ProxyAdoptionInput) => {
    const decided = !input.hasLiveProxy
      ? "spawn-fresh"
      : input.versionMatches
        ? "adopt"
        : input.healthy
          ? "adopt-with-drift"
          : "spawn-fresh"
    return Promise.resolve({ value: decided, notice: null })
  }
}

export function preCliffRestartRuleDouble(): PreCliffRestartRuleSource {
  return (obs, thresholdMs) => {
    const value =
      obs.alreadyArmed ||
      obs.childAgeMs === null ||
      obs.childAgeMs < thresholdMs ||
      obs.deferredOrActionPending
        ? "wait"
        : "arm"
    return Promise.resolve({ value, notice: null })
  }
}

export function deferredRestartRuleDouble(): DeferredRestartRuleSource {
  const IDLE_STREAK_TO_RESTART = 2
  const DEFAULT_REEXEC_MAX_DEFER_MS = 1_800_000
  const DEFAULT_STALE_WEDGE_MS = 600_000
  const EDGE_CONNECTION_CLIFF_OVERRIDE_MS = 28_200_000
  const INITIAL_DEFERRED_RESTART_STATE: DeferredRestartState = {
    idleStreak: 0,
    elapsedTicks: 0,
    staleStreak: 0,
    prevBusyReason: null,
    prevTranscriptMtimeMs: null,
  }
  const resolveMs = (raw: string | undefined, fallback: number): number => {
    if (raw == null || raw.trim() === "") return fallback
    const parsed = Number(raw)
    if (!Number.isFinite(parsed) || parsed < 0) return fallback
    return Math.floor(parsed)
  }
  return {
    constants: () =>
      decided({
        INITIAL_DEFERRED_RESTART_STATE,
        EDGE_CONNECTION_CLIFF_PREEMPT_MS: 27_600_000,
        EDGE_CONNECTION_CLIFF_OVERRIDE_MS,
      }),
    decide: (sent, obs, config) => {
      const state = sent ?? INITIAL_DEFERRED_RESTART_STATE
      const elapsedTicks = state.elapsedTicks + 1
      const ceilingBreached =
        config?.ceilingTicks !== undefined && elapsedTicks >= config.ceilingTicks
      if (!obs.idle) {
        const curReason = obs.busyReason ?? null
        const curMtime = obs.transcriptMtimeMs ?? null
        const proven =
          curReason !== null &&
          curReason === state.prevBusyReason &&
          curMtime !== null &&
          curMtime === state.prevTranscriptMtimeMs
        const staleStreak = proven ? state.staleStreak + 1 : 0
        const staleBreached = config?.staleTicks !== undefined && staleStreak >= config.staleTicks
        const fire = staleBreached || ceilingBreached
        const fireReason: DeferredRestartFireReason | null = fire
          ? staleBreached
            ? "stale-wedge"
            : "ceiling"
          : null
        return decided({
          state: {
            idleStreak: 0,
            elapsedTicks,
            staleStreak,
            prevBusyReason: curReason,
            prevTranscriptMtimeMs: curMtime,
          },
          fire,
          fireReason,
        })
      }
      const idleStreak = state.idleStreak + 1
      const idleFires = idleStreak >= IDLE_STREAK_TO_RESTART
      const fire = idleFires || ceilingBreached
      const fireReason: DeferredRestartFireReason | null = fire
        ? idleFires
          ? "idle"
          : "ceiling"
        : null
      return decided({
        state: {
          idleStreak,
          elapsedTicks,
          staleStreak: 0,
          prevBusyReason: null,
          prevTranscriptMtimeMs: null,
        },
        fire,
        fireReason,
      })
    },
    windows: (raw) =>
      decided({
        maxDeferMs: resolveMs(raw.maxDeferMs, DEFAULT_REEXEC_MAX_DEFER_MS),
        staleWedgeMs: resolveMs(raw.staleWedgeMs, DEFAULT_STALE_WEDGE_MS),
        preCliffOverrideMs: resolveMs(raw.preCliffOverrideMs, EDGE_CONNECTION_CLIFF_OVERRIDE_MS),
      }),
  }
}
