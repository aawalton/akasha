import { expect, test } from "bun:test"
import { misshapenList } from "akasha/temper/items-rules-eval/check-result/check-result.module.code.ts"

test("a list is the shape a list condition takes, so nothing is said of it", () => {
  expect(misshapenList("potion-effects", ["Restore Health"])).toBeUndefined()
  expect(misshapenList("potion-effects", [])).toBeUndefined()
})

test("bare text where a list belongs is named rather than tested", () => {
  const said = misshapenList("potion-effects", "Restore Health")
  expect(said?.kind).toBe("misshapen")
  expect(said?.conditionKind).toBe("potion-effects")
  expect(said?.held).toBe('"Restore Health"')
  expect(said?.why).toBe(
    "potion-effects is a list of ids, and this rule states one value that is no list"
  )
})

test("a text list condition is caught whatever the field is called", () => {
  expect(misshapenList("traits", "intricate")?.conditionKind).toBe("traits")
  expect(misshapenList("location", "bank")?.held).toBe('"bank"')
  expect(misshapenList("setSourceTypes", 7)?.held).toBe("7")
})
