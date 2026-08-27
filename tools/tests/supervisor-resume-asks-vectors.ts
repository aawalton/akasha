
import { DECISION_UNREACHED_PREFIX } from "../lib/supervisor-resume-asks.ts"

export const RESTART_QUESTION = {
  event: { action: "restart_preserve", interruptMessage: null },
  ctx: { maintenance: true, reExecPending: false },
} as const
const SPAWNING = {
  event: { action: "restart_preserve", interruptMessage: null },
  ctx: { maintenance: false, reExecPending: false },
} as const

export interface Scenario {
  readonly name: string
  readonly question: unknown
  readonly answer: { readonly key: string; readonly verdict: unknown } | { readonly reject: string }
  readonly records: "sent" | "plan"
  readonly standing: unknown
}

const faulted = (reason: string): string =>
  `${DECISION_UNREACHED_PREFIX}: supervisor-decide ${reason}. Nothing was asked of you by this restart.`

export const SCENARIOS: readonly Scenario[] = [
  {
    name: "a restart asks under `restartNotice`, in the shape that decision narrows",
    question: RESTART_QUESTION,
    answer: { key: "restartNotice", verdict: { route: "rail", notice: "N" } },
    records: "sent",
    standing: {
      restartNotice: {
        event: { action: "restart_preserve", interruptMessage: null },
        ctx: { maintenance: true, reExecPending: false },
      },
    },
  },
  {
    name: "an operator's text rides out on the question rather than being resolved here",
    question: {
      ...RESTART_QUESTION,
      event: { action: "restart_preserve", interruptMessage: "reorient" },
    },
    answer: { key: "restartNotice", verdict: { route: "spawn-argv", notice: "N" } },
    records: "sent",
    standing: {
      restartNotice: {
        event: { action: "restart_preserve", interruptMessage: "reorient" },
        ctx: { maintenance: true, reExecPending: false },
      },
    },
  },
  {
    name: "a restart's carrier and notice arrive unchanged",
    question: SPAWNING,
    answer: { key: "restartNotice", verdict: { route: "spawn-argv", notice: "DECIDED-OVER-THERE" } },
    records: "plan",
    standing: { route: "spawn-argv", notice: "DECIDED-OVER-THERE" },
  },
  {
    name: "a `rail` restart arrives as answered — the notice is held on the marker instead",
    question: SPAWNING,
    answer: { key: "restartNotice", verdict: { route: "rail", notice: "HELD" } },
    records: "plan",
    standing: { route: "rail", notice: "HELD" },
  },
  {
    name: "an answer carrying no verdict degrades rather than reading as a decision to decline",
    question: RESTART_QUESTION,
    answer: { key: "restart", verdict: {} },
    records: "plan",
    standing: {
      route: "spawn-argv",
      notice: faulted(
        "answered nothing this can use for `restartNotice` at `restartNotice`: Invalid input: expected object, received undefined"
      ),
    },
  },
  {
    name: "AN EMPTY RESTART NOTICE IS NOT THREADED THROUGH — the failure this file is about",
    question: RESTART_QUESTION,
    answer: { key: "restartNotice", verdict: { route: "spawn-argv", notice: "" } },
    records: "plan",
    standing: {
      route: "spawn-argv",
      notice: faulted(
        "answered nothing this can use for `restartNotice` at `restartNotice.notice`: Too small: expected string to have >=1 characters"
      ),
    },
  },
  {
    name: "a call that rejects with something that is not an Error still names what came back",
    question: RESTART_QUESTION,
    answer: { reject: "PostgREST 503" },
    records: "plan",
    standing: {
      route: "spawn-argv",
      notice: faulted("could not decide `restartNotice`: PostgREST 503"),
    },
  },
]
