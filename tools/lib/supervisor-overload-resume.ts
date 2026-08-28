
import {
  classifyTurnEndErrorDeath,
  CONNECTION_STATUS,
} from "./classify-turn-end-error-death.ts"
import { OVERLOAD_MAX_WAIT_MS, overloadWaitMs } from "./decide-overload-resume.ts"
import { USER_ID } from "./user-id.ts"
import {
  ANNOUNCE,
  hasRecentInboundMessage,
  sendMessage,
  SYSTEM_SOURCE,
} from "./supervisor-limit-resume-send.ts"
import { readOwnTranscriptTail } from "./agent-io-probe.ts"
import { askSupervisorDecide } from "./supervisor-limit-resume-effects.ts"
import {
  askOverloadResume,
  type AskDecide,
  type OverloadResumeVerdict,
} from "./supervisor-overload-resume-answer.ts"

const OVERLOAD_RESUME_INTERVAL_MS = 30_000

type TickKind = OverloadResumeVerdict["kind"] | "unreachable" | "none"

function kindsOf(statuses: readonly number[]): string {
  const seen = [...new Set(statuses)].map((one) =>
    one === CONNECTION_STATUS ? "connection" : "overload"
  )
  return seen.length === 0 ? "none" : seen.join(" and ")
}

export function startOverloadResumeMonitor(opts: {
  getAgentId: () => string | null
  log?: (line: string) => void
  readTranscriptTail?: (agentId: string) => string | null
  ask?: AskDecide
  hasRecentNudge?: (agentId: string, content: string, windowMs: number) => Promise<boolean>
  injectNudge?: (agentId: string, content: string) => Promise<void>
  now?: () => number
  tickMs?: number
}): { stop: () => void } {
  const readTranscriptTail = opts.readTranscriptTail ?? readOwnTranscriptTail
  const ask = opts.ask ?? askSupervisorDecide
  const hasRecentNudge = opts.hasRecentNudge ?? hasRecentInboundMessage
  const injectNudge =
    opts.injectNudge ??
    (async (agentId: string, content: string): Promise<void> => {
      await sendMessage({
        targetAgentId: agentId,
        userId: USER_ID,
        content,
        source: SYSTEM_SOURCE,
        warrant: ANNOUNCE,
      })
    })
  const nowFn = opts.now ?? Date.now

  let stopped = false
  let tickInFlight = false
  let lastKind: TickKind = "none"
  let lastNudgeAtMs: number | null = null
  let ceilingReported = false
  const note = (kind: TickKind, line: string): undefined => {
    if (kind !== lastKind) opts.log?.(line)
    lastKind = kind
  }

  const tick = async (): Promise<void> => {
    if (tickInFlight || stopped) return
    tickInFlight = true
    try {
      const agentId = opts.getAgentId()
      if (agentId === null) return
      const text = readTranscriptTail(agentId)
      const reading = text === null ? null : classifyTurnEndErrorDeath(text)
      if (reading === null || !reading.detected) {
        lastKind = "none"
        lastNudgeAtMs = null
        ceilingReported = false
        return
      }
      const now = nowFn()
      const waitMs = overloadWaitMs(reading.consecutive)
      if (waitMs >= OVERLOAD_MAX_WAIT_MS && !ceilingReported) {
        ceilingReported = true
        opts.log?.(
          `overload-resume: ${agentId} has died ${reading.consecutive} times running ` +
            `(${kindsOf(reading.statuses)}) and its wait is at the ceiling — ` +
            "still being nudged, and still not working"
        )
      }
      const answer = await askOverloadResume(ask, {
        overloadDetected: true,
        consecutiveOverloads: reading.consecutive,
        lastNudgeAtMs,
        now,
      })
      if ("unreachable" in answer) {
        note("unreachable", `overload-resume: ${answer.unreachable}`)
        return
      }
      const verdict = answer.verdict
      if (verdict.kind !== "nudge") {
        note(verdict.kind, `overload-resume: ${verdict.kind} for ${agentId} — ${verdict.reason}`)
        return
      }
      if (await hasRecentNudge(agentId, verdict.nudge, waitMs)) {
        note("hold", `overload-resume: ${agentId} was nudged within ${waitMs}ms — holding`)
        return
      }
      await injectNudge(agentId, verdict.nudge)
      lastNudgeAtMs = now
      lastKind = "nudge"
      opts.log?.(
        `overload-resume: nudged ${agentId} after ${kindsOf(reading.statuses)} — ${verdict.reason}`
      )
    } catch (err) {
      opts.log?.(`overload-resume: tick error: ${String(err)}`)
    } finally {
      tickInFlight = false
    }
  }

  const timer = setInterval(() => void tick(), opts.tickMs ?? OVERLOAD_RESUME_INTERVAL_MS)
  timer.unref?.()

  return {
    stop: () => {
      stopped = true
      clearInterval(timer)
    },
  }
}
