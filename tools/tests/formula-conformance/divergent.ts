import type { Case } from "../../lib/formula-conformance.ts"

export const DIVERGENT_CASES: readonly Case[] = [
  {
    id: "divergent-answered-where-the-reference-rejected",
    category: "agreed",
    covers: "numeric-looking text, filed as agreed though the two substrates make it differ",
    expression: "a > b",
    values: { a: { where: "both", json: "12", held: "12" }, b: 0 },
    ours: { kind: "value", held: "true" },
    code: { kind: "error", code: "comparison_type_mismatch" },
  },
  {
    id: "divergent-two-answers-that-are-not-the-same",
    category: "agreed",
    covers: "a number against numeric text, filed as agreed though == is strict on the code side",
    expression: "a == b",
    values: { a: 1, b: { where: "both", json: "1", held: "1" } },
    ours: { kind: "value", held: "true" },
    code: { kind: "value", held: "false" },
  },
  {
    id: "divergent-two-rejections-that-are-not-for-the-same-reason",
    category: "agreed",
    covers:
      "a value posed by hand as a number to the database and as text to the file, filed as agreed though ours stops on text that is no number and the reference stops on the zero it divides by",
    expression: "a / b",
    values: { a: { where: "both", json: 1, held: "x" }, b: 0 },
    ours: { kind: "refused", says: "`/` reads a number on both sides, and the left side is the text `x`" },
    code: { kind: "error", code: "divide_by_zero" },
  },
  {
    id: "divergent-rejected-where-the-reference-answered",
    category: "agreed",
    covers: "the word `false` held in a file, filed as agreed though only the reference can read it",
    expression: "a && b",
    values: { a: { where: "both", json: "false", held: "false" }, b: 5 },
    ours: { kind: "refused", says: "a word to a file and a boolean to the database" },
    code: { kind: "value", held: "5" },
  },
]
