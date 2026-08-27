import { afterAll, describe, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import type { CommandHelp } from "../ops/surface.ts"
import { parseArgs } from "../lib/parse-args.ts"

const dir = mkdtempSync(join(tmpdir(), "prose-route-"))
afterAll(() => rmSync(dir, { force: true, recursive: true }))

const PAYLOAD = "note: run `ops project deploy` and $(check) it — em-dash, then EOF\n"

function payloadFile(name: string, text: string): string {
  const path = join(dir, name)
  writeFileSync(path, text)
  return path
}

const HELP: CommandHelp = {
  description: "d",
  flags: [
    { name: "--message", argLabel: "<text>", valueShape: "prose", description: "d" },
    { name: "--seq", argLabel: "<n>", valueShape: "token", description: "d" },
  ],
}

describe("prose route resolution through parseArgs", () => {
  test("the route delivers the file's bytes verbatim into the flag it feeds", () => {
    const path = payloadFile("verbatim.txt", PAYLOAD)

    const parsed = parseArgs(HELP, ["--message-file", path])

    expect(parsed.string("--message")).toBe(PAYLOAD)
  })

  test("the resolved value keeps the shell-active spans a shell would have eaten", () => {
    const path = payloadFile("spans.txt", PAYLOAD)

    const resolved = parseArgs(HELP, ["--message-file", path]).string("--message") ?? ""

    expect(resolved).toContain("`ops project deploy`")
    expect(resolved).toContain("$(check)")
    expect(Buffer.from(resolved).length).toBe(Buffer.from(PAYLOAD).length)
  })

  test("the route flag reads back as consumed, not as a leftover path", () => {
    const path = payloadFile("consumed.txt", PAYLOAD)

    expect(parseArgs(HELP, ["--message-file", path]).string("--message-file")).toBeUndefined()
  })

  test("supplying both surfaces is refused rather than silently preferring one", () => {
    const path = payloadFile("both.txt", PAYLOAD)

    expect(() => parseArgs(HELP, ["--message", "inline", "--message-file", path])).toThrow(
      /--message.*--message-file/
    )
  })

  test("an unreadable path fails loud as an input error", () => {
    expect(() => parseArgs(HELP, ["--message-file", join(dir, "absent.txt")])).toThrow(
      /failed to read/
    )
  })

  test("a token flag has no route to supply", () => {
    expect(() => parseArgs(HELP, ["--seq-file", "/x"])).toThrow(/unknown flag/)
  })
})

describe("the route satisfies the obligations of the flag it feeds", () => {
  const required: CommandHelp = {
    description: "d",
    flags: [
      {
        name: "--question",
        argLabel: "<text>",
        valueShape: "prose",
        required: true,
        description: "d",
      },
    ],
  }

  test("a required prose flag is satisfied by its route alone", () => {
    const path = payloadFile("required.txt", PAYLOAD)

    expect(parseArgs(required, ["--question-file", path]).string("--question")).toBe(PAYLOAD)
  })

  test("neither surface still fails the required check", () => {
    expect(() => parseArgs(required, [])).toThrow(/--question: required flag missing/)
  })

  const repeated: CommandHelp = {
    description: "d",
    flags: [
      {
        name: "--option",
        argLabel: "<text>",
        valueShape: "prose",
        repeat: true,
        description: "d",
      },
    ],
  }

  test("a repeatable prose flag collects one value per route occurrence, in order", () => {
    const a = payloadFile("opt-a.txt", "first `option`")
    const b = payloadFile("opt-b.txt", "second $(option)")

    const parsed = parseArgs(repeated, ["--option-file", a, "--option-file", b])

    expect(parsed.repeated("--option")).toEqual(["first `option`", "second $(option)"])
  })
})

describe("a single-line value arrives as one line", () => {
  const titled: CommandHelp = {
    description: "d",
    flags: [
      { name: "--title", argLabel: "<s>", valueShape: "line", description: "d" },
      { name: "--notes", argLabel: "<s>", valueShape: "prose", description: "d" },
    ],
  }

  test("a heredoc-authored title lands with no trailing newline", () => {
    const path = payloadFile(
      "heredoc-title.txt",
      "A title written the way every agent writes one\n"
    )

    expect(parseArgs(titled, ["--title-file", path]).string("--title")).toBe(
      "A title written the way every agent writes one"
    )
  })

  test("the shell-active spans a title carries survive the parse untouched", () => {
    const path = payloadFile("hazard-title.txt", "run `ops project deploy` and $(check) it\n")

    expect(parseArgs(titled, ["--title-file", path]).string("--title")).toBe(
      "run `ops project deploy` and $(check) it"
    )
  })

  test("a multi-line value on a PROSE flag is still byte-identical", () => {
    const body = "para one\n\npara two, trailing blank line follows\n\n"
    const path = payloadFile("notes.txt", body)

    const resolved = parseArgs(titled, ["--notes-file", path]).string("--notes")

    expect(resolved).toBe(body)
    expect(Buffer.from(resolved ?? "").length).toBe(Buffer.from(body).length)
  })

  test("a title supplied INLINE is untouched — the parse belongs to the file route", () => {
    expect(parseArgs(titled, ["--title", "inline title\n"]).string("--title")).toBe(
      "inline title\n"
    )
  })
})

describe("a hand-declared route is left to the handler that owns it", () => {
  const handDeclared: CommandHelp = {
    description: "d",
    flags: [
      { name: "--content", argLabel: "<text>", valueShape: "prose", description: "d" },
      {
        name: "--content-file",
        argLabel: "<path|->",
        valueShape: "token",
        acceptsStdin: true,
        path: true,
        description: "d",
      },
    ],
  }

  test("the path stays in the route flag and the prose flag stays empty", () => {
    const parsed = parseArgs(handDeclared, ["--content-file", "/some/path"])

    expect(parsed.string("--content-file")).toBe("/some/path")
    expect(parsed.string("--content")).toBeUndefined()
  })
})
