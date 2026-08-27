import { describe, expect, test } from "bun:test"
import { homedir } from "node:os"
import { join } from "node:path"
import type { CommandHelp } from "../ops/surface.ts"
import { parseArgs } from "../lib/parse-args.ts"

describe("parseArgs path expansion", () => {
  test("env var path:true expands a leading-~ default when absent", () => {
    const help: CommandHelp = {
      envVars: [
        {
          name: "__TEST_PATH_DEFAULT__",
          description: "x",
          default: "~/.local/share/foo",
          path: true,
        },
      ],
    }
    delete process.env.__TEST_PATH_DEFAULT__
    const p = parseArgs(help, [])
    expect(p.env("__TEST_PATH_DEFAULT__")).toBe(join(homedir(), ".local", "share", "foo"))
    expect(p.requireEnv("__TEST_PATH_DEFAULT__")).toBe(join(homedir(), ".local", "share", "foo"))
  })

  test("env var path:true expands a leading-~ value from process.env", () => {
    const help: CommandHelp = {
      envVars: [{ name: "__TEST_PATH_SET__", description: "x", path: true }],
    }
    process.env.__TEST_PATH_SET__ = "~/custom-dir"
    const p = parseArgs(help, [])
    expect(p.env("__TEST_PATH_SET__")).toBe(join(homedir(), "custom-dir"))
    delete process.env.__TEST_PATH_SET__
  })

  test("env var without path leaves a leading ~ untouched", () => {
    const help: CommandHelp = {
      envVars: [{ name: "__TEST_PATH_OFF__", description: "x", default: "~/raw" }],
    }
    delete process.env.__TEST_PATH_OFF__
    const p = parseArgs(help, [])
    expect(p.env("__TEST_PATH_OFF__")).toBe("~/raw")
  })

  test("flag path:true expands a supplied leading-~ value", () => {
    const help: CommandHelp = {
      flags: [
        { name: "--home", argLabel: "<dir>", valueShape: "token", path: true, description: "Home" },
      ],
    }
    const p = parseArgs(help, ["--home", "~/wan"])
    expect(p.string("--home")).toBe(join(homedir(), "wan"))
    expect(p.requireString("--home")).toBe(join(homedir(), "wan"))
  })

  test("flag path:true expands a leading-~ default when absent", () => {
    const help: CommandHelp = {
      flags: [
        {
          name: "--home",
          argLabel: "<dir>",
          valueShape: "token",
          default: "~/wan",
          path: true,
          description: "Home",
        },
      ],
    }
    const p = parseArgs(help, [])
    expect(p.string("--home")).toBe(join(homedir(), "wan"))
  })

  test("flag without path leaves a leading ~ untouched", () => {
    const help: CommandHelp = {
      flags: [{ name: "--home", argLabel: "<dir>", valueShape: "token", description: "Home" }],
    }
    const p = parseArgs(help, ["--home", "~/wan"])
    expect(p.string("--home")).toBe("~/wan")
  })

  test("repeat flag path:true expands each leading-~ element", () => {
    const help: CommandHelp = {
      flags: [
        {
          name: "--path",
          argLabel: "<p>",
          valueShape: "token",
          repeat: true,
          path: true,
          description: "Paths",
        },
      ],
    }
    const p = parseArgs(help, ["--path", "~/a", "--path", "/abs/b", "--path", "rel/c"])
    expect(p.repeated("--path")).toEqual([join(homedir(), "a"), "/abs/b", "rel/c"])
  })

  test("path:true is a no-op for a non-tilde value (absolute, relative, bare ~)", () => {
    const help: CommandHelp = {
      flags: [
        { name: "--home", argLabel: "<dir>", valueShape: "token", path: true, description: "Home" },
      ],
    }
    expect(parseArgs(help, ["--home", "/abs/path"]).string("--home")).toBe("/abs/path")
    expect(parseArgs(help, ["--home", "rel/path"]).string("--home")).toBe("rel/path")
    expect(parseArgs(help, ["--home", "~user"]).string("--home")).toBe("~user")
  })

  test("bare ~ expands to the home directory", () => {
    const help: CommandHelp = {
      envVars: [{ name: "__TEST_BARE_TILDE__", description: "x", default: "~", path: true }],
    }
    delete process.env.__TEST_BARE_TILDE__
    expect(parseArgs(help, []).env("__TEST_BARE_TILDE__")).toBe(homedir())
  })
})
