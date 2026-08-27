import { describe, expect, it } from "bun:test"
import {
  type Case,
  type Finding,
  type Run,
  defectsIn,
  heldOf,
  heldSame,
  judge,
  pose,
  read,
  render,
} from "../lib/formula-conformance.ts"

const AGREED: Case = {
  id: "agreed-one",
  category: "agreed",
  covers: "a case both implementations answer alike",
  expression: "a == b",
  values: { a: 1, b: 1 },
  ours: { kind: "value", held: "true" },
  code: { kind: "value", held: "true" },
}

const DIVIDED: Run["code"] = { kind: "error", code: "divide_by_zero", says: "Division by zero" }

function ran(ours: Run["ours"], code: Run["code"]): Run {
  return { ours, code }
}

function kinds(findings: readonly Finding[]): readonly string[] {
  return findings.map(function kindOf(one) {
    return one.kind
  })
}

describe("formula conformance — the substrate projection", () => {
  it("renders every scalar a file could hold as the text it would hold", () => {
    expect(heldOf(12)).toBe("12")
    expect(heldOf(1.5)).toBe("1.5")
    expect(heldOf("x")).toBe("x")
    expect(heldOf("")).toBe("")
    expect(heldOf(true)).toBe("true")
    expect(heldOf(false)).toBe("false")
    expect(heldOf(null)).toBe(null)
  })

  it("loses the sign of negative zero, exactly as a file would", () => {
    expect(heldOf(-0)).toBe("0")
  })

  it("renders a list as a list of text", () => {
    expect(heldOf([1, "x"])).toEqual(["1", "x"])
  })

  it("compares two held answers by value rather than by identity", () => {
    expect(heldSame(["a"], ["a"])).toBe(true)
    expect(heldSame(["a"], ["b"])).toBe(false)
    expect(heldSame(["a"], "a")).toBe(false)
    expect(heldSame(null, null)).toBe(true)
    expect(heldSame(null, "")).toBe(false)
  })
})

describe("formula conformance — posing a case to two substrates", () => {
  it("gives the file the text of a value and the database the value", () => {
    const posed = pose({ ...AGREED, values: { a: 12 } })
    expect(posed.reads("a")).toBe("12")
    expect(posed.values.a).toBe(12)
  })

  it("lets a case state the text a file holds where the projection is not it", () => {
    const posed = pose({ ...AGREED, values: { a: { where: "both", json: -0, held: "-0" } } })
    expect(posed.reads("a")).toBe("-0")
    expect(posed.values.a).toBe(-0)
  })

  it("reads a database-only input as absent from the file", () => {
    const posed = pose({ ...AGREED, values: { a: { where: "database", json: { k: 1 } } } })
    expect(posed.reads("a")).toBe(null)
    expect(posed.values.a).toEqual({ k: 1 })
  })

  it("reads a file-only input as absent from the database", () => {
    const posed = pose({ ...AGREED, values: { a: { where: "file", held: "1e999" } } })
    expect(posed.reads("a")).toBe("1e999")
    expect(posed.values.a).toBeUndefined()
  })
})

describe("formula conformance — what the runner calls a divergence", () => {
  it("passes an agreed case whose two answers match", () => {
    const found = judge(AGREED, ran({ kind: "value", held: "true" }, { kind: "value", json: true }))
    expect(found).toEqual([])
  })

  it("reports two answers that are not the same", () => {
    const one: Case = { ...AGREED, code: { kind: "value", held: "false" } }
    const found = judge(one, ran({ kind: "value", held: "true" }, { kind: "value", json: false }))
    expect(kinds(found)).toEqual(["divergence"])
    expect(found[0]?.said).toBe("both answered, and the answers are not the same")
  })

  it("reports ours answering where the reference rejected", () => {
    const one: Case = { ...AGREED, code: { kind: "error", code: "comparison_type_mismatch" } }
    const found = judge(
      one,
      ran({ kind: "value", held: "true" }, { kind: "error", code: "comparison_type_mismatch", says: "no" })
    )
    expect(kinds(found)).toEqual(["divergence"])
    expect(found[0]?.said).toBe("ours answered where the reference rejected")
  })

  it("reports ours rejecting where the reference answered", () => {
    const one: Case = { ...AGREED, ours: { kind: "refused", says: "not implemented" } }
    const found = judge(
      one,
      ran({ kind: "refused", code: "not_implemented", says: "not implemented" }, { kind: "value", json: true })
    )
    expect(kinds(found)).toEqual(["divergence"])
    expect(found[0]?.said).toBe("ours rejected where the reference answered")
  })

  it("passes a rejection on both sides where the two name the same fault", () => {
    const one: Case = {
      ...AGREED,
      ours: { kind: "refused", says: "no answer for that" },
      code: { kind: "error", code: "divide_by_zero" },
    }
    const found = judge(
      one,
      ran({ kind: "refused", code: "divide_by_zero", says: "no answer for that" }, DIVIDED)
    )
    expect(found).toEqual([])
  })

  it("reports a rejection on both sides where our evaluator names the wrong fault", () => {
    const one: Case = {
      ...AGREED,
      ours: { kind: "refused", says: "no answer for that" },
      code: { kind: "error", code: "divide_by_zero" },
    }
    const found = judge(
      one,
      ran({ kind: "refused", code: "arithmetic_nan", says: "no answer for that" }, DIVIDED)
    )
    expect(kinds(found)).toEqual(["divergence"])
    expect(found[0]?.said).toBe(
      "both rejected, and the reasons are not the same: ours named `arithmetic_nan` and the reference named `divide_by_zero`"
    )
  })

  it("keeps a refusal for want of a construct apart from a fault both name", () => {
    const one: Case = {
      ...AGREED,
      ours: { kind: "refused", says: "not implemented" },
      code: { kind: "error", code: "divide_by_zero" },
    }
    const found = judge(one, ran({ kind: "refused", code: "not_implemented", says: "not implemented" }, DIVIDED))
    expect(kinds(found)).toEqual(["divergence"])
    expect(found[0]?.said).toBe(
      "both rejected, and ours refused for want of a construct it does not implement where the reference named `divide_by_zero`"
    )
  })

  it("never calls a refused case a divergence, because the gap is what it records", () => {
    const one: Case = {
      id: "gap",
      category: "refused",
      covers: "a construct ours does not implement",
      expression: "a + b",
      ours: { kind: "refused", says: "not implemented" },
      code: { kind: "value", held: "3" },
      why: "no arithmetic is implemented",
    }
    const found = judge(one, ran({ kind: "refused", code: "not_implemented", says: "not implemented" }, { kind: "value", json: 3 }))
    expect(found).toEqual([])
  })

  it("never calls a substrate case a divergence", () => {
    const one: Case = {
      id: "text",
      category: "substrate",
      covers: "numeric text",
      expression: "a > b",
      ours: { kind: "value", held: "true" },
      code: { kind: "error", code: "comparison_type_mismatch" },
      why: "a file holds only text",
    }
    const found = judge(
      one,
      ran({ kind: "value", held: "true" }, { kind: "error", code: "comparison_type_mismatch", says: "no" })
    )
    expect(found).toEqual([])
  })
})

describe("formula conformance — what the runner calls drift", () => {
  it("reports our evaluator answering something the table does not record", () => {
    const found = judge(AGREED, ran({ kind: "value", held: "false" }, { kind: "value", json: false }))
    expect(kinds(found)).toContain("drift-ours")
  })

  it("reports the reference answering something the table does not record", () => {
    const found = judge(AGREED, ran({ kind: "value", held: "true" }, { kind: "value", json: 1 }))
    expect(kinds(found)).toContain("drift-code")
  })

  it("reports a refusal whose words are not the ones the table records", () => {
    const one: Case = { ...AGREED, ours: { kind: "refused", says: "the operator `+`" } }
    const found = judge(
      one,
      ran({ kind: "refused", code: "not_implemented", says: "the operator `-`" }, { kind: "value", json: true })
    )
    expect(kinds(found)).toContain("drift-ours")
  })

  it("reports our evaluator throwing something that is not a refusal", () => {
    const found = judge(AGREED, ran({ kind: "threw", says: "TypeError: x" }, { kind: "value", json: true }))
    expect(kinds(found)).toContain("drift-ours")
  })

  it("accepts a reference answer the table bounds only by its type", () => {
    const one: Case = {
      id: "clock",
      category: "refused",
      covers: "a function reading a live clock",
      expression: "now()",
      ours: { kind: "refused", says: "the function call `now(...)`" },
      code: { kind: "some", of: "number" },
      why: "no function call is implemented",
    }
    const clock: Run["ours"] = { kind: "refused", code: "not_implemented", says: "the function call `now(...)`" }
    const shut = judge(one, ran(clock, { kind: "value", json: 1787113681347 }))
    expect(kinds(shut)).toEqual([])
    const drifted = judge(one, ran(clock, { kind: "value", json: "no" }))
    expect(kinds(drifted)).toEqual(["drift-code"])
  })

  it("accepts an answer of our own the table bounds only by its type, however far the two values sit apart", () => {
    const one: Case = {
      ...AGREED,
      expression: "now()",
      values: {},
      ours: { kind: "some", of: "number" },
      code: { kind: "some", of: "number" },
    }
    const shut = judge(one, ran({ kind: "value", held: "1787113681347" }, { kind: "value", json: 1787113681348 }))
    expect(kinds(shut)).toEqual([])
    const drifted = judge(one, ran({ kind: "value", held: "no" }, { kind: "value", json: 1787113681348 }))
    expect(kinds(drifted)).toEqual(["drift-ours"])
  })
})

describe("formula conformance — what the runner calls a defect in the table", () => {
  it("refuses an agreed case that records nothing about the reference", () => {
    const found = defectsIn([{ ...AGREED, code: undefined }])
    expect(found).toHaveLength(1)
    expect(found[0]?.said).toContain("must record what the reference does")
  })

  it("refuses an agreed case that cannot be posed to both sides", () => {
    const found = defectsIn([{ ...AGREED, values: { a: { where: "file", held: "1" } } }])
    expect(found[0]?.said).toContain("must be posable to both sides")
  })

  it("refuses an agreed case resting on a reference answer bounded only by its type", () => {
    const found = defectsIn([{ ...AGREED, code: { kind: "some", of: "number" } }])
    expect(found[0]?.said).toContain("only bounded by its type")
  })

  it("refuses an agreed case bounding our answer by its type where the reference is pinned to a value", () => {
    const found = defectsIn([{ ...AGREED, ours: { kind: "some", of: "number" } }])
    expect(found[0]?.said).toContain("must bound the reference the same way")
  })

  it("refuses a refused case that does not record ours refusing", () => {
    const found = defectsIn([{ ...AGREED, category: "refused", why: "a reason" }])
    expect(found[0]?.said).toContain("records a value")
  })

  it("refuses a refused case that says nothing about why the gap stands", () => {
    const one: Case = { ...AGREED, category: "refused", ours: { kind: "refused", says: "no" } }
    expect(defectsIn([one])[0]?.said).toContain("must say why the gap stands")
  })

  it("refuses a substrate case that says nothing about why the two differ", () => {
    expect(defectsIn([{ ...AGREED, category: "substrate" }])[0]?.said).toContain("why the two substrates")
  })

  it("refuses two cases sharing one id", () => {
    const found = defectsIn([AGREED, AGREED])
    expect(found[0]?.said).toContain("is used by more than one case")
  })

  it("takes a well-built case without complaint", () => {
    expect(defectsIn([AGREED])).toEqual([])
  })
})

describe("formula conformance — the reading it renders", () => {
  it("counts each category and says nothing diverged where nothing did", () => {
    const reading = read([AGREED], function always() {
      return ran({ kind: "value", held: "true" }, { kind: "value", json: true })
    })
    expect(reading.counted.agreed).toBe(1)
    expect(reading.agreedOnValue).toBe(1)
    expect(reading.agreedOnRejection).toBe(0)
    expect(reading.findings).toEqual([])
    const shown = render(reading)
    expect(shown).toContain("(no divergence)")
    expect(shown).toContain("(no defect)")
  })

  it("shows a divergence with the expression, the inputs and both answers", () => {
    const one: Case = { ...AGREED, code: { kind: "value", held: "false" } }
    const reading = read([one], function always() {
      return ran({ kind: "value", held: "true" }, { kind: "value", json: false })
    })
    const shown = render(reading)
    expect(shown).toContain("1 diverged")
    expect(shown).not.toContain("(no divergence)")
    expect(shown).toContain('"a == b"')
    expect(shown).toContain("a: 1 held as")
    expect(shown).toContain('ours        value "true"')
    expect(shown).toContain("reference   value false")
  })

  it("counts a rejection agreement apart from a value agreement", () => {
    const one: Case = {
      ...AGREED,
      ours: { kind: "refused", says: "no" },
      code: { kind: "error", code: "divide_by_zero" },
    }
    const reading = read([one], function always() {
      return ran({ kind: "refused", code: "divide_by_zero", says: "no" }, DIVIDED)
    })
    expect(reading.agreedOnValue).toBe(0)
    expect(reading.agreedOnRejection).toBe(1)
    expect(reading.refusedForWantOfIt).toBe(0)
  })

  it("counts a refusal for want of a construct apart from an agreement on a rejection", () => {
    const one: Case = {
      id: "gap",
      category: "refused",
      covers: "a construct ours does not implement, where the reference names a fault of its own",
      expression: "a[k]",
      ours: { kind: "refused", says: "not implemented" },
      code: { kind: "error", code: "divide_by_zero" },
      why: "no bracket access is implemented",
    }
    const reading = read([one], function always() {
      return ran({ kind: "refused", code: "not_implemented", says: "not implemented" }, DIVIDED)
    })
    expect(reading.agreedOnRejection).toBe(0)
    expect(reading.refusedForWantOfIt).toBe(1)
    expect(render(reading)).toContain("ours refused for want of a construct it does not implement")
  })
})
