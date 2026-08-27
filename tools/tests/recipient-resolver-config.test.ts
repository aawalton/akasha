
import { afterAll, beforeEach, describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import {
  RECIPIENT_RESOLVER_ENV,
  resolveRecipientResolverConfig,
  recipientResolverConfigBanner,
} from "../lib/recipient-resolver-config.ts"

type EnvVector = Partial<Record<keyof typeof RECIPIENT_RESOLVER_ENV, string>>

interface Answer {
  readonly tickMs: number
  readonly reviveTimeoutMs: number
  readonly dryRun: boolean
  readonly banner: string
}

interface Vector {
  readonly name: string
  readonly env: EnvVector
  readonly standing: Answer
}

const DEFAULTS: Answer = {
  tickMs: 15_000,
  reviveTimeoutMs: 120_000,
  dryRun: false,
  banner: "recipient-resolver: tick=15s revive-timeout=120s dry-run=false",
}

const DRY_RUN_ON: Answer = {
  ...DEFAULTS,
  dryRun: true,
  banner: "recipient-resolver: tick=15s revive-timeout=120s dry-run=true",
}

function tickOf(sec: number): Answer {
  return {
    ...DEFAULTS,
    tickMs: sec * 1000,
    banner: `recipient-resolver: tick=${sec}s revive-timeout=120s dry-run=false`,
  }
}

const VECTORS: readonly Vector[] = [
  { name: "every var absent resolves to the defaults", env: {}, standing: DEFAULTS },
  {
    name: "every var set to a plain valid value",
    env: { tickSec: "5", reviveTimeoutSec: "30", dryRun: "1" },
    standing: {
      tickMs: 5_000,
      reviveTimeoutMs: 30_000,
      dryRun: true,
      banner: "recipient-resolver: tick=5s revive-timeout=30s dry-run=true",
    },
  },

  { name: "dry-run `true`", env: { dryRun: "true" }, standing: DRY_RUN_ON },
  { name: "dry-run `yes`", env: { dryRun: "yes" }, standing: DRY_RUN_ON },
  { name: "dry-run `on`", env: { dryRun: "on" }, standing: DRY_RUN_ON },
  { name: "dry-run `TRUE` — folded", env: { dryRun: "TRUE" }, standing: DRY_RUN_ON },
  { name: "dry-run `On` — folded", env: { dryRun: "On" }, standing: DRY_RUN_ON },
  { name: "dry-run padded — trimmed", env: { dryRun: "  on  " }, standing: DRY_RUN_ON },

  { name: "dry-run `off` is false", env: { dryRun: "off" }, standing: DEFAULTS },
  { name: "dry-run `0` is false", env: { dryRun: "0" }, standing: DEFAULTS },
  { name: "dry-run `false` is false", env: { dryRun: "false" }, standing: DEFAULTS },
  { name: "dry-run an unrecognised word is false", env: { dryRun: "maybe" }, standing: DEFAULTS },
  { name: "dry-run empty is false", env: { dryRun: "" }, standing: DEFAULTS },

  { name: "tick non-numeric falls back", env: { tickSec: "abc" }, standing: DEFAULTS },
  { name: "tick empty falls back", env: { tickSec: "" }, standing: DEFAULTS },
  { name: "tick whitespace-only falls back", env: { tickSec: "   " }, standing: DEFAULTS },
  { name: "tick zero falls back — refused by positive, not by the parse", env: { tickSec: "0" }, standing: DEFAULTS },
  { name: "tick negative falls back", env: { tickSec: "-5" }, standing: DEFAULTS },
  { name: "tick `Infinity` falls back", env: { tickSec: "Infinity" }, standing: DEFAULTS },
  { name: "tick `NaN` falls back", env: { tickSec: "NaN" }, standing: DEFAULTS },
  { name: "tick with a comma falls back", env: { tickSec: "1,2" }, standing: DEFAULTS },

  { name: "tick in exponent notation is taken", env: { tickSec: "1e2" }, standing: tickOf(100) },
  { name: "tick padded with whitespace is taken", env: { tickSec: " 12 " }, standing: tickOf(12) },
  { name: "tick as a hex literal is taken", env: { tickSec: "0x10" }, standing: tickOf(16) },

  { name: "tick fractional", env: { tickSec: "12.5" }, standing: tickOf(12.5) },
  { name: "tick sub-second renders a fraction in the banner", env: { tickSec: "0.5" }, standing: tickOf(0.5) },

  {
    name: "a malformed revive-timeout falls back alone",
    env: { reviveTimeoutSec: "nope", tickSec: "7" },
    standing: tickOf(7),
  },
  {
    name: "every numeric var malformed at once resolves to the defaults",
    env: { tickSec: "x", reviveTimeoutSec: "y" },
    standing: DEFAULTS,
  },
]

const SAVED = Object.fromEntries(
  Object.values(RECIPIENT_RESOLVER_ENV).map((name) => [name, process.env[name]])
)

function clearAll(): void {
  for (const name of Object.values(RECIPIENT_RESOLVER_ENV)) delete process.env[name]
}

beforeEach(clearAll)

afterAll(() => {
  clearAll()
  for (const [name, held] of Object.entries(SAVED)) {
    if (held !== undefined) process.env[name] = held
  }
})

function answer(env: EnvVector): Answer {
  for (const [field, raw] of Object.entries(env)) {
    process.env[RECIPIENT_RESOLVER_ENV[field as keyof typeof RECIPIENT_RESOLVER_ENV]] = raw
  }
  const config = resolveRecipientResolverConfig()
  return {
    tickMs: config.tickMs,
    reviveTimeoutMs: config.reviveTimeoutMs,
    dryRun: config.dryRun,
    banner: recipientResolverConfigBanner(config),
  }
}

describe("the recipient-resolver config, held against what the code repository answered", () => {
  for (const one of VECTORS) {
    it(one.name, () => {
      const answered = decided("ported", { value: answer(one.env), notice: null })
      const verdict = hold(one.name, one.standing, answered)
      expect(verdict.matches).toBe(true)
    })
  }

  it("compares every field of the answer in every vector, so none passes on a partial one", () => {
    const whole = Object.keys(answer({})).sort()
    expect(whole.length).toBeGreaterThan(0)
    for (const one of VECTORS) {
      expect(Object.keys(one.standing).sort()).toEqual(whole)
    }
  })

  it("the digest tells two answers apart, so a green above is a match rather than a blind spot", () => {
    const held = answer({ tickSec: "5" })
    expect(hold("same", held, held).matches).toBe(true)
    expect(hold("one field apart", held, { ...held, tickMs: 6_000 }).matches).toBe(false)
    expect(hold("banner apart", held, { ...held, banner: "recipient-resolver: tick=6s" }).matches).toBe(false)
    const missing: Record<string, unknown> = { ...held }
    delete missing.dryRun
    expect(hold("a field absent", held, missing).matches).toBe(false)
    expect(hold("a field undefined", held, { ...held, dryRun: undefined }).matches).toBe(false)
  })
})
