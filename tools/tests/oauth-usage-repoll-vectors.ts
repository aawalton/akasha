
import type { Transport } from "./oauth-usage-vectors.ts"
import { FIXED_NOW, GOOD_BODY } from "./oauth-usage-vectors.ts"

export interface RepollStep {
  readonly label: string
  readonly now: number
  readonly account: string
  readonly token: "cred" | "null" | "throws"
  readonly transport: Transport
  readonly logPrefix: string | undefined
  readonly writeThrows: boolean
}

export interface RepollScenario {
  readonly label: string
  readonly steps: readonly RepollStep[]
}

const GOOD: Transport = { kind: "body", status: 200, json: GOOD_BODY }
const DOWN: Transport = { kind: "throws" }

function step(over: Partial<RepollStep> & { label: string; now: number }): RepollStep {
  return {
    account: "acct",
    token: "cred",
    transport: GOOD,
    logPrefix: undefined,
    writeThrows: false,
    ...over,
  }
}

export function repollScenarios(): RepollScenario[] {
  const t = FIXED_NOW
  const min = 60_000
  const breaker = 300_000
  return [
    {
      label: "guard|null-cred",
      steps: [step({ label: "null", now: t, token: "null" })],
    },
    {
      label: "guard|throwing-getter",
      steps: [step({ label: "throws", now: t, token: "throws" })],
    },
    {
      label: "guard|failing-fetch",
      steps: [step({ label: "down", now: t, transport: DOWN })],
    },
    {
      label: "guard|malformed-body",
      steps: [step({ label: "malformed", now: t, transport: { kind: "body", status: 200, json: { five_hour: { resets_at: null } } } })],
    },
    {
      label: "guard|failing-write",
      steps: [step({ label: "write-throws", now: t, writeThrows: true })],
    },
    {
      label: "happy|fetch-then-push",
      steps: [step({ label: "ok", now: t })],
    },
    {
      label: "gate|burst",
      steps: Array.from({ length: 6 }, (_, i) => step({ label: `burst-${i}`, now: t + i * 1000 })),
    },
    {
      label: "gate|interval-boundary",
      steps: [
        step({ label: "first", now: t }),
        step({ label: "at-59999", now: t + min - 1 }),
        step({ label: "at-60000", now: t + min }),
        step({ label: "at-60001", now: t + min + 1 }),
      ],
    },
    {
      label: "gate|per-account",
      steps: [
        step({ label: "a", now: t, account: "acct-a" }),
        step({ label: "b", now: t, account: "acct-b" }),
        step({ label: "a-again", now: t + 1, account: "acct-a" }),
      ],
    },
    {
      label: "breaker|usage-429",
      steps: [
        step({ label: "429", now: t, transport: { kind: "body", status: 429, json: {} } }),
        step({ label: "inside-breaker", now: t + min + 1 }),
        step({ label: "one-ms-inside-expiry", now: t + breaker }),
        step({ label: "at-expiry", now: t + breaker + 1 }),
        step({ label: "past-expiry", now: t + breaker + 2 }),
      ],
    },
    {
      label: "breaker|not-500",
      steps: [
        step({ label: "500", now: t, transport: { kind: "body", status: 500, json: {} } }),
        step({ label: "after-interval", now: t + min + 1 }),
      ],
    },
    {
      label: "prefix|custom",
      steps: [step({ label: "proxy", now: t, transport: DOWN, logPrefix: "[proxy]" })],
    },
    {
      label: "prefix|blank",
      steps: [step({ label: "blank", now: t, transport: DOWN, logPrefix: "" })],
    },
  ]
}
