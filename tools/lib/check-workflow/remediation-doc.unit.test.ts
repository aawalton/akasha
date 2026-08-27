import { describe, expect, test } from "bun:test"
import { remediationHint, repoDoc } from "./remediation-doc.ts"

describe("repoDoc", () => {
  test("passes a path under a declared directory through unchanged", () => {
    expect(String(repoDoc("tools/lib/check-workflow/remediation-doc.ts"))).toBe(
      "tools/lib/check-workflow/remediation-doc.ts"
    )
  })

  test("accepts only a declared top-level directory", () => {
    // @ts-expect-error — a home-relative path starts under none of them
    repoDoc("~/akasha/docs/example-rule.md")
    // @ts-expect-error — nor is the retired `.claude/docs` spelling
    repoDoc(".claude/docs/example-rule.md")
  })

  test("refuses markdown, whichever directory it stands under", () => {
    // @ts-expect-error — a remediation document is never an instruction document
    repoDoc("infra/cluster-checks/docs/example-rule.md")
  })
})

describe("remediationHint", () => {
  test("passes free text through unchanged", () => {
    expect(String(remediationHint("resync: bun run x --write"))).toBe("resync: bun run x --write")
  })

  test("refuses free text carrying the coupling", () => {
    // @ts-expect-error — the escape hatch is not an escape from the one rule
    remediationHint(`see ${"~/instructions"}/docs/example-rule.md`)
    const widened: string = "anything"
    // @ts-expect-error — a widened string could carry it undetected
    remediationHint(widened)
  })
})
