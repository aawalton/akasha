import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperComparisonOp } from "./temper-comparison-op.ts"

const OP_LTE = "00000000-0000-0000-0000-00000000c001"
const OP_LT = "00000000-0000-0000-0000-00000000c002"
const OP_GTE = "00000000-0000-0000-0000-00000000c003"
const OP_GT = "00000000-0000-0000-0000-00000000c004"
const OP_EQ = "00000000-0000-0000-0000-00000000c005"
const OP_NEQ = "00000000-0000-0000-0000-00000000c006"

const lte = Page({
  id: OP_LTE,
  title: "≤",
  key: "<=",
})

const lt = Page({
  id: OP_LT,
  title: "<",
  key: "<",
})

const gte = Page({
  id: OP_GTE,
  title: "≥",
  key: ">=",
})

const gt = Page({
  id: OP_GT,
  title: ">",
  key: ">",
})

const eq = Page({
  id: OP_EQ,
  title: "=",
  key: "=",
})

const neq = Page({
  id: OP_NEQ,
  title: "≠",
  key: "!=",
})

describe("generateTemperComparisonOp", () => {
  test("emits ops in legacy authoring precedence regardless of input order", () => {
    const out = generateTemperComparisonOp([neq, eq, gt, gte, lt, lte])
    const idxLte = out.indexOf('"<="')
    const idxLt = out.indexOf('"<":')
    const idxGte = out.indexOf('">="')
    const idxGt = out.indexOf('">":')
    const idxEq = out.indexOf('"=":')
    const idxNeq = out.indexOf('"!="')
    expect(idxLte).toBeGreaterThan(-1)
    expect(idxLt).toBeGreaterThan(idxLte)
    expect(idxGte).toBeGreaterThan(idxLt)
    expect(idxGt).toBeGreaterThan(idxGte)
    expect(idxEq).toBeGreaterThan(idxGt)
    expect(idxNeq).toBeGreaterThan(idxEq)
  })

  test("emits each entry as a record value matching the consumer shape", () => {
    const out = generateTemperComparisonOp([lte])
    expect(out).toContain('"<=": { id: "<=", name: "≤" },')
  })

  test("emits a satisfies clause against ComparisonOpTemplate", () => {
    const out = generateTemperComparisonOp([lte])
    expect(out).toContain("} as const satisfies Record<string, ComparisonOpTemplate>")
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c0ff",
      title: null,
      key: "<=",
    })
    expect(() => generateTemperComparisonOp([broken])).toThrow(/null title/)
  })

  test("throws when key is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c0fe",
      title: "≤",
    })
    expect(() => generateTemperComparisonOp([broken])).toThrow()
  })
})
