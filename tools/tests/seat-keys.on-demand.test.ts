import { describe, expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { type Fixture, fixture } from "./fixture.ts"
import { indexFixture, namedIn, plantInitiative, seatStore } from "./seat-fixture.ts"

const SEAT_COMMAND = `${import.meta.dir}/../seat.ts`

const LIVE = `${import.meta.dir}/../..`

const AGENTS = [
  "3f2a1b4c-5d6e-7f80-9a1b-2c3d4e5f6001",
  "3f2a1b4c-5d6e-7f80-9a1b-2c3d4e5f6002",
  "3f2a1b4c-5d6e-7f80-9a1b-2c3d4e5f6003",
  "3f2a1b4c-5d6e-7f80-9a1b-2c3d4e5f6004",
] as const

function plant(at: Fixture): void {
  seatStore(at)
  namedIn(at)
  plantInitiative(at, "pages/initiative/seat-identity.initiative.md", "seat-identity")
  plantInitiative(at, "pages/initiative/delivery-flow.initiative.md", "delivery-flow")
  indexFixture(at)
}

interface Run {
  readonly code: number
  readonly out: string
  readonly err: string
}

function seat(at: Fixture, agent: string, args: readonly string[]): Run {
  const run = Bun.spawnSync(["bun", SEAT_COMMAND, "--agent", agent, ...args], {
    env: { ...process.env, AKASHA_ROOT: at.root, CODE_ROOT: LIVE, HOME: at.home },
  })
  return { code: run.exitCode, out: run.stdout.toString(), err: run.stderr.toString() }
}

const WHOLE = ["--persona", "athena", "--domain", "global", "--role", "definer", "--principal", "alan", "--mode", "headless"] as const

function seated(at: Fixture, agent: string): void {
  const run = seat(at, agent, WHOLE)
  if (run.code !== 0) throw new Error(`the seat was not stated: ${run.err}`)
}

function pageOf(at: Fixture): string | null {
  const path = `${at.root}/agent/seat/athena.seat.md`
  return existsSync(path) ? readFileSync(path, "utf8") : null
}

describe("setting the key beside the slots", () => {
  test("it holds one value, a second replaces it, and no slot is disturbed", () => {
    const at = fixture()
    try {
      plant(at)
      seated(at, AGENTS[0])
      const set = seat(at, AGENTS[0], ["--initiative", "seat-identity", "--initiative", "delivery-flow"])
      expect(set.code).toBe(0)
      const shown = seat(at, AGENTS[0], ["--show"])
      expect(shown.code).toBe(0)
      expect(shown.out).toContain("initiative delivery-flow")
      expect(shown.out).not.toContain("seat-identity")
      expect(shown.out).toContain(`${"persona".padEnd(8)} athena`)
    } finally {
      at.dispose()
    }
  })
})

describe("absence and clearing", () => {
  test("a seat stating none says so, in the register the slots use", () => {
    const at = fixture()
    try {
      plant(at)
      const shown = seat(at, AGENTS[2], ["--show"])
      expect(shown.code).toBe(0)
      expect(shown.out).toContain("initiative — none stated")
    } finally {
      at.dispose()
    }
  })

  test("--clear takes the key off the page rather than emptying it", () => {
    const at = fixture()
    try {
      plant(at)
      seated(at, AGENTS[3])
      seat(at, AGENTS[3], ["--initiative", "seat-identity"])
      expect(seat(at, AGENTS[3], ["--clear", "initiative"]).code).toBe(0)
      expect(pageOf(at)).not.toContain("initiative-slug")
      const shown = seat(at, AGENTS[3], ["--show"])
      expect(shown.out).toContain("initiative — none stated")
    } finally {
      at.dispose()
    }
  })
})

describe("what is refused at the moment of typing", () => {
  test("an initiative naming no file is refused, and nothing is written", () => {
    const at = fixture()
    try {
      plant(at)
      seated(at, AGENTS[0])
      const before = pageOf(at)
      const run = seat(at, AGENTS[0], ["--initiative", "no-such-initiative"])
      expect(run.code).toBe(1)
      expect(run.err).toContain("no-such-initiative")
      expect(run.err).toContain("seat-identity")
      expect(pageOf(at)).toBe(before)
    } finally {
      at.dispose()
    }
  })

  test("two files sharing a stem are refused rather than guessed apart", () => {
    const at = fixture()
    try {
      plant(at)
      plantInitiative(at, "pages/initiative/athena/seat-identity.initiative.md", "seat-identity")
      indexFixture(at)
      const run = seat(at, AGENTS[0], ["--initiative", "seat-identity"])
      expect(run.code).toBe(1)
      expect(run.err).toContain("pages/initiative/seat-identity.initiative.md")
      expect(run.err).toContain("pages/initiative/athena/seat-identity.initiative.md")
    } finally {
      at.dispose()
    }
  })
})

describe("--show still reads and writes nothing", () => {
  test("a call carrying --show and one of them is refused, and names it", () => {
    const at = fixture()
    try {
      plant(at)
      const run = seat(at, AGENTS[0], ["--show", "--initiative", "seat-identity"])
      expect(run.code).toBe(1)
      expect(run.err).toContain("reads what this seat states and writes nothing")
      expect(run.err).toContain("--initiative")
      expect(pageOf(at)).toBe(null)
    } finally {
      at.dispose()
    }
  })
})

describe("a subagent against its seat", () => {
  test("reads its seat's, having no page of its own", () => {
    const at = fixture()
    try {
      plant(at)
      seated(at, AGENTS[0])
      seat(at, AGENTS[0], ["--initiative", "seat-identity"])
      const shown = seat(at, `${AGENTS[0]}--sub`, ["--show"])
      expect(shown.out).toContain("initiative seat-identity")
    } finally {
      at.dispose()
    }
  })
})

describe("the on-call assignment", () => {
  test("is stated by presence, reads back, and is ended by --clear", () => {
    const at = fixture()
    try {
      plant(at)
      seated(at, AGENTS[0])
      expect(seat(at, AGENTS[0], ["--on-call"]).code).toBe(0)
      const held = seat(at, AGENTS[0], ["--show"])
      expect(held.code).toBe(0)
      expect(held.out).toContain("on-call  stated")
      expect(held.out).toContain(`${"persona".padEnd(8)} athena`)
      expect(seat(at, AGENTS[0], ["--clear", "on-call"]).code).toBe(0)
      expect(pageOf(at)).not.toContain("on-call")
      expect(seat(at, AGENTS[0], ["--show"]).out).toContain("on-call  — none stated")
    } finally {
      at.dispose()
    }
  })

  test("a call carrying --show and it is refused, and names it", () => {
    const at = fixture()
    try {
      plant(at)
      const run = seat(at, AGENTS[1], ["--show", "--on-call"])
      expect(run.code).toBe(1)
      expect(run.err).toContain("reads what this seat states and writes nothing")
      expect(run.err).toContain("--on-call")
      expect(pageOf(at)).toBe(null)
    } finally {
      at.dispose()
    }
  })

  test("spells nothing into the name", () => {
    const at = fixture()
    try {
      plant(at)
      const plain = seat(at, AGENTS[2], ["--name", "--persona", "athena", "--principal", "alan"])
      const alongside = seat(at, AGENTS[2], ["--name", "--persona", "athena", "--principal", "alan", "--on-call"])
      expect(plain.code).toBe(0)
      expect(alongside.code).toBe(0)
      expect(alongside.out).toBe(plain.out)
    } finally {
      at.dispose()
    }
  })
})

describe("--help", () => {
  test("names the initiative flag and offers every key to --clear", () => {
    const at = fixture()
    try {
      seatStore(at)
      const run = Bun.spawnSync(["bun", SEAT_COMMAND, "--help"], {
        env: { ...process.env, AKASHA_ROOT: at.root, CODE_ROOT: LIVE, HOME: at.home },
      })
      const text = run.stdout.toString()
      expect(text).toContain("--initiative <slug>")
      expect(text).toContain("persona, domain, role, task, initiative, errand, on-call, flex")
    } finally {
      at.dispose()
    }
  })
})
