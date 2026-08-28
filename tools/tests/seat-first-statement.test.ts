import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, readdirSync, rmSync } from "node:fs"
import { resolveRoots } from "../../repo/roots/roots.ts"
import { seatPageBody } from "../lib/seat-page.ts"
import { type Said, statedNow } from "../lib/seat-stated.ts"
import { installPages, installRepos } from "./fixture.ts"

const AGENT = "01a0aaaa-bbbb-7ccc-8ddd-eeeeffff0000"

const SEAT = "athena-flex-2-review-instructions"

const ROTATED = "01a03200-0000-7000-8000-000000000000"

const RECORDER = "amy-interview-recorder"

const SEAT_DIR = "agent/seat"

const stoodRoot = process.env.AKASHA_ROOT

const stoodHome = process.env.HOME

let root: string

let home: string

beforeAll(() => {
  root = mkdtempSync("/var/tmp/seat-first-statement-root-")
  home = mkdtempSync("/var/tmp/seat-first-statement-home-")
  mkdirSync(`${root}/${SEAT_DIR}`, { recursive: true })
  Bun.spawnSync(["git", "init", "-q", "-b", "main", "."], { cwd: root })
  installRepos(root)
  installPages(root, ["pages/person/alan.person.md", "pages/page-type/seat.page-type.md"])
  process.env.AKASHA_ROOT = root
  process.env.HOME = home
})

afterAll(() => {
  if (stoodRoot === undefined) delete process.env.AKASHA_ROOT
  else process.env.AKASHA_ROOT = stoodRoot
  if (stoodHome === undefined) delete process.env.HOME
  else process.env.HOME = stoodHome
  rmSync(root, { recursive: true, force: true })
  rmSync(home, { recursive: true, force: true })
})

function said(over: Partial<Said> = {}): Said {
  return {
    clear: [],
    errand: null,
    flex: null,
    initiative: null,
    mode: "headless",
    onCall: false,
    principal: "alan",
    registration: null,
    task: null,
    ...over,
  }
}

const held = {
  persona: { slug: "amy" },
  domain: { slug: "seat" },
  role: { slug: "definer" },
}

describe("the first thing a spawned seat states", () => {
  test("composes a whole page with no store standing under it", () => {
    expect(readdirSync(`${root}/${SEAT_DIR}`)).toEqual([])

    const body = seatPageBody(statedNow(AGENT, held, said({})), SEAT, resolveRoots())

    expect(body).not.toBe(null)
    expect(body).toContain(`id: ${AGENT}`)
    expect(body).toContain("persona-slug: amy")
    expect(body).toContain("domain-slug: page-type/seat")
    expect(body).toContain("role-slug: definer")
    expect(body).toContain("person-slug: alan")
    expect(body).toContain("start-mode: headless")
  })

  test("states its seat name as its slug, a seat's file stem being its seat name", () => {
    const body = seatPageBody(statedNow(AGENT, held, said({})), SEAT, resolveRoots())

    expect(body).toContain(`slug: ${SEAT}`)
  })

  test("carries an on-call assignment taken in the same breath", () => {
    const body = seatPageBody(statedNow(AGENT, held, said({ onCall: true })), SEAT, resolveRoots())

    expect(body).toContain("on-call: true")
  })

  test("carries the errand it was started with, which a reset would otherwise lose", () => {
    const body = seatPageBody(
      statedNow(AGENT, held, said({ errand: "settle the domain layer" })),
      SEAT,
      resolveRoots()
    )

    expect(body).toContain('errand: "settle the domain layer"')
  })

  test("carries the account it was started with, the page being the only record of it", () => {
    const body = seatPageBody(
      statedNow(AGENT, held, said({ registration: "aawalton" })),
      SEAT,
      resolveRoots()
    )

    expect(body).toContain("registration-account: aawalton")
  })

  test("clips an errand past the ceiling, the page stating rather than transcribing", () => {
    const body = seatPageBody(
      statedNow(AGENT, held, said({ errand: "x".repeat(1200) })),
      SEAT,
      resolveRoots()
    )

    expect(body).toContain(`errand: "${"x".repeat(1000)}\u2026"`)
  })

  test("carries a rotation stated on it, which the composed page would otherwise drop", () => {
    const stated = statedNow(AGENT, held, said({}))

    const body = seatPageBody({ ...stated, rotated: { value: ROTATED } }, SEAT, resolveRoots())

    expect(body).toContain(`rotated-session-uuid: ${ROTATED}`)
  })

  test("carries the recipient its turns go on to, which the composed page would otherwise drop", () => {
    const stated = statedNow(AGENT, held, said({}))

    const body = seatPageBody({ ...stated, forwardsTo: { value: RECORDER } }, SEAT, resolveRoots())

    expect(body).toContain(`forwards-turns-to: ${RECORDER}`)
  })

  test("is refused where it names no principal, a seat being unnameable without one", () => {
    expect(seatPageBody(statedNow(AGENT, held, said({ principal: null })), SEAT, resolveRoots())).toBe(null)
  })

  test("is refused where it names no role, which is what a statement in pieces leaves", () => {
    const partial = { persona: { slug: "amy" }, domain: { slug: "seat" } }

    expect(seatPageBody(statedNow(AGENT, partial, said()), SEAT, resolveRoots())).toBe(null)
  })
})
