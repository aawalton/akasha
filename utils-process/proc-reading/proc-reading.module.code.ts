import { readdirSync, readFileSync } from "node:fs"

const PROC = "/proc"

const NUMBERED = /^\d+$/

export type ProcEntry = {
  readonly pid: number
  readonly cmdline: string
  readonly named: Readonly<Record<string, string>>
  readonly state: string | null
  readonly ppid: number | null
}

export type ProcRead = {
  readonly opened: boolean
  readonly entries: readonly ProcEntry[]
}

export function environValue(environ: string, key: string): string | null {
  const head = `${key}=`
  for (const one of environ.split("\0")) {
    if (one.startsWith(head)) return one.slice(head.length)
  }
  return null
}

export function statedIn(stat: string): { state: string | null; ppid: number | null } {
  const close = stat.lastIndexOf(")")
  if (close === -1) return { state: null, ppid: null }
  const rest = stat
    .slice(close + 1)
    .trim()
    .split(/\s+/)
  const said = rest[0]
  const father = rest[1]
  const ppid = father === undefined ? Number.NaN : Number(father)
  return {
    state: said === undefined || said === "" ? null : said.slice(0, 1),
    ppid: Number.isInteger(ppid) ? ppid : null,
  }
}

function textOf(at: string): string | null {
  try {
    return readFileSync(at).toString("utf8")
  } catch {
    return null
  }
}

export function procEntries(keys: readonly string[]): ProcRead {
  let names: readonly string[]
  try {
    names = readdirSync(PROC)
  } catch {
    return { opened: false, entries: [] }
  }
  const entries: ProcEntry[] = []
  for (const name of names) {
    if (!NUMBERED.test(name)) continue
    const environ = textOf(`${PROC}/${name}/environ`)
    if (environ === null) continue
    const named: Record<string, string> = {}
    for (const key of keys) {
      const value = environValue(environ, key)
      if (value !== null) named[key] = value
    }
    if (Object.keys(named).length === 0) continue
    const cmdline = textOf(`${PROC}/${name}/cmdline`)
    if (cmdline === null) continue
    const stat = textOf(`${PROC}/${name}/stat`)
    const { state, ppid } = stat === null ? { state: null, ppid: null } : statedIn(stat)
    entries.push({
      pid: Number(name),
      cmdline: cmdline.split("\0").join(" ").trim(),
      named,
      state,
      ppid,
    })
  }
  return { opened: true, entries }
}
