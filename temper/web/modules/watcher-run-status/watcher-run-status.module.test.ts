import { describe, expect, test } from "bun:test"
import {
  deriveWatcherRunVerdict,
  readReportedOperations,
  summarizeWatcherRun,
  type WatcherRunOperation,
} from "akasha/temper/web/modules/watcher-run-status/watcher-run-status.module.code.ts"

const RAN_AT = "2026-07-25T13:04:29.560Z"
const REPORTED_AT = "2026-07-25T13:21:16.992Z"

function op(over: Partial<WatcherRunOperation> = {}): WatcherRunOperation {
  return { name: "characters", state: "synced", ranAt: RAN_AT, detail: null, ...over }
}

describe("readReportedOperations", () => {
  test("an enrolment reporting nothing yields no operations", () => {
    expect(readReportedOperations({})).toEqual({ reportedAt: null, operations: [] })
  })

  test("reads the rows the watcher writes, leaving out what no verdict needs", () => {
    const parsed = readReportedOperations({
      reportedAt: REPORTED_AT,
      operations: [
        {
          id: "one",
          kind: "import",
          name: "characters",
          path: "/x",
          state: "synced",
          ranAt: RAN_AT,
        },
        {
          id: "two",
          kind: "import",
          name: "dataMining",
          path: "/y",
          state: "upload_failed",
          ranAt: RAN_AT,
          detail: "HTTP 502 from https://tempereso.com/api/watcher/upsert-mined-items",
        },
      ],
    })
    expect(parsed).toEqual({
      reportedAt: REPORTED_AT,
      operations: [
        { name: "characters", state: "synced", ranAt: RAN_AT, detail: null },
        {
          name: "dataMining",
          state: "upload_failed",
          ranAt: RAN_AT,
          detail: "HTTP 502 from https://tempereso.com/api/watcher/upsert-mined-items",
        },
      ],
    })
  })
})

describe("deriveWatcherRunVerdict", () => {
  test("no operations at all is never-reported", () => {
    expect(deriveWatcherRunVerdict({ reportedAt: null, operations: [] })).toBe("never-reported")
  })

  test("a report whose instant is known but which carries no operations is still never-reported", () => {
    expect(deriveWatcherRunVerdict({ reportedAt: REPORTED_AT, operations: [] })).toBe(
      "never-reported"
    )
  })

  test("an all-skipped run is nothing-readable — attempting nothing confirms nothing", () => {
    expect(
      deriveWatcherRunVerdict({
        reportedAt: REPORTED_AT,
        operations: [op({ state: "skipped" }), op({ name: "inventory", state: "skipped" })],
      })
    ).toBe("nothing-readable")
  })

  test("at least one synced with nothing failing is working", () => {
    expect(
      deriveWatcherRunVerdict({
        reportedAt: REPORTED_AT,
        operations: [op(), op({ name: "inventory", state: "skipped" })],
      })
    ).toBe("working")
  })

  test("a missing file is files-missing", () => {
    expect(
      deriveWatcherRunVerdict({
        reportedAt: REPORTED_AT,
        operations: [op(), op({ name: "inventory", state: "file_not_found" })],
      })
    ).toBe("files-missing")
  })

  test("an unparseable file is parse-failing", () => {
    expect(
      deriveWatcherRunVerdict({
        reportedAt: REPORTED_AT,
        operations: [op(), op({ name: "inventory", state: "parse_failed" })],
      })
    ).toBe("parse-failing")
  })

  test("a failed upload is upload-failing", () => {
    expect(
      deriveWatcherRunVerdict({
        reportedAt: REPORTED_AT,
        operations: [op(), op({ name: "dataMining", state: "upload_failed" })],
      })
    ).toBe("upload-failing")
  })

  test("thirteen synced and one upload_failed is upload-failing, not working", () => {
    const operations = [
      ...Array.from({ length: 13 }, (_, i) => op({ name: `ok-${i}` })),
      op({ name: "dataMining", state: "upload_failed", detail: "HTTP 502" }),
    ]
    expect(deriveWatcherRunVerdict({ reportedAt: REPORTED_AT, operations })).toBe("upload-failing")
  })

  test("a missing file outranks a parse failure and a failed upload", () => {
    expect(
      deriveWatcherRunVerdict({
        reportedAt: REPORTED_AT,
        operations: [
          op({ name: "a", state: "upload_failed" }),
          op({ name: "b", state: "parse_failed" }),
          op({ name: "c", state: "file_not_found" }),
        ],
      })
    ).toBe("files-missing")
  })

  test("a parse failure outranks a failed upload", () => {
    expect(
      deriveWatcherRunVerdict({
        reportedAt: REPORTED_AT,
        operations: [
          op({ name: "a", state: "upload_failed" }),
          op({ name: "b", state: "parse_failed" }),
        ],
      })
    ).toBe("parse-failing")
  })
})

describe("summarizeWatcherRun", () => {
  test("carries the operations that decided the verdict, so the two cannot disagree", () => {
    const summary = summarizeWatcherRun({
      reportedAt: REPORTED_AT,
      operations: [
        op({ name: "characters" }),
        op({ name: "inventory", state: "file_not_found", detail: "no such file" }),
        op({ name: "completion", state: "file_not_found" }),
      ],
    })
    expect(summary.verdict).toBe("files-missing")
    expect(summary.decidingOperations.map((o) => o.name)).toEqual(["inventory", "completion"])
  })

  test("working's deciding set is the synced operations — the positive evidence itself", () => {
    const summary = summarizeWatcherRun({
      reportedAt: REPORTED_AT,
      operations: [op({ name: "characters" }), op({ name: "inventory", state: "skipped" })],
    })
    expect(summary.verdict).toBe("working")
    expect(summary.decidingOperations.map((o) => o.name)).toEqual(["characters"])
  })

  test("a cannot-determine verdict names no deciding operation it cannot point at", () => {
    const summary = summarizeWatcherRun({ reportedAt: null, operations: [] })
    expect(summary.verdict).toBe("never-reported")
    expect(summary.decidingOperations).toEqual([])
  })

  test("every deciding operation is one of the input operations", () => {
    const operations = [op({ name: "a" }), op({ name: "b", state: "parse_failed" })]
    const summary = summarizeWatcherRun({ reportedAt: REPORTED_AT, operations })
    for (const deciding of summary.decidingOperations) {
      expect(operations).toContain(deciding)
    }
  })
})
