
import { describe, expect, test } from "bun:test"
import { argvFor } from "../seat-call.ts"

const CALL = new URL("../seat-call.ts", import.meta.url).pathname
const COMMAND = new URL("../seat.ts", import.meta.url).pathname

function send(cmd: readonly string[], payload: string) {
  const run = Bun.spawnSync({ cmd: [...cmd], stdin: Buffer.from(payload) })
  return {
    code: run.exitCode,
    out: run.stdout.toString().trim(),
    err: run.stderr.toString().trim(),
  }
}

describe("the mapping from keys to arguments", () => {
  test("a value key becomes its argument and the value beside it", () => {
    expect(argvFor({ agent: "aid-1", persona: "claude" })).toEqual([
      "--agent",
      "aid-1",
      "--persona",
      "claude",
    ])
  })

  test("a row number is taken as a number as well as as text", () => {
    expect(argvFor({ project: 18193 })).toEqual(["--project", "18193"])
    expect(argvFor({ project: "18193" })).toEqual(["--project", "18193"])
  })

  test("a presence key contributes its argument alone, and nothing when absent", () => {
    expect(argvFor({ resolve: true })).toEqual(["--resolve"])
    expect(argvFor({ resolve: false })).toEqual([])
    expect(argvFor({})).toEqual([])
  })

  test("null reads as absent, so a caller may pass what it holds", () => {
    expect(argvFor({ persona: null, flex: null, project: null, initiative: null })).toEqual([])
  })

  test("the initiative is one value", () => {
    expect(argvFor({ initiative: "seat" })).toEqual(["--initiative", "seat"])
  })

  test("the name of the seat above crosses, so a fleet seat's page names it at spawn", () => {
    expect(argvFor({ parentName: "ryn" })).toEqual(["--parent-name", "ryn"])
    expect(argvFor({ parentName: null })).toEqual([])
  })

  test("a repeatable key takes one value or many, each with its own argument", () => {
    expect(argvFor({ clear: "project" })).toEqual(["--clear", "project"])
    expect(argvFor({ clear: ["project", "flex"] })).toEqual([
      "--clear",
      "project",
      "--clear",
      "flex",
    ])
  })
})

describe("what the entry point refuses", () => {
  test("a key naming nothing a seat holds, rather than dropping it", () => {
    const run = send([process.execPath, CALL], '{"persoan":"claude","name":true}')
    expect(run.code).toBe(1)
    expect(run.err).toContain("persoan")
  })

  test("any argument on its own command line", () => {
    const run = send([process.execPath, CALL, "--input-file", "/tmp/x"], '{"name":true}')
    expect(run.code).toBe(1)
    expect(run.err).toContain("not a flag")
  })

  test("a payload that is not an object", () => {
    expect(send([process.execPath, CALL], "[1,2]").code).toBe(1)
    expect(send([process.execPath, CALL], "not json").code).toBe(1)
  })
})

describe("the two routes onto the command", () => {
  test("a payload and a command line spell one seat the same way", () => {
    const seat = {
      name: true,
      persona: "claude",
      domain: "code-repo",
      role: "developer",
      project: 18193,
      principal: "agent",
    }
    const viaPayload = send([process.execPath, CALL], JSON.stringify(seat))
    const viaFlags = Bun.spawnSync({
      cmd: [
        process.execPath,
        COMMAND,
        ...argvFor(seat),
      ],
      stdin: "ignore",
    })
    expect(viaPayload.code).toBe(0)
    expect(viaPayload.out).not.toBe("")
    expect(viaPayload.out).toBe(viaFlags.stdout.toString().trim())
  })

  test("a refusal the command chooses reaches the caller through the payload route", () => {
    const run = send([process.execPath, CALL], '{"name":true,"principal":"alan"}')
    expect(run.code).toBe(1)
    expect(run.err).toContain("spell no name")
  })
})
