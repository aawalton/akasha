
import { describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { classified, divergences, seatsUnder } from "../audits/hooks-delivered.ts"

const NUL = String.fromCharCode(0)

const HOOK = "$HOME/instructions/tools/hooks/hold-seat.ts"
const EXPANDED = "/home/walton/instructions/tools/hooks/hold-seat.ts"
const FOREIGN = "$HOME/elsewhere/surprise.sh"

function settings(...commands: string[]): unknown {
  return {
    hooks: {
      PreToolUse: [{ matcher: "", hooks: commands.map((command) => ({ type: "command", command })) }],
    },
  }
}

function fakeProc(seats: readonly (readonly string[])[]): string {
  const root = mkdtempSync(join(tmpdir(), "proc-"))
  seats.forEach((argv, index) => {
    const pid = `${100 + index}`
    mkdirSync(join(root, pid))
    writeFileSync(join(root, pid, "cmdline"), `${argv.join(NUL)}${NUL}`, "utf8")
  })
  return root
}

describe("what the delivered payload is compared on", () => {
  test("a payload carrying none of the hooks is the failure, and it is caught", () => {
    const outcome = divergences(settings(HOOK), { remoteControlAtStartup: false })
    expect(outcome.missing).toHaveLength(1)
    expect(outcome.missing[0]).toContain("hold-seat.ts")
    expect(outcome.extra).toHaveLength(0)
  })

  test("the same hook with $HOME expanded is not a divergence", () => {
    const outcome = divergences(settings(HOOK), settings(EXPANDED))
    expect(outcome.missing).toHaveLength(0)
    expect(outcome.extra).toHaveLength(0)
  })

  test("a hook the payload adds and no file here registers is reported too", () => {
    const outcome = divergences(settings(HOOK), settings(HOOK, FOREIGN))
    expect(outcome.missing).toHaveLength(0)
    expect(outcome.extra).toHaveLength(1)
    expect(outcome.extra[0]).toContain("surprise.sh")
  })

  test("one registration moved to another matcher is missing rather than shared", () => {
    const moved = { hooks: { PreToolUse: [{ matcher: "Bash", hooks: [{ type: "command", command: HOOK }] }] } }
    expect(divergences(settings(HOOK), moved).missing).toHaveLength(1)
  })
})

describe("which divergences the seat's launch order explains", () => {
  test("a registration that landed after the seat started is nobody's", () => {
    const outcome = classified(settings(HOOK, FOREIGN), settings(HOOK), settings(HOOK))
    expect(outcome.missing.selfClearing).toHaveLength(1)
    expect(outcome.missing.real).toHaveLength(0)
  })

  test("a registration dropped after the seat started is nobody's on the other arm", () => {
    const outcome = classified(settings(HOOK), settings(HOOK, FOREIGN), settings(HOOK, FOREIGN))
    expect(outcome.extra.selfClearing).toHaveLength(1)
    expect(outcome.extra.real).toHaveLength(0)
  })

  test("a payload lacking what was already registered when the seat started is somebody's", () => {
    const outcome = classified(settings(HOOK), { remoteControlAtStartup: false }, settings(HOOK))
    expect(outcome.missing.real).toHaveLength(1)
    expect(outcome.missing.selfClearing).toHaveLength(0)
  })

  test("a payload naming what was registered at neither instant is somebody's", () => {
    const outcome = classified(settings(HOOK), settings(HOOK, FOREIGN), settings(HOOK))
    expect(outcome.extra.real).toHaveLength(1)
    expect(outcome.extra.real[0]).toContain("surprise.sh")
    expect(outcome.extra.selfClearing).toHaveLength(0)
  })

  test("a launch registry that could not be read leaves both arms somebody's", () => {
    const outcome = classified(settings(HOOK), settings(FOREIGN), null)
    expect(outcome.established).toBe(false)
    expect(outcome.missing.real).toHaveLength(1)
    expect(outcome.extra.real).toHaveLength(1)
  })
})

describe("which processes are asked what they were launched with", () => {
  test("a seat's --settings is read off its own argv", () => {
    const root = fakeProc([["/home/walton/.local/bin/claude", "--settings", "/tmp/payload.json"]])
    try {
      expect(seatsUnder(root)).toEqual([
        { pid: "100", settings: "/tmp/payload.json", startedAt: expect.any(Number) },
      ])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  test("a seat's launch instant is read off its own directory", () => {
    const root = fakeProc([["claude", "--settings", "/tmp/payload.json"]])
    try {
      const [only] = seatsUnder(root)
      expect(only?.startedAt).toBeGreaterThan(Date.now() - 60_000)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  test("the supervisor that names the same flag in its own argv is not a seat", () => {
    const root = fakeProc([
      ["bun", "run", "supervisor.ts", "--", "claude", "--settings", "/tmp/payload.json"],
      ["/home/walton/.local/bin/claude", "--settings", "/tmp/payload.json"],
    ])
    try {
      expect(seatsUnder(root)).toHaveLength(1)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  test("a seat carrying no --settings is found, and reports none", () => {
    const root = fakeProc([["claude", "--resume", "abc"]])
    try {
      expect(seatsUnder(root)).toEqual([
        { pid: "100", settings: null, startedAt: expect.any(Number) },
      ])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  test("a proc root that is not there is no seats rather than a throw", () => {
    expect(seatsUnder(join(tmpdir(), "proc-that-is-not-there-17382"))).toEqual([])
  })
})
