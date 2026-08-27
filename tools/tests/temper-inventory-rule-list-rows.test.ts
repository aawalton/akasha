import { describe, expect, it } from "bun:test"
import type { CategoryRule } from "../lib/temper-inventory/game-rule-types.ts"
import { buildRuleListRows } from "../lib/temper-inventory/rule-list-rows.ts"

function rule(id: string): CategoryRule {
  return { id, categoryId: "misc", action: "nothing" }
}

describe("buildRuleListRows", () => {
  it("blanks pos for controlled rows and numbers user rows 0-based by settings.rules index", () => {
    const controlled = [rule("c0"), rule("c1")]
    const user = [rule("u0"), rule("u1"), rule("u2")]
    const rows = buildRuleListRows(controlled, user)

    expect(rows).toHaveLength(5)
    expect(rows[0]).toMatchObject({ id: "c0", controlled: true, pos: undefined })
    expect(rows[1]).toMatchObject({ id: "c1", controlled: true, pos: undefined })
    expect(rows[2]).toMatchObject({ id: "u0", controlled: false, pos: 0 })
    expect(rows[3]).toMatchObject({ id: "u1", controlled: false, pos: 1 })
    expect(rows[4]).toMatchObject({ id: "u2", controlled: false, pos: 2 })
  })

  it("numbers user rows from 0 even when there are no controlled rows", () => {
    const rows = buildRuleListRows([], [rule("u0"), rule("u1")])
    expect(rows.map((r) => r.pos)).toEqual([0, 1])
  })
})
