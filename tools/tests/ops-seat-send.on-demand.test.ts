import { describe, expect, it } from "bun:test"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

const VALID_UUID = "11111111-1111-1111-1111-111111111111"
const VALID_UUID_2 = "22222222-2222-2222-2222-222222222222"

async function runCli(
  args: readonly string[],
  env: Record<string, string | undefined> = {}
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const baseEnv = { ...process.env }
  delete baseEnv.AGENT_ID
  const proc = Bun.spawn(["bun", CLI_PATH, "seat", "send", ...args], {
    stdout: "pipe",
    stderr: "pipe",
    env: { ...baseEnv, ...env },
  })
  const [stdout, stderr] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ])
  await proc.exited
  return { stdout, stderr, exitCode: proc.exitCode ?? -1 }
}

describe("ops seat send — arg parsing", () => {
  it("no recipient named → NOT an arg error; it defaults to the sender's principal, exit 2", async () => {
    const result = await runCli(["--content", "hi"], { AGENT_ID: VALID_UUID })
    expect(result.exitCode).toBe(2)
    expect(result.stderr.toLowerCase()).toContain("sender")
  })

  it("--to and the positional disagree → refused, naming both surfaces, exit 1", async () => {
    const result = await runCli([VALID_UUID_2, "--to", "some-other-seat", "--content", "hi"], {
      AGENT_ID: VALID_UUID,
    })
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--to")
    expect(result.stderr).toContain(VALID_UUID_2)
  })

  it("--to UUID but no --content / --content-file → stderr names both, exit 1", async () => {
    const result = await runCli(["--to", VALID_UUID_2], { AGENT_ID: VALID_UUID })
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--content")
    expect(result.stderr).toContain("--content-file")
  })

  it("positional UUID but no --content / --content-file → same refusal as --to, exit 1", async () => {
    const result = await runCli([VALID_UUID_2], { AGENT_ID: VALID_UUID })
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--content")
    expect(result.stderr).toContain("--content-file")
  })

  it("invalid --to (rejected by UUID, prefix, and name shapes) → stderr says invalid, exit 1", async () => {
    const result = await runCli(["--to", "Not-A-Uuid", "--content", "hi"], {
      AGENT_ID: VALID_UUID,
    })
    expect(result.exitCode).toBe(1)
    expect(result.stderr.toLowerCase()).toContain("invalid")
    expect(result.stderr).toContain("Not-A-Uuid")
  })

  it("invalid recipient given POSITIONALLY is refused by the same shape gate, exit 1", async () => {
    const result = await runCli(["Not-A-Uuid", "--content", "hi"], { AGENT_ID: VALID_UUID })
    expect(result.exitCode).toBe(1)
    expect(result.stderr.toLowerCase()).toContain("invalid")
    expect(result.stderr).toContain("Not-A-Uuid")
  })

  it("a NAME given to --to is an address: it clears the shape gate and reaches the resolver", async () => {
    for (const name of ["devops-operator", "amy"]) {
      const result = await runCli(["--to", name, "--content", "hi"], { AGENT_ID: VALID_UUID })
      expect(result.exitCode).toBe(2)
      expect(result.stderr.toLowerCase()).not.toContain("invalid")
      expect(result.stderr).not.toContain("is a name")
    }
  })

  it("UUID-prefix shape --to 019e65b4 → passes the offline target-shape gate (not 'invalid'), exit 2", async () => {
    const result = await runCli(["--to", "019e65b4", "--content", "hi"], {
      AGENT_ID: VALID_UUID,
    })
    expect(result.exitCode).toBe(2)
    expect(result.stderr.toLowerCase()).not.toContain("invalid")
  })

  it("missing AGENT_ID and no --from → error names the SENDER slot, not the recipient, exit 1", async () => {
    const result = await runCli(["--to", VALID_UUID_2, "--content", "hi"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr.toLowerCase()).toContain("sender")
    expect(result.stderr).toContain("--from")
    expect(result.stderr).toContain("AGENT_ID")
    expect(result.stderr.toLowerCase()).toContain("recipient")
  })

  it("--from and its --agent-id alias disagree → agreement error names both surfaces, exit 1", async () => {
    const result = await runCli([
      "--to",
      VALID_UUID_2,
      "--content",
      "hi",
      "--from",
      "a-name",
      "--agent-id",
      "b-name",
    ])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--from")
    expect(result.stderr).toContain("--agent-id")
  })

  it("--content and --content-file together → stderr says mutually exclusive, exit 1", async () => {
    const result = await runCli(["--to", VALID_UUID_2, "--content", "hi", "--content-file", "-"], {
      AGENT_ID: VALID_UUID,
    })
    expect(result.exitCode).toBe(1)
    expect(result.stderr.toLowerCase()).toContain("mutually exclusive")
  })

  it("unknown flag → stderr names the flag, exit 1", async () => {
    const result = await runCli(["--to", VALID_UUID_2, "--bogus"], { AGENT_ID: VALID_UUID })
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--bogus")
  })

  it("bare '-' passed to --content is refused before any DB lookup, pointing at --content-file, exit 1", async () => {
    const result = await runCli(["--to", VALID_UUID_2, "--content", "-"], { AGENT_ID: VALID_UUID })
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--content-file")
  })

  it("empty --content is refused as an empty message, exit 1", async () => {
    const result = await runCli(["--to", VALID_UUID_2, "--content", ""], { AGENT_ID: VALID_UUID })
    expect(result.exitCode).toBe(1)
    expect(result.stderr.toLowerCase()).toContain("empty")
  })
})

describe("ops seat send — --blocked claims the sender is waiting, or nothing does", () => {
  it("explicit --from with no --blocked is NOT refused — it claims nobody is waiting", async () => {
    const result = await runCli(["--to", VALID_UUID_2, "--content", "hi", "--from", VALID_UUID])
    expect(result.stderr).not.toContain("--blocked")
  })

  it("ambient AGENT_ID with no --blocked passes the offline gate — the reply comes back here", async () => {
    const result = await runCli(["--to", VALID_UUID_2, "--content", "hi"], { AGENT_ID: VALID_UUID })
    expect(result.stderr).not.toContain("--blocked")
  })

  it("explicit --from WITH --blocked passes the offline gate", async () => {
    const result = await runCli([
      "--to",
      VALID_UUID_2,
      "--content",
      "hi",
      "--from",
      VALID_UUID,
      "--blocked",
    ])
    expect(result.stderr).not.toContain("--blocked")
  })
})
