
import { notices } from "./compose-notices.ts"
import { decideClaimedRedelivery } from "./lib/decide-claimed-redelivery.ts"
import {
  decideLimitResume,
  LIMIT_RESUME_FLOOR_MS,
  type LimitResumeDecision,
} from "./lib/decide-limit-resume.ts"
import {
  decideWaitResume,
  type WaitResumeDecision,
} from "./lib/decide-wait-resume.ts"
import { decideRcDegradedBatch } from "./lib/decide-rc-degraded.ts"
import { decideRemoteControlBatch } from "./lib/decide-remote-control.ts"
import { planRestartNotice, type ResumeNotices } from "./lib/decide-restart-notice.ts"
import { decideUncertainBlockBatch } from "./lib/decide-uncertain-wait.ts"
import { readPayload, record, rejectUnknownFlags } from "./lib/payload.ts"
import { RULE_DECISIONS } from "./lib/supervisor-decide-rules.ts"
import {
  parseClaimedRedelivery,
  parseLimitResume,
  parseWaitResume,
  parseRcDegraded,
  parseRemoteControl,
  parseRestartNotice,
  parseUncertainWait,
} from "./lib/supervisor-decide-payload.ts"
import { fail } from "./lib/command.ts"

const NUDGE_NOTICE = "limit-resume-nudge"
const OVERLOAD_NUDGE_NOTICE = "overload-resume-nudge"
const NOTICE_OWNER = "tools/compose-notices.ts"

function requireNotice(all: Readonly<Record<string, string>>, key: string): string {
  const text = all[key]
  if (text === undefined) {
    fail(
      `no notice is called \`${key}\` — ${NOTICE_OWNER} owns that name and the document behind ` +
        "it, and a notice carrying nothing would reach a seat as an empty turn"
    )
  }
  return text
}

function resumeNotices(): ResumeNotices {
  const all = notices()
  return {
    "restart-immediate": requireNotice(all, "restart-immediate"),
    "restart-deferred": requireNotice(all, "restart-deferred"),
    "restart-recovery-clause": requireNotice(all, "restart-recovery-clause"),
  }
}

export type LimitResumeAnswer =
  | {
      readonly kind: "nudge"
      readonly reason: string
      readonly nudge: string
      readonly floorMs: number
    }
  | { readonly kind: "wait"; readonly reason: string }
  | { readonly kind: "hold"; readonly reason: string }

function limitResumeAnswer(decision: LimitResumeDecision): LimitResumeAnswer {
  if (decision.kind !== "nudge") return decision
  const nudge = requireNotice(notices(), NUDGE_NOTICE)
  return { kind: "nudge", reason: decision.reason, nudge, floorMs: LIMIT_RESUME_FLOOR_MS }
}

export type WaitResumeAnswer =
  | {
      readonly kind: "nudge"
      readonly reason: string
      readonly attempt: number
      readonly nudge: string
    }
  | { readonly kind: "wait"; readonly reason: string; readonly readyAtMs: number }
  | { readonly kind: "hold"; readonly reason: string }

function waitResumeAnswer(decision: WaitResumeDecision): WaitResumeAnswer {
  if (decision.kind !== "nudge") return decision
  const nudge = requireNotice(notices(), OVERLOAD_NUDGE_NOTICE)
  return { kind: "nudge", reason: decision.reason, attempt: decision.attempt, nudge }
}

const DECISIONS: Readonly<Record<string, (value: unknown, path: string) => unknown>> = {
  uncertainWait: (value, path) => decideUncertainBlockBatch(parseUncertainWait(value, path)),
  remoteControl: (value, path) => decideRemoteControlBatch(parseRemoteControl(value, path)),
  claimedRedelivery: (value, path) => decideClaimedRedelivery(parseClaimedRedelivery(value, path)),
  limitResume: (value, path) => limitResumeAnswer(decideLimitResume(parseLimitResume(value, path))),
  waitResume: (value, path) =>
    waitResumeAnswer(decideWaitResume(parseWaitResume(value, path))),
  rcDegraded: (value, path) => decideRcDegradedBatch(parseRcDegraded(value, path)),
  restartNotice: (value, path) => {
    const { event, ctx } = parseRestartNotice(value, path)
    return planRestartNotice(event, ctx, resumeNotices())
  },
  ...RULE_DECISIONS,
}

const KEYS: readonly string[] = Object.keys(DECISIONS)

export function answer(payload: Record<string, unknown>): Record<string, unknown> {
  const asked = Object.keys(payload)
  if (asked.length === 0) {
    fail(`the payload asks nothing — this command takes ${KEYS.join(", ")}`)
  }
  const stray = asked.filter((key) => !KEYS.includes(key))
  if (stray.length > 0) {
    fail(`\`${stray.join("`, `")}\` names no decision this command makes — it takes ${KEYS.join(", ")}`)
  }
  const answers: Record<string, unknown> = {}
  for (const key of asked) {
    const decide = DECISIONS[key]
    if (decide === undefined) continue
    answers[key] = decide(payload[key], key)
  }
  return answers
}

function rejectArguments(argv: readonly string[]): void {
  rejectUnknownFlags(argv, [], [])
  const [first] = argv
  if (first !== undefined) {
    fail(`\`${first}\` is an argument and this command takes none — the whole call is the JSON on stdin`)
  }
}

async function main(): Promise<void> {
  rejectArguments(process.argv.slice(2))
  const payload = record(await readPayload("-"), "the payload")
  process.stdout.write(`${JSON.stringify(answer(payload), null, 2)}\n`)
}

if (import.meta.main) await main()
