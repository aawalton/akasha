import { expect, test } from "bun:test"
import { type Fixture, fixture } from "./fixture.ts"
import { indexFixture, namedIn, plantSeat, seatStore } from "./seat-fixture.ts"

const SEAT_COMMAND = `${import.meta.dir}/../seat.ts`

const LIVE = `${import.meta.dir}/../..`

const AGENT = "3f2a1b4c-5d6e-7f80-9a1b-2c3d4e5f6011"

interface Run {
  readonly code: number
  readonly out: string
  readonly err: string
}

function seat(at: Fixture, args: readonly string[]): Run {
  const run = Bun.spawnSync(["bun", SEAT_COMMAND, "--agent", AGENT, ...args], {
    env: { ...process.env, AKASHA_ROOT: at.root, CODE_ROOT: LIVE, HOME: at.home },
  })
  return { code: run.exitCode, out: run.stdout.toString(), err: run.stderr.toString() }
}

function plant(at: Fixture): void {
  seatStore(at)
  namedIn(at)
  plantSeat(at, {
    agent: AGENT,
    name: "athena",
    persona: "athena",
    domain: "global",
    role: "definer",
    principal: "alan",
  })
  indexFixture(at)
}

test("a page holding attributes and no mode reads headless, and says nothing recorded one", () => {
  const at = fixture()
  try {
    plant(at)
    const shown = seat(at, ["--show"])

    expect(shown.code).toBe(0)
    expect(shown.out).toContain(`${"mode".padEnd(8)} headless`)
    expect(shown.out).toContain("nothing recorded one")
  } finally {
    at.dispose()
  }
})

test("states an attribute against that page without being given a mode", () => {
  const at = fixture()
  try {
    plant(at)
    const stated = seat(at, ["--persona", "athena", "--principal", "alan"])

    expect(stated.code).toBe(0)
    expect(stated.out).toContain(`${"persona".padEnd(8)} athena`)
  } finally {
    at.dispose()
  }
})

test("a recorded mode is what is read back, with no note about an absence", () => {
  const at = fixture()
  try {
    plant(at)
    expect(seat(at, ["--mode", "interactive"]).code).toBe(0)
    const shown = seat(at, ["--show"])

    expect(shown.out).toContain(`${"mode".padEnd(8)} interactive`)
    expect(shown.out).not.toContain("nothing recorded one")
  } finally {
    at.dispose()
  }
})
