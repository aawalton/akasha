
const ALGORITHM = "sha256"

export class DegradeError extends Error {}

export class UncarriedError extends Error {}

export interface Answer<T> {
  readonly value: T
  readonly notice: string | null
}

export function decided<T>(arm: string, answer: Answer<T>): T {
  if (answer.notice !== null) {
    throw new DegradeError(`the ${arm} arm degraded rather than deciding: ${answer.notice}`)
  }
  return answer.value
}

function isPlain(value: object): boolean {
  const proto = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}

export function canonical(value: unknown): string {
  if (value === null) return "null"
  if (value === undefined) return "undefined"

  switch (typeof value) {
    case "boolean":
      return value ? "true" : "false"
    case "string":
      return JSON.stringify(value)
    case "number":
      if (!Number.isFinite(value)) {
        throw new UncarriedError(`\`${String(value)}\` crosses a wire as \`null\`, which is another answer`)
      }
      return JSON.stringify(value)
    case "object":
      break
    default:
      throw new UncarriedError(`a ${typeof value} is not something a decision can answer with`)
  }

  const object = value as object
  if (Array.isArray(object)) {
    return `[${object.map((one) => canonical(one)).join(",")}]`
  }
  if (!isPlain(object)) {
    throw new UncarriedError(
      `a ${object.constructor?.name ?? "non-plain object"} spells as \`{}\` here, so two different ones would read as one answer — hand it across as fields`
    )
  }

  const fields = Object.entries(object as Record<string, unknown>)
    .filter(([, held]) => held !== undefined)
    .sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
  return `{${fields.map(([key, held]) => `${JSON.stringify(key)}:${canonical(held)}`).join(",")}}`
}

export function digestOf(value: unknown): string {
  const hasher = new Bun.CryptoHasher(ALGORITHM)
  hasher.update(canonical(value))
  return hasher.digest("hex")
}

export interface Verdict {
  readonly decision: string
  readonly standing: string
  readonly ported: string
  readonly matches: boolean
}

export function hold(decision: string, standing: unknown, ported: unknown): Verdict {
  const left = digestOf(standing)
  const right = digestOf(ported)
  return { decision, standing: left, ported: right, matches: left === right }
}
