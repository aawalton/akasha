import {
  accumulateFrame,
  bucketBySource,
  emptyAccumulator,
  nsToMs,
  selectTop,
} from "../inventory-bank-profile-fold/inventory-bank-profile-fold.module.code.ts"
import type {
  BankProfile,
  ProfilerRecord,
  ProfilerRecordKind,
  ResolvedEntry,
} from "../inventory-bank-profile-types/inventory-bank-profile-types.module.code.ts"
import { getSavedVariables } from "../inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"

const SCHEMA_VERSION = 1
const TOP_N = 40
const MAX_RECORDS = 500000
const TRAILING_SCAN_WINDOW_MS = 5000

let profileActive = false
let profilerArmed = false
let bankingBagAtOpen = 0
let finalizeGeneration = 0

export function beginBankProfile(bankingBag: number): undefined {
  if (profileActive && IsScriptProfilerEnabled()) StopScriptProfiler()
  finalizeGeneration += 1
  bankingBagAtOpen = bankingBag
  StartScriptProfiler()
  profilerArmed = IsScriptProfilerEnabled()
  profileActive = true
}

export function scheduleBankProfileFinalize(): undefined {
  if (!profileActive) return
  const generation = finalizeGeneration
  zo_callLater(function (this: void): undefined {
    if (generation !== finalizeGeneration) return undefined
    finalizeBankProfile()
    return undefined
  }, TRAILING_SCAN_WINDOW_MS)
}

function classifyKind(dataType: number): ProfilerRecordKind {
  if (dataType === SCRIPT_PROFILER_RECORD_DATA_TYPE_CLOSURE) return "closure"
  if (dataType === SCRIPT_PROFILER_RECORD_DATA_TYPE_CFUNCTION) return "cfunction"
  if (dataType === SCRIPT_PROFILER_RECORD_DATA_TYPE_GARBAGE_COLLECTION) return "gc"
  return "other"
}

function unavailableProfile(bankingBag: number): BankProfile {
  return {
    schemaVersion: SCHEMA_VERSION,
    timestamp: GetTimeStamp(),
    bankingBag,
    profilerAvailable: false,
    frameCount: 0,
    recordCount: 0,
    truncated: false,
    totalLuaMs: 0,
    totalSelfMs: 0,
    gcMs: 0,
    bySource: [],
    topByInclusive: [],
    topBySelf: [],
  }
}

function buildProfile(bankingBag: number): BankProfile {
  const acc = emptyAccumulator()
  const numFrames = GetScriptProfilerNumFrames()
  let truncated = false
  for (let f = 1; f <= numFrames; f++) {
    const numRecords = GetScriptProfilerFrameNumRecords(f)
    const records: ProfilerRecord[] = []
    for (let r = 1; r <= numRecords; r++) {
      const [dataIndex, startNs, endNs, callerIndex, dataType] = GetScriptProfilerRecordInfo(f, r)
      records.push({ kind: classifyKind(dataType), dataIndex, startNs, endNs, callerIndex })
      if (acc.recordCount + records.length >= MAX_RECORDS) {
        truncated = true
        break
      }
    }
    accumulateFrame(acc, records)
    if (truncated) break
  }

  const entries: ResolvedEntry[] = []
  let totalSelfNs = 0
  acc.closures.forEach((counter, dataIndex) => {
    const [displayName, fileName, fileLineNumber] = GetScriptProfilerClosureInfo(dataIndex)
    totalSelfNs += counter.selfNs
    entries.push({
      kind: "closure",
      name: displayName,
      source: fileName,
      line: fileLineNumber,
      callCount: counter.callCount,
      inclusiveNs: counter.inclusiveNs,
      selfNs: counter.selfNs,
    })
  })
  acc.cfunctions.forEach((counter, dataIndex) => {
    const functionName = GetScriptProfilerCFunctionInfo(dataIndex)
    totalSelfNs += counter.selfNs
    entries.push({
      kind: "cfunction",
      name: functionName,
      source: "[C]",
      line: 0,
      callCount: counter.callCount,
      inclusiveNs: counter.inclusiveNs,
      selfNs: counter.selfNs,
    })
  })

  return {
    schemaVersion: SCHEMA_VERSION,
    timestamp: GetTimeStamp(),
    bankingBag,
    profilerAvailable: true,
    frameCount: numFrames,
    recordCount: acc.recordCount,
    truncated,
    totalLuaMs: nsToMs(acc.rootInclusiveNs),
    totalSelfMs: nsToMs(totalSelfNs),
    gcMs: nsToMs(acc.gcInclusiveNs),
    bySource: bucketBySource(entries),
    topByInclusive: selectTop(entries, "inclusive", TOP_N),
    topBySelf: selectTop(entries, "self", TOP_N),
  }
}

function finalizeBankProfile(): undefined {
  if (!profileActive) return
  profileActive = false
  if (IsScriptProfilerEnabled()) StopScriptProfiler()
  const sv = getSavedVariables()
  if (sv.diagnostics === undefined) sv.diagnostics = {}
  sv.diagnostics.lastBankProfile = profilerArmed
    ? buildProfile(bankingBagAtOpen)
    : unavailableProfile(bankingBagAtOpen)
}
