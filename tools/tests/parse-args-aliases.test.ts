import { describe, expect, test } from "bun:test"
import { isInputError } from "../lib/exit.ts"
import type { CommandHelp } from "../ops/surface.ts"
import { parseArgs, type UnknownFlag } from "../lib/parse-args.ts"

type Rejection = Error & { readonly unknownFlag?: UnknownFlag }

function captureInputError(run: () => unknown): Rejection {
  try {
    run()
  } catch (err) {
    if (isInputError(err)) return err as Rejection
    throw err
  }
  throw new Error("expected an input error, but nothing was thrown")
}

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

describe("parseArgs positional & flag aliases", () => {
  const withAlias: CommandHelp = {
    flags: [
      { name: "--seq", argLabel: "<n>", valueShape: "token", required: true, description: "Seq" },
    ],
    positionals: [
      { name: "seq", required: false, aliasOfFlag: "--seq", description: "Seq (alias)" },
    ],
  }

  test("aliased positional fills the flag value when only positional given", () => {
    const p = parseArgs(withAlias, ["7913"])
    expect(p.requireString("--seq")).toBe("7913")
    expect(p.positionals).toEqual([])
  })

  test("explicit flag still works when no positional given", () => {
    const p = parseArgs(withAlias, ["--seq", "7913"])
    expect(p.requireString("--seq")).toBe("7913")
    expect(p.positionals).toEqual([])
  })

  test("aliased positional + matching flag value is accepted", () => {
    const p = parseArgs(withAlias, ["7913", "--seq", "7913"])
    expect(p.requireString("--seq")).toBe("7913")
    expect(p.positionals).toEqual([])
  })

  test("aliased positional + conflicting flag value is rejected, error names both", () => {
    expect(() => parseArgs(withAlias, ["7914", "--seq", "7913"])).toThrow(
      /--seq: cannot be set both as positional seq and flag \(got '7914' vs '7913'\)/
    )
  })

  test("aliased positional missing and flag missing → required-flag error", () => {
    expect(() => parseArgs(withAlias, [])).toThrow(/--seq: required flag missing/)
  })

  describe("a positional may only alias a single-value flag", () => {
    test("aliasing a repeat flag is rejected even when only the positional is given", () => {
      const repeatAliased: CommandHelp = {
        flags: [
          {
            name: "--slug",
            argLabel: "<s>",
            valueShape: "token",
            required: true,
            repeat: true,
            description: "Slugs",
          },
        ],
        positionals: [
          { name: "slug", required: false, aliasOfFlag: "--slug", description: "Slug" },
        ],
      }
      expect(() => parseArgs(repeatAliased, ["task"])).toThrow(
        /positional slug aliases --slug, which must be a single-value flag/
      )
    })

    test("aliasing a boolean flag is rejected", () => {
      const booleanAliased: CommandHelp = {
        flags: [{ name: "--force", description: "Force" }],
        positionals: [
          { name: "force", required: false, aliasOfFlag: "--force", description: "Force" },
        ],
      }
      expect(() => parseArgs(booleanAliased, ["yes"])).toThrow(
        /positional force aliases --force, which must be a single-value flag/
      )
    })
  })

  describe("surplus positional alongside a missing required flag is named", () => {
    const flagOnly: CommandHelp = {
      flags: [
        { name: "--seq", argLabel: "<n>", valueShape: "token", required: true, description: "Seq" },
      ],
    }

    test("the value the caller supplied appears in the error, with the flag form", () => {
      expect(() => parseArgs(flagOnly, ["25936"])).toThrow(
        /--seq: required flag missing \(got positional '25936'; this command takes it as a flag: --seq 25936\)/
      )
    })

    test("no positional supplied keeps the bare message", () => {
      expect(() => parseArgs(flagOnly, [])).toThrow(/^--seq: required flag missing$/)
    })

    test("a boolean required flag gets no positional suggestion", () => {
      const booleanRequired: CommandHelp = {
        flags: [{ name: "--force", required: true, description: "Force" }],
      }
      expect(() => parseArgs(booleanRequired, ["x"])).toThrow(/^--force: required flag missing$/)
    })

    test("a positional the command declares is absorbed, not reported as surplus", () => {
      const withPlain: CommandHelp = {
        flags: [
          {
            name: "--seq",
            argLabel: "<n>",
            valueShape: "token",
            required: true,
            description: "Seq",
          },
        ],
        positionals: [{ name: "file", description: "File" }],
      }
      expect(() => parseArgs(withPlain, ["notes.md"])).toThrow(/^--seq: required flag missing$/)
    })
  })

  test("aliased positional with extra positional value → unexpected positional", () => {
    expect(() => parseArgs(withAlias, ["7913", "extra"])).toThrow(
      /unexpected positional argument\(s\): extra/
    )
  })

  test("aliased positional referencing unknown flag throws developer error", () => {
    const broken: CommandHelp = {
      positionals: [
        { name: "seq", required: false, aliasOfFlag: "--seq", description: "Seq (alias)" },
      ],
    }
    expect(() => parseArgs(broken, ["7913"])).toThrow(/positional seq aliases unknown flag --seq/)
  })

  test("aliased positional declared as required:true throws developer error", () => {
    const bad: CommandHelp = {
      flags: [
        { name: "--seq", argLabel: "<n>", valueShape: "token", required: true, description: "Seq" },
      ],
      positionals: [
        { name: "seq", required: true, aliasOfFlag: "--seq", description: "Seq (alias)" },
      ],
    }
    expect(() => parseArgs(bad, ["7913"])).toThrow(
      /positional seq aliases --seq but must be required:false and non-variadic/
    )
  })

  test("aliased positional after a non-aliased positional throws developer error", () => {
    const bad: CommandHelp = {
      flags: [
        { name: "--seq", argLabel: "<n>", valueShape: "token", required: true, description: "Seq" },
      ],
      positionals: [
        { name: "name", description: "Name" },
        { name: "seq", required: false, aliasOfFlag: "--seq", description: "Seq (alias)" },
      ],
    }
    expect(() => parseArgs(bad, ["foo", "7913"])).toThrow(
      /positional seq \(aliasOfFlag --seq\) must not follow a non-aliased positional/
    )
  })

  const withFlagAlias: CommandHelp = {
    flags: [
      {
        name: "--limit",
        argLabel: "<n>",
        valueShape: "token",
        aliases: ["--tail"],
        description: "Limit",
      },
    ],
  }

  test("flag alias routes to canonical slot when only alias used", () => {
    const p = parseArgs(withFlagAlias, ["--tail", "25"])
    expect(p.string("--limit")).toBe("25")
  })

  test("canonical flag still works when only canonical used", () => {
    const p = parseArgs(withFlagAlias, ["--limit", "25"])
    expect(p.string("--limit")).toBe("25")
  })

  test("flag alias + matching canonical value is accepted", () => {
    const p = parseArgs(withFlagAlias, ["--tail", "25", "--limit", "25"])
    expect(p.string("--limit")).toBe("25")
  })

  test("flag alias + conflicting canonical value is rejected, error names both", () => {
    expect(() => parseArgs(withFlagAlias, ["--tail", "25", "--limit", "50"])).toThrow(
      /--limit: cannot be set both as --tail and --limit \(got '25' vs '50'\)/
    )
  })

  test("flag alias inline =value form works", () => {
    const p = parseArgs(withFlagAlias, ["--tail=25"])
    expect(p.string("--limit")).toBe("25")
  })

  test("flag alias appears in help under canonical (renderer responsibility)", () => {
    expect(withFlagAlias.flags?.[0]?.aliases).toEqual(["--tail"])
  })

  test("duplicate alias declaration across two flags throws developer error", () => {
    const bad: CommandHelp = {
      flags: [
        {
          name: "--a",
          argLabel: "<v>",
          valueShape: "token",
          aliases: ["--shared"],
          description: "A",
        },
        {
          name: "--b",
          argLabel: "<v>",
          valueShape: "token",
          aliases: ["--shared"],
          description: "B",
        },
      ],
    }
    expect(() => parseArgs(bad, [])).toThrow(/duplicate flag declaration: --shared/)
  })

  test("alias name collides with another canonical flag name throws developer error", () => {
    const bad: CommandHelp = {
      flags: [
        {
          name: "--limit",
          argLabel: "<v>",
          valueShape: "token",
          aliases: ["--tail"],
          description: "Limit",
        },
        { name: "--tail", argLabel: "<v>", valueShape: "token", description: "Tail" },
      ],
    }
    expect(() => parseArgs(bad, [])).toThrow(/duplicate flag declaration: --tail/)
  })

  test("unknown flag close to a declared flag suggests it", () => {
    expect(() => parseArgs(basic, ["--titel", "x", "1"])).toThrow(
      /unknown flag: --titel \(did you mean --title\?\)/
    )
  })

  test("unknown flag close to a declared alias suggests the alias", () => {
    expect(() => parseArgs(withFlagAlias, ["--tial", "25"])).toThrow(
      /unknown flag: --tial \(did you mean --tail\?\)/
    )
  })

  test("unknown flag with no close match emits bare error", () => {
    expect(() => parseArgs(basic, ["--xyzzy", "x", "1"])).toThrow(/^unknown flag: --xyzzy$/)
  })

  test("did-you-mean picks the closest match by edit distance", () => {
    const help: CommandHelp = {
      flags: [
        { name: "--port", argLabel: "<n>", valueShape: "token", description: "Port" },
        { name: "--host", argLabel: "<s>", valueShape: "token", description: "Host" },
      ],
    }
    expect(() => parseArgs(help, ["--pott", "1"])).toThrow(
      /unknown flag: --pott \(did you mean --port\?\)/
    )
  })

  test("the rejection carries the flag name and the suggestion it found", () => {
    const thrown = captureInputError(() => parseArgs(basic, ["--titel", "x", "1"]))
    expect(thrown.unknownFlag).toEqual({ name: "--titel", suggestion: "--title" })
  })

  test("a rejection that found nothing says so, rather than omitting the payload", () => {
    const thrown = captureInputError(() => parseArgs(basic, ["--xyzzy", "x", "1"]))
    expect(thrown.unknownFlag).toEqual({ name: "--xyzzy", suggestion: undefined })
  })

  test("the payload's suggestion agrees with the message's", () => {
    for (const argv of [
      ["--titel", "x", "1"],
      ["--xyzzy", "x", "1"],
      ["--tital", "x", "1"],
    ]) {
      const thrown = captureInputError(() => parseArgs(basic, argv))
      const suggestion = thrown.unknownFlag?.suggestion
      expect(thrown.message).toBe(
        suggestion !== undefined
          ? `unknown flag: ${thrown.unknownFlag?.name} (did you mean ${suggestion}?)`
          : `unknown flag: ${thrown.unknownFlag?.name}`
      )
    }
  })
})
