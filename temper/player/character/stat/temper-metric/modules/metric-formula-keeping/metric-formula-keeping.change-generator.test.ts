import { expect, test } from "bun:test"
import { isFormulaFile } from "akasha/temper/player/character/stat/temper-metric/modules/metric-formula-keeping/metric-formula-keeping.change-generator.code.ts"

test("a stat's formula file is kept, and the stat page beside it is not", () => {
  const at = "temper/player/character/stat/temper-metric/pages/armor/armor.temper-metric"
  expect(isFormulaFile(`${at}.formula.ts`)).toBe(true)
  expect(isFormulaFile(`${at}.ts`)).toBe(false)
})
