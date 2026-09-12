import { expect, test } from "bun:test"
import {
  conditionsTaken,
  saidWrong,
} from "akasha/temper/items-rules-core/inventory-rule-conditions-shape/inventory-rule-conditions-shape.module.code.ts"

test("a list of effect ids is taken", () => {
  const read = conditionsTaken({ potionEffects: ["Restore Health", "Restore Magicka"] })
  expect("taken" in read).toBe(true)
  if (!("taken" in read)) return
  expect(read.taken.potionEffects).toEqual(["Restore Health", "Restore Magicka"])
})

test("one effect id said as bare text is refused rather than taken for a list", () => {
  const read = conditionsTaken({ potionEffects: "Restore Health" })
  expect("wrong" in read).toBe(true)
  if (!("wrong" in read)) return
  expect(read.wrong.length).toBe(1)
  const one = read.wrong[0] as { field: string; held: unknown; why: string }
  expect(one.field).toBe("potionEffects")
  expect(one.held).toBe("Restore Health")
  expect(saidWrong(one)).toBe(
    '`potionEffects` holds "Restore Health", and the shape that field declares refuses it: Invalid input: expected array, received string'
  )
})

test("a number field holding text is refused by the same shape", () => {
  const read = conditionsTaken({ maxQuality: "high" })
  expect("wrong" in read).toBe(true)
  if (!("wrong" in read)) return
  expect(saidWrong(read.wrong[0] as { field: string; held: unknown; why: string })).toBe(
    '`maxQuality` holds "high", and the shape that field declares refuses it: Invalid input: expected number, received string'
  )
})

test("a field the shape does not name is carried through", () => {
  const read = conditionsTaken({ maxQuality: 3, effectsNobodyHasDeclaredYet: "whatever" })
  expect("taken" in read).toBe(true)
  if (!("taken" in read)) return
  expect((read.taken as Record<string, unknown>).effectsNobodyHasDeclaredYet).toBe("whatever")
})

test("every wrong field is named, not just the first", () => {
  const read = conditionsTaken({ potionEffects: "Restore Health", maxQuality: "high" })
  expect("wrong" in read).toBe(true)
  if (!("wrong" in read)) return
  expect(read.wrong.map((one) => one.field).sort()).toEqual(["maxQuality", "potionEffects"])
})
