import { describe, expect, test } from "bun:test"
import { bodyFor } from "../lib/page-write-text.ts"

function statedIn(text: string): Record<string, unknown> {
  const closesAt = text.indexOf("\n---", 3)
  return Bun.YAML.parse(text.slice(4, closesAt + 1)) as Record<string, unknown>
}

describe("bodyFor — parsing a page's file and writing it back leaves the file unchanged", () => {
  test("a value whose text reads back as a number is quoted", () => {
    for (const one of ["1-0", "0-1", "3033241.30830867-1"]) {
      expect(statedIn(bodyFor("page", { key: one })).key).toBe(one)
    }
  })

  test("a list element is held to the same reading", () => {
    expect(statedIn(bodyFor("page", { keys: ["1-0", "0-1"] })).keys).toEqual(["1-0", "0-1"])
  })

  test("a value whose text reads back as itself is written bare", () => {
    expect(bodyFor("page", { key: "game-opera-morphy-1858" })).toContain(
      "key: game-opera-morphy-1858\n"
    )
  })

  test("a number and a boolean read back as the number and the boolean", () => {
    const stated = statedIn(bodyFor("page", { count: 33, flag: false }))
    expect(stated.count).toBe(33)
    expect(stated.flag).toBe(false)
  })
})
