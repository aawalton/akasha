import { describe, expect, test } from "bun:test"
import { existsSync, readFileSync, readdirSync } from "node:fs"
import { type Fixture, fixture } from "./fixture.ts"
import { indexFixture, namedIn, seatStore } from "./seat-fixture.ts"

const SEAT_COMMAND = `${import.meta.dir}/../seat.ts`

const LIVE = `${import.meta.dir}/../..`

const AGENT = "3f2a1b4c-5d6e-7f80-9a1b-2c3d4e5f6071"

function statedIn(at: Fixture, args: readonly string[]): { code: number; out: string; err: string } {
  const run = Bun.spawnSync(["bun", SEAT_COMMAND, "--agent", AGENT, ...args], {
    env: { ...process.env, AKASHA_ROOT: at.root, CODE_ROOT: LIVE, HOME: at.home },
  })
  return { code: run.exitCode, out: run.stdout.toString(), err: run.stderr.toString() }
}

const SEATS = "agent/seat"

const RECORDER = "agent-one.seat.md"

function pageIn(at: Fixture, seatName: string): string | null {
  const path = `${at.root}/${SEATS}/${seatName}.seat.md`
  return existsSync(path) ? readFileSync(path, "utf8") : null
}

describe("what one statement leaves in a fixture", () => {
  test("the page stands under the name the attributes spell, with nothing having answered for the row", () => {
    const at = fixture()
    try {
      seatStore(at)
      namedIn(at)
      indexFixture(at)
      const stated = statedIn(at, [
        "--persona", "athena", "--domain", "global", "--role", "definer",
        "--principal", "alan", "--mode", "headless",
      ])

      expect(stated.code).toBe(0)
      expect(readdirSync(`${at.root}/${SEATS}`).sort()).toEqual([RECORDER, "athena.seat.md"])
      const page = pageIn(at, "athena")
      expect(page).toContain(`id: ${AGENT}`)
      expect(page).toContain("persona-slug: athena")
      expect(page).toContain("domain-slug: domain/global")
      expect(page).toContain("role-slug: definer")
      expect(page).toContain("person-slug: alan")
      expect(page).toContain("start-mode: headless")
    } finally {
      at.dispose()
    }
  })

  test("a later statement is written into the one page, beside what the first left", () => {
    const at = fixture()
    try {
      seatStore(at)
      namedIn(at)
      indexFixture(at)
      statedIn(at, ["--persona", "athena", "--domain", "global", "--role", "definer", "--principal", "alan", "--mode", "headless"])
      const again = statedIn(at, ["--task", "change-instructions"])

      expect(again.code).toBe(0)
      expect(readdirSync(`${at.root}/${SEATS}`).sort()).toEqual([RECORDER, "athena.seat.md"])
      const page = pageIn(at, "athena")
      expect(page).toContain("task-slug: change-instructions")
      expect(page).toContain("role-slug: definer")
    } finally {
      at.dispose()
    }
  })

  test("a statement spelling a name but composing no body fails loudly, leaving no page", () => {
    const at = fixture()
    try {
      seatStore(at)
      namedIn(at)
      indexFixture(at)
      const stated = statedIn(at, ["--persona", "athena", "--principal", "alan"])

      expect(stated.code).not.toBe(0)
      expect(stated.err).toContain("was not written")
      expect(pageIn(at, "athena")).toBeNull()
    } finally {
      at.dispose()
    }
  })

  test("re-stating what already stands changes no body and still succeeds", () => {
    const at = fixture()
    try {
      seatStore(at)
      namedIn(at)
      indexFixture(at)
      const said = [
        "--persona", "athena", "--domain", "global", "--role", "definer",
        "--principal", "alan", "--mode", "headless",
      ]
      const first = statedIn(at, said)
      const wrote = pageIn(at, "athena")
      const again = statedIn(at, said)

      expect(first.code).toBe(0)
      expect(again.code).toBe(0)
      expect(pageIn(at, "athena")).toBe(wrote)
    } finally {
      at.dispose()
    }
  })
})
