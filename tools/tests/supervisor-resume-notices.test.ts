
import { describe, expect, it } from "bun:test"
import {
  HANDED_NOTICE_KEYS,
  NOTICE_UNAVAILABLE_PREFIX,
  parseNotices,
  unavailable,
} from "../lib/supervisor-resume-notices.ts"

const SUPERVISOR_NOTICE_PREFIX = "[supervisor]"

const GOOD = {
  "restart-immediate": "a",
  "restart-deferred": "b",
  "compact-immediate": "c",
  "compact-deferred": "d",
  "restart-recovery-clause": "e",
}

const RECOVERY_CLAUSE_KEY = "restart-recovery-clause"

describe("parseNotices — what the command returned, held to what a seat can be handed", () => {
  it("accepts the five notices", () => {
    expect("notices" in parseNotices(JSON.stringify(GOOD))).toBe(true)
  })

  it.each([...HANDED_NOTICE_KEYS])("refuses a missing `%s`, naming it", (key) => {
    const { [key]: _gone, ...rest } = GOOD
    const checked = parseNotices(JSON.stringify(rest))
    expect("reason" in checked && checked.reason).toContain(key)
  })

  it.each([...HANDED_NOTICE_KEYS])(
    "refuses an EMPTY `%s` — an empty argv drives nothing",
    (key) => {
      const checked = parseNotices(JSON.stringify({ ...GOOD, [key]: "" }))
      expect("reason" in checked && checked.reason).toContain(key)
    }
  )

  it("ACCEPTS an empty recovery clause, because emptying it is how the workaround is retired", () => {
    const checked = parseNotices(JSON.stringify({ ...GOOD, [RECOVERY_CLAUSE_KEY]: "" }))
    expect("notices" in checked).toBe(true)
  })

  it("refuses a missing recovery clause, which is not the same as an emptied one", () => {
    const { "restart-recovery-clause": _gone, ...rest } = GOOD
    expect("reason" in parseNotices(JSON.stringify(rest))).toBe(true)
  })

  it.each([["null"], ['"a string"'], ["42"], ["[]"], ["{}"]])(
    "refuses %s rather than reading fields off it",
    (text) => {
      expect("reason" in parseNotices(text)).toBe(true)
    }
  )

  it("refuses text that is not JSON at all, rather than throwing into the restart path", () => {
    const checked = parseNotices("error: pages/notice/resume.notice.md is not there\n")
    expect("reason" in checked && checked.reason).toContain("did not return JSON")
  })
})

describe("unavailable — what a seat is handed when the call failed", () => {
  it("gives every notice a non-empty turn, so no failure resolves to an idle seat", () => {
    const notices = unavailable("the tree is not there")
    for (const key of HANDED_NOTICE_KEYS) {
      expect(notices[key].length).toBeGreaterThan(0)
    }
  })

  it("carries the reason, which is the whole of what makes the failure diagnosable", () => {
    expect(unavailable("the tree is not there")["restart-immediate"]).toContain(
      "the tree is not there"
    )
  })

  it("opens as a machine's prompt, so the hooks do not read it as Alan at the keyboard", () => {
    expect(NOTICE_UNAVAILABLE_PREFIX.startsWith(SUPERVISOR_NOTICE_PREFIX)).toBe(true)
    for (const key of HANDED_NOTICE_KEYS) {
      expect(unavailable("x")[key].startsWith(SUPERVISOR_NOTICE_PREFIX)).toBe(true)
    }
  })

  it("appends no clause, there being no authored notice for one to be appended to", () => {
    expect(unavailable("x")[RECOVERY_CLAUSE_KEY]).toBe("")
  })

  it("is what its own parse accepts, so a diagnostic cannot be a second failure", () => {
    expect("notices" in parseNotices(JSON.stringify(unavailable("x")))).toBe(true)
  })
})
