import { expect, test } from "bun:test"
import { formulaFileWrittenAgain } from "akasha/temper/player/character/stat/temper-metric/modules/metric-formula-writing/metric-formula-writing.module.code.ts"

const QUOTED = [
  'import type { FormulaNode } from "akasha/formula.ts"',
  "",
  "export const FORMULA: FormulaNode = {",
  '  "type": "add",',
  '  "operands": [',
  "    {",
  '      "type": "sum",',
  '      "odd-key": 1,',
  "    },",
  "  ],",
  "}",
  "",
].join("\n")

const BARE = [
  'import type { FormulaNode } from "akasha/formula.ts"',
  "",
  "export const FORMULA: FormulaNode = {",
  '  type: "add",',
  "  operands: [",
  "    {",
  '      type: "sum",',
  '      "odd-key": 1,',
  "    },",
  "  ],",
  "}",
  "",
].join("\n")

test("a formula file is written again with only the keys that need them quoted", () => {
  expect(formulaFileWrittenAgain(QUOTED)).toBe(BARE)
})

test("a formula file already written that way is written the same", () => {
  expect(formulaFileWrittenAgain(BARE)).toBe(BARE)
})
