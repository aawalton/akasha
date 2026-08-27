
import { describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import {
  decideIdentityPush,
  describeFailedIdentityWrite,
} from "../lib/oauth-identity-core.ts"

const AOW = "849f42fd-b12a-4cb1-ad94-4d53103160a1"
const TEMPERESO = "80a42386-26f2-4457-9581-639fc99fac18"

function identity(accountUuid: string, email: string | null = null) {
  return { accountUuid, email }
}

function projected(observed: Record<string, unknown>, shape: Record<string, unknown>): Record<string, unknown> {
  const picked: Record<string, unknown> = {}
  for (const key of Object.keys(shape)) picked[key] = observed[key]
  return picked
}

interface PushScenario {
  readonly name: string
  readonly args: Parameters<typeof decideIdentityPush>[0]
  readonly mentions?: readonly string[]
  readonly standing: Record<string, unknown>
}

const ROW = /\brows?\b/i

const PUSH_SCENARIOS: readonly PushScenario[] = [
  {
    name: "an unpinned page → first pin (trust-on-first-use)",
    args: { account: "aow", identity: identity(AOW), pinnedUuidByAccount: new Map(), allowRebind: false },
    standing: { decision: { kind: "pin", accountUuid: AOW } },
  },
  {
    name: "a pinned page, same uuid → match",
    args: {
      account: "aow",
      identity: identity(AOW),
      pinnedUuidByAccount: new Map([["aow", AOW]]),
      allowRebind: false,
    },
    standing: { decision: { kind: "match" } },
  },
  {
    name: "a pinned page, different uuid, no override → REFUSE naming both uuids and the account",
    args: {
      account: "aow",
      identity: identity(TEMPERESO, "alan@tempereso.com"),
      pinnedUuidByAccount: new Map([["aow", AOW]]),
      allowRebind: false,
    },
    mentions: ["aow", AOW, TEMPERESO],
    standing: { kind: "refuse", mentioned: ["aow", AOW, TEMPERESO], saysRow: false },
  },
  {
    name: "a pinned page, different uuid, override → rebind carrying the previous uuid",
    args: {
      account: "aow",
      identity: identity(TEMPERESO),
      pinnedUuidByAccount: new Map([["aow", AOW]]),
      allowRebind: true,
    },
    standing: { decision: { kind: "rebind", accountUuid: TEMPERESO, previousUuid: AOW } },
  },
  {
    name: "an unpinned page whose credential belongs to another → REFUSE, never TOFU-pin a duplicate",
    args: {
      account: "aow",
      identity: identity(TEMPERESO, "alan@tempereso.com"),
      pinnedUuidByAccount: new Map([["tempereso", TEMPERESO]]),
      allowRebind: false,
    },
    mentions: ["tempereso", TEMPERESO],
    standing: { kind: "refuse", mentioned: ["tempereso", TEMPERESO], saysRow: false },
  },
  {
    name: "the collision outranks the rebind override — --rebind never merges two pages onto one account",
    args: {
      account: "aow",
      identity: identity(TEMPERESO),
      pinnedUuidByAccount: new Map([
        ["aow", AOW],
        ["tempereso", TEMPERESO],
      ]),
      allowRebind: true,
    },
    standing: { kind: "refuse" },
  },
  {
    name: "a page matching its own pin is never read as a collision with itself",
    args: {
      account: "tempereso",
      identity: identity(TEMPERESO),
      pinnedUuidByAccount: new Map([
        ["aow", AOW],
        ["tempereso", TEMPERESO],
      ]),
      allowRebind: false,
    },
    standing: { decision: { kind: "match" } },
  },
  {
    name: "no decision path ever carries token material",
    args: {
      account: "aow",
      identity: identity(TEMPERESO, "alan@tempereso.com"),
      pinnedUuidByAccount: new Map([["aow", AOW]]),
      allowRebind: false,
    },
    standing: { carriesTokenMaterial: false },
  },
]

function observePush(scenario: PushScenario): Record<string, unknown> {
  const decision = decideIdentityPush(scenario.args)
  const reason = decision.kind === "refuse" ? decision.reason : ""
  return {
    decision: { ...decision },
    kind: decision.kind,
    mentioned: (scenario.mentions ?? []).filter((needle) => reason.includes(needle)),
    saysRow: ROW.test(reason),
    carriesTokenMaterial: JSON.stringify(decision).includes("sk-ant"),
  }
}

describe("decideIdentityPush, held against what the code repository asserts", () => {
  for (const scenario of PUSH_SCENARIOS) {
    it(scenario.name, () => {
      const observed = decided("ported", { value: observePush(scenario), notice: null })
      const verdict = hold(scenario.name, scenario.standing, projected(observed, scenario.standing))
      expect(verdict.matches).toBe(true)
    })
  }
})

interface MessageScenario {
  readonly name: string
  readonly args: Parameters<typeof describeFailedIdentityWrite>[0]
  readonly mentions: readonly string[]
  readonly patterns: readonly RegExp[]
  readonly standing: Record<string, unknown>
}

const CREDENTIAL_KEPT = /still stands where it was issued/i
const BOOKKEEPING_GONE = /already off the page/i
const NOTHING_MOVED = /stopped before anything moved/i
const PIN_UNFINISHED = /the pin did not/i

const MESSAGE_SCENARIOS: readonly MessageScenario[] = [
  {
    name: "a first pin the page would not seal says the credential is still where it was issued",
    args: { account: "aow", previousUuid: null, at: "credential", why: "no `.sops.yaml` stands" },
    mentions: ["aow", "no `.sops.yaml` stands"],
    patterns: [CREDENTIAL_KEPT, BOOKKEEPING_GONE],
    standing: {
      mentioned: ["aow", "no `.sops.yaml` stands"],
      matched: ["still stands where it was issued"],
      saysRow: false,
    },
  },
  {
    name: "a rebind the page would not seal names the prior pin and says the bookkeeping is already gone",
    args: { account: "aow", previousUuid: "prev-uuid-1", at: "credential", why: "the commit failed" },
    mentions: ["aow", "prev-uuid-1", "the commit failed"],
    patterns: [CREDENTIAL_KEPT, BOOKKEEPING_GONE, NOTHING_MOVED],
    standing: {
      mentioned: ["aow", "prev-uuid-1", "the commit failed"],
      matched: ["still stands where it was issued", "already off the page"],
      saysRow: false,
    },
  },
  {
    name: "a rebind that failed while clearing says nothing moved at all",
    args: { account: "aow", previousUuid: "prev-uuid-1", at: "clear", why: "the page has no frontmatter" },
    mentions: ["aow", "prev-uuid-1", "the page has no frontmatter"],
    patterns: [NOTHING_MOVED, CREDENTIAL_KEPT],
    standing: {
      mentioned: ["aow", "prev-uuid-1", "the page has no frontmatter"],
      matched: ["stopped before anything moved"],
      saysRow: false,
    },
  },
  {
    name: "a credential that landed under no pin says exactly that, so nobody re-runs it as a lost push",
    args: { account: "aow", previousUuid: null, at: "pin", why: "the mark commit failed" },
    mentions: ["aow", "the mark commit failed"],
    patterns: [PIN_UNFINISHED, NOTHING_MOVED],
    standing: {
      mentioned: ["aow", "the mark commit failed"],
      matched: ["the pin did not"],
      saysRow: false,
    },
  },
]

function observeMessage(scenario: MessageScenario): Record<string, unknown> {
  const message = describeFailedIdentityWrite(scenario.args)
  return {
    mentioned: scenario.mentions.filter((needle) => message.includes(needle)),
    matched: scenario.patterns.filter((pattern) => pattern.test(message)).map((pattern) => pattern.source),
    saysRow: ROW.test(message),
  }
}

describe("describeFailedIdentityWrite, held against what the code repository asserts", () => {
  for (const scenario of MESSAGE_SCENARIOS) {
    it(scenario.name, () => {
      const observed = decided("ported", { value: observeMessage(scenario), notice: null })
      const verdict = hold(scenario.name, scenario.standing, projected(observed, scenario.standing))
      expect(verdict.matches).toBe(true)
    })
  }
})

describe("the arms above measure something", () => {
  it("every scenario compares at least one field", () => {
    for (const scenario of [...PUSH_SCENARIOS, ...MESSAGE_SCENARIOS]) {
      expect(Object.keys(scenario.standing).length).toBeGreaterThan(0)
    }
  })

  it("every projected list is driven from a non-empty set of needles", () => {
    for (const scenario of PUSH_SCENARIOS) {
      if ("mentioned" in scenario.standing) expect((scenario.mentions ?? []).length).toBeGreaterThan(0)
    }
    for (const scenario of MESSAGE_SCENARIOS) {
      expect(scenario.mentions.length).toBeGreaterThan(0)
      expect(scenario.patterns.length).toBeGreaterThan(0)
    }
  })

  it("every message arm offers a pattern that must not match as well as one that must", () => {
    for (const scenario of MESSAGE_SCENARIOS) {
      const matched = scenario.standing.matched as readonly string[]
      expect(matched.length).toBeLessThan(scenario.patterns.length)
    }
  })
})
