
import { describe, expect, test } from "bun:test"
import { commandsUnder, extractPrefix, findCommand, isValidPrefix, wantsHelp } from "../ops/dispatch.ts"
import { renderListing } from "../ops/render.ts"
import { siblingCommandHint, type CommandFlagSurface } from "../ops/sibling-flag-hint.ts"
import type { Command } from "../ops/surface.ts"

function command(path: readonly string[], summary = "does a thing"): Command {
  return { path, summary, load: async () => ({ default: async () => {} }) }
}

const COMMANDS: readonly Command[] = [
  command(["project", "show"]),
  command(["project", "start"]),
  command(["page-type", "property-defs"]),
  command(["page"], "one token, sharing a leading token with nothing"),
  command(["ask-alan"]),
]

describe("finding the command", () => {
  test("matches a whole path and hands back what followed it", () => {
    const match = findCommand(COMMANDS, ["project", "show", "18834", "--json"])
    expect(match?.cmd.path).toEqual(["project", "show"])
    expect(match?.rest).toEqual(["18834", "--json"])
  })

  test("takes the longest prefix, so a multi-token path beats a shorter one sharing its head", () => {
    expect(findCommand(COMMANDS, ["page-type", "property-defs"])?.cmd.path).toEqual([
      "page-type",
      "property-defs",
    ])
    expect(findCommand(COMMANDS, ["page", "property-defs"])?.cmd.path).toEqual(["page"])
  })

  test("a namespace with no command after it is not a match", () => {
    expect(findCommand(COMMANDS, ["project"])).toBeNull()
  })

  test("an unknown first token is not a match", () => {
    expect(findCommand(COMMANDS, ["nosuchthing"])).toBeNull()
  })
})

describe("what counts as a namespace", () => {
  test("a prefix some command's path begins with is valid", () => {
    expect(isValidPrefix(COMMANDS, ["project"])).toBe(true)
    expect(commandsUnder(COMMANDS, ["project"]).map((c) => c.path.join(" "))).toEqual([
      "project show",
      "project start",
    ])
  })

  test("the empty prefix is valid and holds everything, which is what the root listing prints", () => {
    expect(isValidPrefix(COMMANDS, [])).toBe(true)
    expect(commandsUnder(COMMANDS, []).length).toBe(COMMANDS.length)
  })

  test("a prefix nothing begins with is not valid, which is what makes it an unknown command", () => {
    expect(isValidPrefix(COMMANDS, ["nosuchthing"])).toBe(false)
    expect(isValidPrefix(COMMANDS, ["project", "nosuchverb"])).toBe(false)
  })
})

describe("reading the help flag off an invocation", () => {
  test("`--help` is recognised wherever it sits, because it qualifies the verb beside it", () => {
    expect(wantsHelp(["show", "--help"])).toBe(true)
    expect(wantsHelp(["-h"])).toBe(true)
    expect(wantsHelp(["show", "18834"])).toBe(false)
  })

  test("the prefix stops at the help flag, so `ops project --help` asks about `project`", () => {
    expect(extractPrefix(["project", "--help"])).toEqual(["project"])
    expect(extractPrefix(["--help"])).toEqual([])
    expect(extractPrefix(["project", "show"])).toEqual(["project", "show"])
  })
})

describe("the listing", () => {
  test("names the prefix in its usage line and pads every summary to one column", () => {
    const listing = renderListing(["project"], commandsUnder(COMMANDS, ["project"]))
    expect(listing.split("\n")[0]).toBe("Usage: ops project <command> [flags]")
    expect(listing).toContain("  project show   does a thing")
    expect(listing).toContain("  project start  does a thing")
  })

  test("the root listing signposts `--version`, and a namespace listing does not", () => {
    expect(renderListing([], COMMANDS)).toContain("Run `ops --version`")
    expect(renderListing(["project"], commandsUnder(COMMANDS, ["project"]))).not.toContain(
      "Run `ops --version`"
    )
  })

  test("prints the set in its own order rather than sorting it", () => {
    const printed = renderListing([], COMMANDS)
      .split("\n")
      .filter((l) => l.startsWith("  ") && !l.startsWith("  Run"))
      .map((l) => l.trim().split("  ")[0])
    expect(printed).toEqual(COMMANDS.map((c) => c.path.join(" ")))
  })
})

describe("the sibling-flag hint", () => {
  const siblings: readonly CommandFlagSurface[] = [
    { path: ["project", "create"], surfaceNames: ["--status", "--title"] },
    { path: ["project", "finish"], surfaceNames: ["--status"] },
    { path: ["project", "rebase"], surfaceNames: ["--status"] },
    { path: ["project", "move-to"], surfaceNames: ["--status"] },
  ]

  test("says nothing when no sibling accepts the flag, so an unrelated string gets no suggestion", () => {
    expect(siblingCommandHint("--nosuchflag", siblings)).toBeUndefined()
  })

  test("names one holder as a whole invocation, because the caller's next move is to pick a command", () => {
    expect(siblingCommandHint("--title", siblings)).toBe("(did you mean ops project create --title?)")
  })

  test("caps the named holders and counts the rest, so a hint stays a suggestion", () => {
    expect(siblingCommandHint("--status", siblings)).toBe(
      "(did you mean ops project create --status, ops project finish --status, ops project rebase --status, or 1 more?)"
    )
  })

  test("matches exactly, never fuzzily — a near miss is not a fact about any command", () => {
    expect(siblingCommandHint("--statuses", siblings)).toBeUndefined()
  })
})
