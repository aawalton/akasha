
import { afterAll, describe, expect, it } from "bun:test"
import { unlink } from "node:fs/promises"
import { join } from "node:path"
import { generateBashInit } from "../aw/init/bash.ts"
import { type Classified, FIXTURE_ACCOUNTS, supervisorLine, runSn as runSnAgainst, SCRATCH_ROOT, type SnRun } from "./aw-front.ts"

const tmpFile = join(SCRATCH_ROOT, `aw-sn-seat-test-${Date.now()}.sh`)
await Bun.write(tmpFile, generateBashInit(FIXTURE_ACCOUNTS))

afterAll(async () => {
  await unlink(tmpFile).catch(() => {})
})

function runSn(args?: readonly string[], classified?: Classified): Promise<SnRun> {
  return runSnAgainst(tmpFile, args, classified)
}

describe("sn() binds the seat name it composed", () => {
  const seated = { role: "awen-turn-gate", domain: "ttrpgs", persona: "aria" } as const

  it("resolves and claims the COMPOSED name, gating on the persona half", async () => {
    const { opsCalls } = await runSn(["aria", "awen-turn-gate"], {
      ...seated,
      personaSlugs: ["aria"],
      preClaimId: "aid-5",
      sorted: { role: "awen-turn-gate" },
    })
    expect(opsCalls).toContain("seat stop aria-awen-turn-gate")
    expect(opsCalls).toContain(
      "seat start --start-mode interactive --persona aria --principal alan --role awen-turn-gate"
    )
    expect(opsCalls).not.toContain("persona exists")
  })

  it("refuses the composed seat name as one token, naming the persona it is not", async () => {
    const { exitCode, stderr } = await runSn(["aria-awen-turn-gate"], {
      ...seated,
      personaSlugs: ["aria"],
      preClaimId: "aid-6",
    })
    expect(exitCode).toBe(1)
    expect(stderr).toContain("aria-awen-turn-gate")
    expect(stderr).toContain("alan/persona/aria-awen-turn-gate.persona.md")
  })

  it("splits a kebab seat name at the persona, handing the sorter the rest whole", async () => {
    const { launched, opsCalls, exitCode } = await runSn(["aria-awen-turn-gate"], {
      ...seated,
      personaSlugs: ["aria"],
      seatCommand: "present",
      sorted: { role: "awen-turn-gate" },
      preClaimId: "aid-kebab",
    })
    expect(exitCode).toBe(0)
    expect(launched).toContain('tools/seat-call.ts {"resolve":true,"token":["awen-turn-gate"]}')
    expect(opsCalls).toContain("seat stop aria-awen-turn-gate")
    expect(opsCalls).toContain(
      "seat start --start-mode interactive --persona aria --principal alan --role awen-turn-gate"
    )
  })

  it("reattaches the row it just minted, so the seat is named before its first turn", async () => {
    const { launched, exitCode } = await runSn(["aria", "awen-turn-gate"], {
      ...seated,
      personaSlugs: ["aria"],
      preClaimId: "019fb079-7232-783a-bb2c-12652257974f",
    })
    expect(exitCode).toBe(0)
    expect(launched).toContain("--agent-id 019fb079-7232-783a-bb2c-12652257974f")
  })

  it("starts a new agent over a live holder, so no reading crosses the break", async () => {
    const { launched, opsCalls } = await runSn(["aria", "awen-turn-gate"], {
      ...seated,
      personaSlugs: ["aria"],
      preClaimId: "019fb079-7232-783a-bb2c-12652257974f",
      stopResolves: "019fb07a-0000-7000-8000-000000000000",
    })
    expect(launched).toContain("--agent-id 019fb079-7232-783a-bb2c-12652257974f")
    expect(launched).not.toContain("019fb07a-0000-7000-8000-000000000000")
    expect(opsCalls).toContain("seat start")
  })

  it("refuses and launches nothing when the bind refuses", async () => {
    const { launched, stderr, exitCode } = await runSn(["aria", "awen-turn-gate"], {
      ...seated,
      personaSlugs: ["aria"],
      preClaimId: null,
      sorted: { role: "awen-turn-gate" },
    })
    expect(exitCode).toBe(1)
    expect(supervisorLine(launched)).toBe("")
    expect(stderr).toContain("aria-awen-turn-gate")
    expect(stderr).toContain("nothing was launched")
  })
})

describe("sn() starts a new seat over whatever session holds the name", () => {
  const seated = { role: "awen-turn-gate", domain: "ttrpgs", persona: "aria" } as const
  const overLive = (
    extra: Classified = {},
    args: readonly string[] = ["aria", "awen-turn-gate"]
  ): Promise<SnRun> =>
    runSn(args, {
      ...seated,
      personaSlugs: ["aria"],
      seatCommand: "present",
      sorted: { role: "awen-turn-gate" },
      preClaimId: "aid-live",
      liveTmux: true,
      ...extra,
    })

  it("stops the session holding the composed name and starts one in its place", async () => {
    const { tmuxCalls, stderr, exitCode } = await overLive()
    expect(exitCode).toBe(0)
    expect(tmuxCalls).toContain("has-session -t =aria-awen-turn-gate")
    expect(tmuxCalls).toContain("kill-session -t =aria-awen-turn-gate")
    expect(tmuxCalls).toContain("new-session -d -s aria-awen-turn-gate")
    expect(stderr).not.toContain("already holds a live tmux session")
  })

  it("stops the session before it touches the row, the row being the slower half", async () => {
    const { opsCalls, tmuxCalls } = await overLive()
    expect(tmuxCalls).toContain("kill-session -t =aria-awen-turn-gate")
    expect(opsCalls).toContain("seat stop aria-awen-turn-gate")
  })

  it("starts nothing where the session it must stop will not go", async () => {
    const { launched, stderr, exitCode } = await overLive({ tmuxKillRefuses: true })
    expect(exitCode).toBe(1)
    expect(stderr).toContain("would not stop, so nothing was started")
    expect(supervisorLine(launched)).toBe("")
  })

  it("hands back the refusal and starts nothing where subagents are working", async () => {
    const { launched, opsCalls, tmuxCalls, stderr, exitCode } = await overLive({
      stopExit: 1,
      stopStderr: "agent 'aria-awen-turn-gate' has 2 subagents working (Explore, general-purpose)",
    })
    expect(exitCode).toBe(1)
    expect(stderr).toContain("2 subagents working")
    expect(opsCalls).not.toContain("seat start")
    expect(tmuxCalls).not.toContain("kill-session")
    expect(supervisorLine(launched)).toBe("")
  })

  it("passes --force through to the stop", async () => {
    const { opsCalls } = await overLive({}, ["aria", "awen-turn-gate", "--force"])
    expect(opsCalls).toContain("seat stop aria-awen-turn-gate --force")
  })

  it("kills a session no seat page reaches, and starts over it", async () => {
    const { opsCalls, tmuxCalls, exitCode } = await overLive({ stopExit: 2 })
    expect(exitCode).toBe(0)
    expect(tmuxCalls).toContain("kill-session -t =aria-awen-turn-gate")
    expect(opsCalls).toContain("seat start --start-mode interactive --persona aria")
  })
})

describe("sn() states the identity it derived", () => {
  const seated = { role: "awen-turn-gate", domain: "ttrpgs", persona: "aria" } as const
  const args = ["aria", "awen-turn-gate"]
  const state = (extra: Classified): Promise<SnRun> =>
    runSn(args, {
      ...seated,
      personaSlugs: ["aria"],
      sorted: { role: "awen-turn-gate" },
      ...extra,
    })

  it("states all three slots in ONE call against the agent id the row was bound under", async () => {
    const { launched, stderr } = await state({ seatCommand: "present", preClaimId: "aid-1" })
    expect(launched).toContain(
      'tools/seat-call.ts {"agent":"aid-1","persona":"aria","domain":"ttrpgs",' +
        '"role":"awen-turn-gate","principal":"alan"}'
    )
    expect(launched.split("\n").filter((line) => line.includes('"agent":"aid-1"'))).toHaveLength(2)
    expect(stderr).not.toContain("seat not stated")
  })

  it("launches, naming every slot in ONE line, when the tree answers none", async () => {
    const { launched, stderr, exitCode } = await state({
      seatCommand: "refusing",
      preClaimId: "aid-2",
    })
    expect(exitCode).toBe(0)
    expect(supervisorLine(launched)).toEndWith("-a aawalton --agent-id aid-2")
    expect(stderr).toContain("persona 'aria', domain 'ttrpgs', role 'awen-turn-gate'")
    expect(stderr.split("\n").filter((line) => line.includes("seat not stated"))).toHaveLength(1)
  })

  it("skips an attribute the row carries no value for, without reporting it", async () => {
    const { launched, stderr } = await runSn(["vera", "lead"], {
      personaSlugs: ["vera"],
      seatCommand: "present",
      sorted: { role: "lead" },
      preClaimId: "aid-4",
    })
    expect(launched).not.toContain('"domain"')
    expect(launched).not.toContain('"persona":"claude"')
    expect(launched).not.toContain('"role":"worker"')
    expect(stderr).not.toContain("seat not stated")
  })

  it("asks for the default and records the mode ONCE, against the bound agent id", async () => {
    const { launched } = await state({ seatCommand: "present", preClaimId: "aid-5" })
    expect(
      launched.split("\n").filter((line) => line.includes('"mode":"interactive"'))
    ).toHaveLength(1)
    expect(launched).toContain(
      'tools/seat-call.ts {"agent":"aid-5","default":true,"mode":"interactive"}'
    )
  })

  it("asks for both even where an attribute resolved to nothing", async () => {
    const { launched } = await runSn(["vera", "lead"], {
      personaSlugs: ["vera"],
      seatCommand: "present",
      sorted: { role: "lead" },
      preClaimId: "aid-6",
    })
    expect(launched).not.toContain('"domain"')
    expect(launched).toContain(
      'tools/seat-call.ts {"agent":"aid-6","default":true,"mode":"interactive"}'
    )
  })

  it("warns without refusing the launch when that call does not record", async () => {
    const { stderr, exitCode } = await state({ seatCommand: "refusing", preClaimId: "aid-7" })
    expect(exitCode).toBe(0)
    expect(stderr).toContain("no default or mode recorded")
  })
})
