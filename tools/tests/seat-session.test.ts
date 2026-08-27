
import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { sessionOf } from "../lib/seat-session.ts"

const SEATED = "0193aaaa-bbbb-4ccc-8ddd-eeeeffff1111"

const PAGED = "0193aaaa-bbbb-4ccc-8ddd-eeeeffff2222"

const ON_PAGE = "11111111-2222-4333-8444-555555555555"

const STATED = "99999999-8888-4777-8666-555555555555"

const stoodMemory = process.env.MEMORY_ROOT

const stoodHome = process.env.HOME

let memory: string

let home: string

function page(agent: string, seat: string, session: string): void {
  writeFileSync(
    `${memory}/seats/${seat}.md`,
    [
      "---",
      "page-type-slug: seat",
      `id: ${agent}`,
      `title: "${seat}"`,
      "domain-slug: seat",
      "role-slug: definer",
      "person-slug: alan",
      `claude-code-session-uuid: ${session}`,
      "---",
      "",
    ].join("\n")
  )
}

beforeAll(() => {
  memory = mkdtempSync(`${tmpdir()}/seat-session-memory-`)
  home = mkdtempSync(`${tmpdir()}/seat-session-home-`)
  mkdirSync(`${memory}/seats`, { recursive: true })
  page(SEATED, "stating", STATED)
  page(PAGED, "paged", ON_PAGE)
  process.env.MEMORY_ROOT = memory
  process.env.HOME = home
})

afterAll(() => {
  if (stoodMemory === undefined) delete process.env.MEMORY_ROOT
  else process.env.MEMORY_ROOT = stoodMemory
  if (stoodHome === undefined) delete process.env.HOME
  else process.env.HOME = stoodHome
  rmSync(memory, { recursive: true, force: true })
  rmSync(home, { recursive: true, force: true })
})

describe("which session a seat is read as running", () => {
  test("is the one its page states, which the supervisor writes beside the process it runs", () => {
    expect(sessionOf(SEATED)?.value).toBe(STATED)
  })

  test("is the page's for a seat with no process, so a stopped seat still answers", () => {
    expect(sessionOf(PAGED)?.value).toBe(ON_PAGE)
  })

  test("is nothing at all for a seat neither names", () => {
    expect(sessionOf("0193aaaa-bbbb-4ccc-8ddd-eeeeffff3333")).toBe(null)
  })
})
