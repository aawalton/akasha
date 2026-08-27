import { describe, expect, test } from "bun:test"
import type { CommandHelp } from "../ops/surface.ts"
import { parseArgs } from "../lib/parse-args.ts"

describe("parseArgs value-shape declaration guards", () => {
  test("valueShape on a flag that takes no value is a declaration error", () => {
    const help: CommandHelp = {
      flags: [{ name: "--json", description: "x", valueShape: "prose" }],
    }
    expect(() => parseArgs(help, [])).toThrow(/--json.*valueShape.*takes no value/)
  })

  test("acceptsStdin on a flag that takes no value is a declaration error", () => {
    const help: CommandHelp = {
      flags: [{ name: "--stdin", description: "x", acceptsStdin: true }],
    }
    expect(() => parseArgs(help, [])).toThrow(/--stdin.*acceptsStdin.*takes no value/)
  })

  test("a value-taking flag may declare either shape", () => {
    const help: CommandHelp = {
      flags: [
        { name: "--message", argLabel: "<text>", description: "x", valueShape: "prose" },
        { name: "--seq", argLabel: "<n>", description: "x", valueShape: "token" },
      ],
    }
    const parsed = parseArgs(help, ["--message", "hello", "--seq", "7"])
    expect(parsed.string("--message")).toBe("hello")
    expect(parsed.nonNegativeInt("--seq")).toBe(7)
  })

  test("a declared shape does not touch the value — the parser never inspects it", () => {
    const help: CommandHelp = {
      flags: [{ name: "--message", argLabel: "<text>", description: "x", valueShape: "prose" }],
    }
    const hazardous = "note: run `echo INJECTED` before deploy"
    expect(parseArgs(help, ["--message", hazardous]).string("--message")).toBe(hazardous)
  })

  test("a value-taking flag with no declared shape does not typecheck", () => {
    const help: CommandHelp = {
      // @ts-expect-error — argLabel present, valueShape absent: no arm accepts it.
      flags: [{ name: "--message", argLabel: "<text>", description: "x" }],
    }
    expect(help.flags).toHaveLength(1)
  })

  test("a flag carrying no value needs no shape — the exemption holds", () => {
    const help: CommandHelp = {
      flags: [{ name: "--json", description: "x" }],
    }
    expect(parseArgs(help, ["--json"]).boolean("--json")).toBe(true)
  })
})
