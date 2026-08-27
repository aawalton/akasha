
export type Answer<T> = { readonly value: T; readonly notice: string | null }

export const REFUSAL_TAIL =
  ": this suite injected the throwing double, so reaching a decision here is the defect rather " +
  "than a missing fixture. Either the code under test should not be deciding on this path, or " +
  "the test means to supply a working double and has not."

export function standingRefusal(which: string): string {
  return `Error: ${which}${REFUSAL_TAIL}`
}

export type IdleObs = {
  readonly inFlight: number | null
  readonly busyChildren: number | null
  readonly inFlightDispatchChildren: number | null
  readonly claudePresent: boolean
}

export type Status = { readonly exitCode: number | null; readonly signal: string | null }

export const REFUSALS: readonly {
  readonly name: string
  readonly double: "idle" | "childExit"
  readonly method: string
  readonly which: string
}[] = [
  {"name":"unused idle rule, ignoredMcpCmdlines","double":"idle","method":"ignoredMcpCmdlines","which":"idle rule"},
  {"name":"unused idle rule, preservingRestart","double":"idle","method":"preservingRestart","which":"idle rule"},
  {"name":"unused idle rule, pastCliff","double":"idle","method":"pastCliff","which":"idle rule"},
  {"name":"unused child-exit rule, decodeWaitStatus","double":"childExit","method":"decodeWaitStatus","which":"child-exit rule"},
  {"name":"unused child-exit rule, collapse","double":"childExit","method":"collapse","which":"child-exit rule"},
  {"name":"unused child-exit rule, classify","double":"childExit","method":"classify","which":"child-exit rule"},
  {"name":"unused child-exit rule, shutdownWrite","double":"childExit","method":"shutdownWrite","which":"child-exit rule"},
]

export const CMDLINES: readonly {
  readonly name: string
  readonly cmdlines: readonly string[]
  readonly standing: Answer<readonly boolean[]>
}[] = [
  {"name":"no cmdlines","cmdlines":[],"standing":{"value":[],"notice":null}},
  {"name":"one cmdline","cmdlines":["bun mcp-server"],"standing":{"value":[false],"notice":null}},
  {"name":"three cmdlines","cmdlines":["a","b","c"],"standing":{"value":[false,false,false],"notice":null}},
]

export const IDLE: readonly {
  readonly name: string
  readonly obs: IdleObs
  readonly preservingRestart: Answer<{ readonly idle: boolean; readonly reason: string }>
  readonly pastCliff: Answer<{ readonly idle: boolean; readonly reason: string }>
}[] = [
  {"name":"idle, nothing in flight","obs":{"inFlight":0,"busyChildren":0,"inFlightDispatchChildren":0,"claudePresent":true},"preservingRestart":{"value":{"idle":true,"reason":"idle"},"notice":null},"pastCliff":{"value":{"idle":true,"reason":"idle"},"notice":null}},
  {"name":"one in flight","obs":{"inFlight":1,"busyChildren":0,"inFlightDispatchChildren":0,"claudePresent":true},"preservingRestart":{"value":{"idle":false,"reason":"inFlight=1"},"notice":null},"pastCliff":{"value":{"idle":false,"reason":"inFlight=1"},"notice":null}},
  {"name":"in flight unread","obs":{"inFlight":null,"busyChildren":0,"inFlightDispatchChildren":0,"claudePresent":true},"preservingRestart":{"value":{"idle":false,"reason":"inFlight=unread"},"notice":null},"pastCliff":{"value":{"idle":false,"reason":"inFlight=unread"},"notice":null}},
  {"name":"two busy children","obs":{"inFlight":0,"busyChildren":2,"inFlightDispatchChildren":0,"claudePresent":true},"preservingRestart":{"value":{"idle":false,"reason":"busyChildren=2"},"notice":null},"pastCliff":{"value":{"idle":true,"reason":"idle"},"notice":null}},
  {"name":"busy children unread","obs":{"inFlight":0,"busyChildren":null,"inFlightDispatchChildren":0,"claudePresent":true},"preservingRestart":{"value":{"idle":false,"reason":"busyChildren=unread"},"notice":null},"pastCliff":{"value":{"idle":true,"reason":"idle"},"notice":null}},
  {"name":"both busy","obs":{"inFlight":1,"busyChildren":2,"inFlightDispatchChildren":0,"claudePresent":true},"preservingRestart":{"value":{"idle":false,"reason":"inFlight=1, busyChildren=2"},"notice":null},"pastCliff":{"value":{"idle":false,"reason":"inFlight=1"},"notice":null}},
  {"name":"both unread","obs":{"inFlight":null,"busyChildren":null,"inFlightDispatchChildren":0,"claudePresent":true},"preservingRestart":{"value":{"idle":false,"reason":"inFlight=unread, busyChildren=unread"},"notice":null},"pastCliff":{"value":{"idle":false,"reason":"inFlight=unread"},"notice":null}},
  {"name":"in flight unread, children busy","obs":{"inFlight":null,"busyChildren":2,"inFlightDispatchChildren":0,"claudePresent":true},"preservingRestart":{"value":{"idle":false,"reason":"inFlight=unread, busyChildren=2"},"notice":null},"pastCliff":{"value":{"idle":false,"reason":"inFlight=unread"},"notice":null}},
  {"name":"in flight busy, children unread","obs":{"inFlight":1,"busyChildren":null,"inFlightDispatchChildren":0,"claudePresent":true},"preservingRestart":{"value":{"idle":false,"reason":"inFlight=1, busyChildren=unread"},"notice":null},"pastCliff":{"value":{"idle":false,"reason":"inFlight=1"},"notice":null}},
  {"name":"claude absent, otherwise idle","obs":{"inFlight":0,"busyChildren":0,"inFlightDispatchChildren":0,"claudePresent":false},"preservingRestart":{"value":{"idle":false,"reason":"claude-absent"},"notice":null},"pastCliff":{"value":{"idle":false,"reason":"claude-absent"},"notice":null}},
  {"name":"claude absent, busy children","obs":{"inFlight":0,"busyChildren":2,"inFlightDispatchChildren":0,"claudePresent":false},"preservingRestart":{"value":{"idle":false,"reason":"busyChildren=2, claude-absent"},"notice":null},"pastCliff":{"value":{"idle":false,"reason":"claude-absent"},"notice":null}},
  {"name":"claude absent, everything unread","obs":{"inFlight":null,"busyChildren":null,"inFlightDispatchChildren":0,"claudePresent":false},"preservingRestart":{"value":{"idle":false,"reason":"inFlight=unread, busyChildren=unread, claude-absent"},"notice":null},"pastCliff":{"value":{"idle":false,"reason":"inFlight=unread, claude-absent"},"notice":null}},
]

export const DECODE: readonly {
  readonly name: string
  readonly raw: number
  readonly standing: Answer<Status>
}[] = [
  {"name":"raw 0","raw":0,"standing":{"value":{"exitCode":0,"signal":null},"notice":null}},
  {"name":"raw 1","raw":1,"standing":{"value":{"exitCode":1,"signal":null},"notice":null}},
  {"name":"raw 143","raw":143,"standing":{"value":{"exitCode":143,"signal":null},"notice":null}},
]

export const COLLAPSE: readonly {
  readonly name: string
  readonly status: Status
  readonly standing: Answer<number>
}[] = [
  {"name":"clean exit","status":{"exitCode":0,"signal":null},"standing":{"value":0,"notice":null}},
  {"name":"exit 7","status":{"exitCode":7,"signal":null},"standing":{"value":7,"notice":null}},
  {"name":"signal death","status":{"exitCode":null,"signal":"SIGKILL"},"standing":{"value":0,"notice":null}},
  {"name":"unread status","status":{"exitCode":null,"signal":null},"standing":{"value":0,"notice":null}},
]

export const CLASSIFY: readonly {
  readonly name: string
  readonly obs: {
    readonly status: Status
    readonly supervisorKilled: boolean
    readonly shuttingDown: boolean
  }
  readonly standing: Answer<{
    readonly crashed: boolean
    readonly stopReason: string
    readonly reason: string
    readonly status: Status
  }>
}[] = [
  {"name":"clean exit, nothing else","obs":{"status":{"exitCode":0,"signal":null},"supervisorKilled":false,"shuttingDown":false},"standing":{"value":{"crashed":false,"stopReason":"deliberate","reason":"double","status":{"exitCode":0,"signal":null}},"notice":null}},
  {"name":"signal death while shutting down","obs":{"status":{"exitCode":null,"signal":"SIGTERM"},"supervisorKilled":true,"shuttingDown":true},"standing":{"value":{"crashed":false,"stopReason":"deliberate","reason":"double","status":{"exitCode":null,"signal":"SIGTERM"}},"notice":null}},
  {"name":"crash-shaped exit","obs":{"status":{"exitCode":9,"signal":null},"supervisorKilled":false,"shuttingDown":false},"standing":{"value":{"crashed":false,"stopReason":"deliberate","reason":"double","status":{"exitCode":9,"signal":null}},"notice":null}},
]

export const SHUTDOWN: readonly {
  readonly name: string
  readonly classification: {
    readonly crashed: boolean
    readonly stopReason: string
    readonly reason: string
    readonly status: Status
  } | null
  readonly standing: Answer<{
    readonly stampCleanExit: boolean
    readonly stopReason: string
    readonly recordCrash: boolean
  }>
}[] = [
  {"name":"no classification","classification":null,"standing":{"value":{"stampCleanExit":true,"stopReason":"deliberate","recordCrash":false},"notice":null}},
  {"name":"a crashed classification","classification":{"crashed":true,"stopReason":"child-crashed","reason":"child exited 9","status":{"exitCode":9,"signal":null}},"standing":{"value":{"stampCleanExit":true,"stopReason":"deliberate","recordCrash":false},"notice":null}},
]
