
import { describe, expect, test } from "bun:test"
import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import { type Fixture, fixture } from "./fixture.ts"
import { plantSeat } from "./seat-fixture.ts"
import { statedOf } from "../lib/seat-stated.ts"
import { type Sources, initiativeFinishedIn, readSeat, unfinishedOf } from "../lib/seat-sweep.ts"

const QUOTE =
  `- ["A seat's mode is whether it has a code editor terminal."](../../instructions/pages/property/seat-mode.md)`

function saying(): Sources {
  return { initiativeFinished: () => false }
}

function heldBy(agent: string, from: Sources): readonly string[] {
  return unfinishedOf(statedOf(agent), from)
}

function plantInitiative(at: Fixture, relPath: string, body: string): void {
  const absolute = `${at.memory}/${relPath}`
  mkdirSync(dirname(absolute), { recursive: true })
  writeFileSync(absolute, body, "utf8")
}

describe("the kinds that never finish", () => {
  test("holds a task on presence, nothing observable ending one", () => {
    const at = fixture()
    try {
      plantSeat(at, { agent: "verifying", task: "verify-handback" })
      expect(readSeat(statedOf("verifying"), saying())).toEqual({
        held: ["task:verify-handback"],
      })
    } finally {
      at.dispose()
    }
  })

  test("an on-call is held on presence, having no work to finish", () => {
    const at = fixture()
    try {
      plantSeat(at, { agent: "standing-by", onCall: true })
      expect(heldBy("standing-by", saying())).toEqual(["on-call"])
    } finally {
      at.dispose()
    }
  })

  test("a seat stating nothing at all holds nothing", () => {
    const at = fixture()
    try {
      expect(heldBy("silent", saying())).toEqual([])
    } finally {
      at.dispose()
    }
  })
})

describe("a seat carrying several at once", () => {
  test("names every unfinished one rather than stopping at the first", () => {
    const at = fixture()
    try {
      plantInitiative(at, "pages/initiative/athena/seat.initiative.md", `---\nslug: seat\n---\n\n# Intent\n\n${QUOTE}\n`)
      plantSeat(at, { agent: "loaded", task: "verify-handback", initiative: "seat" })
      expect(heldBy("loaded", saying())).toEqual(["task:verify-handback", "initiative:seat"])
    } finally {
      at.dispose()
    }
  })
})

describe("an initiative is read off its document", () => {
  test("is unfinished while its file stands, an empty `# Intent` being a stub rather than a close", () => {
    const at = fixture()
    try {
      plantInitiative(at, "pages/initiative/athena/empty.initiative.md", "---\ndomain: seat\n---\n\n# Intent\n")
      plantInitiative(at, "pages/initiative/athena/one-left.initiative.md", `---\ndomain: seat\n---\n\n# Intent\n\n${QUOTE}\n`)
      const finished = initiativeFinishedIn(at.memory)
      expect(finished("empty")).toBe(false)
      expect(finished("one-left")).toBe(false)
    } finally {
      at.dispose()
    }
  })

  test("is finished where its document is gone, a memory document being deleted when complete", () => {
    const at = fixture()
    try {
      plantInitiative(at, "pages/initiative/athena/retired.initiative.md", `# Intent\n\n${QUOTE}\n`)
      expect(initiativeFinishedIn(at.memory)("retired")).toBe(false)
      rmSync(`${at.memory}/pages/initiative/athena/retired.initiative.md`)
      expect(initiativeFinishedIn(at.memory)("retired")).toBe(true)
      expect(initiativeFinishedIn(at.memory)("never-existed")).toBe(true)
    } finally {
      at.dispose()
    }
  })

  test("keeps a seat held where the initiative it names still stands", () => {
    const at = fixture()
    try {
      plantInitiative(at, "pages/initiative/athena/seat.initiative.md", `---\nslug: seat\n---\n\n# Intent\n\n${QUOTE}\n`)
      plantSeat(at, { agent: "holder", initiative: "seat" })
      const from: Sources = { initiativeFinished: initiativeFinishedIn(at.memory) }
      expect(heldBy("holder", from)).toEqual(["initiative:seat"])
    } finally {
      at.dispose()
    }
  })
})
