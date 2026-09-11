import { describe, expect, test } from "bun:test"
import { textAt } from "./text-at.module.code.ts"

describe("textAt", () => {
  test("answers the text a key holds", () => {
    expect(textAt({ tool_name: "Bash" }, "tool_name")).toBe("Bash")
  })

  test("answers nothing for an empty or absent key", () => {
    expect(textAt({ tool_name: "" }, "tool_name")).toBe(null)
    expect(textAt({}, "tool_name")).toBe(null)
  })

  test("answers nothing where the record is not there", () => {
    expect(textAt(null, "tool_name")).toBe(null)
  })
})
