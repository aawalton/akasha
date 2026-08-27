import { afterEach, describe, expect, test } from "bun:test"
import { cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { WatcherBuildSummary, WatcherBuildVerdict } from "@/lib/watcher-build-status"
import { WatcherBuildStatusCard } from "./watcher-build-status-card"

const TEN_MINUTES_AGO = new Date(Date.now() - 600_000).toISOString()

const DEPLOYED = "e4fbe0d2241bb84ec61548f080e810789fe0bd9b"
const OLDER = "c5ea8376f6d0a1b2c3d4e5f60718293a4b5c6d7e"

function summary(verdict: WatcherBuildVerdict, over: Partial<WatcherBuildSummary> = {}) {
  return {
    verdict,
    targetVersion: DEPLOYED,
    reportedVersion: DEPLOYED,
    reportedAt: TEN_MINUTES_AGO,
    ...over,
  } satisfies WatcherBuildSummary
}

function textFor(verdict: WatcherBuildVerdict, over: Partial<WatcherBuildSummary> = {}): string {
  const { container } = render(<WatcherBuildStatusCard build={summary(verdict, over)} />)
  return container.textContent ?? ""
}

const ALL_VERDICTS: WatcherBuildVerdict[] = [
  "current",
  "stale",
  "never-reported",
  "source-build",
  "target-unknown",
]

afterEach(cleanup)

describe("every state says something, and something different", () => {
  test.each(ALL_VERDICTS)("%s renders non-empty copy", (verdict) => {
    expect(textFor(verdict).length).toBeGreaterThan(40)
  })

  test("no two states render the same headline", () => {
    const headlines = ALL_VERDICTS.map((v) => textFor(v))
    expect(new Set(headlines).size).toBe(ALL_VERDICTS.length)
  })
})

describe("current is dated, never a claim about now", () => {
  test("carries the relative time of the report", () => {
    expect(textFor("current")).toContain("ago")
  })

  test("says WAS up to date, not IS up to date", () => {
    const text = textFor("current")
    expect(text).toContain("was up to date")
    expect(text).not.toContain("is up to date")
  })
})

describe("cannot-determine never reads as stale", () => {
  test("source-build names a source build and never staleness", () => {
    const text = textFor("source-build", { reportedVersion: "dev" }).toLowerCase()
    expect(text).toContain("source")
    expect(text).not.toContain("older build")
    expect(text).not.toContain("out of date")
  })

  test("never-reported names both causes and picks neither", () => {
    const text = textFor("never-reported", { reportedVersion: null, reportedAt: null })
    expect(text).toContain("has not completed a sync")
    expect(text).toContain("predates version reporting")
    expect(text.toLowerCase()).not.toContain("older build")
  })

  test("never-reported claims no timestamp it does not have", () => {
    expect(textFor("never-reported", { reportedVersion: null, reportedAt: null })).not.toContain(
      "ago"
    )
  })

  test("target-unknown blames Temper's side, not the user's install", () => {
    const text = textFor("target-unknown", { targetVersion: null })
    expect(text).toContain("Temper's side")
    expect(text.toLowerCase()).not.toContain("older build")
  })
})

describe("stale is the one arm allowed to say so", () => {
  test("names the older build and points at the update check", () => {
    const text = textFor("stale", { reportedVersion: OLDER })
    expect(text).toContain("older build")
    expect(text).toContain("update check")
  })

  test("never claims how far behind", () => {
    const text = textFor("stale", { reportedVersion: OLDER }).toLowerCase()
    expect(text).not.toContain("behind by")
    expect(text).not.toContain("builds behind")
    expect(text).not.toContain("versions behind")
  })
})

describe("no raw build stamp reaches the user", () => {
  test.each(ALL_VERDICTS)("%s renders neither SHA", (verdict) => {
    const text = textFor(verdict, { reportedVersion: OLDER })
    expect(text).not.toContain(DEPLOYED)
    expect(text).not.toContain(OLDER)
  })
})
