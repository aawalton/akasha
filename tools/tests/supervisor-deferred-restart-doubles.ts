export type Obs = {
  inFlight: number | null
  busyChildren: number | null
  inFlightDispatchChildren: number | null
  claudePresent: boolean
}

export type ArmOptions = {
  getClaudePid: () => number | null
  getProxyPort: () => number | null
  getAgentId: () => string | null
  idleRule: IdleDouble
  deferredRestartRule: DeferredDouble
  onIdle: (cause: string) => void
  log?: (line: string) => void
  tickMs?: number
  maxDeferMs?: number
  staleWedgeMs?: number
  armedAtMs?: number
  observe?: () => Promise<Obs>
  readTranscriptMtime?: () => number | null
  pastCliffOverride?: { cliffAgeMs: number; getChildAgeMs: () => number | null }
  readBusyChildDetails?: () => Promise<
    readonly { pid: string; cmdline: string; ageMs: number | null }[]
  >
}

export type Arm = (opts: ArmOptions) => { cancel: () => void }

const decided = <T>(value: T): Promise<{ value: T; notice: null }> =>
  Promise.resolve({ value, notice: null })

type Answer<T> = Promise<{ value: T; notice: null }>

export type IdleDouble = {
  ignoredMcpCmdlines: (cmdlines: readonly string[]) => Answer<readonly boolean[]>
  preservingRestart: (obs: Obs) => Answer<{ idle: boolean; reason: string }>
  pastCliff: (obs: Obs) => Answer<{ idle: boolean; reason: string }>
}

type DrObservation = { idle: boolean; busyReason?: string; transcriptMtimeMs?: number | null }
type DrConfig = { ceilingTicks?: number; staleTicks?: number }
type DrVerdict = {
  state: DrState
  fire: boolean
  fireReason: "idle" | "stale-wedge" | "ceiling" | null
}

export type DeferredDouble = {
  constants: () => Answer<{
    INITIAL_DEFERRED_RESTART_STATE: DrState
    EDGE_CONNECTION_CLIFF_PREEMPT_MS: number
    EDGE_CONNECTION_CLIFF_OVERRIDE_MS: number
  }>
  decide: (state: DrState | null, obs: DrObservation, config?: DrConfig) => Answer<DrVerdict>
  windows: () => Answer<{
    maxDeferMs: number
    staleWedgeMs: number
    preCliffOverrideMs: number
  }>
}

export function idleRuleDouble(): IdleDouble {
  const isIdle = (obs: Obs): boolean =>
    obs.inFlight === 0 && obs.busyChildren === 0 && obs.claudePresent
  const isIdlePastCliff = (obs: Obs): boolean => obs.inFlight === 0 && obs.claudePresent
  const busyReason = (obs: Obs, ignoreBusyChildren: boolean): string => {
    const parts: string[] = []
    if (obs.inFlight !== 0) parts.push(`inFlight=${obs.inFlight ?? "unread"}`)
    if (!ignoreBusyChildren && obs.busyChildren !== 0)
      parts.push(`busyChildren=${obs.busyChildren ?? "unread"}`)
    if (!obs.claudePresent) parts.push("claude-absent")
    return parts.length === 0 ? "idle" : parts.join(", ")
  }
  return {
    ignoredMcpCmdlines: (cmdlines: readonly string[]) => decided(cmdlines.map(() => false)),
    preservingRestart: (obs: Obs) => decided({ idle: isIdle(obs), reason: busyReason(obs, false) }),
    pastCliff: (obs: Obs) => decided({ idle: isIdlePastCliff(obs), reason: busyReason(obs, true) }),
  }
}

type DrState = {
  idleStreak: number
  elapsedTicks: number
  staleStreak: number
  prevBusyReason: string | null
  prevTranscriptMtimeMs: number | null
}

export function deferredRestartRuleDouble(): DeferredDouble {
  const IDLE_STREAK_TO_RESTART = 2
  const INITIAL: DrState = {
    idleStreak: 0,
    elapsedTicks: 0,
    staleStreak: 0,
    prevBusyReason: null,
    prevTranscriptMtimeMs: null,
  }
  return {
    constants: () =>
      decided({
        INITIAL_DEFERRED_RESTART_STATE: INITIAL,
        EDGE_CONNECTION_CLIFF_PREEMPT_MS: 27_600_000,
        EDGE_CONNECTION_CLIFF_OVERRIDE_MS: 28_200_000,
      }),
    decide: (sent, obs, config) => {
      const state = sent ?? INITIAL
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
        return decided({
          state: {
            idleStreak: 0,
            elapsedTicks,
            staleStreak,
            prevBusyReason: curReason,
            prevTranscriptMtimeMs: curMtime,
          },
          fire,
          fireReason: fire ? (staleBreached ? "stale-wedge" : "ceiling") : null,
        })
      }
      const idleStreak = state.idleStreak + 1
      const idleFires = idleStreak >= IDLE_STREAK_TO_RESTART
      const fire = idleFires || ceilingBreached
      return decided({
        state: {
          idleStreak,
          elapsedTicks,
          staleStreak: 0,
          prevBusyReason: null,
          prevTranscriptMtimeMs: null,
        },
        fire,
        fireReason: fire ? (idleFires ? "idle" : "ceiling") : null,
      })
    },
    windows: () =>
      decided({ maxDeferMs: 1_800_000, staleWedgeMs: 600_000, preCliffOverrideMs: 28_200_000 }),
  }
}
