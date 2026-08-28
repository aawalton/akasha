import { afterAll, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { rootsNamed } from "../../repo/roots/roots.ts"
import { seatFromHistory } from "../lib/seat-page-history.ts"

const TREE = mkdtempSync("/var/tmp/seat-from-history-")

const ROOTS = rootsNamed({ akasha: TREE })

const SPAWNED = "01a03511-92ef-7000-8000-000000000001"

const OPENED = "01a03511-92ef-7000-8000-000000000002"

const TAKEN_OVER = "01a03511-92ef-7000-8000-000000000003"

function git(...args: readonly string[]): void {
  Bun.spawnSync(["git", "-C", TREE, ...args], { stdout: "ignore", stderr: "ignore" })
}

function commitPage(name: string, lines: readonly string[]): void {
  mkdirSync(`${TREE}/agent/seat`, { recursive: true })
  writeFileSync(
    `${TREE}/agent/seat/${name}.seat.md`,
    ["---", "page-type-slug: seat", `title: "${name}"`, ...lines, "---", ""].join("\n"),
    "utf8"
  )
  git("add", "-A")
  git("commit", "-q", "-m", `${name}: the seat page is composed from what the seat states`)
}

function stopTakesThePage(name: string): void {
  rmSync(`${TREE}/agent/seat/${name}.seat.md`)
  git("add", "-A")
  git("commit", "-q", "-m", `${name} stopped, deliberate, so its page goes`)
}

git("init", "-q", ".")
git("config", "user.email", "history@fixture")
git("config", "user.name", "history fixture")

commitPage("history-spawned-worker-flex-3", [
  `id: ${SPAWNED}`,
  "domain-slug: agent-harness",
  "role-slug: worker",
  "principal-seat-name: amy",
  "start-mode: headless",
  "on-call: true",
  "task-slug: change-instructions",
  'errand: "carry the reset initiative"',
  "registration-account: aawalton",
])
stopTakesThePage("history-spawned-worker-flex-3")

commitPage("history-opened-worker", [
  `id: ${OPENED}`,
  "persona-slug: athena",
  "domain-slug: agent-harness",
  "role-slug: worker",
  "person-slug: alan",
  "start-mode: interactive",
])
stopTakesThePage("history-opened-worker")

commitPage("history-retaken-worker", [
  `id: ${TAKEN_OVER}`,
  "domain-slug: agent-harness",
  "role-slug: worker",
  "principal-seat-name: amy",
])
stopTakesThePage("history-retaken-worker")
commitPage("history-retaken-worker", [
  "id: 01a03511-92ef-7000-8000-00000000000f",
  "domain-slug: agent-harness",
  "role-slug: worker",
  "principal-seat-name: amy",
])

afterAll(() => {
  rmSync(TREE, { recursive: true, force: true })
})

describe("what a stopped seat's last committed page gives back", () => {
  test("a seat spawned for the fleet answers to the fleet, and names the seat above it", () => {
    const was = seatFromHistory(SPAWNED, ROOTS)
    expect({
      seatName: was?.seatName,
      domain: was?.set.domain,
      role: was?.set.role,
      task: was?.set.task,
      principal: was?.principal,
      parentName: was?.parentName,
      mode: was?.mode,
      onCall: was?.onCall,
      errand: was?.errand,
      account: was?.account,
    }).toEqual({
      seatName: "history-spawned-worker-flex-3",
      domain: "agent-harness",
      role: "worker",
      task: "change-instructions",
      principal: "agent",
      parentName: "amy",
      mode: "headless",
      onCall: true,
      errand: "carry the reset initiative",
      account: "aawalton",
    })
  })

  test("a seat opened by a person answers to that person, and names no seat above it", () => {
    const was = seatFromHistory(OPENED, ROOTS)
    expect({
      persona: was?.set.persona,
      principal: was?.principal,
      parentName: was?.parentName,
      mode: was?.mode,
      onCall: was?.onCall,
      account: was?.account,
    }).toEqual({
      persona: "athena",
      principal: "alan",
      parentName: null,
      mode: "interactive",
      onCall: false,
      account: null,
    })
  })

  test("a page a later seat took the name of is not read back as this agent's", () => {
    expect(seatFromHistory(TAKEN_OVER, ROOTS)).toBeNull()
  })

  test("an agent no seat page in this history ever named gives nothing back", () => {
    expect(seatFromHistory("01a03511-92ef-7000-8000-0000000000ff", ROOTS)).toBeNull()
  })
})
