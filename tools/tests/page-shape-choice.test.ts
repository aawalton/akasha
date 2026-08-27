import { describe, expect, test } from "bun:test"
import type { Verdict } from "../../page/document/types.ts"
import { hold, shapeOf, type Shape } from "../../page/shape/shape.ts"

const AT = "pages/page-type/fixture.page-type.md"
const PAGE = "initiatives/one.md"

const stageBlock = (key: string): readonly string[] => [
  `  ${key}:`,
  "    count: 0-1",
  "    repeat: 1-12",
  "    children: 1-15",
]

const stageBody = (heading: string): readonly string[] => [`# ${heading}`, "", "1. **{stage}**", "   - {action}", ""]

function typeText(choices: readonly string[]): string {
  return [
    "---",
    "blocks:",
    ...stageBlock("sequence"),
    ...stageBlock("loop"),
    ...choices,
    "slots:",
    "  stage:",
    "    max: sm",
    "  action:",
    "    max: lg",
    "---",
    "",
    ...stageBody("Sequence"),
    ...stageBody("Loop"),
  ].join("\n")
}

const choiceOver = (repeat: string): readonly string[] => [
  "choices:",
  "  stages:",
  "    of:",
  "      - sequence",
  "      - loop",
  `    repeat: ${repeat}`,
]

function compiled(choices: readonly string[]): Shape {
  const one = shapeOf("fixture", AT, typeText(choices))
  expect(one.why).toBeNull()
  expect(one.compiled).not.toBeNull()
  return one
}

function refused(choices: readonly string[]): string {
  const { compiled: schema, why } = shapeOf("fixture", AT, typeText(choices))
  expect(schema).toBeNull()
  expect(why).not.toBeNull()
  return why!
}

const pageWith = (headings: readonly string[]): string =>
  ["---", "---", "", ...headings.flatMap((heading) => stageBody(heading))].join("\n")

function held(shape: Shape, headings: readonly string[]): boolean {
  const verdict: Verdict = hold(shape, PAGE, pageWith(headings))
  return verdict.ok
}

describe("the choice a page type states over the sections it declares", () => {
  test("a page type stating none carries none, its sections standing on their own bounds alone", () => {
    expect(compiled([]).compiled!.choices).toBeUndefined()
  })
})

describe("what a compiled choice admits of a page", () => {
  const AT_MOST_ONE = compiled(choiceOver("0-1"))
  const EXACTLY_ONE = compiled(choiceOver("1"))
  const NEITHER = compiled([])

  const CASES: readonly (readonly [readonly string[], boolean, boolean, boolean])[] = [
    [[], true, false, true],
    [["Sequence"], true, true, true],
    [["Loop"], true, true, true],
    [["Sequence", "Loop"], false, false, true],
  ]

  for (const [headings, atMostOne, exactlyOne, none] of CASES) {
    const written = headings.length === 0 ? "neither section" : headings.map((one) => `\`# ${one}\``).join(" and ")
    test(`a page carrying ${written} is judged by the count and not by the sections' own bounds`, () => {
      expect(held(AT_MOST_ONE, headings)).toBe(atMostOne)
      expect(held(EXACTLY_ONE, headings)).toBe(exactlyOne)
      expect(held(NEITHER, headings)).toBe(none)
    })
  }
})

describe("a choice this cannot read", () => {
  const CASES: readonly (readonly [string, readonly string[], string])[] = [
    ["a name that is no section the template declares", ["choices:", "  stages:", "    of:", "      - sequence", "      - stages", "    repeat: 0-1"], "names no section"],
    ["a size rank where a count belongs", [...choiceOver("sm")], "is not a count"],
    ["a count running backwards", [...choiceOver("2-1")], "runs backwards"],
    ["no count at all", ["choices:", "  stages:", "    of:", "      - sequence", "      - loop"], "no `repeat:`"],
    ["one section alone", ["choices:", "  stages:", "    of:", "      - sequence", "    repeat: 0-1"], "two sections or more"],
    ["the same section twice", ["choices:", "  stages:", "    of:", "      - sequence", "      - sequence", "    repeat: 0-1"], "twice"],
    ["no sections at all", ["choices:", "  stages:", "    repeat: 0-1"], "is not a list"],
    ["a scalar where the map belongs", ["choices: sequence or loop"], "no map of named choices"],
    ["a list where the map belongs", ["choices:", "  - sequence", "  - loop"], "no map of named choices"],
  ]

  for (const [name, choices, says] of CASES)
    test(`${name} is reported with the reason rather than compiling to nothing`, () => {
      expect(refused(choices)).toContain(says)
    })
})
