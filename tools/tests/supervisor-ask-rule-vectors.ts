
export interface Scenario {
  readonly name: string
  readonly rule: string
  readonly question: Record<string, unknown>
  readonly answer: { readonly resolve: unknown } | { readonly reject: unknown }
  readonly read: (answered: unknown) => unknown
  readonly safe: unknown
  readonly standing: Recording
}

export interface Recording {
  readonly sent: string
  readonly value: unknown
  readonly notice: string | null
  readonly logged: readonly string[]
}

const degraded = (rule: string, reason: string): Pick<Recording, "notice" | "logged"> => {
  const notice = `supervisor-decide could not decide \`${rule}\`: ${reason}`
  return { notice, logged: [`[local] ${notice} — acting on the safe answer instead`] }
}

const DECIDED = { notice: null, logged: [] } as const

const LONG_REFUSAL = "x".repeat(500)
const LONG_KEPT = `Error: ${"x".repeat(393)}`

const under =
  (key: string, field: string) =>
  (answered: unknown): unknown => {
    const held = (answered as Record<string, Record<string, unknown>>)[key]
    if (held === undefined || !(field in held)) {
      throw new Error(`no \`${field}\` under \`${key}\` in the answer`)
    }
    return held[field]
  }

export const SCENARIOS: readonly Scenario[] = [
  {
    name: "an answered payload is read at the caller's shape, with no notice beside it",
    rule: "idleRule",
    question: { inFlight: 0, busyChildren: 0, claudePresent: true },
    answer: { resolve: { idleRule: { preservingRestart: false, busyReason: "inFlight=1" } } },
    read: (answered) => ({
      idle: under("idleRule", "preservingRestart")(answered),
      reason: under("idleRule", "busyReason")(answered),
    }),
    safe: { idle: false, reason: "unread" },
    standing: {
      sent: '{"idleRule":{"inFlight":0,"busyChildren":0,"claudePresent":true}}',
      value: { idle: false, reason: "inFlight=1" },
      ...DECIDED,
    },
  },
  {
    name: "the question crosses under the rule's own key, nested shape and array order intact",
    rule: "deferredRestartRule",
    question: {
      state: { idleStreak: 0, prevBusyReason: null },
      config: { ceilingTicks: 1 },
      cmdlines: ["a", "b", "c"],
    },
    answer: { resolve: { deferredRestartRule: { decideDeferredRestart: 7 } } },
    read: under("deferredRestartRule", "decideDeferredRestart"),
    safe: null,
    standing: {
      sent: '{"deferredRestartRule":{"state":{"idleStreak":0,"prevBusyReason":null},"config":{"ceilingTicks":1},"cmdlines":["a","b","c"]}}',
      value: 7,
      ...DECIDED,
    },
  },
  {
    name: "a rule with nothing to ask about still crosses as its own key",
    rule: "constantsRule",
    question: {},
    answer: { resolve: { constantsRule: { constants: { EDGE_CLIFF_MS: 27_600_000 } } } },
    read: under("constantsRule", "constants"),
    safe: null,
    standing: {
      sent: '{"constantsRule":{}}',
      value: { EDGE_CLIFF_MS: 27_600_000 },
      ...DECIDED,
    },
  },
  {
    name: "a decided answer identical to the safe one is parted from it by the null notice alone",
    rule: "idleRule",
    question: { inFlight: 2 },
    answer: { resolve: { idleRule: { preservingRestart: false } } },
    read: under("idleRule", "preservingRestart"),
    safe: false,
    standing: { sent: '{"idleRule":{"inFlight":2}}', value: false, ...DECIDED },
  },
  {
    name: "an answer the read cannot understand degrades exactly as an unreached tree does",
    rule: "childExitRule",
    question: { status: { exitCode: 0, signal: null } },
    answer: { resolve: { childExitRule: {} } },
    read: under("childExitRule", "collapseChildExitStatus"),
    safe: 1,
    standing: {
      sent: '{"childExitRule":{"status":{"exitCode":0,"signal":null}}}',
      value: 1,
      ...degraded(
        "childExitRule",
        "Error: no `collapseChildExitStatus` under `childExitRule` in the answer"
      ),
    },
  },
  {
    name: "an answer of the wrong shape entirely degrades rather than throwing",
    rule: "childExitRule",
    question: { raw: 256 },
    answer: { resolve: null },
    read: under("childExitRule", "decodeWaitStatus"),
    safe: { exitCode: null, signal: null },
    standing: {
      sent: '{"childExitRule":{"raw":256}}',
      value: { exitCode: null, signal: null },
      ...degraded("childExitRule", "TypeError: null is not an object (evaluating 'answered[key]')"),
    },
  },
  {
    name: "an ask that reached nothing hands back the caller's safe answer",
    rule: "idleRule",
    question: { cmdlines: ["a", "b", "c"] },
    answer: { reject: new Error("no instructions tree here") },
    read: under("idleRule", "ignoredMcpCmdlines"),
    safe: [false, false, false],
    standing: {
      sent: '{"idleRule":{"cmdlines":["a","b","c"]}}',
      value: [false, false, false],
      ...degraded("idleRule", "Error: no instructions tree here"),
    },
  },
  {
    name: "a refusal that is not an Error still names itself in the notice",
    rule: "proxyAdoptionRule",
    question: { hasLiveProxy: true, versionMatches: false, healthy: true },
    answer: { reject: "supervisor-decide.ts exited 1: unasked payload" },
    read: under("proxyAdoptionRule", "decideProxyAdoption"),
    safe: "spawn-fresh",
    standing: {
      sent: '{"proxyAdoptionRule":{"hasLiveProxy":true,"versionMatches":false,"healthy":true}}',
      value: "spawn-fresh",
      ...degraded("proxyAdoptionRule", "supervisor-decide.ts exited 1: unasked payload"),
    },
  },
  {
    name: "a refusal longer than the cap rides into the notice cut to it",
    rule: "selfHealJitterRule",
    question: { randFloat: 0.5 },
    answer: { reject: new Error(LONG_REFUSAL) },
    read: under("selfHealJitterRule", "jitterMs"),
    safe: 0,
    standing: {
      sent: '{"selfHealJitterRule":{"randFloat":0.5}}',
      value: 0,
      ...degraded("selfHealJitterRule", LONG_KEPT),
    },
  },
  {
    name: "a safe answer of null is handed back as one, and is not mistaken for an absent value",
    rule: "childExitRule",
    question: { supervisorKilled: false, shuttingDown: false },
    answer: { reject: new Error("spawn ENOENT") },
    read: under("childExitRule", "classifyChildExit"),
    safe: null,
    standing: {
      sent: '{"childExitRule":{"supervisorKilled":false,"shuttingDown":false}}',
      value: null,
      ...degraded("childExitRule", "Error: spawn ENOENT"),
    },
  },
  {
    name: "a rejection carrying nothing at all still degrades rather than throwing",
    rule: "preCliffRestartRule",
    question: { childAgeMs: null, alreadyArmed: false },
    answer: { reject: undefined },
    read: under("preCliffRestartRule", "decidePreCliffRestart"),
    safe: "wait",
    standing: {
      sent: '{"preCliffRestartRule":{"childAgeMs":null,"alreadyArmed":false}}',
      value: "wait",
      ...degraded("preCliffRestartRule", "undefined"),
    },
  },
]
