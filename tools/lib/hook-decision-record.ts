import { seatPageFile, seatPageValue, SEAT_MODE_KEY } from "./hook-seat-page.ts"

const DECISION_PATIENCE = "2"

const SEAT_SUFFIX = ".seat"

const SESSION = /"session_id"[ \t]*:[ \t]*"([^"]+)"/

export interface Keeper {
  readonly seatPage: () => string
  readonly seatName: () => string
  readonly seatMode: () => string
  readonly record: (verdict: string, reason: string) => void
}

function originOf(): string {
  const stated = process.env.PAGE_QUERY_ORIGIN
  return stated === undefined || stated === "" ? "http://127.0.0.1:8787" : stated
}

function stamped(): string {
  const now = new Date()
  const at = now.toISOString()
  return `${at.slice(0, 19)}.${at.slice(20, 23)}Z`
}

function sessionIn(stdin: string): string {
  const found = SESSION.exec(stdin)
  if (found === null) return ""
  return (found[1] as string).replaceAll(/[^A-Za-z0-9.-]/g, "")
}

export function keeper(hookName: string, agent: string, stdin: string): Keeper {
  let page: string | null = null
  const seatPage = (): string => {
    if (page === null) page = seatPageFile(agent)
    return page
  }
  const seatName = (): string => {
    const file = seatPage()
    const bare = file.slice(file.lastIndexOf("/") + 1)
    let stem = bare.endsWith(".md") ? bare.slice(0, -".md".length) : bare
    if (stem.endsWith(SEAT_SUFFIX)) stem = stem.slice(0, -SEAT_SUFFIX.length)
    return stem.replaceAll(/[^A-Za-z0-9._-]/g, "")
  }
  const seatMode = (): string => {
    const stated = seatPageValue(seatPage(), SEAT_MODE_KEY)
    return stated === "interactive" || stated === "headless" ? stated : "unknown"
  }
  const record = (verdict: string, reason: string): void => {
    const name = seatName()
    if (name === "") return
    const body = JSON.stringify({
      writer: hookName,
      values: {
        at: stamped(),
        hook: hookName,
        "claude-code-session-uuid": sessionIn(stdin),
        verdict: verdict === "block" ? "refuse" : "allow",
        reason: reason.replaceAll(/[^a-z0-9-]/g, ""),
        mode: seatMode(),
      },
    })
    try {
      Bun.spawnSync({
        cmd: [
          "curl",
          "-s",
          "-m",
          DECISION_PATIENCE,
          "-o",
          "/dev/null",
          "-X",
          "POST",
          `${originOf()}/write-row/seat-turn-end-decision/${name}`,
          "-H",
          "content-type: application/json",
          "-d",
          body,
        ],
        stdout: "ignore",
        stderr: "ignore",
      })
    } catch {
      return
    }
  }
  return { seatPage, seatName, seatMode, record }
}
