import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { stateSpawnedSeat } from "../lib/state-spawned-seat.ts"

const AGENT = "01a0aaaa-bbbb-7ccc-8ddd-eeeeffff0000"

const stood = process.env.AKASHA_ROOT

let root: string

const CALLS = "calls.jsonl"

function recorder(exit: number, complaint: string): string {
  return [
    'import { appendFileSync } from "node:fs"',
    `appendFileSync(\`\${import.meta.dir}/${CALLS}\`, (await Bun.stdin.text()) + "\\n")`,
    complaint === "" ? "" : `process.stderr.write(${JSON.stringify(complaint)})`,
    `process.exit(${exit})`,
  ].join("\n")
}

function answers(exit: number, complaint = ""): void {
  writeFileSync(`${root}/tools/seat-call.ts`, recorder(exit, complaint))
}

function made(): readonly Record<string, unknown>[] {
  const at = `${root}/tools/${CALLS}`
  if (!existsSync(at)) return []
  return readFileSync(at, "utf8")
    .split("\n")
    .filter((one) => one.trim() !== "")
    .map((one) => JSON.parse(one) as Record<string, unknown>)
}

beforeAll(() => {
  root = mkdtempSync("/var/tmp/state-spawned-seat-")
  mkdirSync(`${root}/tools`, { recursive: true })
  process.env.AKASHA_ROOT = root
})

afterEach(() => {
  rmSync(`${root}/tools/${CALLS}`, { force: true })
})

afterAll(() => {
  if (stood === undefined) delete process.env.AKASHA_ROOT
  else process.env.AKASHA_ROOT = stood
  rmSync(root, { recursive: true, force: true })
})

describe("what a spawned seat is told it is", () => {
  test("reaches the command in one call, so its file stands from that call", async () => {
    answers(0)

    const unstated = await stateSpawnedSeat({
      agentId: AGENT,
      mode: "headless",
      principal: "alan",
      persona: "amy",
      domain: "seat",
      role: "definer",
      task: "review-instructions",
      flex: "flex-2",
      initiative: "seats-backed-by-files",
      parentName: "amy",
      account: "aawalton",
    })

    expect(unstated).toEqual([])
    expect(made()).toEqual([
      {
        agent: AGENT,
        mode: "headless",
        principal: "alan",
        flex: "flex-2",
        initiative: "seats-backed-by-files",
        errand: null,
        parentName: "amy",
        account: "aawalton",
        persona: "amy",
        domain: "seat",
        role: "definer",
        task: "review-instructions",
      },
    ])
  })

  test("names nothing it was not given, an empty string counting as nothing", async () => {
    answers(0)

    await stateSpawnedSeat({
      agentId: AGENT,
      mode: "headless",
      principal: "alan",
      domain: "seat",
      role: "definer",
      flex: "",
      initiative: null,
      parentName: "",
      account: "",
    })

    expect(made()).toEqual([
      {
        agent: AGENT,
        mode: "headless",
        principal: "alan",
        flex: null,
        initiative: null,
        errand: null,
        parentName: null,
        account: null,
        domain: "seat",
        role: "definer",
      },
    ])
  })

  test("comes back carrying what the command refused, rather than which part it was", async () => {
    answers(1, "refused:\n  initiative: nothing under initiatives/ is named `no-such`\n")

    const unstated = await stateSpawnedSeat({
      agentId: AGENT,
      mode: "headless",
      principal: "alan",
      domain: "seat",
      role: "definer",
      initiative: "no-such",
    })

    expect(unstated.length).toBe(1)
    expect(unstated[0]).toContain("nothing under initiatives/ is named `no-such`")
    expect(made().length).toBe(1)
  })
})
