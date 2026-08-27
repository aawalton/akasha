import { describe, test } from "bun:test"
import fc from "fast-check"
import { deepForward } from "./completion-merge-forward"

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function dominatesForward(merged: unknown, base: unknown): boolean {
  if (base === undefined) return true
  if (typeof base === "number") {
    return typeof merged === "number" && merged >= base
  }
  if (typeof base === "boolean") {
    return typeof merged === "boolean" && (!base || merged)
  }
  if (Array.isArray(base)) {
    if (!Array.isArray(merged)) return false
    const present = new Set<unknown>(merged)
    return base.every((entry) => present.has(entry))
  }
  if (isPlainObject(base)) {
    if (!isPlainObject(merged)) return false
    return Object.keys(base).every((key) => dominatesForward(merged[key], base[key]))
  }
  return true
}

const numberArb = fc.integer({ min: 0, max: 1000 })
const numberArrayArb = fc.array(fc.integer({ min: 0, max: 50 }), { maxLength: 8 })

const { pair: pairArb } = fc.letrec<{ pair: readonly [unknown, unknown] }>((tie) => ({
  pair: fc
    .oneof(
      { depthSize: "small", withCrossShrink: true },
      fc.tuple(numberArb, numberArb),
      fc.tuple(fc.boolean(), fc.boolean()),
      fc.tuple(numberArrayArb, numberArrayArb),
      fc
        .dictionary(
          fc.constantFrom("a", "b", "c", "d", "e"),
          fc.tuple(tie("pair"), fc.constantFrom("both", "existing", "incoming")),
          { maxKeys: 5 }
        )
        .map((dict): readonly [unknown, unknown] => {
          const existing: Record<string, unknown> = {}
          const incoming: Record<string, unknown> = {}
          for (const [key, [[existingValue, incomingValue], where]] of Object.entries(dict)) {
            if (where === "both" || where === "existing") existing[key] = existingValue
            if (where === "both" || where === "incoming") incoming[key] = incomingValue
          }
          return [existing, incoming]
        })
    )
    .map((value): readonly [unknown, unknown] => value),
}))

describe("deepForward monotonicity", () => {
  test("merged forward-dominates both sides (never goes backwards)", () => {
    fc.assert(
      fc.property(pairArb, ([existing, incoming]) => {
        const merged = deepForward(existing, incoming)
        return dominatesForward(merged, existing) && dominatesForward(merged, incoming)
      }),
      { numRuns: 3000 }
    )
  })

  test("an undefined incoming preserves existing exactly", () => {
    fc.assert(
      fc.property(pairArb, ([existing]) => {
        return dominatesForward(deepForward(existing, undefined), existing)
      }),
      { numRuns: 1000 }
    )
  })

  test("merging is commutative under forward-dominance", () => {
    fc.assert(
      fc.property(pairArb, ([existing, incoming]) => {
        const ab = deepForward(existing, incoming)
        const ba = deepForward(incoming, existing)
        return dominatesForward(ab, ba) && dominatesForward(ba, ab)
      }),
      { numRuns: 1000 }
    )
  })
})
