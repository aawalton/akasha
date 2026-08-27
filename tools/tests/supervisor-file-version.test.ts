
import { describe, expect, it } from "bun:test"
import {
  CEILING_MS,
  DEBOUNCE_MS,
  NOTHING_DELIVERED,
  decideVersionDelivery,
  supervisorFileSet,
  type VersionWatch,
} from "../lib/supervisor-file-version.ts"
import { AGENT_SETTINGS_PATH } from "../lib/supervisor-spawn-settings.ts"

const OLD = "aaaa"

const NEW = "bbbb"

const NEWER = "cccc"

const SETTLED: VersionWatch = { delivered: OLD, steady: null, changedSinceMs: null }

describe("decideVersionDelivery", () => {
  it("delivers the first reading it ever sees", () => {
    const verdict = decideVersionDelivery(NOTHING_DELIVERED, OLD, 0)
    expect(verdict.deliver).toBe(true)
    expect(verdict.next.delivered).toBe(OLD)
  })

  it("holds a change back until it has stood still for the debounce", () => {
    const armed = decideVersionDelivery(SETTLED, NEW, 0)
    expect(armed.deliver).toBe(false)
    const early = decideVersionDelivery(armed.next, NEW, DEBOUNCE_MS - 1)
    expect(early.deliver).toBe(false)
    const held = decideVersionDelivery(early.next, NEW, DEBOUNCE_MS)
    expect(held.deliver).toBe(true)
    expect(held.next.delivered).toBe(NEW)
  })

  it("restarts the debounce when the reading changes again", () => {
    const armed = decideVersionDelivery(SETTLED, NEW, 0)
    const moved = decideVersionDelivery(armed.next, NEWER, DEBOUNCE_MS - 1)
    expect(moved.deliver).toBe(false)
    const early = decideVersionDelivery(moved.next, NEWER, DEBOUNCE_MS)
    expect(early.deliver).toBe(false)
    const held = decideVersionDelivery(early.next, NEWER, DEBOUNCE_MS * 2 - 1)
    expect(held.deliver).toBe(true)
  })

  it("delivers at the ceiling however long the readings keep moving", () => {
    let watch = decideVersionDelivery(SETTLED, NEW, 0).next
    let at = 0
    while (at < CEILING_MS) {
      at += DEBOUNCE_MS - 1
      const verdict = decideVersionDelivery(watch, `${NEW}${at}`, at)
      watch = verdict.next
      if (verdict.deliver) break
    }
    expect(at).toBeGreaterThanOrEqual(CEILING_MS)
    expect(watch.delivered).toBe(`${NEW}${at}`)
  })

  it("forgets a change that goes back to what is already delivered", () => {
    const armed = decideVersionDelivery(SETTLED, NEW, 0)
    const back = decideVersionDelivery(armed.next, OLD, DEBOUNCE_MS - 1)
    expect(back.deliver).toBe(false)
    expect(back.next).toEqual(SETTLED)
  })
})

const ENTRY = "/supervisor.ts"

describe("supervisorFileSet", () => {
  it("carries the agent settings document, which the supervisor reads and never imports", () => {
    const set = supervisorFileSet(ENTRY, (path) => (path === ENTRY ? "" : null))
    expect(set).toContain(AGENT_SETTINGS_PATH)
  })

  it("answers nothing where the entry reached nothing, rather than the data files alone", () => {
    expect(supervisorFileSet(ENTRY, () => null)).toEqual([])
  })
})
