import { afterAll, describe, expect, it } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync, symlinkSync } from "node:fs"
import { resolve } from "node:path"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

const LIVE = resolve(import.meta.dir, "..", "..")

// WHERE A SEAT PAGE STANDS, one place and one spelling: `SEAT_PLACES` in `agent-page-place.ts` is
// `{ repo: "akasha", dir: "agent/seat" }`, and a page written there is `<name>.seat.md`.
const SEATS = "agent/seat"

/**
 * A fleet of this test's own, standing where the one variable that names a fleet points.
 *
 * `AKASHA_ROOT` ANSWERS TWO QUESTIONS AT ONCE and they cannot be split: `ops` builds its whole
 * command set out of it — `akashaCommands`, `declaredCommands` and `commandDocuments` each read
 * `akashaRoot()` — and a seat page is written to `agent/seat` under it. This test used to set
 * `MEMORY_ROOT`, which nothing reads, so every case below ran `ops seat start` against the LIVE
 * checkout, and the two cases that mint reached the live fleet — which is the one thing the last
 * describe here says must not happen. Pointing a bare temp directory at `AKASHA_ROOT` instead
 * answers `ops: unknown command`, there being no commands under it.
 *
 * So every top-level entry of the live checkout is stood here by symlink, `agent` and `.git`
 * excepted: the commands and the pages are the live ones, while `agent/seat` is this test's alone.
 */
function fleetApart(): string {
  const root = mkdtempSync("/var/tmp/ops-seat-start-")
  for (const entry of readdirSync(LIVE)) {
    if (entry === "agent" || entry === ".git") continue
    symlinkSync(`${LIVE}/${entry}`, `${root}/${entry}`)
  }
  mkdirSync(`${root}/${SEATS}`, { recursive: true })
  Bun.spawnSync(["git", "init", "-q", "-b", "main", "."], { cwd: root })
  return root
}

const AWAY_FROM_THE_FLEET = fleetApart()

function standsInTheFleet(seatName: string): boolean {
  // THIS ASKED `resolveRoots().memory`, a repository absorbed into akasha and so named by no
  // `pages/repo` page: `resolveRoots` never puts a key there, the path read `undefined/pages/…`,
  // and this answered `false` for every name it was ever handed.
  return existsSync(`${AWAY_FROM_THE_FLEET}/${SEATS}/${seatName}.seat.md`)
}

const VALID_UUID = "11111111-1111-4111-8111-111111111111"

const DATABASE_ENV = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"] as const

function held(key: string): boolean {
  return (process.env[key] ?? "") !== ""
}

async function runCli(
  args: readonly string[],
  env: Record<string, string | undefined> = {}
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const baseEnv = { ...process.env }
  delete baseEnv.AGENT_ID
  for (const key of DATABASE_ENV) delete baseEnv[key]
  const proc = Bun.spawn(["bun", CLI_PATH, "seat", "start", ...args], {
    stdout: "pipe",
    stderr: "pipe",
    env: { ...baseEnv, AKASHA_ROOT: AWAY_FROM_THE_FLEET, ...env },
  })
  const [stdout, stderr] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ])
  await proc.exited
  return { stdout, stderr, exitCode: proc.exitCode ?? -1 }
}

afterAll(() => {
  rmSync(AWAY_FROM_THE_FLEET, { recursive: true, force: true })
})

describe("ops seat start — every valued flag consumes its value", () => {
  const VALUED = [
    ["--start-mode", "interactive"],
    ["--prompt", "some work"],
    ["--flex", "flex-1"],
    ["--initiative", "some-initiative"],
    ["--account", "aawalton"],
    ["--model", "some-model"],
    ["--anthropic-base-url", "http://127.0.0.1:1/"],
    ["--anthropic-auth-token", "some-token"],
  ] as const

  for (const [flag, value] of VALUED) {
    it(`${flag} takes its value rather than leaving it as a positional`, async () => {
      const result = await runCli([flag, value], { AGENT_ID: VALID_UUID })
      expect(result.stderr).not.toContain("unexpected positional")
      expect(result.stderr).not.toContain(`unknown flag: ${flag}`)
    })
  }
})

describe("ops seat start — arg parsing", () => {
  it("nothing stated still spells a name, and no declared shape admits it", async () => {
    const result = await runCli([], { AGENT_ID: VALID_UUID })
    expect(result.exitCode).toBe(1)
    expect(result.stdout).toBe("")
  })

  it("--start-mode headless with no prompt names the prompt, exit 1", async () => {
    const result = await runCli(["--start-mode", "headless", "--domain", "agent-harness", "--role", "worker"], {
      AGENT_ID: VALID_UUID,
    })
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--prompt")
  })

  it("a --start-mode outside the vocabulary is refused, naming what was given", async () => {
    const result = await runCli(["--start-mode", "spawned"], {
      AGENT_ID: VALID_UUID,
    })
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--start-mode")
    expect(result.stderr).toContain("spawned")
    expect(result.stdout).toBe("")
  })

  it("no AGENT_ID → refused, a fleet seat naming nobody above it answering to somebody nothing can name", async () => {
    const result = await runCli([])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("names no agent above it")
    expect(result.stderr).toContain("AGENT_ID")
    expect(result.stdout).toBe("")
  })

  it("a stated --agent-id is refused, whatever it names", async () => {
    const result = await runCli(["writer-bot", "--agent-id", VALID_UUID], { AGENT_ID: VALID_UUID })
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--agent-id")
    expect(result.stdout).toBe("")
  })

  it("a parent carries it past the parentage read, leaving the start to refuse on its own grounds", async () => {
    const result = await runCli(["writer-bot"], { AGENT_ID: VALID_UUID })
    expect(result.stderr).not.toContain("names no agent above it")
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("disagrees")
  })

  it("a malformed AGENT_ID is still refused, naming it", async () => {
    const result = await runCli([], { AGENT_ID: "not-a-uuid" })
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("invalid agent id")
  })

  it("unknown flag → stderr names the flag, exit 1", async () => {
    const result = await runCli(["--bogus"], { AGENT_ID: VALID_UUID })
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--bogus")
  })
})

describe("ops seat start — stated identity", () => {
  for (const slot of ["--domain", "--role", "--task"]) {
    it(`${slot} is a flag this command takes`, async () => {
      const result = await runCli([slot, "no-such-document"], { AGENT_ID: VALID_UUID })
      expect(result.exitCode).toBe(1)
      expect(result.stderr).toContain("no-such-document")
      expect(result.stderr).not.toContain(`unknown flag: ${slot}`)
    })
  }

  it("a persona alone is refused, a seat answering as somebody only where the one it answers to is a person", async () => {
    const result = await runCli(["--persona", "athena"], { AGENT_ID: VALID_UUID })
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("athena")
    expect(result.stdout).toBe("")
  })

  it("a principal naming neither a person nor the fleet is refused, naming what was given", async () => {
    const result = await runCli(["--principal", "nobody-at-all"], { AGENT_ID: VALID_UUID })
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("nobody-at-all")
    expect(result.stdout).toBe("")
  })

  it("a handler states the persona itself, read off the person it serves, so the stated slots reach the mint under the name that person's identity spells", async () => {
    const result = await runCli(["--domain", "ki", "--role", "handler", "--no-launch"], {
      AGENT_ID: VALID_UUID,
    })
    expect(result.stderr).not.toContain("disagrees")
    expect(result.exitCode).toBe(0)
    expect(result.stdout.trim()).toMatch(/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/)
  })

  it("a flag that is not one of them still refuses, naming itself", async () => {
    const result = await runCli(["--identity", "x"], { AGENT_ID: VALID_UUID })
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--identity")
  })

  it("a stated slug naming no document refuses, before anything is minted", async () => {
    const result = await runCli(["--role", "no-such-role"], {
      AGENT_ID: VALID_UUID,
    })
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("no-such-role")
    expect(result.stderr).toContain("worker")
    expect(result.stdout).toBe("")
  })

  it("refuses a typed name beside stated slots, naming what was typed", async () => {
    const result = await runCli(
      ["worker-17646", "--role", "worker", "--domain", "seat"],
      { AGENT_ID: VALID_UUID }
    )
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("worker-17646")
    expect(result.stdout).toBe("")
  })
})

describe("the suite cannot reach the fleet, whatever it is given", () => {
  it("the #18163 input is refused before the mint, disagreeing with what its slots spell", async () => {
    const result = await runCli(["start-suite-must-not-mint"], { AGENT_ID: VALID_UUID })
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("disagrees")
    expect(result.stderr).toContain("start-suite-must-not-mint")
    expect(result.stdout).toBe("")
  })

  it("a start that does go through leaves no seat behind in the fleet", async () => {
    const result = await runCli(["--domain", "agent-harness", "--role", "worker", "--no-launch"], {
      AGENT_ID: VALID_UUID,
    })
    expect(result.exitCode).toBe(0)
    expect(standsInTheFleet("agent-harness-worker")).toBe(false)
  })

  const credentialled = DATABASE_ENV.every((key) => held(key))
  it.skipIf(!credentialled)(
    "the parent process does hold the credentials, so the deletion is not a no-op",
    () => {
      for (const key of DATABASE_ENV) {
        expect({ key, held: held(key) }).toEqual({ key, held: true })
      }
    }
  )
})
