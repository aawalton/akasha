import { expect, test } from "bun:test"
import { type LamDropdownData, valueDropdown } from "./dropdown"

function numberDropdown(store: { value: number }): LamDropdownData {
  return valueDropdown<number>({
    name: "Minimap size",
    choices: ["Small", "Medium", "Large"],
    values: [200, 300, 400],
    get: () => store.value,
    set: (v) => {
      store.value = v
    },
  })
}

test("emits choices + parallel choicesValues for LAM value-keyed mode", () => {
  const control = numberDropdown({ value: 200 })
  expect(control.type).toBe("dropdown")
  expect(control.choices).toEqual(["Small", "Medium", "Large"])
  expect(control.choicesValues).toEqual([200, 300, 400])
})

test("getFunc reads the stored value verbatim", () => {
  const control = numberDropdown({ value: 300 })
  expect(control.getFunc()).toBe(300)
})

test("setFunc round-trips a known value back to the typed setter", () => {
  const store = { value: 200 }
  const control = numberDropdown(store)
  control.setFunc(400)
  expect(store.value).toBe(400)
})

test("setFunc no-ops on a value absent from the choices (unknown selection)", () => {
  const store = { value: 200 }
  const control = numberDropdown(store)
  control.setFunc(999)
  expect(store.value).toBe(200)
})

test("carries a string stored-value type through unchanged", () => {
  const store = { value: "current" }
  const control = valueDropdown<string>({
    name: "Mark unknown by",
    choices: ["Disabled", "Default", "Current"],
    values: ["disabled", "default", "current"],
    get: () => store.value,
    set: (v) => {
      store.value = v
    },
  })
  control.setFunc("default")
  expect(store.value).toBe("default")
  expect(control.getFunc()).toBe("default")
})

test("threads scrollable + width passthrough onto the control", () => {
  const control = valueDropdown<number>({
    name: "Sizes",
    choices: ["A", "B"],
    values: [1, 2],
    get: () => 1,
    set: () => undefined,
    scrollable: true,
    width: "half",
  })
  expect(control.scrollable).toBe(true)
  expect(control.width).toBe("half")
})

test("threads parallel choicesTooltips passthrough onto the control", () => {
  const control = valueDropdown<string>({
    name: "Mark option",
    choices: ["Using", "Inventory", "All"],
    values: ["using", "inventory", "all"],
    choicesTooltips: ["While using", "In inventory", "Always"],
    get: () => "using",
    set: () => undefined,
  })
  expect(control.choicesTooltips).toEqual(["While using", "In inventory", "Always"])
})

test("omits choicesTooltips when the spec carries none", () => {
  const control = numberDropdown({ value: 200 })
  expect(control.choicesTooltips).toBeUndefined()
})
