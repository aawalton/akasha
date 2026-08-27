
import { expect } from "bun:test"
import type { ReviveVerifySignal } from "../lib/decide-revive-verify-signal.ts"
import type { CommsInput, CommsRule, OnDemandAgentSpec } from "../lib/decide-wake-match.ts"
import type { RecipientResolverAgentRow, RecipientResolverTickDeps } from "../lib/recipient-resolver-tick-deps.ts"
import { decided, hold } from "../lib/digest-harness.ts"

const wakeRule = (senderMatch: string, contentRegex?: string): CommsRule => ({
  id: "w1",
  senderMatch,
  contentRegex,
  target: "x",
  status: "LIVE",
})

export { wakeRule }

export const ALAN_ROUTE = "alan"

export const spec = (name: string, wakeSources: readonly CommsRule[]): OnDemandAgentSpec => ({
  name,
  wakeSources,
  stateAuthority: [{ kind: "pages-rows", detail: "agent" }],
  resumePolicy: { kind: "fresh" },
  owner: "general",
})

export type HarnessRow = { id: string }

function normalizeRow(row: HarnessRow | null | undefined): RecipientResolverAgentRow | null {
  return row == null ? null : { id: row.id }
}

export const NEVER_SETTLES = (): Promise<void> => new Promise<void>(() => {})

export interface Setup {
  readonly specs: readonly OnDemandAgentSpec[]
  readonly rows: Readonly<Record<string, HarnessRow | null>>
  readonly inbound: Readonly<Record<string, readonly CommsInput[]>>
  readonly seatPresent?: Readonly<Record<string, boolean>>
  readonly reviveSignal?: ReviveVerifySignal
  readonly reviveImpl?: (id: string) => Promise<void>
  readonly resolveImpl?: (name: string) => Promise<RecipientResolverAgentRow | null>
  readonly perSpecTimeoutMs?: number
  readonly signal?: AbortSignal
}

export interface Observed {
  readonly reviveCalls: readonly string[]
  readonly reviveBootPrompts: readonly (string | null)[]
  readonly inboundReads: readonly { id: string }[]
  readonly notified: readonly (readonly string[])[]
}

export function harness(setup: Setup): {
  deps: RecipientResolverTickDeps
  observed: () => Observed
} {
  const reviveCalls: string[] = []
  const reviveBootPrompts: (string | null)[] = []
  const inboundReads: { id: string }[] = []
  const notified: string[][] = []

  const deps: RecipientResolverTickDeps = {
    specs: setup.specs,
    resolveAgent: setup.resolveImpl ?? (async (name) => normalizeRow(setup.rows[name])),
    readInbound: async (id) => {
      inboundReads.push({ id })
      return setup.inbound[id] ?? []
    },
    revive: async (id, bootPrompt) => {
      if (setup.reviveImpl !== undefined) await setup.reviveImpl(id)
      reviveCalls.push(id)
      reviveBootPrompts.push(bootPrompt ?? null)
      return setup.reviveSignal ?? "revived"
    },
    reportUnrevivable: async (name, agentId, tellSeat) => {
      notified.push([name, agentId, tellSeat ?? ALAN_ROUTE])
    },
    seatIsPresent: async (id) => setup.seatPresent?.[id] ?? false,
    perSpecTimeoutMs: setup.perSpecTimeoutMs,
    signal: setup.signal ?? new AbortController().signal,
  }

  return {
    deps,
    observed: () => ({
      reviveCalls,
      reviveBootPrompts,
      inboundReads,
      notified,
    }),
  }
}

export function projected(
  observed: Observed,
  standing: Record<string, unknown>
): Record<string, unknown> {
  const picked: Record<string, unknown> = {}
  for (const key of Object.keys(standing)) {
    picked[key] = (observed as unknown as Record<string, unknown>)[key]
  }
  return picked
}

export function holds(name: string, standing: Record<string, unknown>, observed: Observed): void {
  if (Object.keys(standing).length === 0) {
    throw new Error(`the standing side of '${name}' asserts nothing, so a match would prove nothing`)
  }
  const ported = decided("ported", { value: projected(observed, standing), notice: null })
  const verdict = hold(name, standing, ported)
  if (!verdict.matches) {
    throw new Error(
      `'${name}': the port answered ${JSON.stringify(ported)}, the code repository's suite asserts ${JSON.stringify(standing)}`
    )
  }
  expect(verdict.matches).toBe(true)
}
