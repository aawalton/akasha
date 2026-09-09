import { expect, test } from "bun:test"
import type { SyncOperation } from "../watcher-run-outcome/watcher-run-outcome.module.code.ts"
import { WATCHER_VERSION } from "../watcher-version/watcher-version.module.code.ts"
import type {
  EnrolmentRead,
  EnrolmentWrite,
  RunReportingSeams,
} from "./watcher-run-reporting.module.code.ts"
import {
  ACCOUNT_KEY,
  ENROLMENT_PAGE_TYPE_SLUG,
  NO_ACCOUNT_MESSAGE,
  NO_ENROLMENT_MESSAGE,
  OUTCOME_KEY,
  reportRunOutcome,
  storedOperations,
} from "./watcher-run-reporting.module.code.ts"

const RAN_AT = "2026-09-02T10:00:00.000Z"

const MOMENT = new Date("2026-04-01T12:34:56.789Z")

const MIXED_OUTCOME = { operations: [{ name: "a", state: "synced" }, { nope: 1 }, "x"] }

function operation(name: string, state: SyncOperation["state"]): SyncOperation {
  return { kind: "import", name, path: `/saved/${name}.lua`, state, ranAt: RAN_AT }
}

type Harness = {
  readonly asked: unknown[]
  readonly written: unknown[]
  readonly notes: string[]
  readonly seams: RunReportingSeams
}

function harness(row: unknown, accountId: string | null = "acct-1"): Harness {
  const asked: unknown[] = []
  const written: unknown[] = []
  const notes: string[] = []
  const readEnrolment = (async (args: unknown) => {
    asked.push(args)
    return row as never
  }) as EnrolmentRead
  const writeEnrolment = (async (args: unknown) => {
    written.push(args)
    return null as never
  }) as EnrolmentWrite
  const seams: RunReportingSeams = {
    accountId: async () => accountId,
    readEnrolment,
    writeEnrolment,
    now: () => MOMENT,
    note: (message) => {
      notes.push(message)
    },
  }
  return { asked, written, notes, seams }
}

function reportOf(written: readonly unknown[]): Record<string, unknown> {
  expect(written).toHaveLength(1)
  const args = written[0] as { set: Record<string, string> }
  return JSON.parse(String(args.set[OUTCOME_KEY])) as Record<string, unknown>
}

test("an outcome held as a record gives back every entry holding a name", () => {
  expect(storedOperations(MIXED_OUTCOME)).toEqual([{ name: "a", state: "synced" }])
})

test("a value that is no record of operations gives back nothing", () => {
  expect(storedOperations(null)).toEqual([])
  expect(storedOperations(undefined)).toEqual([])
  expect(storedOperations("")).toEqual([])
  expect(storedOperations({ watcherVersion: "dev" })).toEqual([])
  expect(storedOperations({ operations: 7 })).toEqual([])
})

test("the JSON text of an outcome reads back the same as the outcome", () => {
  expect(storedOperations(JSON.stringify(MIXED_OUTCOME))).toEqual(storedOperations(MIXED_OUTCOME))
})

test("the enrolment is asked for by the account the enrolment names", async () => {
  const { asked, seams } = harness({ id: "page-1" })
  await reportRunOutcome([operation("inventory", "synced")], seams)
  expect(asked).toEqual([
    {
      pageTypeSlug: ENROLMENT_PAGE_TYPE_SLUG,
      where: [{ key: ACCOUNT_KEY, eq: "acct-1" }],
      select: ["id", OUTCOME_KEY],
    },
  ])
})

test("the moment recorded is the moment the clock handed in", async () => {
  const { written, seams } = harness({ id: "page-1" })
  await reportRunOutcome([operation("inventory", "synced")], seams)
  expect(reportOf(written).reportedAt).toBe(MOMENT.toISOString())
})

test("the report names the version the watcher reports itself as", async () => {
  const { written, seams } = harness({ id: "page-1" })
  await reportRunOutcome([], seams)
  expect(reportOf(written).watcherVersion).toBe(WATCHER_VERSION)
})

test("the enrolment is written by the id the enrolment came back with", async () => {
  const { written, seams } = harness({ id: "page-1" })
  await reportRunOutcome([], seams)
  const args = written[0] as { pageTypeSlug: string; id: string }
  expect(args.pageTypeSlug).toBe(ENROLMENT_PAGE_TYPE_SLUG)
  expect(args.id).toBe("page-1")
})

test("an operation reported replaces the operation held under the same name", async () => {
  const held = JSON.stringify({
    operations: [
      { name: "characters", state: "synced" },
      { name: "inventory", state: "upload_failed" },
    ],
  })
  const { written, seams } = harness({ id: "page-1", [OUTCOME_KEY]: held })
  await reportRunOutcome([operation("inventory", "synced")], seams)
  expect(reportOf(written).operations).toEqual([
    { name: "characters", state: "synced" },
    operation("inventory", "synced"),
  ])
})

test("no account signed in writes nothing, asks nothing, and says so", async () => {
  const { asked, written, notes, seams } = harness({ id: "page-1" }, null)
  await reportRunOutcome([operation("inventory", "synced")], seams)
  expect(asked).toEqual([])
  expect(written).toEqual([])
  expect(notes).toEqual([NO_ACCOUNT_MESSAGE])
})

test("an account with no enrolment page writes nothing and says so", async () => {
  const { written, notes, seams } = harness(null)
  await reportRunOutcome([operation("inventory", "synced")], seams)
  expect(written).toEqual([])
  expect(notes).toEqual([NO_ENROLMENT_MESSAGE])
})

test("a read that raises is logged rather than raised to the caller", async () => {
  const notes: string[] = []
  const readEnrolment = (async () => {
    throw new Error("the pages refused")
  }) as EnrolmentRead
  const seams: RunReportingSeams = {
    accountId: async () => "acct-1",
    readEnrolment,
    now: () => MOMENT,
    note: (message) => {
      notes.push(message)
    },
  }
  await reportRunOutcome([operation("inventory", "synced")], seams)
  expect(notes).toEqual(["Run outcome not reported: the pages refused"])
})
