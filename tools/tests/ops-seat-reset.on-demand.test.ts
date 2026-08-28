import { afterAll, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, readdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

const LIVE = resolve(import.meta.dir, "..", "..")

const SEATS = "agent/seat"

function fleetApart(): string {
  const root = mkdtempSync("/var/tmp/ops-seat-reset-")
  for (const entry of readdirSync(LIVE)) {
    if (entry === "agent" || entry === ".git") continue
    symlinkSync(`${LIVE}/${entry}`, `${root}/${entry}`)
  }
  mkdirSync(`${root}/${SEATS}`, { recursive: true })
  return root
}

const AWAY_FROM_THE_FLEET = fleetApart()

const SEATED = "019ec7c0-4f3e-713b-b150-8ba2d5a5bce6"

const UNSEATED = "11111111-1111-4111-8111-111111111111"

const WHOLE = "reset-probe-worker"

const SPARSE = "reset-sparse-worker"

const STOPPED = "reset-stopped-thin-worker"

function body(name: string, lines: readonly string[]): string {
  return ["---", "page-type-slug: seat", `title: "${name}"`, ...lines, "---", ""].join("\n")
}

function plant(name: string, lines: readonly string[]): void {
  mkdirSync(`${AWAY_FROM_THE_FLEET}/${SEATS}`, { recursive: true })
  writeFileSync(`${AWAY_FROM_THE_FLEET}/${SEATS}/${name}.seat.md`, body(name, lines), "utf8")
}

function git(...args: readonly string[]): void {
  Bun.spawnSync(["git", "-C", AWAY_FROM_THE_FLEET, ...args], { stdout: "ignore", stderr: "ignore" })
}

plant(WHOLE, [
  `id: ${SEATED}`,
  "domain-slug: agent-harness",
  "role-slug: worker",
  "person-slug: alan",
  "start-mode: interactive",
])

plant(SPARSE, ["id: 022bbbbb-2222-4222-8222-222222222222", "role-slug: worker"])

git("init", "-q")
git("config", "user.email", "reset@fixture")
git("config", "user.name", "reset fixture")

mkdirSync(`${AWAY_FROM_THE_FLEET}/${SEATS}`, { recursive: true })
writeFileSync(
  `${AWAY_FROM_THE_FLEET}/${SEATS}/${STOPPED}.seat.md`,
  body(STOPPED, [
    "id: 033ccccc-3333-4333-8333-333333333333",
    "role-slug: worker",
    "claude-code-session-uuid: 044ddddd-4444-4444-8444-444444444444",
  ]),
  "utf8"
)
git("add", "-A")
git("commit", "-q", "-m", `${STOPPED}: the seat page is composed from what the seat states`)
rmSync(`${AWAY_FROM_THE_FLEET}/${SEATS}/${STOPPED}.seat.md`)
git("add", "-A")
git("commit", "-q", "-m", `${STOPPED} stopped, deliberate, so its page goes`)

async function runCli(
  args: readonly string[],
  env: Record<string, string | undefined> = {}
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const baseEnv = { ...process.env }
  delete baseEnv.AGENT_ID
  const proc = Bun.spawn(["bun", CLI_PATH, "seat", "reset", ...args], {
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

describe("ops seat reset — the target is named, never defaulted", () => {
  it("no target is an input error even where $AGENT_ID names a seat that stands", async () => {
    const result = await runCli([], { AGENT_ID: SEATED })
    expect(result.exitCode).toBe(1)
    expect(result.stdout).toBe("")
    expect(result.stderr).not.toContain(WHOLE)
  })

  it("the seat running the command cannot reset itself, however it addresses itself", async () => {
    for (const handle of [WHOLE, SEATED, SEATED.slice(0, 8)]) {
      const result = await runCli([handle], { AGENT_ID: SEATED })
      expect({ handle, exitCode: result.exitCode, stdout: result.stdout }).toEqual({
        handle,
        exitCode: 1,
        stdout: "",
      })
    }
  })

  it("a seat that is not the caller's own is not refused as the caller's own", async () => {
    const result = await runCli([SPARSE], { AGENT_ID: SEATED })
    expect(result.stderr).not.toContain("running this command")
  })
})

describe("ops seat reset — nothing is taken before the input is settled", () => {
  it("a --start-mode outside the vocabulary refuses, naming what was given", async () => {
    const result = await runCli([SPARSE, "--start-mode", "spawned"], { AGENT_ID: UNSEATED })
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("spawned")
    expect(result.stdout).toBe("")
  })

  it("an unknown flag refuses, naming the flag", async () => {
    const result = await runCli([SPARSE, "--bogus"], { AGENT_ID: UNSEATED })
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--bogus")
    expect(result.stdout).toBe("")
  })

  for (const flag of ["--force", "--json"]) {
    it(`${flag} is a flag this command takes rather than a positional`, async () => {
      const result = await runCli([SPARSE, flag], { AGENT_ID: UNSEATED })
      expect(result.stderr).not.toContain(`unknown flag: ${flag}`)
      expect(result.stderr).not.toContain("unexpected positional")
    })
  }
})

describe("ops seat reset — a seat nothing states is refused, not restarted bare", () => {
  it("a page standing that states no domain, role and principal is a data error", async () => {
    const result = await runCli([SPARSE], { AGENT_ID: UNSEATED })
    expect(result.exitCode).toBe(2)
    expect(result.stdout).toBe("")
  })

  it("a stopped seat whose committed page states no more is a data error too, not a guess", async () => {
    const result = await runCli([STOPPED], { AGENT_ID: UNSEATED })
    expect(result.exitCode).toBe(2)
    expect(result.stdout).toBe("")
  })
})
