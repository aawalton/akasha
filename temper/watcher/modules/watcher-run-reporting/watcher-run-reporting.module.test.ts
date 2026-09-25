import { expect, test } from "bun:test"
import type { SyncOperation } from "akasha/temper/watcher/modules/watcher-run-outcome/watcher-run-outcome.module.code.ts"
import type {
  EnrolmentRead,
  EnrolmentWrite,
  Report,
  RunReportingSeams,
} from "akasha/temper/watcher/modules/watcher-run-reporting/watcher-run-reporting.module.code.ts"
import {
  ACCOUNT_KEY,
  ENROLMENT_PAGE_TYPE_SLUG,
  NO_ACCOUNT_MESSAGE,
  NO_ENROLMENT_MESSAGE,
  OPERATIONS_KEY,
  reportRunOutcome,
  storedOperations,
} from "akasha/temper/watcher/modules/watcher-run-reporting/watcher-run-reporting.module.code.ts"
import { WATCHER_VERSION } from "akasha/temper/watcher/modules/watcher-version/watcher-version.module.code.ts"

const RAN_AT = "2026-09-02T10:00:00.000Z"

const MOMENT = new Date("2026-04-01T12:34:56.789Z")

function operation(name: string, state: SyncOperation["state"]): SyncOperation {
  return { kind: "import", name, path: `/saved/${name}.lua`, state, ranAt: RAN_AT }
}

const HELD = { ...operation("a", "synced"), id: "held-a" }

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
    addressOf: async (userId) => `temper-account/${userId}`,
    readEnrolment,
    writeEnrolment,
    now: () => MOMENT,
    note: (message) => {
      notes.push(message)
    },
  }
  return { asked, written, notes, seams }
}

function reportOf(written: readonly unknown[]): Report {
  expect(written).toHaveLength(1)
  return (written[0] as { set: Report }).set
}

test("rows held give back every row the declared fields read, each with its id", () => {
  const unread = [{ nope: 1 }, "x", { ...operation("b", "synced"), state: "gone" }]
  expect(storedOperations([HELD, ...unread])).toEqual([HELD])
})

test("a value that is no list of rows gives back nothing", () => {
  expect(storedOperations(null)).toEqual([])
  expect(storedOperations(undefined)).toEqual([])
  expect(storedOperations("jsonl")).toEqual([])
  expect(storedOperations({ operations: [HELD] })).toEqual([])
})

test("the enrolment is asked for by the address of the account the enrolment names", async () => {
  const { asked, seams } = harness({ id: "page-1" })
  await reportRunOutcome([operation("inventory", "synced")], seams)
  expect(asked).toEqual([
    {
      pageTypeSlug: ENROLMENT_PAGE_TYPE_SLUG,
      where: [{ key: ACCOUNT_KEY, eq: "temper-account/acct-1" }],
      select: ["id", OPERATIONS_KEY],
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
  const characters = { ...operation("characters", "synced"), id: "held-characters" }
  const held = [characters, { ...operation("inventory", "upload_failed"), id: "held-inventory" }]
  const { written, seams } = harness({ id: "page-1", [OPERATIONS_KEY]: held })
  await reportRunOutcome([operation("inventory", "synced")], seams)
  expect(reportOf(written).operations).toEqual([characters, operation("inventory", "synced")])
})

test("a detail past what the property holds is shortened to fit", async () => {
  const { written, seams } = harness({ id: "page-1" })
  const failed = { ...operation("inventory", "upload_failed"), detail: "x".repeat(2500) }
  await reportRunOutcome([failed], seams)
  expect(reportOf(written).operations[0]?.detail).toBe("x".repeat(2000))
})

test("a report the declared fields refuse is logged rather than written", async () => {
  const { written, notes, seams } = harness({ id: "page-1" })
  const odd = { ...operation("inventory", "synced"), ranAt: "yesterday" }
  await reportRunOutcome([odd], seams)
  expect(written).toEqual([])
  expect(notes).toHaveLength(1)
  expect(notes[0]).toStartWith("Run outcome not reported: ")
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
    addressOf: async (userId) => `temper-account/${userId}`,
    readEnrolment,
    now: () => MOMENT,
    note: (message) => {
      notes.push(message)
    },
  }
  await reportRunOutcome([operation("inventory", "synced")], seams)
  expect(notes).toEqual(["Run outcome not reported: the pages refused"])
})
