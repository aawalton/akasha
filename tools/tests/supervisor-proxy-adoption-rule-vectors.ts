
export interface ReadVector {
  readonly name: string
  readonly payload: unknown
  readonly standing: Record<string, unknown>
}

export interface AskVector {
  readonly name: string
  readonly input: { readonly hasLiveProxy: boolean; readonly versionMatches: boolean; readonly healthy: boolean }
  readonly standing: Record<string, unknown>
}

export const RULE = "proxyAdoptionRule"

const verdict = (decision: unknown): unknown => ({ [RULE]: { decideProxyAdoption: decision } })

const refusedWord = (path: readonly string[]): Record<string, unknown> => ({
  threw: true,
  code: "invalid_value",
  path,
  message: 'Invalid option: expected one of "adopt"|"adopt-with-drift"|"spawn-fresh"',
})

const refusedType = (path: readonly string[], received: string): Record<string, unknown> => ({
  threw: true,
  code: "invalid_type",
  path,
  message: `Invalid input: expected object, received ${received}`,
})

const AT_DECISION = [RULE, "decideProxyAdoption"] as const
const AT_RULE = [RULE] as const
const AT_ROOT = [] as const

export const READS: readonly ReadVector[] = [
  { name: "adopt", payload: verdict("adopt"), standing: { threw: false, value: "adopt" } },
  {
    name: "adopt-with-drift",
    payload: verdict("adopt-with-drift"),
    standing: { threw: false, value: "adopt-with-drift" },
  },
  {
    name: "spawn-fresh",
    payload: verdict("spawn-fresh"),
    standing: { threw: false, value: "spawn-fresh" },
  },
  {
    name: "a surplus key inside the verdict is stripped rather than refused",
    payload: { [RULE]: { decideProxyAdoption: "adopt", why: "x" } },
    standing: { threw: false, value: "adopt" },
  },
  {
    name: "another rule's answer beside this one is stripped rather than refused",
    payload: { ...(verdict("adopt") as object), otherRule: { a: 1 } },
    standing: { threw: false, value: "adopt" },
  },
  { name: "an unknown decision word", payload: verdict("adopt-fresh"), standing: refusedWord(AT_DECISION) },
  { name: "an empty decision word", payload: verdict(""), standing: refusedWord(AT_DECISION) },
  { name: "the decision missing", payload: { [RULE]: {} }, standing: refusedWord(AT_DECISION) },
  { name: "the decision null", payload: verdict(null), standing: refusedWord(AT_DECISION) },
  { name: "the decision a number", payload: verdict(3), standing: refusedWord(AT_DECISION) },
  {
    name: "the right word in the wrong case",
    payload: verdict("Adopt"),
    standing: refusedWord(AT_DECISION),
  },
  {
    name: "the verdict a bare string rather than an object",
    payload: { [RULE]: "adopt" },
    standing: refusedType(AT_RULE, "string"),
  },
  { name: "the verdict null", payload: { [RULE]: null }, standing: refusedType(AT_RULE, "null") },
  {
    name: "the rule's key missing, another rule answered instead",
    payload: { otherRule: { decideProxyAdoption: "adopt" } },
    standing: refusedType(AT_RULE, "undefined"),
  },
  {
    name: "the rule's key misspelled",
    payload: { proxyadoptionrule: { decideProxyAdoption: "adopt" } },
    standing: refusedType(AT_RULE, "undefined"),
  },
  { name: "the payload null", payload: null, standing: refusedType(AT_ROOT, "null") },
  { name: "the payload undefined", payload: undefined, standing: refusedType(AT_ROOT, "undefined") },
  { name: "the payload a bare string", payload: "adopt", standing: refusedType(AT_ROOT, "string") },
  { name: "the payload a number", payload: 7, standing: refusedType(AT_ROOT, "number") },
  {
    name: "the payload an array carrying the verdict",
    payload: [verdict("adopt")],
    standing: refusedType(AT_ROOT, "array"),
  },
  { name: "the payload empty", payload: {}, standing: refusedType(AT_RULE, "undefined") },
  {
    name: "the verdict sent without its rule key",
    payload: { decideProxyAdoption: "adopt" },
    standing: refusedType(AT_RULE, "undefined"),
  },
]

export const ASKS: readonly AskVector[] = [
  {
    name: "a live proxy whose version matches",
    input: { hasLiveProxy: true, versionMatches: true, healthy: true },
    standing: {
      sent: { [RULE]: { decideProxyAdoption: { hasLiveProxy: true, versionMatches: true, healthy: true } } },
      value: "adopt-with-drift",
      noticeIsNull: true,
    },
  },
  {
    name: "a live proxy whose version matches, unhealthy — the branch that ignores health",
    input: { hasLiveProxy: true, versionMatches: true, healthy: false },
    standing: {
      sent: { [RULE]: { decideProxyAdoption: { hasLiveProxy: true, versionMatches: true, healthy: false } } },
      value: "adopt-with-drift",
      noticeIsNull: true,
    },
  },
  {
    name: "a live proxy drifted but healthy",
    input: { hasLiveProxy: true, versionMatches: false, healthy: true },
    standing: {
      sent: { [RULE]: { decideProxyAdoption: { hasLiveProxy: true, versionMatches: false, healthy: true } } },
      value: "adopt-with-drift",
      noticeIsNull: true,
    },
  },
  {
    name: "a live proxy drifted and wedged",
    input: { hasLiveProxy: true, versionMatches: false, healthy: false },
    standing: {
      sent: { [RULE]: { decideProxyAdoption: { hasLiveProxy: true, versionMatches: false, healthy: false } } },
      value: "adopt-with-drift",
      noticeIsNull: true,
    },
  },
  {
    name: "no live proxy",
    input: { hasLiveProxy: false, versionMatches: false, healthy: false },
    standing: {
      sent: { [RULE]: { decideProxyAdoption: { hasLiveProxy: false, versionMatches: false, healthy: false } } },
      value: "adopt-with-drift",
      noticeIsNull: true,
    },
  },
  {
    name: "no live proxy, with a stale version match beside it",
    input: { hasLiveProxy: false, versionMatches: true, healthy: true },
    standing: {
      sent: { [RULE]: { decideProxyAdoption: { hasLiveProxy: false, versionMatches: true, healthy: true } } },
      value: "adopt-with-drift",
      noticeIsNull: true,
    },
  },
]

export const DEGRADES: readonly { readonly name: string; readonly standing: Record<string, unknown> }[] = [
  {
    name: "the call could not be made at all",
    standing: { value: "adopt", noticeIsNull: false },
  },
  {
    name: "the answer arrived and could not be read",
    standing: { value: "adopt", noticeIsNull: false },
  },
]
