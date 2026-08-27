import { describe, expect, it } from "bun:test"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

interface Ran {
  readonly stdout: string
  readonly stderr: string
  readonly exitCode: number
}

async function runCli(args: readonly string[]): Promise<Ran> {
  const proc = Bun.spawn(["bun", CLI_PATH, "ali", "next-unscored", ...args], {
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

interface Leaf {
  readonly path: string
  readonly label: string
  readonly status: string
}

function leafOf(ran: Ran): Leaf {
  expect(ran.exitCode).toBe(0)
  const parsed: unknown = JSON.parse(ran.stdout)
  if (typeof parsed !== "object" || parsed === null) throw new Error(`not an object: ${ran.stdout}`)
  const { path, label, status } = parsed as Record<string, unknown>
  expect(typeof path).toBe("string")
  expect(typeof label).toBe("string")
  expect(typeof status).toBe("string")
  return { path: String(path), label: String(label), status: String(status) }
}

describe("ops ali next-unscored — it draws from the unopened set and nowhere else", () => {
  it("the deterministic default hands back an unopened leaf", async () => {
    expect(leafOf(await runCli(["--json"])).status).toBe("unopened")
  })

  it("--random still draws only from the unopened set", async () => {
    for (const _ of [0, 1, 2]) {
      expect(leafOf(await runCli(["--random", "--json"])).status).toBe("unopened")
    }
  })

  it("--under scopes the draw without leaving that set", async () => {
    const whole = leafOf(await runCli(["--json"]))
    const branch = whole.path.split("/")[0] ?? ""
    expect(branch).not.toBe("")
    const scoped = leafOf(await runCli(["--under", branch, "--json"]))
    expect(scoped.path.startsWith(`${branch}/`)).toBe(true)
    expect(scoped.status).toBe("unopened")
  })
})

describe("ops ali next-unscored — the line it prints", () => {
  it("default output is exactly path, label and status, tab-separated", async () => {
    const ran = await runCli([])
    expect(ran.exitCode).toBe(0)
    const columns = ran.stdout.trimEnd().split("\t")
    expect(columns).toHaveLength(3)
    expect(columns[0]).toBeTruthy()
    expect(columns[1]).toBeTruthy()
    expect(columns[2]).toBe("unopened")
  })

  it("the default draw is a resumable cursor: repeated calls agree", async () => {
    const first = await runCli(["--json"])
    const second = await runCli(["--json"])
    expect(first.exitCode).toBe(0)
    expect(second.stdout).toBe(first.stdout)
  })
})

describe("ops ali next-unscored — arg parsing", () => {
  it("--under naming no node directory is the caller's mistake, exit 1", async () => {
    const ran = await runCli(["--under", "99-no-such-branch"])
    expect(ran.exitCode).toBe(1)
    expect(ran.stderr).toContain("99-no-such-branch")
    expect(ran.stderr.toLowerCase()).toContain("not a node directory")
    expect(ran.stdout).toBe("")
  })

  it("unknown flag → stderr names the flag, exit 1", async () => {
    const ran = await runCli(["--bogus"])
    expect(ran.exitCode).toBe(1)
    expect(ran.stderr).toContain("--bogus")
  })

  it("--help renders the per-command block naming both draw modes", async () => {
    const ran = await runCli(["--help"])
    expect(ran.exitCode).toBe(0)
    expect(ran.stdout).toContain("ops ali next-unscored")
    expect(ran.stdout).toContain("--random")
    expect(ran.stdout).toContain("--under")
  })
})
