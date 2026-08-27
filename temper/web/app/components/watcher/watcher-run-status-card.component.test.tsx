import { afterEach, describe, expect, test } from "bun:test"
import { cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type {
  WatcherRunOperation,
  WatcherRunSummary,
  WatcherRunVerdict,
} from "@/lib/watcher-run-status"
import { WatcherRunStatusCard } from "./watcher-run-status-card"

const TEN_MINUTES_AGO = new Date(Date.now() - 600_000).toISOString()

function op(over: Partial<WatcherRunOperation> = {}): WatcherRunOperation {
  return { name: "characters", state: "synced", ranAt: TEN_MINUTES_AGO, detail: null, ...over }
}

const DECIDING: Record<WatcherRunVerdict, readonly WatcherRunOperation[]> = {
  working: [op(), op({ name: "inventory" })],
  "files-missing": [op({ name: "inventory", state: "file_not_found" })],
  "parse-failing": [op({ name: "inventory", state: "parse_failed" })],
  "upload-failing": [op({ name: "dataMining", state: "upload_failed" })],
  "never-reported": [],
  "nothing-readable": [],
}

function summary(verdict: WatcherRunVerdict, over: Partial<WatcherRunSummary> = {}) {
  return {
    verdict,
    reportedAt: TEN_MINUTES_AGO,
    operations: DECIDING[verdict],
    decidingOperations: DECIDING[verdict],
    ...over,
  } satisfies WatcherRunSummary
}

function textFor(verdict: WatcherRunVerdict, over: Partial<WatcherRunSummary> = {}): string {
  const { container } = render(<WatcherRunStatusCard run={summary(verdict, over)} />)
  return container.textContent ?? ""
}

const ALL_VERDICTS: WatcherRunVerdict[] = [
  "working",
  "files-missing",
  "parse-failing",
  "upload-failing",
  "never-reported",
  "nothing-readable",
]

const CANNOT_DETERMINE: WatcherRunVerdict[] = ["never-reported", "nothing-readable"]
const FAILING: WatcherRunVerdict[] = ["files-missing", "parse-failing", "upload-failing"]

afterEach(cleanup)

describe("every state says something, and something different", () => {
  test.each(ALL_VERDICTS)("%s renders non-empty copy", (verdict) => {
    expect(textFor(verdict).length).toBeGreaterThan(40)
  })

  test("no two states render the same copy", () => {
    const rendered = ALL_VERDICTS.map((v) => textFor(v))
    expect(new Set(rendered).size).toBe(ALL_VERDICTS.length)
  })
})

describe("a cannot-determine state never reads as health or as failure", () => {
  test.each(CANNOT_DETERMINE)("%s claims nothing succeeded", (verdict) => {
    const text = textFor(verdict)
    expect(text).not.toContain("succeeded")
    expect(text).not.toContain("up to date")
  })

  test.each(CANNOT_DETERMINE)("%s admits it cannot tell", (verdict) => {
    expect(textFor(verdict)).toMatch(/cannot (say|tell)|neither confirms/)
  })

  test("never-reported tells a just-linked user this is expected, and what would change it", () => {
    const text = textFor("never-reported")
    expect(text).toContain("just linked")
    expect(text).toContain("reload")
  })

  test("never-reported names the other possibility rather than only the hopeful one", () => {
    expect(textFor("never-reported")).toContain("not running")
  })
})

describe("a failing state names what failed", () => {
  test.each(FAILING)("%s names the operation it is about", (verdict) => {
    const text = textFor(verdict)
    const name = DECIDING[verdict][0]?.name ?? ""
    expect(text).toContain(name)
  })

  test("the count in the headline matches the number of operations named", () => {
    const three = [
      op({ name: "a", state: "file_not_found" }),
      op({ name: "b", state: "file_not_found" }),
      op({ name: "c", state: "file_not_found" }),
    ]
    const text = textFor("files-missing", { decidingOperations: three, operations: three })
    expect(text).toContain("3 files")
    for (const name of ["a", "b", "c"]) expect(text).toContain(name)
  })

  test("one failure reads as singular, not as '1 files'", () => {
    expect(textFor("files-missing")).not.toContain("1 files")
  })

  test("the recorded detail is shown verbatim rather than summarized away", () => {
    const failing = [
      op({
        name: "dataMining",
        state: "upload_failed",
        detail: "HTTP 502 from https://tempereso.com/api/watcher/upsert-mined-items",
      }),
    ]
    const text = textFor("upload-failing", { decidingOperations: failing, operations: failing })
    expect(text).toContain("HTTP 502")
    expect(text).toContain("upsert-mined-items")
  })

  test("files-missing names the OneDrive folder, the failure mode that looks like success", () => {
    expect(textFor("files-missing")).toContain("OneDrive")
  })
})

describe("a state is reported as of when it was observed", () => {
  test("working is dated", () => {
    expect(textFor("working")).toContain("ago")
  })

  test.each(FAILING)("%s is dated", (verdict) => {
    expect(textFor(verdict)).toContain("ago")
  })

  test("an unknown report instant produces no relative phrase", () => {
    expect(textFor("working", { reportedAt: null })).not.toContain("ago")
  })
})
