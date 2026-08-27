
import { readFileSync } from "node:fs"
import { type MemInfoKb, NarrowError, readMemInfoKb } from "./memory-reaper-read.ts"

export interface MemPressureStats {
  readonly someAvg10: number
  readonly someAvg60: number
  readonly fullAvg10: number
  readonly fullAvg60: number
}

export interface HostMemoryPressure extends MemInfoKb {
  readonly psi: MemPressureStats
}

function psiLine(body: string, kind: "some" | "full"): { avg10: number; avg60: number } {
  const re = new RegExp(`^${kind} avg10=(\\d+(?:\\.\\d+)?) avg60=(\\d+(?:\\.\\d+)?)`, "m")
  const match = re.exec(body)
  if (match === null) {
    throw new NarrowError(`psiLine: no match for ${re} in /proc/pressure/memory ${kind} avg10/avg60`)
  }
  return { avg10: Number.parseFloat(match[1] ?? ""), avg60: Number.parseFloat(match[2] ?? "") }
}

export function parseMemPressureStats(body: string): MemPressureStats {
  const some = psiLine(body, "some")
  const full = psiLine(body, "full")
  return {
    someAvg10: some.avg10,
    someAvg60: some.avg60,
    fullAvg10: full.avg10,
    fullAvg60: full.avg60,
  }
}

export function readMemPressureStats(): MemPressureStats {
  let body: string
  try {
    body = readFileSync("/proc/pressure/memory", "utf8")
  } catch (err) {
    if (err instanceof Error && "code" in err && err.code === "ENOENT") {
      return { someAvg10: 0, someAvg60: 0, fullAvg10: 0, fullAvg60: 0 }
    }
    throw err
  }
  return parseMemPressureStats(body)
}

export function readHostMemoryPressure(): HostMemoryPressure {
  return { ...readMemInfoKb(), psi: readMemPressureStats() }
}

export const MIN_FREE_MEMORY_GB = 8

const KB_PER_GB = 1024 * 1024
const THRESHOLD_KB = MIN_FREE_MEMORY_GB * KB_PER_GB

export interface MemoryGuardDecision {
  readonly allow: boolean
  readonly reason: string
}

export function assessMemoryGuard(input: {
  availableKb: number
  kindLabel: string
}): MemoryGuardDecision {
  const availableGb = (input.availableKb / KB_PER_GB).toFixed(1)
  if (input.availableKb > THRESHOLD_KB) {
    return {
      allow: true,
      reason: `${input.kindLabel}: ${availableGb} GB available (>${MIN_FREE_MEMORY_GB} GB)`,
    }
  }
  return {
    allow: false,
    reason: `refusing to start ${input.kindLabel}: only ${availableGb} GB MemAvailable (need >${MIN_FREE_MEMORY_GB} GB) — stop a dev-server or close a Claude session to free RAM`,
  }
}

export function enforceMemoryGuard(kindLabel: string): undefined {
  const decision = assessMemoryGuard({ availableKb: readMemInfoKb().availableKb, kindLabel })
  if (!decision.allow) {
    throw new Error(decision.reason)
  }
}
