import { expect, test } from "bun:test"
import {
  generateEnumsFile,
  generateEventsFile,
  generateFunctionsFile,
  generateObjectsFile,
} from "./eso-declaration-text.module.code.ts"

test("an enum is a number type and each value a declared number", () => {
  const text = generateEnumsFile([{ name: "AbilityType", values: ["ABILITY_TYPE_ATTACK"] }])
  expect(text).toContain("type AbilityType = number")
  expect(text).toContain("declare const ABILITY_TYPE_ATTACK: number")
})

test("a function takes a void this before its optional parameters", () => {
  const text = generateFunctionsFile([
    {
      name: "GetUnitName",
      params: [{ name: "unitTag", type: "string", isOptional: false }],
      returns: [{ name: "name", type: "string" }],
      hasVariableReturns: false,
    },
  ])
  expect(text).toContain("declare function GetUnitName(this: void, unitTag?: string): string")
})

test("several returns become a tuple and variable returns end in a rest", () => {
  const returns = [
    { name: "one", type: "string" },
    { name: "two", type: "number" },
  ]
  const fixed = generateFunctionsFile([
    { name: "Two", params: [], returns, hasVariableReturns: false },
  ])
  expect(fixed).toContain("LuaMultiReturn<[one: string, two: number]>")
  const varying = generateFunctionsFile([
    { name: "Many", params: [], returns, hasVariableReturns: true },
  ])
  expect(varying).toContain("LuaMultiReturn<[one: string, two: number, ...rest: (number)[]]>")
})

test("a call with no return is void", () => {
  const text = generateFunctionsFile([
    { name: "DoIt", params: [], returns: [], hasVariableReturns: false },
  ])
  expect(text).toContain("declare function DoIt(this: void): void")
})

test("an event is a declared number and a repeat is written once", () => {
  const text = generateEventsFile([
    { name: "EVENT_ONE", params: [] },
    { name: "EVENT_ONE", params: [] },
  ])
  expect(text.split("declare const EVENT_ONE: number").length).toBe(2)
})

test("an object with no methods and no parent is an empty type", () => {
  expect(generateObjectsFile([{ name: "Blank", inheritsFrom: [], methods: [] }])).toContain(
    "type Blank = {}"
  )
})

test("an object with a parent is an interface extending it", () => {
  const text = generateObjectsFile([
    {
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
    },
  ])
  expect(text).toContain("interface Button extends Control {")
  expect(text).toContain("GetName(): string")
})
