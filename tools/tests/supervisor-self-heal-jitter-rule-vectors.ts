
export interface Refusal {
  readonly expected: "number" | "object"
  readonly received?: string
  readonly path: readonly string[]
  readonly message: string
}

export interface ReadScenario {
  readonly name: string
  readonly answered: unknown
  readonly held?: number
  readonly refused?: Refusal
}

export interface Recording {
  readonly sent: string
  readonly value: number
  readonly notice: string | null
  readonly logged: readonly string[]
}

export interface AskScenario {
  readonly name: string
  readonly randFloat: number
  readonly rawMaxJitterMs: string | undefined
  readonly answer: { readonly resolve: unknown } | { readonly reject: unknown }
  readonly sent: string
  readonly refused?: Refusal
  readonly rejected?: string
  readonly held?: number
}

export function standingRefusal(refusal: Refusal): string {
  const { expected, received, path, message } = refusal
  const issue = { expected, code: "invalid_type", ...(received === undefined ? {} : { received }), path, message }
  return JSON.stringify([issue], null, 2)
}

export function portedRefusal(refusal: Refusal): string {
  return `ShapeError: ${JSON.stringify([{ code: "invalid_type", path: refusal.path, message: refusal.message }], null, 2)}`
}

export function degraded(reason: string): Pick<Recording, "notice" | "logged"> {
  const notice = `supervisor-decide could not decide \`selfHealJitterRule\`: ${reason}`
  return { notice, logged: [`[local] ${notice} — acting on the safe answer instead`] }
}

const AT_DELAY = ["selfHealJitterRule", "reExecJitterMs"] as const
const AT_RULE = ["selfHealJitterRule"] as const
const AT_ROOT = [] as const

const NO_DELAY: Refusal = {
  expected: "number",
  path: AT_DELAY,
  message: "Invalid input: expected number, received undefined",
}

const NOT_AN_ANSWER: Refusal = {
  expected: "object",
  path: AT_ROOT,
  message: "Invalid input: expected object, received null",
}

export const READS: readonly ReadScenario[] = [
  {
    name: "a decided delay is read out from under the rule's key",
    answered: { selfHealJitterRule: { reExecJitterMs: 30_000 } },
    held: 30_000,
  },
  {
    name: "zero is a delay like any other and is not read as an absence",
    answered: { selfHealJitterRule: { reExecJitterMs: 0 } },
    held: 0,
  },
  {
    name: "a key the shape does not declare is stripped rather than refused",
    answered: { selfHealJitterRule: { reExecJitterMs: 5, maxJitterMs: 60_000 }, otherRule: { x: 1 } },
    held: 5,
  },
  {
    name: "a fractional delay is held, there being no integer check on the wire",
    answered: { selfHealJitterRule: { reExecJitterMs: 1.5 } },
    held: 1.5,
  },
  {
    name: "a negative delay is held, the floor being the rule's and not this shape's",
    answered: { selfHealJitterRule: { reExecJitterMs: -1 } },
    held: -1,
  },
  {
    name: "a missing `reExecJitterMs` is refused",
    answered: { selfHealJitterRule: {} },
    refused: NO_DELAY,
  },
  {
    name: "a delay that arrived as a string is refused rather than coerced",
    answered: { selfHealJitterRule: { reExecJitterMs: "30000" } },
    refused: {
      expected: "number",
      path: AT_DELAY,
      message: "Invalid input: expected number, received string",
    },
  },
  {
    name: "NaN is refused, a delay of it being a timer that never fires",
    answered: { selfHealJitterRule: { reExecJitterMs: Number.NaN } },
    refused: {
      expected: "number",
      received: "NaN",
      path: AT_DELAY,
      message: "Invalid input: expected number, received NaN",
    },
  },
  {
    name: "Infinity is refused, and its message names only `number` on both sides",
    answered: { selfHealJitterRule: { reExecJitterMs: Number.POSITIVE_INFINITY } },
    refused: {
      expected: "number",
      received: "Infinity",
      path: AT_DELAY,
      message: "Invalid input: expected number, received number",
    },
  },
  {
    name: "a null delay is refused rather than read as zero",
    answered: { selfHealJitterRule: { reExecJitterMs: null } },
    refused: {
      expected: "number",
      path: AT_DELAY,
      message: "Invalid input: expected number, received null",
    },
  },
  {
    name: "the rule's key holding the delay bare, without its own object, is refused",
    answered: { selfHealJitterRule: 30_000 },
    refused: {
      expected: "object",
      path: AT_RULE,
      message: "Invalid input: expected object, received number",
    },
  },
  {
    name: "an answer carrying some other rule's verdict is refused rather than searched",
    answered: { someOtherRule: { reExecJitterMs: 1 } },
    refused: {
      expected: "object",
      path: AT_RULE,
      message: "Invalid input: expected object, received undefined",
    },
  },
  {
    name: "a null answer is refused",
    answered: null,
    refused: NOT_AN_ANSWER,
  },
  {
    name: "an answer that is not an object at all is refused",
    answered: "30000",
    refused: {
      expected: "object",
      path: AT_ROOT,
      message: "Invalid input: expected object, received string",
    },
  },
]

export const ASKS: readonly AskScenario[] = [
  {
    name: "a draw and an unset override cross, and the decided delay comes back",
    randFloat: 0.5,
    rawMaxJitterMs: undefined,
    answer: { resolve: { selfHealJitterRule: { reExecJitterMs: 30_000 } } },
    sent: '{"selfHealJitterRule":{"reExecJitterMs":{"randFloat":0.5,"rawMaxJitterMs":null}}}',
    held: 30_000,
  },
  {
    name: "an unset override crosses as null, `undefined` having no spelling in JSON",
    randFloat: 0,
    rawMaxJitterMs: undefined,
    answer: { resolve: { selfHealJitterRule: { reExecJitterMs: 0 } } },
    sent: '{"selfHealJitterRule":{"reExecJitterMs":{"randFloat":0,"rawMaxJitterMs":null}}}',
    held: 0,
  },
  {
    name: "a set override crosses raw and unparsed, the window being resolved by the command",
    randFloat: 0.25,
    rawMaxJitterMs: "1000",
    answer: { resolve: { selfHealJitterRule: { reExecJitterMs: 250 } } },
    sent: '{"selfHealJitterRule":{"reExecJitterMs":{"randFloat":0.25,"rawMaxJitterMs":"1000"}}}',
    held: 250,
  },
  {
    name: "an empty override crosses as the empty string and not as unset",
    randFloat: 0.9,
    rawMaxJitterMs: "",
    answer: { resolve: { selfHealJitterRule: { reExecJitterMs: 54_000 } } },
    sent: '{"selfHealJitterRule":{"reExecJitterMs":{"randFloat":0.9,"rawMaxJitterMs":""}}}',
    held: 54_000,
  },
  {
    name: "a malformed override still crosses raw, this side judging none of it",
    randFloat: 0.5,
    rawMaxJitterMs: "not-a-number",
    answer: { resolve: { selfHealJitterRule: { reExecJitterMs: 30_000 } } },
    sent: '{"selfHealJitterRule":{"reExecJitterMs":{"randFloat":0.5,"rawMaxJitterMs":"not-a-number"}}}',
    held: 30_000,
  },
  {
    name: "a draw of 1 crosses as itself rather than being clamped on this side",
    randFloat: 1,
    rawMaxJitterMs: "60000",
    answer: { resolve: { selfHealJitterRule: { reExecJitterMs: 60_000 } } },
    sent: '{"selfHealJitterRule":{"reExecJitterMs":{"randFloat":1,"rawMaxJitterMs":"60000"}}}',
    held: 60_000,
  },
  {
    name: "an unreachable command hands back zero, which is a re-exec that was not staggered",
    randFloat: 0.5,
    rawMaxJitterMs: undefined,
    answer: { reject: new Error("no instructions tree here") },
    sent: '{"selfHealJitterRule":{"reExecJitterMs":{"randFloat":0.5,"rawMaxJitterMs":null}}}',
    rejected: "Error: no instructions tree here",
  },
  {
    name: "a refusal that is not an Error still names itself in the notice",
    randFloat: 0.5,
    rawMaxJitterMs: undefined,
    answer: { reject: "supervisor-decide.ts exited 1: unasked payload" },
    sent: '{"selfHealJitterRule":{"reExecJitterMs":{"randFloat":0.5,"rawMaxJitterMs":null}}}',
    rejected: "supervisor-decide.ts exited 1: unasked payload",
  },
  {
    name: "an answer the narrow cannot understand degrades exactly as an unreached command does",
    randFloat: 0.5,
    rawMaxJitterMs: undefined,
    answer: { resolve: { selfHealJitterRule: {} } },
    sent: '{"selfHealJitterRule":{"reExecJitterMs":{"randFloat":0.5,"rawMaxJitterMs":null}}}',
    refused: NO_DELAY,
  },
  {
    name: "an answer of the wrong shape entirely degrades rather than throwing",
    randFloat: 0.5,
    rawMaxJitterMs: undefined,
    answer: { resolve: null },
    sent: '{"selfHealJitterRule":{"reExecJitterMs":{"randFloat":0.5,"rawMaxJitterMs":null}}}',
    refused: NOT_AN_ANSWER,
  },
]
