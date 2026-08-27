
import { LIMIT_RESUME_DECISION, startLimitResumeMonitor } from "../lib/supervisor-limit-resume.ts"
import type { AccountState } from "../lib/supervisor-limit-resume-pool.ts"

export const AGENT_ID = "019ec7c0-4f3e-713b-b150-8ba2d5a5bce6"
export const NOW = Date.UTC(2026, 4, 1)

export const ANSWERED_NUDGE = "◆ test-only resume wording, carried back by the answer"

export const ANSWERED_FLOOR_MS = 5_000

export const DEATH_LINE = JSON.stringify({
  type: "assistant",
  isApiErrorMessage: true,
  apiErrorStatus: 429,
  error: "rate_limit",
  message: { model: "<synthetic>", content: [{ type: "text", text: "You've hit your weekly limit" }] },
})

export const HEALTHY_LINE = JSON.stringify({
  type: "assistant",
  message: { model: "claude-opus-4-8", content: [{ type: "text", text: "done" }] },
})

export function account(overrides: Partial<AccountState> & { account: string }): AccountState {
  return {
    fiveHourUtil: 50,
    sevenDayUtil: 50,
    sevenDayResetsAt: new Date(NOW + 168 * 3_600_000).toISOString(),
    fiveHourResetsAt: new Date(NOW + 2 * 3_600_000).toISOString(),
    subscriptionDisabled: false,
    fiveHourAtLimitUntil: null,
    subscriptionType: "max",
    renewalTerminal: false,
    accessTokenExpiresAt: null,
    ...overrides,
  }
}

export const ELIGIBLE = [account({ account: "a" })]

export const INELIGIBLE = [account({ account: "a", sevenDayUtil: 100 })]

export function nudgeAnswer(
  nudge: string = ANSWERED_NUDGE,
  floorMs: number = ANSWERED_FLOOR_MS
): unknown {
  return {
    [LIMIT_RESUME_DECISION]: { kind: "nudge", reason: "stand-in for a nudge verdict", nudge, floorMs },
  }
}

export function waitAnswer(): unknown {
  return { [LIMIT_RESUME_DECISION]: { kind: "wait", reason: "stand-in for a wait verdict" } }
}

export interface Harness {
  readonly asks: readonly string[]
  readonly floorKeys: readonly string[]
  readonly floorWindows: readonly number[]
  readonly nudges: readonly string[]
  readonly logs: readonly string[]
  readonly monitor: { stop: () => void }
  readonly setNow: (ms: number) => void
  readonly setPacing: (states: readonly AccountState[]) => void
}

export interface Over {
  transcript?: string | null
  agentId?: string | null
  pacing?: readonly AccountState[]
  answer?: (stdin: string) => unknown
  recentlyNudged?: boolean
  eligibilityHoldMs?: number
  floorMs?: number
}

export function startHarness(over?: Over): Harness {
  const asks: string[] = []
  const floorKeys: string[] = []
  const floorWindows: number[] = []
  const nudges: string[] = []
  const logs: string[] = []
  let nowValue = NOW
  let pacing: readonly AccountState[] = over?.pacing ?? ELIGIBLE
  const monitor = startLimitResumeMonitor({
    getAgentId: () => (over && "agentId" in over ? (over.agentId ?? null) : AGENT_ID),
    readTranscriptTail: () => (over && "transcript" in over ? (over.transcript ?? null) : DEATH_LINE),
    readPacing: async () => pacing,
    ask: async (stdin) => {
      asks.push(stdin)
      return (over?.answer ?? (() => nudgeAnswer()))(stdin)
    },
    ...(over?.eligibilityHoldMs === undefined ? {} : { eligibilityHoldMs: over.eligibilityHoldMs }),
    hasRecentNudge: async (_id, content, windowMs) => {
      floorKeys.push(content)
      floorWindows.push(windowMs)
      return (over?.recentlyNudged ?? false) || nudges.includes(content)
    },
    injectNudge: async (_id, content) => {
      nudges.push(content)
    },
    log: (line) => {
      logs.push(line)
    },
    now: () => nowValue,
    tickMs: 3,
    ...(over?.floorMs === undefined ? {} : { floorMs: over.floorMs }),
  })
  return {
    asks,
    floorKeys,
    floorWindows,
    nudges,
    logs,
    monitor,
    setNow: (ms) => {
      nowValue = ms
    },
    setPacing: (states) => {
      pacing = states
    },
  }
}

export async function settle(ms = 25): Promise<void> {
  await Bun.sleep(ms)
}

export async function until(pred: () => boolean, timeoutMs = 2_000): Promise<void> {
  const deadline = Date.now() + timeoutMs
  while (!pred() && Date.now() < deadline) await Bun.sleep(5)
}

export function question(h: Harness, at = 0): Record<string, unknown> {
  let sent: unknown
  try {
    sent = JSON.parse(h.asks[at] ?? "{}")
  } catch {
    return {}
  }
  if (typeof sent !== "object" || sent === null) return {}
  const inner = (sent as Record<string, unknown>)[LIMIT_RESUME_DECISION]
  return typeof inner === "object" && inner !== null ? (inner as Record<string, unknown>) : {}
}
