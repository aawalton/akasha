interface ProfilerStat {
  call_ct: number
  durMs: number
  start_ms: number | undefined
}

interface ProfilerState {
  stats: Record<string, ProfilerStat>
  enabled: boolean
}

const STATE: ProfilerState = {
  stats: {},
  enabled: false,
}

function timeMs(): number {
  return GetGameTimeMilliseconds()
}

export function getStats(funcName: string): ProfilerStat {
  let s = STATE.stats[funcName]
  if (s === undefined) {
    s = { call_ct: 0, durMs: 0, start_ms: 0 }
    STATE.stats[funcName] = s
  }
  return s
}

export function call(funcName: string): undefined {
  if (!STATE.enabled) {
    return
  }
  const s = getStats(funcName)
  s.call_ct = s.call_ct + 1
  s.start_ms = timeMs()
}

export function end(funcName: string): undefined {
  if (!STATE.enabled) {
    return
  }
  const s = getStats(funcName)
  const durMs = timeMs() - (s.start_ms ?? 0)
  s.durMs = s.durMs + durMs
  s.start_ms = undefined
}

export function start(): undefined {
  STATE.enabled = true
  const sv = TemperWrit.savedVariables
  if (sv !== undefined) {
    sv["profiler_stats"] = STATE.stats
  }
  d("Profiler enabled")
}

export function stop(): undefined {
  STATE.enabled = false
  d("Profiler disabled")
}

export interface ProfilerNamespace {
  stats: Record<string, ProfilerStat>
  enabled: boolean
  GetStats: (this: void, funcName: string) => ProfilerStat
  Call: (this: void, funcName: string) => undefined
  End: (this: void, funcName: string) => undefined
  Start: (this: void) => undefined
  Stop: (this: void) => undefined
}

const PROFILER_NAMESPACE: ProfilerNamespace = {
  stats: STATE.stats,
  enabled: STATE.enabled,
  GetStats: getStats,
  Call: call,
  End: end,
  Start: start,
  Stop: stop,
}

TemperWrit.Profiler = PROFILER_NAMESPACE
