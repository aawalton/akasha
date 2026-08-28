import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { reminderAt, selfRemindersOf } from "../lib/reminder-file.ts"

const ROOT = "/var/tmp/reminder-file-test"

const STOOD = process.env.AKASHA_ROOT

function reminder(recipient: string, name: string, stated: Record<string, string>): string {
  const dir = `${ROOT}/pages/reminder/${recipient}`
  mkdirSync(dir, { recursive: true })
  const head = Object.entries(stated)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n")
  const at = `${dir}/${name}.reminder.md`
  writeFileSync(at, `---\npage-type-slug: reminder\n${head}\n---\n\nlook at the thing\n`)
  return at
}

beforeAll(() => {
  rmSync(ROOT, { recursive: true, force: true })
  process.env.AKASHA_ROOT = ROOT
  reminder("athena", "own", { to: "athena", from: "athena", schedule: "hourly" })
  reminder("athena", "handed-over", { to: "athena", from: "supervisor", schedule: "hourly" })
  reminder("athena", "no-schedule", { to: "athena", from: "athena" })
  reminder("ryn", "sent-onward", { to: "ryn", from: "athena", schedule: "hourly" })
})

afterAll(() => {
  rmSync(ROOT, { recursive: true, force: true })
  if (STOOD === undefined) delete process.env.AKASHA_ROOT
  else process.env.AKASHA_ROOT = STOOD
})

describe("which reminders stand as a turn start the seat itself arranged", () => {
  test("one the seat set for itself stands, and one handed to it by somebody else does not", () => {
    expect(selfRemindersOf("athena").map((one) => one.relPath)).toEqual([
      "pages/reminder/athena/own.reminder.md",
    ])
  })

  test("one the seat set for another seat stands against neither of them", () => {
    expect(selfRemindersOf("ryn")).toEqual([])
  })

  test("a seat nothing was ever addressed to has none", () => {
    expect(selfRemindersOf("nobody")).toEqual([])
  })

  test("a page naming no schedule is no reminder, whoever set it", () => {
    expect(selfRemindersOf("athena").map((one) => one.relPath)).not.toContain(
      "pages/reminder/athena/no-schedule.reminder.md"
    )
  })
})

describe("what one reminder says", () => {
  test("the body is everything under the frontmatter, which is what gets sent", () => {
    const at = reminder("athena", "spoken", { to: "athena", from: "athena", schedule: "hourly" })
    expect(reminderAt(at, "pages/reminder/athena/spoken.reminder.md", "spoken")?.body.trim()).toBe("look at the thing")
  })

  test("a warrant nothing states is an announcement rather than a claim to be waited on", () => {
    const at = reminder("athena", "unstated", { to: "athena", from: "athena", schedule: "hourly" })
    expect(reminderAt(at, "pages/reminder/athena/unstated.reminder.md", "unstated")?.warrant).toBe("announce")
  })
})
