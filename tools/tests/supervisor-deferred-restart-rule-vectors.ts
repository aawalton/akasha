
import type { RuleAnswer } from "../lib/supervisor-ask-rule.ts"
import {
  askConstants,
  askDecide,
  askWindows,
  readConstants,
  readDecide,
  readWindows,
} from "../lib/supervisor-deferred-restart-rule.ts"
import type { AskDecide } from "../lib/supervisor-resume-asks.ts"
import {
  HERE_NO_DECIDE_KEY,
  HERE_NO_RULE_KEY,
  HERE_STRAY_FIRE_REASON,
  HERE_TEXT_WINDOW,
  ZOD_NO_DECIDE_KEY,
  ZOD_NO_RULE_KEY,
  ZOD_STRAY_FIRE_REASON,
  ZOD_TEXT_WINDOW,
} from "./supervisor-deferred-restart-rule-refusals.ts"

const STATE = {
  idleStreak: 0,
  elapsedTicks: 0,
  staleStreak: 0,
  prevBusyReason: null,
  prevTranscriptMtimeMs: null,
}

const RECORDED_STATE = {
  idleStreak: 0,
  elapsedTicks: 0,
  staleStreak: 0,
  prevBusyReason: null,
  prevTranscriptMtimeMs: null,
}

const CONSTANTS_ANSWER = {
  deferredRestartRule: {
    constants: {
      INITIAL_DEFERRED_RESTART_STATE: STATE,
      EDGE_CONNECTION_CLIFF_PREEMPT_MS: 27_600_000,
      EDGE_CONNECTION_CLIFF_OVERRIDE_MS: 28_200_000,
    },
  },
}

const DECIDE_ANSWER = {
  deferredRestartRule: {
    decideDeferredRestart: { state: STATE, fire: true, fireReason: "ceiling" },
  },
}

const WINDOWS_ANSWER = {
  deferredRestartRule: {
    resolveMaxDeferMs: 1_800_000,
    resolveStaleWedgeMs: 600_000,
    resolvePreCliffOverrideMs: 28_200_000,
  },
}

const NO_TREE = "no instructions tree here"

const degraded = (reason: string): { notice: string; logged: readonly string[] } => {
  const notice = `supervisor-decide could not decide \`deferredRestartRule\`: ${reason}`
  return { notice, logged: [`[local] ${notice} — acting on the safe answer instead`] }
}

const DECIDED = { notice: null, logged: [] } as const

export type PureRecording = { readonly returned: unknown } | { readonly threw: string }

export interface PureScenario {
  readonly name: string
  readonly run: () => unknown
  readonly standing: PureRecording
  readonly diverges?: PureRecording
}

export const PURE_SCENARIOS: readonly PureScenario[] = [
  {
    name: "readConstants holds the two cliff ages and the state a monitor starts from",
    run: () => readConstants(CONSTANTS_ANSWER),
    standing: {
      returned: {
        INITIAL_DEFERRED_RESTART_STATE: RECORDED_STATE,
        EDGE_CONNECTION_CLIFF_PREEMPT_MS: 27_600_000,
        EDGE_CONNECTION_CLIFF_OVERRIDE_MS: 28_200_000,
      },
    },
  },
  {
    name: "readDecide holds the whole tick verdict at the shape the monitor carries",
    run: () => readDecide(DECIDE_ANSWER),
    standing: { returned: { state: RECORDED_STATE, fire: true, fireReason: "ceiling" } },
  },
  {
    name: "readWindows renames the three resolved windows onto the arm's own keys",
    run: () => readWindows(WINDOWS_ANSWER),
    standing: {
      returned: { maxDeferMs: 1_800_000, staleWedgeMs: 600_000, preCliffOverrideMs: 28_200_000 },
    },
  },
  {
    name: "readDecide holds an advanced state, a busy reason and a frozen mtime",
    run: () =>
      readDecide({
        deferredRestartRule: {
          decideDeferredRestart: {
            state: {
              idleStreak: 3,
              elapsedTicks: 41,
              staleStreak: 2,
              prevBusyReason: "inFlight=1",
              prevTranscriptMtimeMs: 1_754_000_000_000,
            },
            fire: false,
            fireReason: null,
          },
        },
      }),
    standing: {
      returned: {
        state: {
          idleStreak: 3,
          elapsedTicks: 41,
          staleStreak: 2,
          prevBusyReason: "inFlight=1",
          prevTranscriptMtimeMs: 1_754_000_000_000,
        },
        fire: false,
        fireReason: null,
      },
    },
  },
  {
    name: "readConstants refuses a payload carrying no rule key at all",
    run: () => readConstants({}),
    standing: { threw: ZOD_NO_RULE_KEY },
    diverges: { threw: HERE_NO_RULE_KEY },
  },
  {
    name: "readDecide refuses an answer missing the question it was asked",
    run: () => readDecide({ deferredRestartRule: {} }),
    standing: { threw: ZOD_NO_DECIDE_KEY },
    diverges: { threw: HERE_NO_DECIDE_KEY },
  },
  {
    name: "readDecide refuses a fire reason outside the three the shell logs",
    run: () =>
      readDecide({
        deferredRestartRule: {
          decideDeferredRestart: { state: STATE, fire: true, fireReason: "wandered-off" },
        },
      }),
    standing: { threw: ZOD_STRAY_FIRE_REASON },
    diverges: { threw: HERE_STRAY_FIRE_REASON },
  },
  {
    name: "readWindows refuses a window answered as text rather than as a number",
    run: () =>
      readWindows({
        deferredRestartRule: {
          resolveMaxDeferMs: "1800000",
          resolveStaleWedgeMs: 600_000,
          resolvePreCliffOverrideMs: 28_200_000,
        },
      }),
    standing: { threw: ZOD_TEXT_WINDOW },
    diverges: { threw: HERE_TEXT_WINDOW },
  },
]

export interface AskRecording {
  readonly sent: string
  readonly value: unknown
  readonly notice: string | null
  readonly logged: readonly string[]
}

export interface AskScenario {
  readonly name: string
  readonly answer: { readonly resolve: unknown } | { readonly reject: string }
  readonly run: (ask: AskDecide) => Promise<RuleAnswer<unknown>>
  readonly standing: AskRecording
  readonly diverges?: AskRecording
}

const CONSTANTS_SENT = '{"deferredRestartRule":{"constants":true}}'
const WINDOWS_SENT_SET =
  '{"deferredRestartRule":{"resolveMaxDeferMs":"1800000","resolveStaleWedgeMs":"600000","resolvePreCliffOverrideMs":"28200000"}}'
const WINDOWS_SENT_UNSET =
  '{"deferredRestartRule":{"resolveMaxDeferMs":null,"resolveStaleWedgeMs":null,"resolvePreCliffOverrideMs":null}}'
const DECIDE_SENT_BARE =
  '{"deferredRestartRule":{"decideDeferredRestart":{"state":{"idleStreak":0,"elapsedTicks":0,"staleStreak":0,"prevBusyReason":null,"prevTranscriptMtimeMs":null},"obs":{"idle":true}}}}'

const RECORDED_CONSTANTS = {
  INITIAL_DEFERRED_RESTART_STATE: RECORDED_STATE,
  EDGE_CONNECTION_CLIFF_PREEMPT_MS: 27_600_000,
  EDGE_CONNECTION_CLIFF_OVERRIDE_MS: 28_200_000,
}
const RECORDED_WINDOWS = {
  maxDeferMs: 1_800_000,
  staleWedgeMs: 600_000,
  preCliffOverrideMs: 28_200_000,
}
const RECORDED_FIRE = { state: RECORDED_STATE, fire: true, fireReason: "ceiling" }
const RECORDED_HELD = { state: RECORDED_STATE, fire: false, fireReason: null }

export const ASK_SCENARIOS: readonly AskScenario[] = [
  {
    name: "askConstants asks for the constants under the rule's own key",
    answer: { resolve: CONSTANTS_ANSWER },
    run: (ask) => askConstants(ask),
    standing: { sent: CONSTANTS_SENT, value: RECORDED_CONSTANTS, ...DECIDED },
  },
  {
    name: "askConstants hands back no constants at all where the tree cannot be reached",
    answer: { reject: NO_TREE },
    run: (ask) => askConstants(ask),
    standing: { sent: CONSTANTS_SENT, value: null, ...degraded(`Error: ${NO_TREE}`) },
  },
  {
    name: "askDecide sends the state, the observation and the config it was given",
    answer: { resolve: DECIDE_ANSWER },
    run: (ask) =>
      askDecide(
        STATE,
        { idle: false, busyReason: "inFlight=1", transcriptMtimeMs: 7 },
        { ceilingTicks: 180, staleTicks: 60 },
        ask
      ),
    standing: {
      sent: '{"deferredRestartRule":{"decideDeferredRestart":{"state":{"idleStreak":0,"elapsedTicks":0,"staleStreak":0,"prevBusyReason":null,"prevTranscriptMtimeMs":null},"obs":{"idle":false,"busyReason":"inFlight=1","transcriptMtimeMs":7},"config":{"ceilingTicks":180,"staleTicks":60}}}}',
      value: RECORDED_FIRE,
      ...DECIDED,
    },
  },
  {
    name: "askDecide sends no config key at all where the caller passed none, and null for a first tick",
    answer: { resolve: DECIDE_ANSWER },
    run: (ask) => askDecide(null, { idle: true }, undefined, ask),
    standing: {
      sent: '{"deferredRestartRule":{"decideDeferredRestart":{"state":null,"obs":{"idle":true}}}}',
      value: RECORDED_FIRE,
      ...DECIDED,
    },
  },
  {
    name: "askDecide advances no state on a tick it could not decide",
    answer: { reject: NO_TREE },
    run: (ask) => askDecide(STATE, { idle: true }, { ceilingTicks: 1 }, ask),
    standing: {
      sent: '{"deferredRestartRule":{"decideDeferredRestart":{"state":{"idleStreak":0,"elapsedTicks":0,"staleStreak":0,"prevBusyReason":null,"prevTranscriptMtimeMs":null},"obs":{"idle":true},"config":{"ceilingTicks":1}}}}',
      value: RECORDED_HELD,
      ...degraded(`Error: ${NO_TREE}`),
    },
  },
  {
    name: "askDecide degrades on an answer it could not read, the same as on an unreachable tree",
    answer: { resolve: { deferredRestartRule: {} } },
    run: (ask) => askDecide(STATE, { idle: true }, undefined, ask),
    standing: { sent: DECIDE_SENT_BARE, value: RECORDED_HELD, ...degraded(ZOD_NO_DECIDE_KEY) },
    diverges: { sent: DECIDE_SENT_BARE, value: RECORDED_HELD, ...degraded(HERE_NO_DECIDE_KEY) },
  },
  {
    name: "askWindows sends each raw override as the tree receives it",
    answer: { resolve: WINDOWS_ANSWER },
    run: (ask) =>
      askWindows(
        { maxDeferMs: "1800000", staleWedgeMs: "600000", preCliffOverrideMs: "28200000" },
        ask
      ),
    standing: { sent: WINDOWS_SENT_SET, value: RECORDED_WINDOWS, ...DECIDED },
  },
  {
    name: "askWindows crosses an unset override as null, JSON carrying no undefined",
    answer: { resolve: WINDOWS_ANSWER },
    run: (ask) =>
      askWindows(
        { maxDeferMs: undefined, staleWedgeMs: undefined, preCliffOverrideMs: undefined },
        ask
      ),
    standing: { sent: WINDOWS_SENT_UNSET, value: RECORDED_WINDOWS, ...DECIDED },
  },
  {
    name: "askWindows refuses the arm rather than inventing a window",
    answer: { reject: NO_TREE },
    run: (ask) =>
      askWindows(
        { maxDeferMs: undefined, staleWedgeMs: undefined, preCliffOverrideMs: undefined },
        ask
      ),
    standing: { sent: WINDOWS_SENT_UNSET, value: null, ...degraded(`Error: ${NO_TREE}`) },
  },
]
