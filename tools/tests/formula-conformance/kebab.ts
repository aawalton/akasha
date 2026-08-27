import type { Case } from "../../lib/formula-conformance.ts"

const WHY =
  "both sides now read a hyphen between two identifiers as subtraction, so both answer a number where the author meant a key; nothing in either implementation reports it, and the agreement here is agreement on a trap rather than on a result"

export const KEBAB_CASES: readonly Case[] = [
  {
    id: "kebab-bare-identifier-is-subtraction",
    category: "agreed",
    covers:
      "a bare identifier admits no hyphen, so `access-token` parses as a subtraction of two references that both resolve null, and answers 0 with no error at all",
    expression: "access-token",
    ours: { kind: "value", held: "0" },
    code: { kind: "value", held: "0" },
    why: WHY,
  },
  {
    id: "kebab-ignores-the-key-that-is-there",
    category: "agreed",
    covers:
      "the answer is still 0 where the hyphenated key is present and carries a value, because neither `access` nor `token` is ever looked up — the most dangerous silent behaviour in the language",
    expression: "access-token",
    values: { "access-token": 5 },
    ours: { kind: "value", held: "0" },
    code: { kind: "value", held: "0" },
    why: WHY,
  },
  {
    id: "kebab-makes-an-equality-guard-read-true",
    category: "agreed",
    covers: "a guard comparing a hyphenated key to zero passes, however large the value it meant to read",
    expression: "access-token == 0",
    values: { "access-token": 5 },
    ours: { kind: "value", held: "true" },
    code: { kind: "value", held: "true" },
    why: WHY,
  },
  {
    id: "kebab-makes-a-threshold-read-false",
    category: "agreed",
    covers: "a threshold on a hyphenated key never fires, because the subtraction it became is always zero",
    expression: "access-token > 0",
    values: { "access-token": 5 },
    ours: { kind: "value", held: "false" },
    code: { kind: "value", held: "false" },
    why: WHY,
  },
  {
    id: "kebab-three-segments-subtract-left-to-right",
    category: "agreed",
    covers: "a three-part hyphenated name is two subtractions, and answers a real number where all three parts resolve",
    expression: "a-b-c",
    values: { a: 10, b: 3, c: 2 },
    ours: { kind: "value", held: "5" },
    code: { kind: "value", held: "5" },
    why: WHY,
  },
]
