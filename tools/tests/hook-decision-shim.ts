import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"

const RECORD_LOG = "decisions.log"

export interface HookDecision {
  readonly at: string
  readonly hook: string
  readonly "claude-code-session-uuid": string
  readonly verdict: string
  readonly reason: string
  readonly mode: string
}

export interface Recorded {
  readonly seat: string
  readonly writer: string
  readonly values: HookDecision
}

const STUB = [
  "#!/bin/sh",
  'url=""',
  'body=""',
  "while [ $# -gt 0 ]; do",
  '  case "$1" in',
  '    -d) body="$2"; shift 2 ;;',
  '    http*) url="$1"; shift ;;',
  "    *) shift ;;",
  "  esac",
  "done",
  `printf '%s %s\\n' "$url" "$body" >>"$HOME/${RECORD_LOG}"`,
  "",
].join("\n")

export function writeCurlStub(dir: string): void {
  writeFileSync(resolve(dir, "curl"), STUB, { mode: 0o755 })
}

export function recordedIn(home: string): readonly Recorded[] {
  const path = resolve(home, RECORD_LOG)
  if (!existsSync(path)) return []
  return readFileSync(path, "utf8")
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => {
      const gap = line.indexOf(" ")
      const url = line.slice(0, gap)
      const sent = JSON.parse(line.slice(gap + 1)) as { writer: string; values: HookDecision }
      return { seat: url.slice(url.lastIndexOf("/") + 1), writer: sent.writer, values: sent.values }
    })
}

export function soleRecordIn(home: string): Recorded {
  const all = recordedIn(home)
  if (all.length !== 1) throw new Error(`expected one decision record, found ${all.length}`)
  return all[0] as Recorded
}
