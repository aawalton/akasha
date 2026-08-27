import { describe, expect, test } from "bun:test"
import { homedir } from "node:os"
import { isInputError } from "../lib/exit.ts"
import {
  computePort,
  type DevServerState,
  devServerDir,
  devServerLogDir,
  logFilePath,
  lookupApp,
  parseState,
  stateFilePath,
} from "../lib/dev-server-ops.ts"

describe("lookupApp", () => {
  test("returns alanwalton's full config", async () => {
    expect(await lookupApp("alanwalton")).toEqual({
      name: "alanwalton",
      packagePath: "packages/alanwalton/web",
      basePort: 3000,
      extraDevArgs: [],
      devCommand: ["bunx", "react-router", "dev", "--port", "<PORT>"],
    })
  })

  test("rejects an unknown app as an input error, exit code 1", async () => {
    const thrown = await lookupApp("nonsense").then(
      () => null,
      (err: unknown) => err
    )
    expect(thrown).toBeInstanceOf(Error)
    expect(isInputError(thrown)).toBe(true)
  })

  test("the refusal names the app and lists the known ones", async () => {
    const thrown = await lookupApp("nonsense").then(
      () => null,
      (err: unknown) => err
    )
    if (!(thrown instanceof Error)) throw new Error("expected a throw")
    expect(thrown.message).toMatch(/unknown app: nonsense/)
    for (const name of ["alanwalton", "temper"]) {
      expect(thrown.message).toContain(name)
    }
  })
})

describe("computePort", () => {
  test("seq 8485 → alanwalton 3085", () => {
    expect(computePort({ basePort: 3000, seq: 8485 })).toBe(3085)
  })

  test("seq 0 → basePort exactly", () => {
    expect(computePort({ basePort: 3000, seq: 0 })).toBe(3000)
    expect(computePort({ basePort: 3300, seq: 0 })).toBe(3300)
  })

  test("seq 99 → basePort + 99", () => {
    expect(computePort({ basePort: 3000, seq: 99 })).toBe(3099)
    expect(computePort({ basePort: 3300, seq: 99 })).toBe(3399)
  })

  test("seq 100 wraps back to basePort", () => {
    expect(computePort({ basePort: 3000, seq: 100 })).toBe(3000)
  })
})

describe("path helpers", () => {
  test("devServerDir is rooted at HOME/projects/<seq>/dev-servers", () => {
    expect(devServerDir(8485)).toBe(`${homedir()}/projects/8485/dev-servers`)
  })

  test("devServerLogDir is the logs subdirectory of the per-seq state dir", () => {
    expect(devServerLogDir(8485)).toBe(`${homedir()}/projects/8485/dev-servers/logs`)
  })

  test("stateFilePath formats as <app>.json under the per-seq state dir", () => {
    expect(stateFilePath(8485, "alanwalton")).toBe(
      `${homedir()}/projects/8485/dev-servers/alanwalton.json`
    )
  })

  test("logFilePath formats as <app>.log under the per-seq log dir", () => {
    expect(logFilePath(42, "temper")).toBe(
      `${homedir()}/projects/42/dev-servers/logs/temper.log`
    )
  })
})

describe("DevServerState round-trip", () => {
  const state: DevServerState = {
    pid: 12345,
    port: 3085,
    app: "alanwalton",
    seq: 8485,
    worktree_path: "/home/x/worktrees/8485",
    started_at: "2026-04-25T12:34:56.000Z",
    log_path: "/home/x/projects/8485/dev-servers/logs/alanwalton.log",
  }

  test("serialize → parse yields an equal object", () => {
    expect(parseState(JSON.stringify(state))).toEqual(state)
  })

  test("parseState rejects a non-object", () => {
    expect(() => parseState("42")).toThrow(/not an object/)
  })

  test("parseState rejects a payload missing pid", () => {
    const { pid: _pid, ...partial } = state
    expect(() => parseState(JSON.stringify(partial))).toThrow(/missing required fields/)
  })

  test("parseState rejects a payload with wrong-typed pid", () => {
    expect(() => parseState(JSON.stringify({ ...state, pid: "12345" }))).toThrow(
      /missing required fields/
    )
  })

  test("parseState rejects a payload carrying a key the state does not declare", () => {
    expect(() => parseState(JSON.stringify({ ...state, stray: 1 }))).toThrow(
      /missing required fields/
    )
  })
})
