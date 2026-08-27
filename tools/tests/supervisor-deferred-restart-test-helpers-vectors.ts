
export type Answer<T> = { readonly value: T; readonly notice: string | null }

export const OBS: readonly {
  readonly name: string
  readonly standing: Answer<{
    inFlight: number
    busyChildren: number
    inFlightDispatchChildren: number
    claudePresent: boolean
  }>
}[] = [
  {"name":"IDLE_OBS","standing":{"value":{"inFlight":0,"busyChildren":0,"inFlightDispatchChildren":0,"claudePresent":true},"notice":null}},
  {"name":"BUSY_OBS","standing":{"value":{"inFlight":1,"busyChildren":0,"inFlightDispatchChildren":0,"claudePresent":true},"notice":null}},
  {"name":"OWN_STATE_IDLE_WITH_CHILDREN","standing":{"value":{"inFlight":0,"busyChildren":0,"inFlightDispatchChildren":2,"claudePresent":true},"notice":null}},
]

export const OBSERVES: readonly {
  readonly name: string
  readonly standing: Answer<string>
}[] = [
  {"name":"NEVER never settles","standing":{"value":"pending","notice":null}},
  {"name":"THROWS rejects","standing":{"value":"Error: observe boom","notice":null}},
]

export const PROBE: readonly {
  readonly name: string
  readonly standing: Answer<unknown>
}[] = [
  {"name":"getClaudePid","standing":{"value":null,"notice":null}},
  {"name":"getProxyPort","standing":{"value":null,"notice":null}},
  {"name":"getAgentId","standing":{"value":null,"notice":null}},
  {"name":"keys","standing":{"value":["deferredRestartRule","getAgentId","getClaudePid","getProxyPort","idleRule"],"notice":null}},
  {"name":"idleRule.preservingRestart on IDLE_OBS","standing":{"value":{"idle":true,"reason":"idle"},"notice":null}},
  {"name":"idleRule.preservingRestart on BUSY_OBS","standing":{"value":{"idle":false,"reason":"inFlight=1"},"notice":null}},
  {"name":"idleRule.pastCliff on OWN_STATE_IDLE_WITH_CHILDREN","standing":{"value":{"idle":true,"reason":"idle"},"notice":null}},
  {"name":"deferredRestartRule.constants","standing":{"value":{"INITIAL_DEFERRED_RESTART_STATE":{"idleStreak":0,"elapsedTicks":0,"staleStreak":0,"prevBusyReason":null,"prevTranscriptMtimeMs":null},"EDGE_CONNECTION_CLIFF_PREEMPT_MS":27600000,"EDGE_CONNECTION_CLIFF_OVERRIDE_MS":28200000},"notice":null}},
]

export const WAIT: readonly {
  readonly name: string
  readonly turnsTrueAfter: number
  readonly timeoutMs: number
  readonly standing: Answer<string>
}[] = [
  {"name":"predicate already true","turnsTrueAfter":0,"timeoutMs":200,"standing":{"value":"resolved","notice":null}},
  {"name":"predicate true on a later poll","turnsTrueAfter":3,"timeoutMs":200,"standing":{"value":"resolved","notice":null}},
  {"name":"predicate never true","turnsTrueAfter":-1,"timeoutMs":30,"standing":{"value":"Error: waitFor timed out after 30ms","notice":null}},
  {"name":"zero timeout and a false predicate","turnsTrueAfter":-1,"timeoutMs":0,"standing":{"value":"Error: waitFor timed out after 0ms","notice":null}},
  {"name":"zero timeout and a true predicate","turnsTrueAfter":0,"timeoutMs":0,"standing":{"value":"resolved","notice":null}},
]
