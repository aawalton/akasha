import { readdirSync, readFileSync, statSync } from "node:fs"
import type { ProcLivenessEntry } from "@akasha/seat-system/seat-proc-liveness"
import { rejectSelfProc } from "@akasha/seat-system/seat-proc-tree"

export function extractEnvironVar(environ: string, key: string): string | undefined {
  const prefix = `${key}=`
  for (const entry of environ.split("\0")) {
    if (entry.startsWith(prefix)) return entry.slice(prefix.length)
  }
  return undefined
}

export function readProcStat(pid: string): {
  state: string | undefined
  ppid: number | undefined
} {
  let stat: string
  try {
    stat = readFileSync(`/proc/${pid}/stat`).toString("utf8")
  } catch {
    return { state: undefined, ppid: undefined }
  }
  const close = stat.lastIndexOf(")")
  if (close === -1) return { state: undefined, ppid: undefined }
  const rest = stat
    .slice(close + 1)
    .trim()
    .split(/\s+/)
  const stateTok = rest[0]
  const ppidTok = rest[1]
  const state = stateTok !== undefined && stateTok.length > 0 ? stateTok[0] : undefined
  const ppidNum = ppidTok !== undefined ? Number(ppidTok) : Number.NaN
  return { state, ppid: Number.isInteger(ppidNum) ? ppidNum : undefined }
}

export function scanProcEntries(
  listProcPids: () => readonly string[] = () => readdirSync("/proc")
): { ok: boolean; entries: readonly ProcLivenessEntry[] } {
  let pids: readonly string[]
  try {
    pids = listProcPids()
  } catch (err) {
    console.error("[local] proc-scan: /proc could not be read, so nothing is observable:", err)
    return { ok: false, entries: [] }
  }
  const entries: ProcLivenessEntry[] = []
  for (const name of pids) {
    if (!/^\d+$/.test(name)) continue
    let environ: string
    try {
      environ = readFileSync(`/proc/${name}/environ`).toString("utf8")
    } catch {
      continue
    }
    const agentId = extractEnvironVar(environ, "AGENT_ID")
    if (agentId === undefined) continue
    let cmdline: string
    try {
      cmdline = readFileSync(`/proc/${name}/cmdline`).toString("utf8").split("\0").join(" ")
    } catch {
      continue
    }
    const st = statSync(`/proc/${name}`, { throwIfNoEntry: false })
    const { state, ppid } = readProcStat(name)
    entries.push({
      agentId,
      cmdline,
      pid: Number(name),
      startMs: st ? st.mtimeMs : undefined,
      state,
      ppid,
    })
  }
  return { ok: true, entries: rejectSelfProc(entries, process.pid) }
}
