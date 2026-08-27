
export interface RecordedAsk {
  readonly stateIn: string
  readonly healthy: boolean
}

export interface Recording {
  readonly scenario: string
  readonly asks: readonly RecordedAsk[]
  readonly logs: readonly string[]
  readonly healthzHits: number
}

export const STANDING_WIRE = {
  intervalMs: 30000,
  exportedIntervalMs: 30000,
  stopClearedTheWiredTimer: true,
} as const

export const STANDING_RECORDINGS: readonly Recording[] = [
  {
    scenario: "no-handle-skips-the-tick",
    asks: [],
    logs: [],
    healthzHits: 0,
  },
  {
    scenario: "live-pid-and-200-is-healthy",
    asks: [{ stateIn: "null", healthy: true }],
    logs: [],
    healthzHits: 1,
  },
  {
    scenario: "live-pid-and-503-is-unhealthy",
    asks: [{ stateIn: "null", healthy: false }],
    logs: [],
    healthzHits: 1,
  },
  {
    scenario: "dead-pid-short-circuits-the-probe",
    asks: [{ stateIn: "null", healthy: false }],
    logs: [],
    healthzHits: 0,
  },
  {
    scenario: "closed-port-is-unhealthy",
    asks: [{ stateIn: "null", healthy: false }],
    logs: [],
    healthzHits: 0,
  },
  {
    scenario: "give-up-logs-once-and-respawns-nothing",
    asks: [{ stateIn: "null", healthy: false }],
    logs: [
      "error|[local] proxy-liveness: GIVING UP — proxy on port <healthy-port> still unhealthy after repeated respawns; agents on this supervisor may be credential-less until the proxy recovers or the supervisor restarts",
    ],
    healthzHits: 1,
  },
  {
    scenario: "respawn-without-an-agent-id-is-skipped",
    asks: [{ stateIn: "null", healthy: false }],
    logs: ["error|[local] proxy-liveness: respawn skipped — no current agent id"],
    healthzHits: 1,
  },
  {
    scenario: "the-state-threads-into-the-next-tick",
    asks: [
      { stateIn: "null", healthy: false },
      { stateIn: "f=1,r=0,g=false", healthy: false },
      { stateIn: "f=2,r=0,g=false", healthy: false },
    ],
    logs: [],
    healthzHits: 3,
  },
  {
    scenario: "an-overlapping-tick-is-dropped",
    asks: [{ stateIn: "null", healthy: true }],
    logs: [],
    healthzHits: 1,
  },
  {
    scenario: "a-throwing-handle-read-routes-to-guard-tick",
    asks: [],
    logs: ["error|[local] proxy-liveness: tick error: Error: handle read blew up"],
    healthzHits: 0,
  },
]
