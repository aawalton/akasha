import { readFileSync } from "node:fs"
import { requireMatchPositional } from "@akasha/utils-narrow/require-match-positional"
import { z } from "zod"
import { enforceInodeAdmission } from "../inode-guard/inode-guard.module.code.ts"

export const MIN_FREE_MEMORY_GB = 8

const KB_PER_GB = 1024 * 1024
const THRESHOLD_KB = MIN_FREE_MEMORY_GB * KB_PER_GB

const GB_OVERRIDE_SCHEMA = z.coerce.number().positive().finite()

function resolveGbOverride(envName: string, fallbackGb: number): number {
  const parsed = GB_OVERRIDE_SCHEMA.safeParse(process.env[envName])
  return parsed.success ? parsed.data : fallbackGb
}

export type MemoryGuardInput = {
  availableKb: number
  kindLabel: string
}

export type MemoryGuardDecision = {
  allow: boolean
  reason: string
}

export function assessMemoryGuard(input: MemoryGuardInput): MemoryGuardDecision {
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

export function readMemAvailableKb(): number {
  const meminfo = z.string().parse(readFileSync("/proc/meminfo", "utf8"))
  const [kb] = requireMatchPositional(
    /^MemAvailable:\s+(\d+)\s+kB/m,
    z.tuple([z.string()]),
    meminfo,
    "/proc/meminfo MemAvailable line"
  )
  return Number.parseInt(kb, 10)
}

export function enforceMemoryGuard(kindLabel: string): undefined {
  const decision = assessMemoryGuard({
    availableKb: readMemAvailableKb(),
    kindLabel,
  })
  if (!decision.allow) {
    throw new Error(decision.reason)
  }
}

type MemInfoKb = {
  availableKb: number
  swapTotalKb: number
  swapFreeKb: number
}

export type SpawnAdmissionInput = {
  availableKb: number
  minFreeMemoryKb: number
  kindLabel: string
}

export function assessSpawnAdmission(input: SpawnAdmissionInput): MemoryGuardDecision {
  const availableGb = (input.availableKb / KB_PER_GB).toFixed(1)
  const minMemGb = (input.minFreeMemoryKb / KB_PER_GB).toFixed(0)

  if (input.availableKb <= input.minFreeMemoryKb) {
    return {
      allow: false,
      reason: `refusing to spawn ${input.kindLabel}: only ${availableGb} GB MemAvailable (need >${minMemGb} GB) — host RAM exhausted; wait for the fleet to drain`,
    }
  }
  return {
    allow: true,
    reason: `${input.kindLabel}: ${availableGb} GB MemAvailable (>${minMemGb} GB)`,
  }
}

export function readMemInfoKb(): MemInfoKb {
  const meminfo = z.string().parse(readFileSync("/proc/meminfo", "utf8"))
  const [availableKb] = requireMatchPositional(
    /^MemAvailable:\s+(\d+)\s+kB/m,
    z.tuple([z.string()]),
    meminfo,
    "/proc/meminfo MemAvailable line"
  )
  const [swapTotalKb] = requireMatchPositional(
    /^SwapTotal:\s+(\d+)\s+kB/m,
    z.tuple([z.string()]),
    meminfo,
    "/proc/meminfo SwapTotal line"
  )
  const [swapFreeKb] = requireMatchPositional(
    /^SwapFree:\s+(\d+)\s+kB/m,
    z.tuple([z.string()]),
    meminfo,
    "/proc/meminfo SwapFree line"
  )
  return {
    availableKb: Number.parseInt(availableKb, 10),
    swapTotalKb: Number.parseInt(swapTotalKb, 10),
    swapFreeKb: Number.parseInt(swapFreeKb, 10),
  }
}

export type MemPressureStats = {
  someAvg10: number
  someAvg60: number
  fullAvg10: number
  fullAvg60: number
}

const PSI_PAIR_SCHEMA = z.tuple([z.string(), z.string()])

function psiLine(body: string, kind: "some" | "full"): { avg10: number; avg60: number } {
  const [avg10, avg60] = requireMatchPositional(
    new RegExp(`^${kind} avg10=(\\d+(?:\\.\\d+)?) avg60=(\\d+(?:\\.\\d+)?)`, "m"),
    PSI_PAIR_SCHEMA,
    body,
    `/proc/pressure/memory ${kind} avg10/avg60`
  )
  return { avg10: Number.parseFloat(avg10), avg60: Number.parseFloat(avg60) }
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
  return parseMemPressureStats(z.string().parse(body))
}

function decideSpawnAdmission(info: MemInfoKb, kindLabel: string): MemoryGuardDecision {
  return assessSpawnAdmission({
    availableKb: info.availableKb,
    minFreeMemoryKb: resolveGbOverride("SPAWN_MIN_FREE_MEMORY_GB", MIN_FREE_MEMORY_GB) * KB_PER_GB,
    kindLabel,
  })
}

export function enforceSpawnAdmission(kindLabel: string): undefined {
  const decision = decideSpawnAdmission(readMemInfoKb(), kindLabel)
  if (!decision.allow) {
    throw new Error(decision.reason)
  }
  enforceInodeAdmission(kindLabel)
}

export type HostMemoryPressure = {
  availableKb: number
  swapTotalKb: number
  swapFreeKb: number
  psi: MemPressureStats
  decision: MemoryGuardDecision
}

export function readHostMemoryPressure(kindLabel: string): HostMemoryPressure {
  const info = readMemInfoKb()
  const psi = readMemPressureStats()
  const decision = decideSpawnAdmission(info, kindLabel)
  return { ...info, psi, decision }
}
