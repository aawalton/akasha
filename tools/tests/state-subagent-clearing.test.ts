import { describe, expect, test } from "bun:test"
import { clearsSubagentPages } from "../hooks/state-subagent.ts"

const NEW_PROCESS = ["startup", "clear", "resume", "fork"]

describe("which session starts take a seat's subagent pages", () => {
  test.each(NEW_PROCESS)("%s takes them, nothing surviving the process that held them", (source) => {
    expect(clearsSubagentPages(source)).toBe(true)
  })

  test("a compaction leaves them, the process and the subagents under it carrying on", () => {
    expect(clearsSubagentPages("compact")).toBe(false)
  })

  test("a source this file has never heard of takes them, a fresh process being the default", () => {
    expect(clearsSubagentPages("brand-new-source")).toBe(true)
  })

  test("a start naming no source takes them, an empty string being no reason to keep any", () => {
    expect(clearsSubagentPages("")).toBe(true)
  })
})
