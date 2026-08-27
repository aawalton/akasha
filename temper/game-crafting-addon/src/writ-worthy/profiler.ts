interface ProfilerStat {
  call_ct: number
  dur_ms: number
  start_ms: number | undefined
}

interface ProfilerState {
  stats: Record<string, ProfilerStat>
  enabled: boolean
}

const state: ProfilerState = {
  stats: {},
  enabled: false,
}

function timeMs(): number {
  return GetGameTimeMilliseconds()
}

export function getStats(func_name: string): ProfilerStat {
  let s = state.stats[func_name]
  if (s === undefined) {
    s = { call_ct: 0, dur_ms: 0, start_ms: 0 }
    state.stats[func_name] = s
  }
  return s
}

export function call(func_name: string): undefined {
  if (!state.enabled) {
    return
  }
  const s = getStats(func_name)
  s.call_ct = s.call_ct + 1
  s.start_ms = timeMs()
}

export function end_(func_name: string): undefined {
  if (!state.enabled) {
    return
  }
  const s = getStats(func_name)
  const dur_ms = timeMs() - (s.start_ms ?? 0)
  s.dur_ms = s.dur_ms + dur_ms
  s.start_ms = undefined
}

export function start(): undefined {
  state.enabled = true
  const sv = TemperWrit.savedVariables
  if (sv !== undefined) {
    sv["profiler_stats"] = state.stats
  }
  d("Profiler enabled")
}

export function stop(): undefined {
  state.enabled = false
  d("Profiler disabled")
}

export interface ProfilerNamespace {
  stats: Record<string, ProfilerStat>
  enabled: boolean
  GetStats: (this: void, func_name: string) => ProfilerStat
  Call: (this: void, func_name: string) => void
  End: (this: void, func_name: string) => void
  Start: (this: void) => void
  Stop: (this: void) => void
}

const profilerNamespace: ProfilerNamespace = {
  stats: state.stats,
  enabled: state.enabled,
  GetStats: getStats,
  Call: call,
  End: end_,
  Start: start,
  Stop: stop,
}

TemperWrit.Profiler = profilerNamespace
