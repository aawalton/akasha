import { describe, expect, test } from "bun:test"
import { colorsAnswer } from "../work-tree.ts"

describe("the colors answer", () => {
  const answer = colorsAnswer("/repos/akasha", {
    byInitiative: new Map([["athena-consistent-seats", "blue"]]),
  })

  test("an initiative is keyed by its slug, which is the key its row already carries", () => {
    expect(answer.byInitiative).toEqual({ "athena-consistent-seats": "blue" })
  })

  test("the akasha root comes with it, so a caller joins against what this resolved", () => {
    expect(answer.repo).toBe("/repos/akasha")
  })

  test("a row nothing states is left out rather than carried as null", () => {
    expect(answer.byInitiative["athena-something-else"]).toBeUndefined()
  })

  test("byProject comes through empty, which is what the shipped panel refuses to go without", () => {
    expect(answer.byProject).toEqual({})
  })
})

describe("nothing is drawn at all", () => {
  const answer = colorsAnswer("/repos/akasha", { byInitiative: new Map() })

  test("the record is empty rather than absent, so a caller reads it without a guard", () => {
    expect(answer.byInitiative).toEqual({})
  })
})
