
import { describe, expect, test } from "bun:test"
import { meaning } from "./meaning.ts"
import { parse } from "../../../page/document/parse.ts"
import { print } from "./print.ts"
import type { Block, Document, Inline } from "../../../page/document/types.ts"

const words = (content: readonly Inline[]): string => content.map((node) => node.text).join("")

describe("a four-space block, which is code and not prose with its indent taken off", () => {
  const doc = (body: string): Document => parse(`# H\n\n${body}\n`, "t.md")
  const first = (body: string): Block | undefined => doc(body).sections[0]?.blocks[0]
  const code = (body: string): string | null => {
    const block = first(body)
    return block?.kind === "fence" ? block.text : null
  }
  const roundTrips = (body: string): boolean => {
    const once = doc(body)
    return JSON.stringify(meaning(parse(print(once), "t.md"))) === JSON.stringify(meaning(once))
  }

  test("a first line beginning with a hash stays code rather than coming back a heading", () => {
    const body = "    ## A command reports success on a write it did not make\n\n    Evidence one."
    expect(first(body)?.kind).toBe("fence")
    expect(code(body)).toBe("## A command reports success on a write it did not make\n\nEvidence one.")
    expect(doc(body).sections[0]?.sections).toEqual([])
    expect(roundTrips(body)).toBe(true)
  })

  test("what reads as a list inside one is code, and nothing builds a list out of it", () => {
    const body = "    - not an item\n    - nor this"
    expect(first(body)?.kind).toBe("fence")
    expect(code(body)).toBe("- not an item\n- nor this")
    expect(roundTrips(body)).toBe(true)
  })

  test("an indented line cannot interrupt a paragraph, and standing apart from one it is code", () => {
    const under = first("prose\n    ## not a heading")
    expect(under?.kind).toBe("paragraph")
    expect(under?.kind === "paragraph" && words(under.content)).toBe("prose ## not a heading")
    const apart = doc("prose\n\n    ## not a heading").sections[0]?.blocks ?? []
    expect(apart.map((block) => block.kind)).toEqual(["paragraph", "fence"])
    const second = apart[1]
    expect(second?.kind === "fence" && second.text).toBe("## not a heading")
  })

  test("four spaces under a list item is that item's continuation, not a block of its own", () => {
    const body = "- item\n\n    continuation"
    const blocks = doc(body).sections[0]?.blocks ?? []
    expect(blocks.map((block) => block.kind)).toEqual(["list"])
    const list = blocks[0]
    expect(list?.kind === "list" && list.items.length).toBe(1)
    expect(list?.kind === "list" && words(list.items[0]!.content)).toBe("item continuation")
    expect(roundTrips(body)).toBe(true)
  })

  test("only the first four spaces come off, so a deeper line keeps the shape it was written in", () => {
    expect(code("    outer\n        inner")).toBe("outer\n    inner")
    expect(roundTrips("    outer\n        inner")).toBe(true)
  })

  test("a fenced block is read exactly as it was, indented or not", () => {
    const fenced = first("```ts\nconst x = 1\n```")
    expect(fenced?.kind === "fence" && fenced.lang).toBe("ts")
    expect(code("```ts\nconst x = 1\n```")).toBe("const x = 1")
    expect(code("```\n    four spaces inside a fence\n```")).toBe("    four spaces inside a fence")
    expect(code("    ```\n    still a fence\n    ```")).toBe("    still a fence")
    expect(roundTrips("```ts\nconst x = 1\n```")).toBe(true)
    expect(roundTrips("```\n    four spaces inside a fence\n```")).toBe(true)
  })

  test("a block quoting a bare fence line is written back indented, since a fence would close on it", () => {
    const body = "    text\n    ```\n    quoted\n    ```"
    expect(code(body)).toBe("text\n```\nquoted\n```")
    expect(print(doc(body))).toBe("# H\n\n    text\n    ```\n    quoted\n    ```\n")
    expect(roundTrips(body)).toBe(true)
  })
})
