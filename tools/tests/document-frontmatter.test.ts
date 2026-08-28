import { describe, expect, test } from "bun:test"
import { frontmatter } from "../../page/document/frontmatter.ts"
import { Source } from "../../page/document/position.ts"
import type { FrontmatterValue } from "../../page/document/types.ts"

function plain(value: FrontmatterValue): unknown {
  if (value.kind === "scalar") return value.value.text
  if (value.kind === "list") return value.items.map(plain)
  return Object.fromEntries(value.entries.map((entry) => [entry.key.text, plain(entry.value)]))
}

function read(block: string): { fields: Record<string, unknown>; unreadable: number } {
  const source = Source(`---\n${block}---\n\nbody\n`)
  const { keys, unreadable } = frontmatter(source)
  return { fields: Object.fromEntries(keys.map((k) => [k.name, plain(k.value)])), unreadable: unreadable.length }
}

function asYaml(block: string): unknown {
  return Bun.YAML.parse(block)
}

describe("a block scalar carries its lines into the value", () => {
  test("`|-` keeps the newlines and strips the trailing one", () => {
    const got = read("d: |-\n  one\n  two\n")
    expect(got.fields.d).toBe("one\ntwo")
    expect(got.unreadable).toBe(0)
  })

  test("`|` keeps the newlines and clips to a single trailing one", () => {
    expect(read("d: |\n  one\n  two\n").fields.d).toBe("one\ntwo\n")
  })

  test("`>-` folds a single break into a space", () => {
    expect(read("d: >-\n  one\n  two\n").fields.d).toBe("one two")
  })

  test("`>-` turns a run of blank lines into that many newlines", () => {
    expect(read("d: >-\n  one\n\n  two\n").fields.d).toBe("one\ntwo")
    expect(read("d: >-\n  one\n\n\n  two\n").fields.d).toBe("one\n\ntwo")
  })

  test("`>-` leaves a more-indented line alone", () => {
    expect(read("d: >-\n  one\n   deep\n  two\n").fields.d).toBe("one\n deep\ntwo")
  })

  test("a key after the block is still read", () => {
    const got = read("d: |-\n  one\ne: two\n")
    expect(got.fields).toEqual({ d: "one", e: "two" })
    expect(got.unreadable).toBe(0)
  })

  test("a block scalar nested under a key is read", () => {
    expect(read("a:\n  b: |-\n    deep\n  c: x\n").fields.a).toEqual({ b: "deep", c: "x" })
  })

  test("a block scalar standing as a list item is read", () => {
    expect(read("a:\n  - |-\n    one\n    two\n  - b\n").fields.a).toEqual(["one\ntwo", "b"])
  })

  test("every supported form reads back exactly as Bun's own YAML reads it", () => {
    for (const block of [
      "d: |-\n  one\n  two\n",
      "d: |\n  one\n  two\n",
      "d: >-\n  one\n  two\n",
      "d: >\n  one\n  two\n",
      "d: >-\n  one\n\n  two\n",
      "d: |-\n  one\n\n  two\n",
      "d: |-\n  one\ne: two\n",
    ])
      expect(read(block).fields).toEqual(asYaml(block) as Record<string, unknown>)
  })
})

describe("a block scalar this reader does not claim is refused rather than guessed", () => {
  test("`|+` is handed back as unreadable, because Bun's own YAML mis-chomps it", () => {
    expect(read("d: |+\n  one\n\n").unreadable).toBeGreaterThan(0)
  })

  test("an explicit indentation indicator is handed back as unreadable", () => {
    expect(read("d: |2-\n    one\n   two\n").unreadable).toBeGreaterThan(0)
  })
})

describe("a double-quoted scalar gives its escapes back decoded", () => {
  test("`\\n` is a newline", () => {
    expect(read('d: "one\\ntwo"\n').fields.d).toBe("one\ntwo")
  })

  test("`\\t` is a tab and `\\r` a carriage return", () => {
    expect(read('d: "one\\ttwo\\rthree"\n').fields.d).toBe("one\ttwo\rthree")
  })

  test("an escaped backslash before an n stays a backslash and an n", () => {
    expect(read('d: "one\\\\ntwo"\n').fields.d).toBe("one\\ntwo")
  })

  test("`\\uXXXX` is the character it names", () => {
    expect(read('d: "caf\\u00e9"\n').fields.d).toBe("café")
  })

  test("an escaped quote is still a quote", () => {
    expect(read('d: "say \\"hi\\""\n').fields.d).toBe('say "hi"')
  })

  test("a single-quoted scalar leaves a backslash alone, as YAML says", () => {
    expect(read("d: 'one\\ntwo'\n").fields.d).toBe("one\\ntwo")
  })

  test("every escape reads back exactly as Bun's own YAML reads it", () => {
    for (const block of [
      'd: "one\\ntwo"\n',
      'd: "one\\ttwo"\n',
      'd: "one\\\\ntwo"\n',
      'd: "caf\\u00e9"\n',
      'd: "say \\"hi\\""\n',
      "d: 'one\\ntwo'\n",
      "d: 'it''s'\n",
    ])
      expect(read(block).fields).toEqual(asYaml(block) as Record<string, unknown>)
  })
})

describe("a list item stating several keys is read as one record", () => {
  test("a key written under the item stands beside the one on the dash line", () => {
    const got = read("a:\n  - kind: ts-file\n    under: infra\n  - kind: workflow\n")
    expect(got.fields.a).toEqual([{ kind: "ts-file", under: "infra" }, { kind: "workflow" }])
    expect(got.unreadable).toBe(0)
  })

  test("every record form reads back exactly as Bun's own YAML reads it", () => {
    for (const block of [
      "a:\n  - kind: ts-file\n    under: infra\n",
      "a:\n  - kind: ts-file\n    under: infra\n  - kind: workflow\n",
      "a:\n  - kind: ts-file\n    under:\n      - one\n      - two\n",
      "a:\n  - name: x\n    at: y\n    mode: '420'\n",
    ])
      expect(read(block).fields).toEqual(asYaml(block) as Record<string, unknown>)
  })
})

describe("what the reader cannot account for it still hands back", () => {
  test("a line that is neither a key nor a list item is unreadable", () => {
    expect(read("a: one\nthis is prose\n").unreadable).toBe(1)
  })

  test("lines swallowed under a scalar key are unreadable", () => {
    expect(read("a: one\n  swallowed\n").unreadable).toBe(1)
  })
})
