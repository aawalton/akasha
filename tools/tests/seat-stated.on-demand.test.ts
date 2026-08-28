import { describe, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { type Fixture, fixture, installRepos } from "./fixture.ts"
import { type Planted, plantInitiative, plantSeat } from "./seat-fixture.ts"
import { statedOf } from "../lib/seat-stated.ts"

const MODULE = `${import.meta.dir}/../lib/seat-stated.ts`

function unrunning(): string {
  return crypto.randomUUID()
}

function everyKey(agent: string): Planted {
  return {
    agent,
    name: "athena-flex-2-seat-worker",
    persona: "athena",
    domain: "seat",
    role: "worker",
    task: "verify-handback",
    above: "aine",
    mode: "interactive",
    onCall: true,
    initiative: "seat",
  }
}

function plantWhole(at: Fixture, agent: string): void {
  plantInitiative(at, "initiatives/seat.md", "seat")
  plantSeat(at, everyKey(agent))
}

describe("a seat page with no live process", () => {
  test("is answered whole, for an id nothing is running under", () => {
    const at = fixture()
    try {
      const agent = unrunning()
      plantWhole(at, agent)

      const held = statedOf(agent)

      expect(held.agent).toBe(agent)
      expect(held.onCall).toBe(true)
      expect(held.initiative?.value).toBe("seat")
      expect(held.task?.value).toBe("verify-handback")
      expect(held.mode).toBe("interactive")
      expect(held.principal?.value).toBe("agent")
    } finally {
      at.dispose()
    }
  })

  test("is read with nothing on PATH to shell out to", () => {
    const at = fixture()
    try {
      const agent = unrunning()
      plantWhole(at, agent)
      installRepos(at.root)
      const script = `${at.home}/read-one.ts`
      writeFileSync(
        script,
        `import { statedOf } from ${JSON.stringify(MODULE)}\n` +
          "console.log(JSON.stringify(statedOf(process.argv[2])))\n"
      )

      const run = Bun.spawnSync([process.execPath, script, agent], { env: { HOME: at.home, AKASHA_ROOT: at.root, PATH: "" } })

      expect(run.stderr.toString()).toBe("")
      expect(run.exitCode).toBe(0)
      const held = JSON.parse(run.stdout.toString()) as ReturnType<typeof statedOf>
      expect(held.onCall).toBe(true)
      expect(held.task?.value).toBe("verify-handback")
    } finally {
      at.dispose()
    }
  })
})

describe("what the value carries", () => {
  test("a seat with no page is answered rather than refused, and says nothing in every field", () => {
    const at = fixture()
    try {
      const held = statedOf(unrunning())

      expect(held.attributes).toEqual({})
      expect(held.flex).toBe(null)
      expect(held.recordedMode).toBe(null)
      expect(held.principal).toBe(null)
      expect(held.onCall).toBe(false)
      expect(held.initiative).toBe(null)
      expect(held.mode).toBe("headless")
    } finally {
      at.dispose()
    }
  })

  test("reads an on-call assignment standing on its own", () => {
    const at = fixture()
    try {
      const agent = unrunning()
      plantSeat(at, { agent, onCall: true })

      const held = statedOf(agent)

      expect(held.onCall).toBe(true)
    } finally {
      at.dispose()
    }
  })

  test("a subagent that stated nothing reads its seat's, as every reader under it does", () => {
    const at = fixture()
    try {
      const seat = unrunning()
      plantWhole(at, seat)

      const held = statedOf(`${seat}--sub`)

      expect(held.agent).toBe(`${seat}--sub`)
      expect(held.onCall).toBe(true)
      expect(held.attributes.persona?.slug).toBe("athena")
      expect(held.initiative?.value).toBe("seat")
    } finally {
      at.dispose()
    }
  })
})
