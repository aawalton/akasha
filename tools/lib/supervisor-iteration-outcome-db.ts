
import { patchUncommitted, readUncommitted } from "../../page/uncommitted/uncommitted.ts"
import { seatPageForAgent } from "./seat-presence-read.ts"

const RESTART_KEY = "deferred-restart-notice"

const DB_CALL_TIMEOUT_MS = 5_000

export async function withTimeout<T>(promise: Promise<T>, label: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(
      () => reject(new Error(`${label} timed out after ${DB_CALL_TIMEOUT_MS}ms`)),
      DB_CALL_TIMEOUT_MS
    )
    timer.unref?.()
  })
  try {
    return await Promise.race([promise, timeout])
  } finally {
    if (timer) clearTimeout(timer)
  }
}

const NOTICE_SEPARATOR = "\n\n"

export function mergeDeferredNotice(held: string | null, incoming: string): string {
  const addition = incoming.trim()
  const existing = (held ?? "").trim()
  if (addition.length === 0) return existing
  if (existing.length === 0) return addition
  if (existing.split(NOTICE_SEPARATOR).includes(addition)) return existing
  return `${existing}${NOTICE_SEPARATOR}${addition}`
}

export async function setDeferredRestartNotice(agentId: string, notice: string): Promise<void> {
  const page = seatPageForAgent(agentId)
  if (page === null) return
  const held = readUncommitted(page)?.[RESTART_KEY]
  const merged = mergeDeferredNotice(typeof held === "string" && held !== "" ? held : null, notice)
  if (merged.length === 0) return
  patchUncommitted(page, { [RESTART_KEY]: merged })
}
