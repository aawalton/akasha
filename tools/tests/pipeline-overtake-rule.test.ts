import { describe, expect, test } from "bun:test"
import { overtakenByNewerOnBranch } from "../lib/sweep-pipeline-pages/statuses.ts"

describe("overtakenByNewerOnBranch", () => {
  test("on main only a pending predecessor is overtaken", () => {
    expect(overtakenByNewerOnBranch("main", "pending")).toBe(true)
    expect(overtakenByNewerOnBranch("main", "dispatching")).toBe(false)
    expect(overtakenByNewerOnBranch("main", "running")).toBe(false)
  })

  test("off main every non-terminal predecessor is overtaken", () => {
    expect(overtakenByNewerOnBranch("feature-x", "pending")).toBe(true)
    expect(overtakenByNewerOnBranch("feature-x", "dispatching")).toBe(true)
    expect(overtakenByNewerOnBranch("feature-x", "running")).toBe(true)
  })

  test("a terminal predecessor is overtaken on no branch", () => {
    for (const branch of ["main", "feature-x"]) {
      expect(overtakenByNewerOnBranch(branch, "passed")).toBe(false)
      expect(overtakenByNewerOnBranch(branch, "failed")).toBe(false)
      expect(overtakenByNewerOnBranch(branch, "answered-elsewhere")).toBe(false)
      expect(overtakenByNewerOnBranch(branch, "overtaken")).toBe(false)
    }
  })
})
