
export interface ReadRecording {
  readonly value: unknown
  readonly threw: string | null
}

export interface AskRecording {
  readonly sent: string
  readonly value: unknown
  readonly notice: string | null
  readonly logged: readonly string[]
}

export interface ReadScenario {
  readonly name: string
  readonly kind: "read"
  readonly payload: unknown
  readonly standing: ReadRecording
  readonly diverges?: { readonly ported: ReadRecording }
}

export interface AskScenario {
  readonly name: string
  readonly kind: "ask"
  readonly state: ProxyState | null
  readonly healthy: boolean
  readonly answer: { readonly resolve: unknown } | { readonly reject: unknown }
  readonly standing: AskRecording
  readonly diverges?: { readonly ported: AskRecording }
}

export type Scenario = ReadScenario | AskScenario

type ProxyState = {
  readonly consecutiveFailures: number
  readonly consecutiveRespawns: number
  readonly gaveUp: boolean
}

const INITIAL = { consecutiveFailures: 0, consecutiveRespawns: 0, gaveUp: false }
const CLIMBING = { consecutiveFailures: 2, consecutiveRespawns: 1, gaveUp: false }
const LATCHED = { consecutiveFailures: 3, consecutiveRespawns: 3, gaveUp: true }

const answered = (state: unknown, action: unknown): unknown => ({
  proxyLivenessRule: { decideProxyLiveness: { state, action } },
})

const decided = (state: unknown, action: string): ReadRecording => ({
  value: { state, action },
  threw: null,
})

const AT = ["proxyLivenessRule", "decideProxyLiveness"]
const STATE_AT = [...AT, "state"]

type ZodIssue = Record<string, unknown>

const zodSaid = (issue: ZodIssue): string => JSON.stringify([issue], null, 2)

const shapeSaid = (issue: ZodIssue): string =>
  `ShapeError: ${JSON.stringify([{ code: issue.code, path: issue.path, message: issue.message }], null, 2)}`

const invalidType = (expected: string, path: readonly string[], received: string): ZodIssue =>
  received === "NaN"
    ? {
        expected,
        code: "invalid_type",
        received,
        path,
        message: `Invalid input: expected ${expected}, received ${received}`,
      }
    : {
        expected,
        code: "invalid_type",
        path,
        message: `Invalid input: expected ${expected}, received ${received}`,
      }

const BAD_ACTION: ZodIssue = {
  code: "invalid_value",
  values: ["none", "respawn", "give-up"],
  path: [...AT, "action"],
  message: 'Invalid option: expected one of "none"|"respawn"|"give-up"',
}

const refused = (issue: ZodIssue): Pick<ReadScenario, "standing" | "diverges"> => ({
  standing: { value: null, threw: zodSaid(issue) },
  diverges: { ported: { value: null, threw: shapeSaid(issue) } },
})

const degraded = (reason: string): Pick<AskRecording, "notice" | "logged"> => {
  const notice = `supervisor-decide could not decide \`proxyLivenessRule\`: ${reason}`
  return { notice, logged: [`[local] ${notice} — acting on the safe answer instead`] }
}

const DECIDED = { notice: null, logged: [] } as const

const sent = (state: unknown, healthy: boolean): string =>
  `{"proxyLivenessRule":{"decideProxyLiveness":{"state":${JSON.stringify(state)},"healthy":${healthy}}}}`

export const LONG_REFUSAL = "x".repeat(500)
const LONG_KEPT = `Error: ${"x".repeat(393)}`

const degradedNarrow = (
  state: unknown,
  healthy: boolean,
  issue: ZodIssue
): Pick<AskScenario, "standing" | "diverges"> => {
  const common = { sent: sent(state, healthy), value: { state, action: "none" } }
  return {
    standing: { ...common, ...degraded(zodSaid(issue)) },
    diverges: { ported: { ...common, ...degraded(shapeSaid(issue)) } },
  }
}

export const SCENARIOS: readonly Scenario[] = [
  {
    name: "read: a decided none verdict comes back at the caller's shape",
    kind: "read",
    payload: answered(INITIAL, "none"),
    standing: decided(INITIAL, "none"),
  },
  {
    name: "read: a respawn verdict carries the state the rule advanced",
    kind: "read",
    payload: answered({ consecutiveFailures: 3, consecutiveRespawns: 2, gaveUp: false }, "respawn"),
    standing: decided({ consecutiveFailures: 3, consecutiveRespawns: 2, gaveUp: false }, "respawn"),
  },
  {
    name: "read: the give-up verdict and its latched state",
    kind: "read",
    payload: answered(LATCHED, "give-up"),
    standing: decided(LATCHED, "give-up"),
  },
  {
    name: "read: keys the schema does not declare are stripped rather than refused",
    kind: "read",
    payload: {
      proxyLivenessRule: {
        decideProxyLiveness: {
          state: { ...INITIAL, sinceMs: 1200 },
          action: "none",
          reason: "healthy",
        },
        otherRule: 1,
      },
      somethingElse: true,
    },
    standing: decided(INITIAL, "none"),
  },
  {
    name: "read: a non-integer count is held, number being the whole check",
    kind: "read",
    payload: answered({ consecutiveFailures: 1.5, consecutiveRespawns: 0, gaveUp: false }, "none"),
    standing: decided({ consecutiveFailures: 1.5, consecutiveRespawns: 0, gaveUp: false }, "none"),
  },
  {
    name: "read: an empty payload refuses",
    kind: "read",
    payload: {},
    ...refused(invalidType("object", ["proxyLivenessRule"], "undefined")),
  },
  {
    name: "read: null refuses",
    kind: "read",
    payload: null,
    ...refused(invalidType("object", [], "null")),
  },
  {
    name: "read: the rule key present but the decision key missing refuses",
    kind: "read",
    payload: { proxyLivenessRule: {} },
    ...refused(invalidType("object", AT, "undefined")),
  },
  {
    name: "read: a state field missing refuses at its path",
    kind: "read",
    payload: answered({ consecutiveFailures: 0, consecutiveRespawns: 0 }, "none"),
    ...refused(invalidType("boolean", [...STATE_AT, "gaveUp"], "undefined")),
  },
  {
    name: "read: a count sent as a string refuses",
    kind: "read",
    payload: answered({ ...INITIAL, consecutiveFailures: "0" }, "none"),
    ...refused(invalidType("number", [...STATE_AT, "consecutiveFailures"], "string")),
  },
  {
    name: "read: an action outside the three refuses",
    kind: "read",
    payload: answered(INITIAL, "restart"),
    ...refused(BAD_ACTION),
  },
  {
    name: "read: a null state refuses, the schema not being nullable",
    kind: "read",
    payload: answered(null, "none"),
    ...refused(invalidType("object", STATE_AT, "null")),
  },
  {
    name: "read: NaN as a count refuses",
    kind: "read",
    payload: answered({ ...INITIAL, consecutiveRespawns: Number.NaN }, "none"),
    ...refused(invalidType("number", [...STATE_AT, "consecutiveRespawns"], "NaN")),
  },
  {
    name: "read: the rule key misspelled refuses",
    kind: "read",
    payload: { proxyLiveness: { decideProxyLiveness: { state: INITIAL, action: "none" } } },
    ...refused(invalidType("object", ["proxyLivenessRule"], "undefined")),
  },

  {
    name: "ask: a first tick sends a null state and reads the rule's own initial state back",
    kind: "ask",
    state: null,
    healthy: true,
    answer: { resolve: answered(INITIAL, "none") },
    standing: { sent: sent(null, true), value: { state: INITIAL, action: "none" }, ...DECIDED },
  },
  {
    name: "ask: a climbing state crosses whole and the respawn verdict comes back",
    kind: "ask",
    state: CLIMBING,
    healthy: false,
    answer: {
      resolve: answered({ consecutiveFailures: 3, consecutiveRespawns: 1, gaveUp: false }, "respawn"),
    },
    standing: {
      sent: sent(CLIMBING, false),
      value: {
        state: { consecutiveFailures: 3, consecutiveRespawns: 1, gaveUp: false },
        action: "respawn",
      },
      ...DECIDED,
    },
  },
  {
    name: "ask: the give-up verdict crosses back with its latched state",
    kind: "ask",
    state: { consecutiveFailures: 2, consecutiveRespawns: 3, gaveUp: false },
    healthy: false,
    answer: { resolve: answered(LATCHED, "give-up") },
    standing: {
      sent: sent({ consecutiveFailures: 2, consecutiveRespawns: 3, gaveUp: false }, false),
      value: { state: LATCHED, action: "give-up" },
      ...DECIDED,
    },
  },
  {
    name: "ask: an unreachable tree degrades to none with the caller's own state held still",
    kind: "ask",
    state: CLIMBING,
    healthy: false,
    answer: { reject: new Error("no instructions tree here") },
    standing: {
      sent: sent(CLIMBING, false),
      value: { state: CLIMBING, action: "none" },
      ...degraded("Error: no instructions tree here"),
    },
  },
  {
    name: "ask: a monitor that has not ticked degrades to the null state it already held",
    kind: "ask",
    state: null,
    healthy: false,
    answer: { reject: new Error("no instructions tree here") },
    standing: {
      sent: sent(null, false),
      value: { state: null, action: "none" },
      ...degraded("Error: no instructions tree here"),
    },
  },
  {
    name: "ask: a refusal that is not an Error still names itself in the notice",
    kind: "ask",
    state: LATCHED,
    healthy: true,
    answer: { reject: "supervisor-decide.ts exited 1: unasked payload" },
    standing: {
      sent: sent(LATCHED, true),
      value: { state: LATCHED, action: "none" },
      ...degraded("supervisor-decide.ts exited 1: unasked payload"),
    },
  },
  {
    name: "ask: a refusal longer than the cap rides into the notice cut to it",
    kind: "ask",
    state: INITIAL,
    healthy: false,
    answer: { reject: new Error(LONG_REFUSAL) },
    standing: {
      sent: sent(INITIAL, false),
      value: { state: INITIAL, action: "none" },
      ...degraded(LONG_KEPT),
    },
  },
  {
    name: "ask: a rejection carrying nothing at all still degrades rather than throwing",
    kind: "ask",
    state: INITIAL,
    healthy: true,
    answer: { reject: undefined },
    standing: {
      sent: sent(INITIAL, true),
      value: { state: INITIAL, action: "none" },
      ...degraded("undefined"),
    },
  },
  {
    name: "ask: an answer the narrow cannot understand degrades as an unreached tree does",
    kind: "ask",
    state: CLIMBING,
    healthy: false,
    answer: { resolve: { proxyLivenessRule: {} } },
    ...degradedNarrow(CLIMBING, false, invalidType("object", AT, "undefined")),
  },
  {
    name: "ask: an answer of the wrong shape entirely degrades rather than throwing",
    kind: "ask",
    state: null,
    healthy: true,
    answer: { resolve: null },
    ...degradedNarrow(null, true, invalidType("object", [], "null")),
  },
  {
    name: "ask: an action outside the three degrades rather than being acted on",
    kind: "ask",
    state: INITIAL,
    healthy: false,
    answer: { resolve: answered(INITIAL, "restart") },
    ...degradedNarrow(INITIAL, false, BAD_ACTION),
  },
]
