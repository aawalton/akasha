import { describe, expect, it } from "bun:test"
import { pagesClient, trackingLevels, trackingResolve } from "../lib/tracking-capability.ts"
import { type ActivityDifficulty } from "../lib/tracking/levels"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

async function runCli(
  args: readonly string[]
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const proc = Bun.spawn(["bun", CLI_PATH, "tracking", "activity-set", ...args], {
    stdout: "pipe",
    stderr: "pipe",
    env: process.env,
  })
  const [stdout, stderr] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ])
  await proc.exited
  return { stdout, stderr, exitCode: proc.exitCode ?? -1 }
}

describe("ops tracking activity-set — an activity with no title rates nothing", () => {
  it.each([
    ["no arguments", [] as readonly string[]],
    ["an empty title", ["--title", "", "--difficulty", "1"]],
    ["a whitespace-only title", ["--title", "   ", "--difficulty", "1"]],
  ])("%s → exit 1 naming --title, and nothing written", async (_case, args) => {
    const result = await runCli(args)
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--title")
    expect(result.stdout).toBe("")
  })
})

describe("ops tracking activity-set — an activity with no default rates nothing", () => {
  it.each([
    ["a bare title", ["Read"]],
    ["an empty --difficulty", ["Read", "--difficulty", ""]],
  ])("%s → exit 1 naming --difficulty, and nothing written", async (_case, args) => {
    const result = await runCli(args)
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--difficulty")
    expect(result.stdout).toBe("")
  })
})

describe("ops tracking activity-set — the 0…5 half-step scale", () => {
  it.each([
    ["above the scale", "9"],
    ["below the scale", "-1"],
    ["off the half-step grid", "1.3"],
    ["not a number at all", "abc"],
  ])("%s (%p) → exit 1, and nothing written", async (_case, level) => {
    const result = await runCli(["Read", "--difficulty", level])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain(level)
    expect(result.stdout).toBe("")
  })
})

describe("ops tracking activity-set — arg parsing", () => {
  it("unknown flag → stderr names the flag, exit 1", async () => {
    const result = await runCli(["Read", "--difficulty", "1", "--bogus"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--bogus")
    expect(result.stdout).toBe("")
  })
})

let held: readonly ActivityDifficulty[] | null = null

async function catalog(): Promise<readonly ActivityDifficulty[]> {
  if (held !== null) return held
  const { getPageAccessClient } = await pagesClient()
  const { listSessionActivities } = await trackingResolve()
  held = await listSessionActivities(getPageAccessClient())
  return held
}

describe("ops tracking activity-set — the catalog it writes reads back rated", () => {
  it("carries a numeric default on every activity standing in the catalog", async () => {
    const standing = await catalog()
    expect(standing.length).toBeGreaterThan(0)
    const unread = standing
      .filter((one) => typeof one.defaultDifficulty !== "number")
      .map((one) => one.title)
    expect(unread).toEqual([])
  })

  it("rates each activity's own title at no less than the default it states", async () => {
    const standing = await catalog()
    const { resolveDifficulty } = await trackingLevels()
    expect(standing.length).toBeGreaterThan(0)
    for (const one of standing) {
      const rated = Number(resolveDifficulty(undefined, one.title, standing))
      expect(rated).toBeGreaterThanOrEqual(Number(one.defaultDifficulty))
    }
  })
})
