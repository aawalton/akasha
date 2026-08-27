
import { afterAll, describe, expect, it } from "bun:test"
import { unlink } from "node:fs/promises"
import { join } from "node:path"
import {
  type Classified,
  FIXTURE_ACCOUNTS,
  runSn as runSnAgainst,
  SCRATCH_ROOT,
  type SnRun,
  supervisorLine,
} from "./aw-front.ts"
import { generateBashInit } from "../aw/init/bash.ts"

const tmpFile = join(SCRATCH_ROOT, `aw-sn-axes-test-${Date.now()}.sh`)
await Bun.write(tmpFile, generateBashInit(FIXTURE_ACCOUNTS))

afterAll(async () => {
  await unlink(tmpFile).catch(() => {})
})

function runSn(args?: readonly string[], classified?: Classified): Promise<SnRun> {
  return runSnAgainst(tmpFile, args, classified)
}

describe("sn() sorts its tokens into slots rather than reading them by position", () => {
  const seated = { role: "reviewer", domain: "code-quality", persona: "aria" } as const
  const sorted = { role: "reviewer", domain: "code-quality" } as const
  const both = {
    ...seated,
    personaSlugs: ["aria"],
    seatCommand: "present",
    sorted,
    preClaimId: "aid-sorted",
  } as const

  it("hands every token after the persona to the seat command, and states all three slots", async () => {
    const { launched, stderr, exitCode } = await runSn(["aria", "reviewer", "code-quality"], both)
    expect(exitCode).toBe(0)
    expect(launched).toContain(
      'tools/seat-call.ts {"resolve":true,"token":["reviewer","code-quality"]}'
    )
    expect(launched).toContain(
      'tools/seat-call.ts {"agent":"aid-sorted","persona":"aria","domain":"code-quality",' +
        '"role":"reviewer","principal":"alan"}'
    )
    expect(stderr).not.toContain("seat not stated")
  })

  it("claims ONE row for either ordering of the same two tokens", async () => {
    const forward = await runSn(["aria", "reviewer", "code-quality"], both)
    const reversed = await runSn(["aria", "code-quality", "reviewer"], both)
    const bound =
      "seat start --start-mode interactive --persona aria --principal alan --role reviewer --domain code-quality"
    expect(forward.opsCalls).toContain(bound)
    expect(reversed.opsCalls).toContain(bound)
    expect(forward.opsCalls).toContain("seat stop aria-reviewer")
    expect(reversed.opsCalls).toContain("seat stop aria-reviewer")
    expect(reversed.opsCalls).not.toContain("seat stop aria-code-quality")
  })

  it("does not move the name a two-token invocation already composed", async () => {
    const { opsCalls } = await runSn(["aria", "reviewer"], {
      ...both,
      sorted: { role: "reviewer" },
    })
    expect(opsCalls).toContain("seat stop aria-reviewer")
    expect(opsCalls).toContain("seat start --start-mode interactive --persona aria --principal alan --role reviewer")
  })

  it("leaves a bare persona name bare, sorting nothing", async () => {
    const { launched, opsCalls } = await runSn(["aria"], {
      ...both,
      role: "reviewer",
      domain: "code-quality",
      persona: "aria",
    })
    expect(opsCalls).toContain("seat stop aria")
    expect(opsCalls).toContain("seat start --start-mode interactive --persona aria --principal alan")
    expect(launched).not.toContain('"resolve"')
  })

  it("states the role and domain the mint resolved for a bare persona", async () => {
    const { launched, opsCalls } = await runSn(["aria"], {
      role: "reviewer",
      domain: "code-quality",
      persona: "aria",
      personaSlugs: ["aria"],
      seatCommand: "present",
      preClaimId: "aid-bare",
    })
    expect(opsCalls).toContain("seat start --start-mode interactive --persona aria --principal alan")
    expect(opsCalls).toContain("seat whoami --agent-id aid-bare")
    expect(launched).toContain(
      'tools/seat-call.ts {"agent":"aid-bare","persona":"aria","domain":"code-quality",' +
        '"role":"reviewer","principal":"alan"}'
    )
  })

  it("refuses a token that resolves to nothing before stopping or claiming", async () => {
    const { launched, opsCalls, stderr, exitCode } = await runSn(["aria", "revewer"], {
      ...seated,
      personaSlugs: ["aria"],
      sorted: "refusing",
      preClaimId: "aid-never",
    })
    expect(exitCode).toBe(1)
    expect(stderr).toContain("revewer")
    expect(supervisorLine(launched)).toBe("")
    expect(opsCalls).not.toContain("seat stop")
    expect(opsCalls).not.toContain("seat start")
  })

  it("still launches when the sort succeeds and the per-slot statements refuse", async () => {
    const { opsCalls, stderr, exitCode } = await runSn(["aria", "reviewer", "code-quality"], {
      ...both,
      seatCommand: "refusing",
    })
    expect(exitCode).toBe(0)
    expect(opsCalls).toContain(
      "seat start --start-mode interactive --persona aria --principal alan --role reviewer --domain code-quality"
    )
    expect(stderr).toContain("spelled no name")
    expect(stderr).toContain("seat not stated")
  })
})
