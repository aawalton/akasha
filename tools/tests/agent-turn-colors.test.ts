import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import { cpSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { ownRepoRoot } from "../../repo/roots/roots.ts"
import { colorsOfStates, main } from "../agent-turn-colors.ts"
import { colorsOf } from "../lib/agent-turn-drawn.ts"
import { SEAT_TURN_STATES } from "../lib/seat-turn-state.ts"

const DRAWN: Record<string, string | null> = {
  busy: "green",
  arranged: "blue",
  quiet: "yellow",
  gone: null,
}

const colorOf = (agent: string): string | null => DRAWN[agent] ?? null

const made: string[] = []

afterAll(() => {
  for (const one of made) rmSync(one, { recursive: true, force: true })
})

describe("the color each named seat is drawn in", () => {
  test("a seat drawn in a color stands under its own id", () => {
    expect(colorsOf(["busy", "arranged", "quiet"], colorOf)).toEqual({
      busy: "green",
      arranged: "blue",
      quiet: "yellow",
    })
  })

  test("a seat drawn in no color is left out rather than carrying null", () => {
    const found = colorsOf(["busy", "gone"], colorOf)
    expect(found).toEqual({ busy: "green" })
    expect("gone" in found).toBe(false)
  })

  test("naming none answers an empty object, a window holding no seat being no fault", () => {
    expect(colorsOf([], colorOf)).toEqual({})
  })

  test("one id named twice stands once, the answer being keyed by the seat", () => {
    expect(colorsOf(["busy", "busy"], colorOf)).toEqual({ busy: "green" })
  })
})

describe("which ids the seats own records answer for", () => {
  const stood = process.env.AKASHA_ROOT
  let akasha: string
  const DRAWN_ON: Record<string, string> = {
    working: "green",
    "idle-pending": "blue",
    idle: "yellow",
    "idle-on-call": "green",
    stopped: "text",
  }
  const seatPage = (name: string): string =>
    `---\npage-type-slug: seat\nid: ${name}\ntitle: "${name}"\n---\n`
  const domainPage = (slug: string, color: string): string =>
    `---\npage-type-slug: domain\nslug: ${slug}\ncolor-slug: ${color}\n---\n`

  beforeAll(() => {
    akasha = mkdtempSync(`${tmpdir()}/agent-turn-colors-`)
    made.push(akasha)
    mkdirSync(`${akasha}/.git`, { recursive: true })
    mkdirSync(`${akasha}/agent/seat`, { recursive: true })
    mkdirSync(`${akasha}/pages/repo`, { recursive: true })
    cpSync(`${ownRepoRoot()}/pages/repo`, `${akasha}/pages/repo`, { recursive: true })
    mkdirSync(`${akasha}/pages/domain`, { recursive: true })
    for (const [state, color] of Object.entries(DRAWN_ON)) {
      const slug = `agent-turn-${state}`
      writeFileSync(`${akasha}/pages/domain/${slug}.domain.md`, domainPage(slug, color))
    }
    writeFileSync(`${akasha}/agent/seat/older-seat.seat.md`, seatPage("older-seat"))
    writeFileSync(
      `${akasha}/agent/seat/older-seat.seat.uncommitted.yaml`,
      'turn:\n  value: "allow:none"\n  at: 100\n'
    )
    writeFileSync(`${akasha}/agent/seat/never-ran.seat.md`, seatPage("never-ran"))
    process.env.AKASHA_ROOT = akasha
  })

  afterAll(() => {
    if (stood === undefined) delete process.env.AKASHA_ROOT
    else process.env.AKASHA_ROOT = stood
  })

  test("an id keeping nothing is absent, so nothing paints a tab that holds no seat", () => {
    expect(colorsOf(["kept-nothing"])).toEqual({})
  })

  test("a seat that kept its attributes and no turn is drawn stopped, never having taken one", () => {
    expect(colorsOf(["never-ran"])).toEqual({ "never-ran": "text" })
  })

  test("a seat keeping a turn end but no stamp is answered for, an older seat being idle", () => {
    expect(Object.keys(colorsOf(["older-seat"]))).toEqual(["older-seat"])
  })
})

describe("asking by turn state rather than by agent", () => {
  test("a state answers the color its own domain states", () => {
    expect(colorsOfStates(["working"]).colors).toEqual({ working: "green" })
  })

  test("a name no state carries comes back unspelled rather than quietly absent", () => {
    expect(colorsOfStates(["busy"]).unspelled).toEqual(["busy"])
  })

  test("every state answers a color, so a drawer holding one is never left without", () => {
    expect(Object.keys(colorsOfStates(SEAT_TURN_STATES).colors)).toEqual([...SEAT_TURN_STATES])
  })
})

describe("what the command takes", () => {
  test("ids and states in one call are refused, a key standing for two things being unreadable", () => {
    expect(main(["some-id", "--state", "working"])).toBe(1)
  })

  test("a state flag with no name after it is refused rather than read as an id", () => {
    expect(main(["--state"])).toBe(1)
  })

  test("a name no state carries is refused rather than answered with less than was asked", () => {
    expect(main(["--state", "busy"])).toBe(1)
  })
})
