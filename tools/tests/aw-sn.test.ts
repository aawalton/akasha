
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

const tmpFile = join(SCRATCH_ROOT, `aw-sn-test-${Date.now()}.sh`)
await Bun.write(tmpFile, generateBashInit(FIXTURE_ACCOUNTS))

afterAll(async () => {
  await unlink(tmpFile).catch(() => {})
})

function runSn(args?: readonly string[], classified?: Classified): Promise<SnRun> {
  return runSnAgainst(tmpFile, args, classified)
}

describe("sn() gates on the persona document and seeds nothing", () => {
  const seated = { role: "awen-turn-gate", domain: "ttrpgs", persona: "aria" } as const
  const args = ["aria", "awen-turn-gate"]

  it("launches with no first-turn seed at all", async () => {
    const { launched, exitCode } = await runSn(args, {
      ...seated,
      personaSlugs: ["aria"],
      preClaimId: "aid-1",
    })
    expect(exitCode).toBe(0)
    expect(supervisorLine(launched)).toEndWith("-a aawalton --agent-id aid-1")
  })

  it("refuses, launching nothing, when the persona document is not in the tree", async () => {
    const { launched, stderr, exitCode } = await runSn(args, {
      ...seated,
      personaSlugs: [],
      preClaimId: "aid-3",
    })
    expect(exitCode).toBe(1)
    expect(launched).toBe("")
    expect(stderr).toContain("alan/persona/aria.persona.md")
    expect(stderr).toContain("clean tree")
  })

  it("launches with the persona document alone, no role or domain document present", async () => {
    const { launched, stderr, exitCode } = await runSn(args, {
      ...seated,
      personaSlugs: ["aria"],
      roleSlugs: [],
      domainSlugs: [],
      preClaimId: "aid-4",
    })
    expect(exitCode).toBe(0)
    expect(supervisorLine(launched)).toContain("--agent-id aid-4")
    expect(stderr).not.toContain("no persona document")
  })
})

describe("sn() — the identity gate refuses every name no persona document answers for", () => {
  it.each([
    ["deliver-17330"],
  ])("%s is refused, launching nothing, and is sent to `sr`", async (name) => {
    const { launched, stderr, exitCode } = await runSn([name], { personaSlugs: [] })
    expect(exitCode).toBe(1)
    expect(launched).toBe("")
    expect(stderr).toContain("has no persona document")
    expect(stderr).toContain(`sr ${name}`)
  })

  it("launches a name the tree carries and no persona row does", async () => {
    const { launched, stderr, exitCode } = await runSn(["placeholder"], {
      personaSlugs: ["placeholder"],
      preClaimId: "aid-ph",
    })
    expect(exitCode).toBe(0)
    expect(supervisorLine(launched)).toEndWith("-a aawalton --agent-id aid-ph")
    expect(stderr).not.toContain("has no persona document")
  })

  it("gates on the typed persona rather than on what any store says about the seat", async () => {
    const { exitCode } = await runSn(["placeholder", "reviewer"], {
      personaSlugs: ["placeholder"],
      sorted: { role: "reviewer" },
      seatCommand: "present",
      preClaimId: "aid-typed",
    })
    expect(exitCode).toBe(0)
  })
})
