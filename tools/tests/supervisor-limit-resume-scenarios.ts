
import {
  ANSWERED_FLOOR_MS,
  ANSWERED_NUDGE,
  ELIGIBLE,
  HEALTHY_LINE,
  type Harness,
  INELIGIBLE,
  NOW,
  type Over,
  nudgeAnswer,
  question,
  settle,
  until,
  waitAnswer,
} from "./supervisor-limit-resume-harness.ts"
import { LIMIT_RESUME_DECISION } from "../lib/supervisor-limit-resume.ts"

export interface Scenario {
  readonly name: string
  readonly over?: Over
  readonly drive: (h: Harness) => Promise<void>
  readonly observe: (h: Harness) => Record<string, unknown>
  readonly standing: Record<string, unknown>
}

const OTHER_WORDING = "◆ a different wording entirely"

const askedThenSettled = async (h: Harness): Promise<void> => {
  await until(() => h.asks.length > 0)
  await settle()
}
const loggedThenSettled = async (h: Harness): Promise<void> => {
  await until(() => h.logs.length > 0)
  await settle()
}
const sentNothing = (h: Harness): Record<string, unknown> => ({
  nudges: h.nudges.length,
  floorKeys: h.floorKeys.length,
})
const refused = { nudges: 0, floorKeys: 0 }
const saidOnce = (h: Harness): number =>
  h.logs.filter((l) => l.includes("answered nothing this can use")).length

export const SCENARIOS: readonly Scenario[] = [
  {
    name: "healthy transcript → never asks, never nudges",
    over: { transcript: HEALTHY_LINE },
    drive: (_h) => settle(),
    observe: (h) => ({ asks: h.asks.length, nudges: h.nudges.length }),
    standing: { asks: 0, nudges: 0 },
  },
  {
    name: "null transcript (sentinel absent) → never asks",
    over: { transcript: null },
    drive: (_h) => settle(),
    observe: (h) => ({ asks: h.asks.length, nudges: h.nudges.length }),
    standing: { asks: 0, nudges: 0 },
  },
  {
    name: "null agentId → never asks",
    over: { agentId: null },
    drive: (_h) => settle(),
    observe: (h) => ({ asks: h.asks.length, nudges: h.nudges.length }),
    standing: { asks: 0, nudges: 0 },
  },
  {
    name: "a death does ask, so the three above are the gate and not a dead seam",
    over: { answer: waitAnswer },
    drive: (h) => until(() => h.asks.length > 0),
    observe: (h) => ({ asked: h.asks.length > 0 }),
    standing: { asked: true },
  },

  {
    name: "death, capacity and the clock ride the question",
    over: { pacing: ELIGIBLE, answer: waitAnswer },
    drive: (h) => until(() => h.asks.length > 0),
    observe: (h) => {
      const q = question(h)
      return {
        deathDetected: q.deathDetected,
        poolHasCapacity: q.poolHasCapacity,
        now: q.now,
        recentlyNudged: q.recentlyNudged,
      }
    },
    standing: { deathDetected: true, poolHasCapacity: true, now: NOW, recentlyNudged: false },
  },
  {
    name: "the hold requirement is left off unless a caller overrides it",
    over: { answer: waitAnswer },
    drive: (h) => until(() => h.asks.length > 0),
    observe: (h) => ({ holdKeyPresent: "eligibilityHoldMs" in question(h) }),
    standing: { holdKeyPresent: false },
  },
  {
    name: "an override rides the payload",
    over: { answer: waitAnswer, eligibilityHoldMs: 60_000 },
    drive: (h) => until(() => h.asks.length > 0),
    observe: (h) => ({ eligibilityHoldMs: question(h).eligibilityHoldMs }),
    standing: { eligibilityHoldMs: 60_000 },
  },
  {
    name: "the eligibility run accrues while eligible and restarts on an ineligible tick",
    over: { pacing: ELIGIBLE, answer: waitAnswer },
    drive: async (h) => {
      const sawHeld = (value: unknown): boolean =>
        h.asks.some((_a, i) => question(h, i).eligibilityHeldMs === value)
      await until(() => h.asks.length > 0)
      h.setNow(NOW + 45_000)
      await until(() => sawHeld(45_000))
      h.setPacing(INELIGIBLE)
      await until(() => sawHeld(null))
    },
    observe: (h) => {
      const sawHeld = (value: unknown): boolean =>
        h.asks.some((_a, i) => question(h, i).eligibilityHeldMs === value)
      return {
        firstHeld: question(h).eligibilityHeldMs,
        sawAccrued: sawHeld(45_000),
        sawCleared: sawHeld(null),
      }
    },
    standing: { firstHeld: 0, sawAccrued: true, sawCleared: true },
  },

  {
    name: "the floor is asked about the exact string that is then injected",
    over: {},
    drive: (h) => until(() => h.nudges.length > 0),
    observe: (h) => ({
      nudged: h.nudges[0],
      floorKey: h.floorKeys[0],
      same: h.floorKeys[0] === h.nudges[0],
    }),
    standing: { nudged: ANSWERED_NUDGE, floorKey: ANSWERED_NUDGE, same: true },
  },
  {
    name: "a different wording is carried through both uses just the same",
    over: { answer: () => nudgeAnswer(OTHER_WORDING) },
    drive: (h) => until(() => h.nudges.length > 0),
    observe: (h) => ({ nudged: h.nudges[0], floorKey: h.floorKeys[0] }),
    standing: { nudged: OTHER_WORDING, floorKey: OTHER_WORDING },
  },
  {
    name: "a nudge already inside the floor injects nothing",
    over: { recentlyNudged: true },
    drive: async (h) => {
      await until(() => h.floorKeys.length > 0)
      await settle()
    },
    observe: (h) => ({ floorConsulted: h.floorKeys.length > 0, nudges: h.nudges.length }),
    standing: { floorConsulted: true, nudges: 0 },
  },
  {
    name: "a nudge verdict injects exactly once across many ticks",
    over: {},
    drive: async (h) => {
      await until(() => h.nudges.length > 0)
      await settle()
    },
    observe: (h) => ({ nudges: h.nudges.length }),
    standing: { nudges: 1 },
  },

  {
    name: "the verdict's window reaches the recency check, not a number held here",
    over: { answer: () => nudgeAnswer(ANSWERED_NUDGE, ANSWERED_FLOOR_MS) },
    drive: (h) => until(() => h.floorWindows.length > 0),
    observe: (h) => ({ window: h.floorWindows[0], notTheLiveOne: h.floorWindows[0] !== 120_000 }),
    standing: { window: 5_000, notTheLiveOne: true },
  },
  {
    name: "a second, unrelated window is carried the same way",
    over: { answer: () => nudgeAnswer(ANSWERED_NUDGE, 37_500) },
    drive: (h) => until(() => h.floorWindows.length > 0),
    observe: (h) => ({ window: h.floorWindows[0] }),
    standing: { window: 37_500 },
  },
  {
    name: "the held line reports the window that was actually enforced",
    over: { answer: () => nudgeAnswer(ANSWERED_NUDGE, 5_000), recentlyNudged: true },
    drive: (h) => until(() => h.logs.some((l) => l.includes("floor holds"))),
    observe: (h) => ({
      namedEnforced: h.logs.some((l) => l.includes("landed within 5000ms")),
      namedTheLiveOne: h.logs.some((l) => l.includes("120000ms")),
    }),
    standing: { namedEnforced: true, namedTheLiveOne: false },
  },
  {
    name: "the opts seam overrides the answer's window rather than defaulting a missing one",
    over: { answer: () => nudgeAnswer(ANSWERED_NUDGE, 5_000), floorMs: 90_000 },
    drive: (h) => until(() => h.floorWindows.length > 0),
    observe: (h) => ({ window: h.floorWindows[0] }),
    standing: { window: 90_000 },
  },

  {
    name: "a call that throws (refusal, non-JSON, no instructions root) → silent",
    over: {
      answer: () => {
        throw new Error("no instructions root")
      },
    },
    drive: askedThenSettled,
    observe: (h) => ({
      ...sentNothing(h),
      named: h.logs.filter(
        (l) => l.includes("supervisor-decide") && l.includes("no instructions root")
      ).length,
    }),
    standing: { ...refused, named: 1 },
  },
  {
    name: "an answer in the wrong shape → silent, and says so once",
    over: { answer: () => ({ [LIMIT_RESUME_DECISION]: { kind: "resume" } }) },
    drive: loggedThenSettled,
    observe: (h) => ({ nudges: h.nudges.length, saidOnce: saidOnce(h) }),
    standing: { nudges: 0, saidOnce: 1 },
  },
  {
    name: "a nudge verdict whose text is blank is refused rather than delivered",
    over: { answer: () => nudgeAnswer("   \n  ") },
    drive: loggedThenSettled,
    observe: (h) => ({ nudges: h.nudges.length }),
    standing: { nudges: 0 },
  },
  ...([
    ["zero", 0],
    ["negative", -1_000],
  ] as const).map(([what, floorMs]) => ({
    name: `a nudge verdict whose floor is ${what} is refused rather than delivered`,
    over: { answer: () => nudgeAnswer(ANSWERED_NUDGE, floorMs) },
    drive: loggedThenSettled,
    observe: (h: Harness) => ({ ...sentNothing(h), saidOnce: saidOnce(h) }),
    standing: { ...refused, saidOnce: 1 },
  })),
  {
    name: "a nudge verdict carrying no floor at all is refused, since this side holds none",
    over: {
      answer: () => ({
        [LIMIT_RESUME_DECISION]: { kind: "nudge", reason: "no floor", nudge: ANSWERED_NUDGE },
      }),
    },
    drive: loggedThenSettled,
    observe: sentNothing,
    standing: refused,
  },
  {
    name: "a verdict that is not a nudge injects nothing and never consults the floor",
    over: { answer: waitAnswer },
    drive: askedThenSettled,
    observe: sentNothing,
    standing: refused,
  },
]
