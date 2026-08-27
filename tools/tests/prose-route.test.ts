import { describe, expect, test } from "bun:test"
import type { HelpFlag } from "../ops/surface.ts"
import {
  expandProseRoutes,
  normalizeRouteValue,
  PROSE_ROUTE_SUFFIX,
  planProseRouteReads,
} from "../lib/prose-route.ts"

function flagNames(flags: readonly { readonly name: string }[]): readonly string[] {
  return flags.map((f) => f.name)
}

describe("expandProseRoutes", () => {
  test("a declared prose flag gains a route sibling that accepts stdin and a path", () => {
    const { flags } = expandProseRoutes<HelpFlag>([
      { name: "--message", argLabel: "<text>", valueShape: "prose", description: "d" },
    ])

    expect(flagNames(flags)).toEqual(["--message", "--message-file"])
    const route = flags[1]
    expect(route?.acceptsStdin).toBe(true)
    expect(route?.path).toBe(true)
    expect(route?.argLabel).toBe("<path|->")
    expect(route?.required).toBeUndefined()
  })

  test("a synthesised route declares its shape: a path or `-` is a token", () => {
    const { flags } = expandProseRoutes<HelpFlag>([
      { name: "--message", argLabel: "<text>", valueShape: "prose", description: "d" },
    ])

    expect(flags[1]?.valueShape).toBe("token")
  })

  test("the prose flag itself is passed through untouched", () => {
    const declared: HelpFlag = {
      name: "--message",
      argLabel: "<text>",
      valueShape: "prose",
      required: true,
      description: "d",
    }

    expect(expandProseRoutes([declared]).flags[0]).toBe(declared)
  })

  test("OMISSION DOES NOT SYNTHESISE — only an explicit prose declaration does", () => {
    const { flags, synthesized } = expandProseRoutes([
      { name: "--message", argLabel: "<text>", description: "d" },
    ])

    expect(flagNames(flags)).toEqual(["--message"])
    expect(synthesized.size).toBe(0)
  })

  test("a token flag and a boolean flag each gain nothing", () => {
    const { flags } = expandProseRoutes([
      { name: "--seq", argLabel: "<n>", valueShape: "token", description: "d" },
      { name: "--json", description: "d" },
    ])

    expect(flagNames(flags)).toEqual(["--seq", "--json"])
  })

  test("a hand-declared route is not duplicated, and is not reported as synthesized", () => {
    const { flags, synthesized } = expandProseRoutes([
      { name: "--content", argLabel: "<text>", valueShape: "prose", description: "d" },
      { name: "--content-file", argLabel: "<path|->", acceptsStdin: true, description: "d" },
    ])

    expect(flagNames(flags)).toEqual(["--content", "--content-file"])
    expect(synthesized.size).toBe(0)
  })

  test("a route colliding with an alias is not synthesized either", () => {
    const { flags, synthesized } = expandProseRoutes([
      { name: "--content", argLabel: "<text>", valueShape: "prose", description: "d" },
      { name: "--body", argLabel: "<p>", aliases: ["--content-file"], description: "d" },
    ])

    expect(flagNames(flags)).toEqual(["--content", "--body"])
    expect(synthesized.size).toBe(0)
  })

  test("a repeatable prose flag gets a repeatable route", () => {
    const { flags } = expandProseRoutes([
      { name: "--option", argLabel: "<text>", valueShape: "prose", repeat: true, description: "d" },
    ])

    expect(flags[1]?.repeat).toBe(true)
  })

  test("synthesized maps each route back to the flag it feeds, and to that flag's shape", () => {
    const { synthesized } = expandProseRoutes([
      { name: "--message", argLabel: "<text>", valueShape: "prose", description: "d" },
      { name: "--title", argLabel: "<s>", valueShape: "line", description: "d" },
    ])

    expect([...synthesized]).toEqual([
      [`--message${PROSE_ROUTE_SUFFIX}`, { proseFlag: "--message", valueShape: "prose" }],
      [`--title${PROSE_ROUTE_SUFFIX}`, { proseFlag: "--title", valueShape: "line" }],
    ])
  })
})

describe("a single-line flag earns the same route and a different parse", () => {
  test("a declared line flag gains a route sibling, exactly as a prose flag does", () => {
    const { flags } = expandProseRoutes<HelpFlag>([
      { name: "--title", argLabel: "<s>", valueShape: "line", description: "d" },
    ])

    expect(flagNames(flags)).toEqual(["--title", "--title-file"])
    expect(flags[1]?.acceptsStdin).toBe(true)
    expect(flags[1]?.valueShape).toBe("token")
  })

  test("a line flag whose route is HAND-DECLARED is refused, not silently skipped", () => {
    expect(() =>
      expandProseRoutes([
        { name: "--title", argLabel: "<s>", valueShape: "line", description: "d" },
        { name: "--title-file", argLabel: "<path|->", valueShape: "token", description: "d" },
      ])
    ).toThrow(/--title.*--title-file/)
  })

  test("an unrelated future shape fails closed — it synthesises nothing", () => {
    const { flags, synthesized } = expandProseRoutes([
      // @ts-expect-error — not a member of FlagValueShape; the point is the fail-closed arm.
      { name: "--payload", argLabel: "<x>", valueShape: "csv", description: "d" },
    ])

    expect(flagNames(flags)).toEqual(["--payload"])
    expect(synthesized.size).toBe(0)
  })
})

describe("normalizeRouteValue", () => {
  test("prose is byte-verbatim, trailing newline and all", () => {
    expect(normalizeRouteValue("a\nb\n", "prose")).toBe("a\nb\n")
  })

  test("line drops the terminator a heredoc appends", () => {
    expect(normalizeRouteValue("a title\n", "line")).toBe("a title")
  })

  test("line drops a CRLF terminator whole, leaving no stranded CR", () => {
    expect(normalizeRouteValue("a title\r\n", "line")).toBe("a title")
  })

  test("line drops every trailing terminator — an empty last line is not content", () => {
    expect(normalizeRouteValue("a title\n\n\n", "line")).toBe("a title")
  })

  test("line leaves a value that never had a terminator alone", () => {
    expect(normalizeRouteValue("a title", "line")).toBe("a title")
  })

  test("line touches no trailing SPACE or TAB — that is a different producer", () => {
    expect(normalizeRouteValue("a title  ", "line")).toBe("a title  ")
    expect(normalizeRouteValue("a title\t", "line")).toBe("a title\t")
  })

  test("line preserves an interior newline — the stated bound of the claim", () => {
    expect(normalizeRouteValue("one\ntwo\n", "line")).toBe("one\ntwo")
  })

  test("line leaves an empty value empty rather than inventing content", () => {
    expect(normalizeRouteValue("\n", "line")).toBe("")
  })
})

describe("planProseRouteReads", () => {
  const synthesized = new Map([
    ["--message-file", { proseFlag: "--message", valueShape: "prose" } as const],
  ])

  test("no route supplied yields no read", () => {
    expect(planProseRouteReads(synthesized, new Map())).toEqual([])
  })

  test("a supplied route yields one read against the flag it feeds", () => {
    const supplied = new Map<string, string | string[] | true>([["--message-file", "/tmp/m"]])

    expect(planProseRouteReads(synthesized, supplied)).toEqual([
      {
        routeFlag: "--message-file",
        proseFlag: "--message",
        valueShape: "prose",
        paths: ["/tmp/m"],
      },
    ])
  })

  test("the plan carries the parse each read owes, not only where to read", () => {
    const lineRoute = new Map([
      ["--title-file", { proseFlag: "--title", valueShape: "line" } as const],
    ])
    const supplied = new Map<string, string | string[] | true>([["--title-file", "/tmp/t"]])

    expect(planProseRouteReads(lineRoute, supplied)[0]?.valueShape).toBe("line")
  })

  test("both surfaces supplied is refused, naming both", () => {
    const supplied = new Map<string, string | string[] | true>([
      ["--message", "inline"],
      ["--message-file", "/tmp/m"],
    ])

    expect(() => planProseRouteReads(synthesized, supplied)).toThrow(/--message.*--message-file/)
  })

  test("a repeated route carries every path in order", () => {
    const supplied = new Map<string, string | string[] | true>([["--message-file", ["/a", "/b"]]])

    expect(planProseRouteReads(synthesized, supplied)[0]?.paths).toEqual(["/a", "/b"])
  })
})
