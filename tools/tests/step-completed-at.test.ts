import { afterAll, expect, it } from "bun:test"
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import type { Roots } from "../../page/page.ts"
import { applyEffect, transition } from "../lib/sweep-pipeline-pages/effects.ts"
import { LAUNCHING, PASSED, RUNNING, STEP } from "../lib/sweep-pipeline-pages/statuses.ts"
import { readUncommitted, writeUncommitted } from "../../page/uncommitted/uncommitted.ts"

const LIVE = `${import.meta.dir}/../..`
const STEP_TYPE = "pages/page-type/step.page-type.md"
const made: string[] = []

afterAll(() => {
  for (const one of made) rmSync(one, { recursive: true, force: true })
})

function stepStanding(seq: string, status: string): Roots {
  const root = mkdtempSync("/var/tmp/step-completed-at-")
  made.push(root)
  mkdirSync(`${root}/pages/page-type`, { recursive: true })
  copyFileSync(`${LIVE}/${STEP_TYPE}`, `${root}/${STEP_TYPE}`)
  mkdirSync(`${root}/pages/step`, { recursive: true })
  const path = `${root}/pages/step/${seq}.step.md`
  writeFileSync(path, `---\npage-type-slug: step\nseq: ${seq}\ntitle: a-step\n---\n`, "utf8")
  writeUncommitted(path, { status })
  return { akasha: root }
}

function heldFor(roots: Roots, seq: string): Record<string, unknown> {
  return (readUncommitted(`${roots.akasha}/pages/step/${seq}.step.md`) ?? {}) as Record<string, unknown>
}

it("a step reaching a terminal status records when it finished", () => {
  const roots = stepStanding("1", RUNNING)
  expect(applyEffect(roots, transition(STEP, "1", RUNNING, PASSED, "a-guard", { "exit-code": 0 }))).toBe(true)
  const held = heldFor(roots, "1")
  expect(held.status).toBe(PASSED)
  expect(held["exit-code"]).toBe(0)
  expect(typeof held["completed-at"]).toBe("string")
  expect(Number.isNaN(Date.parse(String(held["completed-at"])))).toBe(false)
})

it("a step that has only started records no finish time", () => {
  const roots = stepStanding("2", LAUNCHING)
  expect(
    applyEffect(roots, transition(STEP, "2", LAUNCHING, RUNNING, "a-guard", { "started-at": "2026-01-01T00:00:00Z" }))
  ).toBe(true)
  const held = heldFor(roots, "2")
  expect(held.status).toBe(RUNNING)
  expect(held["started-at"]).toBe("2026-01-01T00:00:00Z")
  expect(held["completed-at"]).toBeUndefined()
})

it("a finish time an effect states itself is the one kept", () => {
  const roots = stepStanding("3", RUNNING)
  const stated = "2026-02-02T02:02:02Z"
  expect(
    applyEffect(roots, transition(STEP, "3", RUNNING, PASSED, "a-guard", { "completed-at": stated }))
  ).toBe(true)
  expect(heldFor(roots, "3")["completed-at"]).toBe(stated)
})

it("an effect whose expected status has moved on writes nothing", () => {
  const roots = stepStanding("4", RUNNING)
  expect(applyEffect(roots, transition(STEP, "4", LAUNCHING, PASSED, "a-guard"))).toBe(false)
  const held = heldFor(roots, "4")
  expect(held.status).toBe(RUNNING)
  expect(held["completed-at"]).toBeUndefined()
})
