
import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { statedForPage } from "../lib/supervisor-heartbeat-beat.ts"
import {
  setCurrentAgentIdForSelfHeal,
  setCurrentSessionIdForSelfHeal,
} from "../lib/supervisor-self-heal-state.ts"

const AGENT = "0193aaaa-bbbb-4ccc-8ddd-eeeeffff4444"

const ELSEWHERE = "0193aaaa-bbbb-4ccc-8ddd-eeeeffff5555"

const COMPOSED = "11111111-2222-4333-8444-555555555555"

const RUNNING = "99999999-8888-4777-8666-555555555555"

const stood = process.env.MEMORY_ROOT

let memory: string

beforeAll(() => {
  memory = mkdtempSync(`${tmpdir()}/heartbeat-session-`)
  mkdirSync(`${memory}/seats`, { recursive: true })
  writeFileSync(
    `${memory}/seats/amy.md`,
    [
      "---",
      "page-type-slug: seat",
      `id: ${AGENT}`,
      'title: "amy"',
      "domain-slug: seat",
      "role-slug: definer",
      "person-slug: alan",
      `claude-code-session-uuid: ${COMPOSED}`,
      "---",
      "",
    ].join("\n")
  )
  process.env.MEMORY_ROOT = memory
})

afterEach(() => {
  setCurrentAgentIdForSelfHeal(null)
  setCurrentSessionIdForSelfHeal(null)
})

afterAll(() => {
  if (stood === undefined) delete process.env.MEMORY_ROOT
  else process.env.MEMORY_ROOT = stood
  rmSync(memory, { recursive: true, force: true })
})

describe("which session the beat composes into a seat's page", () => {
  test("is the one this supervisor is running, so a new session reaches the page", () => {
    setCurrentAgentIdForSelfHeal(AGENT)
    setCurrentSessionIdForSelfHeal(RUNNING)

    expect(statedForPage(AGENT).session?.value).toBe(RUNNING)
  })

  test("is what stands where this supervisor runs some other agent", () => {
    setCurrentAgentIdForSelfHeal(ELSEWHERE)
    setCurrentSessionIdForSelfHeal(RUNNING)

    expect(statedForPage(AGENT).session?.value).toBe(COMPOSED)
  })

  test("is what stands where nothing is running, so a beat outside a supervisor composes the same", () => {
    expect(statedForPage(AGENT).session?.value).toBe(COMPOSED)
  })

  test("is what stands where the running session is no uuid at all", () => {
    setCurrentAgentIdForSelfHeal(AGENT)
    setCurrentSessionIdForSelfHeal("not-a-uuid")

    expect(statedForPage(AGENT).session?.value).toBe(COMPOSED)
  })
})
