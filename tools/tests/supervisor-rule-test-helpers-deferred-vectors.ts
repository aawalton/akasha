
import type { Answer } from "./supervisor-rule-test-helpers-idle-vectors.ts"

export const JITTER: readonly {
  readonly name: string
  readonly randFloat: number
  readonly rawMaxJitterMs: string | null
  readonly standing: Answer<number>
}[] = [
  {"name":"half of the default window","randFloat":0.5,"rawMaxJitterMs":null,"standing":{"value":30000,"notice":null}},
  {"name":"zero random","randFloat":0,"rawMaxJitterMs":null,"standing":{"value":0,"notice":null}},
  {"name":"negative random","randFloat":-1,"rawMaxJitterMs":null,"standing":{"value":0,"notice":null}},
  {"name":"random past one","randFloat":1.5,"rawMaxJitterMs":null,"standing":{"value":60000,"notice":null}},
  {"name":"empty override","randFloat":0.5,"rawMaxJitterMs":"","standing":{"value":30000,"notice":null}},
  {"name":"blank override","randFloat":0.5,"rawMaxJitterMs":"   ","standing":{"value":30000,"notice":null}},
  {"name":"unparseable override","randFloat":0.5,"rawMaxJitterMs":"abc","standing":{"value":30000,"notice":null}},
  {"name":"negative override","randFloat":0.5,"rawMaxJitterMs":"-5","standing":{"value":30000,"notice":null}},
  {"name":"zero override","randFloat":0.5,"rawMaxJitterMs":"0","standing":{"value":0,"notice":null}},
  {"name":"override of 1000","randFloat":0.25,"rawMaxJitterMs":"1000","standing":{"value":250,"notice":null}},
  {"name":"fractional override","randFloat":1,"rawMaxJitterMs":"1000.7","standing":{"value":1000,"notice":null}},
]

export const PROXY: readonly {
  readonly name: string
  readonly input: {
    readonly hasLiveProxy: boolean
    readonly versionMatches: boolean
    readonly healthy: boolean
  }
  readonly standing: Answer<string>
}[] = [
  {"name":"live=false match=false healthy=false","input":{"hasLiveProxy":false,"versionMatches":false,"healthy":false},"standing":{"value":"spawn-fresh","notice":null}},
  {"name":"live=false match=false healthy=true","input":{"hasLiveProxy":false,"versionMatches":false,"healthy":true},"standing":{"value":"spawn-fresh","notice":null}},
  {"name":"live=false match=true healthy=false","input":{"hasLiveProxy":false,"versionMatches":true,"healthy":false},"standing":{"value":"spawn-fresh","notice":null}},
  {"name":"live=false match=true healthy=true","input":{"hasLiveProxy":false,"versionMatches":true,"healthy":true},"standing":{"value":"spawn-fresh","notice":null}},
  {"name":"live=true match=false healthy=false","input":{"hasLiveProxy":true,"versionMatches":false,"healthy":false},"standing":{"value":"spawn-fresh","notice":null}},
  {"name":"live=true match=false healthy=true","input":{"hasLiveProxy":true,"versionMatches":false,"healthy":true},"standing":{"value":"adopt-with-drift","notice":null}},
  {"name":"live=true match=true healthy=false","input":{"hasLiveProxy":true,"versionMatches":true,"healthy":false},"standing":{"value":"adopt","notice":null}},
  {"name":"live=true match=true healthy=true","input":{"hasLiveProxy":true,"versionMatches":true,"healthy":true},"standing":{"value":"adopt","notice":null}},
]

export const PRECLIFF: readonly {
  readonly name: string
  readonly obs: {
    readonly childAgeMs: number | null
    readonly alreadyArmed: boolean
    readonly deferredOrActionPending: boolean
  }
  readonly thresholdMs: number
  readonly standing: Answer<string>
}[] = [
  {"name":"past the threshold, nothing blocking","obs":{"childAgeMs":100,"alreadyArmed":false,"deferredOrActionPending":false},"thresholdMs":50,"standing":{"value":"arm","notice":null}},
  {"name":"exactly at the threshold","obs":{"childAgeMs":50,"alreadyArmed":false,"deferredOrActionPending":false},"thresholdMs":50,"standing":{"value":"arm","notice":null}},
  {"name":"short of the threshold","obs":{"childAgeMs":49,"alreadyArmed":false,"deferredOrActionPending":false},"thresholdMs":50,"standing":{"value":"wait","notice":null}},
  {"name":"age unread","obs":{"childAgeMs":null,"alreadyArmed":false,"deferredOrActionPending":false},"thresholdMs":50,"standing":{"value":"wait","notice":null}},
  {"name":"already armed","obs":{"childAgeMs":100,"alreadyArmed":true,"deferredOrActionPending":false},"thresholdMs":50,"standing":{"value":"wait","notice":null}},
  {"name":"an action already pending","obs":{"childAgeMs":100,"alreadyArmed":false,"deferredOrActionPending":true},"thresholdMs":50,"standing":{"value":"wait","notice":null}},
]

export const CONSTANTS: Answer<unknown> = {"value":{"INITIAL_DEFERRED_RESTART_STATE":{"idleStreak":0,"elapsedTicks":0,"staleStreak":0,"prevBusyReason":null,"prevTranscriptMtimeMs":null},"EDGE_CONNECTION_CLIFF_PREEMPT_MS":27600000,"EDGE_CONNECTION_CLIFF_OVERRIDE_MS":28200000},"notice":null}

export const WINDOWS: readonly {
  readonly name: string
  readonly raw: {
    readonly maxDeferMs: string | null
    readonly staleWedgeMs: string | null
    readonly preCliffOverrideMs: string | null
  }
  readonly standing: Answer<{
    readonly maxDeferMs: number
    readonly staleWedgeMs: number
    readonly preCliffOverrideMs: number
  }>
}[] = [
  {"name":"nothing set","raw":{"maxDeferMs":null,"staleWedgeMs":null,"preCliffOverrideMs":null},"standing":{"value":{"maxDeferMs":1800000,"staleWedgeMs":600000,"preCliffOverrideMs":28200000},"notice":null}},
  {"name":"all three set","raw":{"maxDeferMs":"1000","staleWedgeMs":"2000","preCliffOverrideMs":"3000"},"standing":{"value":{"maxDeferMs":1000,"staleWedgeMs":2000,"preCliffOverrideMs":3000},"notice":null}},
  {"name":"blank, unparseable and negative","raw":{"maxDeferMs":"  ","staleWedgeMs":"abc","preCliffOverrideMs":"-1"},"standing":{"value":{"maxDeferMs":1800000,"staleWedgeMs":600000,"preCliffOverrideMs":28200000},"notice":null}},
  {"name":"fractional","raw":{"maxDeferMs":"10.9","staleWedgeMs":"0","preCliffOverrideMs":"7.2"},"standing":{"value":{"maxDeferMs":10,"staleWedgeMs":0,"preCliffOverrideMs":7},"notice":null}},
]

export type DeferredState = {
  readonly idleStreak: number
  readonly elapsedTicks: number
  readonly staleStreak: number
  readonly prevBusyReason: string | null
  readonly prevTranscriptMtimeMs: number | null
}

export const DECIDE: readonly {
  readonly name: string
  readonly state: DeferredState | null
  readonly obs: {
    readonly idle: boolean
    readonly busyReason?: string
    readonly transcriptMtimeMs?: number | null
  }
  readonly config?: { readonly ceilingTicks?: number; readonly staleTicks?: number }
  readonly standing: Answer<{
    readonly state: DeferredState
    readonly fire: boolean
    readonly fireReason: string | null
  }>
}[] = [
  {"name":"first tick, idle, no state","state":null,"obs":{"idle":true},"standing":{"value":{"state":{"idleStreak":1,"elapsedTicks":1,"staleStreak":0,"prevBusyReason":null,"prevTranscriptMtimeMs":null},"fire":false,"fireReason":null},"notice":null}},
  {"name":"first tick, busy, no state","state":null,"obs":{"idle":false,"busyReason":"inFlight=1"},"standing":{"value":{"state":{"idleStreak":0,"elapsedTicks":1,"staleStreak":0,"prevBusyReason":"inFlight=1","prevTranscriptMtimeMs":null},"fire":false,"fireReason":null},"notice":null}},
  {"name":"second idle tick fires","state":{"idleStreak":1,"elapsedTicks":1,"staleStreak":0,"prevBusyReason":null,"prevTranscriptMtimeMs":null},"obs":{"idle":true},"standing":{"value":{"state":{"idleStreak":2,"elapsedTicks":2,"staleStreak":0,"prevBusyReason":null,"prevTranscriptMtimeMs":null},"fire":true,"fireReason":"idle"},"notice":null}},
  {"name":"busy tick resets the idle streak","state":{"idleStreak":1,"elapsedTicks":1,"staleStreak":0,"prevBusyReason":null,"prevTranscriptMtimeMs":null},"obs":{"idle":false,"busyReason":"inFlight=1","transcriptMtimeMs":10},"standing":{"value":{"state":{"idleStreak":0,"elapsedTicks":2,"staleStreak":0,"prevBusyReason":"inFlight=1","prevTranscriptMtimeMs":10},"fire":false,"fireReason":null},"notice":null}},
  {"name":"proven stale, one short of the wedge","state":{"idleStreak":0,"elapsedTicks":1,"staleStreak":0,"prevBusyReason":"inFlight=1","prevTranscriptMtimeMs":10},"obs":{"idle":false,"busyReason":"inFlight=1","transcriptMtimeMs":10},"config":{"staleTicks":2},"standing":{"value":{"state":{"idleStreak":0,"elapsedTicks":2,"staleStreak":1,"prevBusyReason":"inFlight=1","prevTranscriptMtimeMs":10},"fire":false,"fireReason":null},"notice":null}},
  {"name":"proven stale, the wedge fires","state":{"idleStreak":0,"elapsedTicks":2,"staleStreak":1,"prevBusyReason":"inFlight=1","prevTranscriptMtimeMs":10},"obs":{"idle":false,"busyReason":"inFlight=1","transcriptMtimeMs":10},"config":{"staleTicks":2},"standing":{"value":{"state":{"idleStreak":0,"elapsedTicks":3,"staleStreak":2,"prevBusyReason":"inFlight=1","prevTranscriptMtimeMs":10},"fire":true,"fireReason":"stale-wedge"},"notice":null}},
  {"name":"reason changed, so nothing is proven","state":{"idleStreak":0,"elapsedTicks":2,"staleStreak":1,"prevBusyReason":"inFlight=1","prevTranscriptMtimeMs":10},"obs":{"idle":false,"busyReason":"busyChildren=1","transcriptMtimeMs":10},"config":{"staleTicks":2},"standing":{"value":{"state":{"idleStreak":0,"elapsedTicks":3,"staleStreak":0,"prevBusyReason":"busyChildren=1","prevTranscriptMtimeMs":10},"fire":false,"fireReason":null},"notice":null}},
  {"name":"mtime moved, so nothing is proven","state":{"idleStreak":0,"elapsedTicks":2,"staleStreak":1,"prevBusyReason":"inFlight=1","prevTranscriptMtimeMs":10},"obs":{"idle":false,"busyReason":"inFlight=1","transcriptMtimeMs":11},"config":{"staleTicks":2},"standing":{"value":{"state":{"idleStreak":0,"elapsedTicks":3,"staleStreak":0,"prevBusyReason":"inFlight=1","prevTranscriptMtimeMs":11},"fire":false,"fireReason":null},"notice":null}},
  {"name":"mtime unread never proves a wedge","state":{"idleStreak":0,"elapsedTicks":2,"staleStreak":1,"prevBusyReason":"inFlight=1","prevTranscriptMtimeMs":null},"obs":{"idle":false,"busyReason":"inFlight=1","transcriptMtimeMs":null},"config":{"staleTicks":2},"standing":{"value":{"state":{"idleStreak":0,"elapsedTicks":3,"staleStreak":0,"prevBusyReason":"inFlight=1","prevTranscriptMtimeMs":null},"fire":false,"fireReason":null},"notice":null}},
  {"name":"the ceiling fires on a busy tick","state":{"idleStreak":0,"elapsedTicks":4,"staleStreak":0,"prevBusyReason":null,"prevTranscriptMtimeMs":null},"obs":{"idle":false,"busyReason":"inFlight=1"},"config":{"ceilingTicks":5},"standing":{"value":{"state":{"idleStreak":0,"elapsedTicks":5,"staleStreak":0,"prevBusyReason":"inFlight=1","prevTranscriptMtimeMs":null},"fire":true,"fireReason":"ceiling"},"notice":null}},
  {"name":"the ceiling fires on an idle tick before the streak does","state":{"idleStreak":0,"elapsedTicks":4,"staleStreak":0,"prevBusyReason":null,"prevTranscriptMtimeMs":null},"obs":{"idle":true},"config":{"ceilingTicks":5},"standing":{"value":{"state":{"idleStreak":1,"elapsedTicks":5,"staleStreak":0,"prevBusyReason":null,"prevTranscriptMtimeMs":null},"fire":true,"fireReason":"ceiling"},"notice":null}},
  {"name":"no config, so neither bound applies","state":{"idleStreak":0,"elapsedTicks":40,"staleStreak":9,"prevBusyReason":"inFlight=1","prevTranscriptMtimeMs":10},"obs":{"idle":false,"busyReason":"inFlight=1","transcriptMtimeMs":10},"standing":{"value":{"state":{"idleStreak":0,"elapsedTicks":41,"staleStreak":10,"prevBusyReason":"inFlight=1","prevTranscriptMtimeMs":10},"fire":false,"fireReason":null},"notice":null}},
]
