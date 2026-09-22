import { expect, test } from "bun:test"
import {
  enumGroups,
  eventGroups,
  functionGroups,
  objectGroups,
} from "akasha/temper/eso/declaration/modules/eso-declaration-text/eso-declaration-text.module.code.ts"

function said(groups: readonly (readonly string[])[]): string {
  return groups.map((one) => one.join("\n")).join("\n")
}

const BUTTON = {
  name: "Button",
  inheritsFrom: ["Control"],
  methods: [
    {
      name: "GetName",
      params: [],
      returns: [{ name: "n", type: "string" }],
      hasVariableReturns: false,
    },
  ],
}

test("an enum is a number type and each value a declared number, held in one group", () => {
  expect(enumGroups([{ name: "AbilityType", values: ["ABILITY_TYPE_ATTACK"] }])).toEqual([
    ["type AbilityType = number", "declare const ABILITY_TYPE_ATTACK: number"],
  ])
})

test("a function takes a void this before its optional parameters", () => {
  const text = said(
    functionGroups([
      {
        name: "GetUnitName",
        params: [{ name: "unitTag", type: "string", isOptional: false }],
        returns: [{ name: "name", type: "string" }],
        hasVariableReturns: false,
      },
    ])
  )
  expect(text).toContain("declare function GetUnitName(this: void, unitTag?: string): string")
})

test("several returns become a tuple and variable returns end in a rest", () => {
  const returns = [
    { name: "one", type: "string" },
    { name: "two", type: "number" },
  ]
  const fixed = said(
    functionGroups([{ name: "Two", params: [], returns, hasVariableReturns: false }])
  )
  expect(fixed).toContain("LuaMultiReturn<[one: string, two: number]>")
  const varying = said(
    functionGroups([{ name: "Many", params: [], returns, hasVariableReturns: true }])
  )
  expect(varying).toContain("LuaMultiReturn<[one: string, two: number, ...rest: (number)[]]>")
})

test("a call answering nothing is a declared const holding a function type", () => {
  const text = said(
    functionGroups([{ name: "DoIt", params: [], returns: [], hasVariableReturns: false }])
  )
  expect(text).toContain("declare const DoIt: (this: void) => void")
})

test("an event is a declared number and a repeat is written once", () => {
  expect(
    eventGroups([
      { name: "EVENT_ONE", params: [] },
      { name: "EVENT_ONE", params: [] },
    ])
  ).toEqual([["declare const EVENT_ONE: number"]])
})

test("an object with no methods and no parent is an empty type", () => {
  expect(said(objectGroups([{ name: "Blank", inheritsFrom: [], methods: [] }]))).toContain(
    "type Blank = {}"
  )
})

test("an object states each method as a property holding a function type", () => {
  const text = said(objectGroups([BUTTON]))
  expect(text).toContain("interface Button extends Control {")
  expect(text).toContain("  GetName: () => string")
})

test("nothing written here carries a comment or a blank line", () => {
  const text = said([
    ...enumGroups([{ name: "AbilityType", values: ["ABILITY_TYPE_ATTACK"] }]),
    ...functionGroups([{ name: "DoIt", params: [], returns: [], hasVariableReturns: false }]),
    ...eventGroups([{ name: "EVENT_ONE", params: [] }]),
    ...objectGroups([BUTTON]),
  ])
  expect(text).not.toContain("//")
  expect(text.split("\n").some((line) => line.trim() === "")).toBe(false)
})
