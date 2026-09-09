export type ProfilerRecordKind = "closure" | "cfunction" | "gc" | "other"

export interface ProfilerRecord {
  kind: ProfilerRecordKind
  dataIndex: number
  startNs: number
  endNs: number
  callerIndex: number | undefined
}

export interface ProfilerCounter {
  callCount: number
  inclusiveNs: number
  selfNs: number
}

export interface ProfilerAccumulator {
  closures: Map<number, ProfilerCounter>
  cfunctions: Map<number, ProfilerCounter>
  rootInclusiveNs: number
  gcInclusiveNs: number
  recordCount: number
}

export interface ResolvedEntry {
  kind: "closure" | "cfunction"
  name: string
  source: string
  line: number
  callCount: number
  inclusiveNs: number
  selfNs: number
}

export interface ProfilerEntry {
  kind: "closure" | "cfunction"
  name: string
  source: string
  line: number
  callCount: number
  inclusiveMs: number
  selfMs: number
}

export interface ProfilerSourceBucket {
  source: string
  selfMs: number
  inclusiveMs: number
  callCount: number
}

export interface BankProfile {
  schemaVersion: number
  timestamp: number
  bankingBag: number
  profilerAvailable: boolean
  frameCount: number
  recordCount: number
  truncated: boolean
  totalLuaMs: number
  totalSelfMs: number
  gcMs: number
  bySource: ProfilerSourceBucket[]
  topByInclusive: ProfilerEntry[]
  topBySelf: ProfilerEntry[]
}
