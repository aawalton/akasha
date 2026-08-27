
import type { PreCliffDecision, PreCliffObservation } from "../lib/supervisor-precliff-restart-rule.ts"

export interface Issue {
  readonly code: string
  readonly path: readonly (string | number)[]
  readonly message: string
}

export interface ReadRecording {
  readonly verdict: PreCliffDecision | null
  readonly issue: Issue | null
}

export interface ReadScenario {
  readonly name: string
  readonly answered: unknown
  readonly standing: ReadRecording
}

export interface AskRecording {
  readonly sent: string
  readonly value: PreCliffDecision
  readonly notice: string | null
  readonly logged: readonly string[]
}

export interface AskScenario {
  readonly name: string
  readonly obs: PreCliffObservation
  readonly thresholdMs: number
  readonly answer: { readonly resolve: unknown } | { readonly reject: unknown }
  readonly standing: AskRecording
  readonly portedNotice: string | null
}

const PAST_CLIFF: PreCliffObservation = {
  childAgeMs: 27_700_000,
  alreadyArmed: false,
  deferredOrActionPending: false,
}

const THRESHOLD_MS = 27_600_000
const PAST_CLIFF_SENT =
  '{"preCliffRestartRule":{"decidePreCliffRestart":{"obs":{"childAgeMs":27700000,"alreadyArmed":false,"deferredOrActionPending":false},"thresholdMs":27600000}}}'

const degraded = (reason: string): Pick<AskRecording, "notice" | "logged"> => {
  const notice = `supervisor-decide could not decide \`preCliffRestartRule\`: ${reason}`
  return { notice, logged: [`[local] ${notice} — acting on the safe answer instead`] }
}

const DECIDED = { notice: null, logged: [] } as const

const LONG_REFUSAL = "x".repeat(500)
const LONG_KEPT = `Error: ${"x".repeat(393)}`

const OUTSIDE_THE_TWO: Issue = {
  code: "invalid_value",
  path: ["preCliffRestartRule", "decidePreCliffRestart"],
  message: 'Invalid option: expected one of "arm"|"wait"',
}
const NOT_AN_OBJECT: Issue = {
  code: "invalid_type",
  path: [],
  message: "Invalid input: expected object, received null",
}
const zodSaid = (issue: Record<string, unknown>): string => JSON.stringify([issue], null, 2)
const shapeSaid = (issue: Issue): string => `ShapeError: ${JSON.stringify([issue], null, 2)}`

const ZOD_OUTSIDE_THE_TWO = zodSaid({
  code: OUTSIDE_THE_TWO.code,
  values: ["arm", "wait"],
  path: OUTSIDE_THE_TWO.path,
  message: OUTSIDE_THE_TWO.message,
})
const ZOD_NOT_AN_OBJECT = zodSaid({
  expected: "object",
  code: NOT_AN_OBJECT.code,
  path: NOT_AN_OBJECT.path,
  message: NOT_AN_OBJECT.message,
})

export const READ_SCENARIOS: readonly ReadScenario[] = [
  {
    name: "an arm verdict is read out from under the rule's own key",
    answered: { preCliffRestartRule: { decidePreCliffRestart: "arm" } },
    standing: { verdict: "arm", issue: null },
  },
  {
    name: "a wait verdict is read the same way",
    answered: { preCliffRestartRule: { decidePreCliffRestart: "wait" } },
    standing: { verdict: "wait", issue: null },
  },
  {
    name: "undeclared keys beside the verdict are stripped rather than refused",
    answered: {
      preCliffRestartRule: { decidePreCliffRestart: "arm", reason: "past the cliff" },
      otherRule: { somethingElse: 1 },
    },
    standing: { verdict: "arm", issue: null },
  },
  {
    name: "an answer with no rule key at all is refused at that key",
    answered: {},
    standing: {
      verdict: null,
      issue: {
        code: "invalid_type",
        path: ["preCliffRestartRule"],
        message: "Invalid input: expected object, received undefined",
      },
    },
  },
  {
    name: "the rule's key spelled wrong is the same refusal, which is what makes a rename visible",
    answered: { precliffRestartRule: { decidePreCliffRestart: "arm" } },
    standing: {
      verdict: null,
      issue: {
        code: "invalid_type",
        path: ["preCliffRestartRule"],
        message: "Invalid input: expected object, received undefined",
      },
    },
  },
  {
    name: "a missing verdict field is refused as an option outside the two, not as an absence",
    answered: { preCliffRestartRule: {} },
    standing: { verdict: null, issue: OUTSIDE_THE_TWO },
  },
  {
    name: "a verdict outside the two is refused",
    answered: { preCliffRestartRule: { decidePreCliffRestart: "restart" } },
    standing: { verdict: null, issue: OUTSIDE_THE_TWO },
  },
  {
    name: "a verdict that is not a string is refused the same way",
    answered: { preCliffRestartRule: { decidePreCliffRestart: 1 } },
    standing: { verdict: null, issue: OUTSIDE_THE_TWO },
  },
  {
    name: "null is refused at the root",
    answered: null,
    standing: { verdict: null, issue: NOT_AN_OBJECT },
  },
  {
    name: "an answer that is a bare string is refused at the root",
    answered: "arm",
    standing: {
      verdict: null,
      issue: {
        code: "invalid_type",
        path: [],
        message: "Invalid input: expected object, received string",
      },
    },
  },
]

export const ASK_SCENARIOS: readonly AskScenario[] = [
  {
    name: "an arm verdict comes back with no notice beside it",
    obs: PAST_CLIFF,
    thresholdMs: THRESHOLD_MS,
    answer: { resolve: { preCliffRestartRule: { decidePreCliffRestart: "arm" } } },
    standing: { sent: PAST_CLIFF_SENT, value: "arm", ...DECIDED },
    portedNotice: null,
  },
  {
    name: "a decided wait is parted from the safe answer by the null notice alone",
    obs: { childAgeMs: 100, alreadyArmed: false, deferredOrActionPending: false },
    thresholdMs: THRESHOLD_MS,
    answer: { resolve: { preCliffRestartRule: { decidePreCliffRestart: "wait" } } },
    standing: {
      sent: '{"preCliffRestartRule":{"decidePreCliffRestart":{"obs":{"childAgeMs":100,"alreadyArmed":false,"deferredOrActionPending":false},"thresholdMs":27600000}}}',
      value: "wait",
      ...DECIDED,
    },
    portedNotice: null,
  },
  {
    name: "an unreadable age crosses as null rather than being decided on this side",
    obs: { childAgeMs: null, alreadyArmed: false, deferredOrActionPending: false },
    thresholdMs: THRESHOLD_MS,
    answer: { resolve: { preCliffRestartRule: { decidePreCliffRestart: "wait" } } },
    standing: {
      sent: '{"preCliffRestartRule":{"decidePreCliffRestart":{"obs":{"childAgeMs":null,"alreadyArmed":false,"deferredOrActionPending":false},"thresholdMs":27600000}}}',
      value: "wait",
      ...DECIDED,
    },
    portedNotice: null,
  },
  {
    name: "an already-armed generation and a pending action both cross, and neither is judged here",
    obs: { childAgeMs: 30_000_000, alreadyArmed: true, deferredOrActionPending: true },
    thresholdMs: 1,
    answer: { resolve: { preCliffRestartRule: { decidePreCliffRestart: "wait" } } },
    standing: {
      sent: '{"preCliffRestartRule":{"decidePreCliffRestart":{"obs":{"childAgeMs":30000000,"alreadyArmed":true,"deferredOrActionPending":true},"thresholdMs":1}}}',
      value: "wait",
      ...DECIDED,
    },
    portedNotice: null,
  },
  {
    name: "an unreached tree waits, and says why",
    obs: PAST_CLIFF,
    thresholdMs: THRESHOLD_MS,
    answer: { reject: new Error("no instructions tree here") },
    standing: {
      sent: PAST_CLIFF_SENT,
      value: "wait",
      ...degraded("Error: no instructions tree here"),
    },
    portedNotice: null,
  },
  {
    name: "a refusal that is not an Error still names itself in the notice",
    obs: PAST_CLIFF,
    thresholdMs: THRESHOLD_MS,
    answer: { reject: "supervisor-decide.ts exited 1: unasked payload" },
    standing: {
      sent: PAST_CLIFF_SENT,
      value: "wait",
      ...degraded("supervisor-decide.ts exited 1: unasked payload"),
    },
    portedNotice: null,
  },
  {
    name: "a rejection carrying nothing at all still waits rather than throwing",
    obs: { childAgeMs: 1, alreadyArmed: false, deferredOrActionPending: false },
    thresholdMs: 0,
    answer: { reject: undefined },
    standing: {
      sent: '{"preCliffRestartRule":{"decidePreCliffRestart":{"obs":{"childAgeMs":1,"alreadyArmed":false,"deferredOrActionPending":false},"thresholdMs":0}}}',
      value: "wait",
      ...degraded("undefined"),
    },
    portedNotice: null,
  },
  {
    name: "a refusal longer than the cap rides into the notice cut to it",
    obs: PAST_CLIFF,
    thresholdMs: THRESHOLD_MS,
    answer: { reject: new Error(LONG_REFUSAL) },
    standing: { sent: PAST_CLIFF_SENT, value: "wait", ...degraded(LONG_KEPT) },
    portedNotice: null,
  },
  {
    name: "a verdict outside the two degrades exactly as an unreached tree does",
    obs: PAST_CLIFF,
    thresholdMs: THRESHOLD_MS,
    answer: { resolve: { preCliffRestartRule: { decidePreCliffRestart: "restart" } } },
    standing: {
      sent: PAST_CLIFF_SENT,
      value: "wait",
      ...degraded(ZOD_OUTSIDE_THE_TWO),
    },
    portedNotice: degraded(shapeSaid(OUTSIDE_THE_TWO)).notice,
  },
  {
    name: "an answer of the wrong shape entirely degrades rather than throwing",
    obs: PAST_CLIFF,
    thresholdMs: THRESHOLD_MS,
    answer: { resolve: null },
    standing: {
      sent: PAST_CLIFF_SENT,
      value: "wait",
      ...degraded(ZOD_NOT_AN_OBJECT),
    },
    portedNotice: degraded(shapeSaid(NOT_AN_OBJECT)).notice,
  },
]
