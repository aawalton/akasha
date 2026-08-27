import { afterAll, beforeEach, describe, expect, mock, test } from "bun:test"

const HANDLE = "../lib/seat-handle.ts"
const FACTS = "../lib/seat-facts.ts"
const SUBAGENT_PAGES = "../lib/subagent-page.ts"
const SEAT_PAGE = "../lib/seat-page.ts"
const TMUX = "../lib/launch-seat-tmux.ts"
const PROC = "../lib/proc-scan.ts"

const realHandle = { ...(await import(HANDLE)) }
const realFacts = { ...(await import(FACTS)) }
const realSubagentPages = { ...(await import(SUBAGENT_PAGES)) }
const realSeatPage = { ...(await import(SEAT_PAGE)) }
const realTmux = { ...(await import(TMUX)) }
const realProc = { ...(await import(PROC)) }

const SEAT_ID = "019ec7c0-4f3e-713b-b150-8ba2d5a5bce6"

const SEAT_NAME = "agent-harness-worker-flex-9"

interface Standing {
  readonly name: string
  readonly dispatchedAs: string
}

let standing: readonly Standing[] = []

let clearedFor: string[] = []

let seatPagesTaken: string[] = []

mock.module(HANDLE, () => ({ ...realHandle, resolveSeatTargetCli: async () => SEAT_ID }))

mock.module(FACTS, () => ({
  ...realFacts,
  seatRecord: () => ({
    id: SEAT_ID,
    userId: "test",
    name: SEAT_NAME,
    persona: null,
    domain: "agent-harness",
    role: "worker",
    mode: "headless",
    parentAgentId: null,
    present: true,
    presence: "present",
    interactive: false,
    supervisorPid: null,
  }),
}))

mock.module(SUBAGENT_PAGES, () => ({
  ...realSubagentPages,
  standingSubagentsOf: () => standing,
  removeSubagentPagesOf: (seat: string) => {
    clearedFor.push(seat)
    return { kind: "removed" }
  },
}))

mock.module(SEAT_PAGE, () => ({
  ...realSeatPage,
  removeSeatPage: (seat: string) => {
    seatPagesTaken.push(seat)
    return { kind: "removed" }
  },
}))

mock.module(TMUX, () => ({ ...realTmux, killSeatSession: async () => true }))

mock.module(PROC, () => ({ ...realProc, scanProcEntries: () => ({ ok: true, entries: [] }) }))

afterAll(() => {
  mock.module(HANDLE, () => realHandle)
  mock.module(FACTS, () => realFacts)
  mock.module(SUBAGENT_PAGES, () => realSubagentPages)
  mock.module(SEAT_PAGE, () => realSeatPage)
  mock.module(TMUX, () => realTmux)
  mock.module(PROC, () => realProc)
})

const seatStop = (await import("../commands/seat/stop.ts")).default

type Write = typeof process.stdout.write

async function stop(args: readonly string[]): Promise<void> {
  const original: Write = process.stdout.write.bind(process.stdout)
  process.stdout.write = ((): boolean => true) as Write
  try {
    await seatStop(args)
  } finally {
    process.stdout.write = original
  }
}

beforeEach(() => {
  standing = []
  clearedFor = []
  seatPagesTaken = []
})

describe("a stop takes the subagent pages of the seat it ends", () => {
  test("a forced stop takes them, the subagents dying inside the process it kills", async () => {
    standing = [
      { name: `${SEAT_NAME}--a1`, dispatchedAs: "general-purpose" },
      { name: `${SEAT_NAME}--a2`, dispatchedAs: "Explore" },
    ]
    await stop([SEAT_ID, "--force"])
    expect(clearedFor).toEqual([SEAT_ID])
    expect(seatPagesTaken).toEqual([SEAT_ID])
  })

  test("a plain stop takes them too, so one path covers both", async () => {
    await stop([SEAT_ID])
    expect(clearedFor).toEqual([SEAT_ID])
  })
})

describe("a stop that is refused", () => {
  test("takes no subagent page, nothing having ended", async () => {
    standing = [{ name: `${SEAT_NAME}--a1`, dispatchedAs: "general-purpose" }]
    await expect(stop([SEAT_ID])).rejects.toThrow()
    expect(clearedFor).toEqual([])
    expect(seatPagesTaken).toEqual([])
  })
})
