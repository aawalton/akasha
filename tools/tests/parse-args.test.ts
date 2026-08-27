import { describe, expect, test } from "bun:test"
import type { CommandHelp } from "../ops/surface.ts"
import { parseArgs } from "../lib/parse-args.ts"

const basic: CommandHelp = {
  flags: [
    {
      name: "--title",
      argLabel: "<text>",
      valueShape: "token",
      required: true,
      description: "Title",
    },
    { name: "--json", description: "Emit JSON" },
    { name: "--path", argLabel: "<p>", valueShape: "token", repeat: true, description: "Paths" },
    {
      name: "--mode",
      argLabel: "<m>",
      valueShape: "token",
      choices: ["a", "b"],
      description: "Mode",
    },
  ],
  positionals: [{ name: "seq", description: "Seq" }],
}

describe("parseArgs", () => {
  test("parses required flag + boolean + positional", () => {
    const p = parseArgs(basic, ["--title", "hi", "--json", "42"])
    expect(p.requireString("--title")).toBe("hi")
    expect(p.boolean("--json")).toBe(true)
    expect(p.positionals).toEqual(["42"])
  })

  test("supports --flag=value form", () => {
    const p = parseArgs(basic, ["--title=hi", "42"])
    expect(p.requireString("--title")).toBe("hi")
  })

  test("repeat flag collects values", () => {
    const p = parseArgs(basic, ["--title", "t", "--path", "a", "--path", "b", "1"])
    expect(p.repeated("--path")).toEqual(["a", "b"])
  })

  test("choices rejects invalid value", () => {
    expect(() => parseArgs(basic, ["--title", "t", "--mode", "z", "1"])).toThrow(
      /--mode: invalid value "z"/
    )
  })

  test("choices accepts valid value", () => {
    const p = parseArgs(basic, ["--title", "t", "--mode", "a", "1"])
    expect(p.string("--mode")).toBe("a")
  })

  describe("deprecatedChoices — accepted by the parser, never offered by help", () => {
    const withDeprecated: CommandHelp = {
      flags: [
        {
          name: "--mode",
          argLabel: "<m>",
          valueShape: "token",
          choices: ["a", "b"],
          deprecatedChoices: ["old"],
          description: "Mode",
        },
      ],
    }

    test("a deprecated value parses like a live one", () => {
      const p = parseArgs(withDeprecated, ["--mode", "old"])
      expect(p.string("--mode")).toBe("old")
    })

    test("a value in neither set is still refused", () => {
      expect(() => parseArgs(withDeprecated, ["--mode", "z"])).toThrow(/--mode: invalid value "z"/)
    })

    test("the rejection names the live set and not the deprecated one", () => {
      expect(() => parseArgs(withDeprecated, ["--mode", "z"])).toThrow(/expected one of: a, b\)/)
    })

    test("declaring deprecated values with no live set is refused", () => {
      const inert: CommandHelp = {
        flags: [
          {
            name: "--mode",
            argLabel: "<m>",
            valueShape: "token",
            deprecatedChoices: ["old"],
            description: "Mode",
          },
        ],
      }
      expect(() => parseArgs(inert, [])).toThrow(
        /flag --mode declares deprecatedChoices but no choices/
      )
    })
  })

  test("missing required flag throws", () => {
    expect(() => parseArgs(basic, ["1"])).toThrow(/--title: required flag missing/)
  })

  test("missing required positional throws", () => {
    expect(() => parseArgs(basic, ["--title", "t"])).toThrow(
      /missing required positional argument\(s\): seq/
    )
  })

  test("unknown flag throws", () => {
    expect(() => parseArgs(basic, ["--title", "t", "--nope", "42"])).toThrow(/unknown flag: --nope/)
  })

  test("non-repeat flag given twice throws", () => {
    expect(() => parseArgs(basic, ["--title", "a", "--title", "b", "1"])).toThrow(
      /--title: flag given more than once/
    )
  })

  test("flag needing value at end of argv throws", () => {
    expect(() => parseArgs(basic, ["1", "--title"])).toThrow(/--title requires a value/)
  })

  test("boolean flag given a value throws", () => {
    expect(() => parseArgs(basic, ["--title", "t", "--json=true", "1"])).toThrow(
      /--json: flag does not accept a value/
    )
  })

  test("-- halts flag parsing; remainder is positionals", () => {
    const help: CommandHelp = {
      flags: [
        {
          name: "--title",
          argLabel: "<text>",
          valueShape: "token",
          required: true,
          description: "Title",
        },
      ],
      positionals: [
        { name: "first", description: "First" },
        { name: "rest", description: "Rest", variadic: true, required: false },
      ],
    }
    const p = parseArgs(help, ["--title", "t", "--", "--looks-like-flag", "raw"])
    expect(p.positionals).toEqual(["--looks-like-flag", "raw"])
  })

  test("mutually exclusive flags rejected together", () => {
    const help: CommandHelp = {
      flags: [
        { name: "--a", argLabel: "<v>", valueShape: "token", description: "A" },
        { name: "--b", argLabel: "<v>", valueShape: "token", description: "B" },
      ],
      mutuallyExclusive: [["--a", "--b"]],
    }
    expect(() => parseArgs(help, ["--a", "x", "--b", "y"])).toThrow(
      /mutually exclusive flags given together: --a, --b/
    )
  })

  test("default flag value returned when absent", () => {
    const help: CommandHelp = {
      flags: [
        {
          name: "--limit",
          argLabel: "<n>",
          valueShape: "token",
          default: "50",
          description: "Limit",
        },
      ],
    }
    const p = parseArgs(help, [])
    expect(p.string("--limit")).toBe("50")
  })

  test("unexpected extra positionals rejected when no variadic", () => {
    expect(() => parseArgs(basic, ["--title", "t", "1", "2"])).toThrow(
      /unexpected positional argument\(s\): 2/
    )
  })

  test("variadic positional accepts 0+ values", () => {
    const help: CommandHelp = {
      positionals: [
        { name: "first", description: "First" },
        { name: "rest", description: "Rest", variadic: true, required: false },
      ],
    }
    expect(parseArgs(help, ["a"]).positionals).toEqual(["a"])
    expect(parseArgs(help, ["a", "b", "c"]).positionals).toEqual(["a", "b", "c"])
  })

  test("env var required and missing throws", () => {
    const help: CommandHelp = {
      envVars: [{ name: "__TEST_DOES_NOT_EXIST__", description: "x", required: true }],
    }
    delete process.env.__TEST_DOES_NOT_EXIST__
    expect(() => parseArgs(help, [])).toThrow(/required env var __TEST_DOES_NOT_EXIST__ is not set/)
  })

  test("env var default used when absent", () => {
    const help: CommandHelp = {
      envVars: [{ name: "__TEST_DEFAULT__", description: "x", default: "fallback" }],
    }
    delete process.env.__TEST_DEFAULT__
    const p = parseArgs(help, [])
    expect(p.env("__TEST_DEFAULT__")).toBe("fallback")
  })

  test("env var read from process.env when set", () => {
    const help: CommandHelp = {
      envVars: [{ name: "__TEST_SET__", description: "x" }],
    }
    process.env.__TEST_SET__ = "live"
    const p = parseArgs(help, [])
    expect(p.env("__TEST_SET__")).toBe("live")
    delete process.env.__TEST_SET__
  })

  test("requireEnv throws when absent", () => {
    const help: CommandHelp = {
      envVars: [{ name: "__TEST_MISSING__", description: "x" }],
    }
    delete process.env.__TEST_MISSING__
    const p = parseArgs(help, [])
    expect(() => p.requireEnv("__TEST_MISSING__")).toThrow(/env var __TEST_MISSING__ is not set/)
  })

  const numeric: CommandHelp = {
    flags: [
      {
        name: "--limit",
        argLabel: "<n>",
        valueShape: "token",
        default: "50",
        description: "Limit",
      },
      { name: "--offset", argLabel: "<n>", valueShape: "token", description: "Offset" },
    ],
  }

  test("nonNegativeInt parses a valid integer value", () => {
    const p = parseArgs(numeric, ["--limit", "25"])
    expect(p.nonNegativeInt("--limit")).toBe(25)
  })

  test("nonNegativeInt falls back to the declared default", () => {
    const p = parseArgs(numeric, [])
    expect(p.nonNegativeInt("--limit")).toBe(50)
  })

  test("nonNegativeInt returns undefined when absent and no default", () => {
    const p = parseArgs(numeric, [])
    expect(p.nonNegativeInt("--offset")).toBeUndefined()
  })

  test("nonNegativeInt rejects a negative value", () => {
    const p = parseArgs(numeric, ["--limit", "-1"])
    expect(() => p.nonNegativeInt("--limit")).toThrow(
      /--limit must be a non-negative integer, got: -1/
    )
  })

  test("nonNegativeInt rejects a non-integer value", () => {
    const p = parseArgs(numeric, ["--limit", "2.5"])
    expect(() => p.nonNegativeInt("--limit")).toThrow(
      /--limit must be a non-negative integer, got: 2\.5/
    )
  })

  test("nonNegativeInt rejects a non-numeric value", () => {
    const p = parseArgs(numeric, ["--limit", "abc"])
    expect(() => p.nonNegativeInt("--limit")).toThrow(
      /--limit must be a non-negative integer, got: abc/
    )
  })
})
