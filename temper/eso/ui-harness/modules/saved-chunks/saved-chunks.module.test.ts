import { expect, test } from "bun:test"
import { savedChunks } from "akasha/temper/eso/ui-harness/modules/saved-chunks/saved-chunks.module.code.ts"

const SMALL = 'Small_Data =\n{\n    ["x"] = 1,\n}\n'

const NESTED =
  'Nested_Data =\n{\n    [1] = "a",\n    ["k"] = \n    {\n        [2] = true,\n    },\n}\n'

test("a saved variable under the chunk size is set whole, as its file writes it", () => {
  expect(savedChunks(SMALL)).toEqual(['Small_Data = {\n    ["x"] = 1,\n}'])
})

test("a table over the chunk size is made empty and set entry by entry, keys as written", () => {
  expect(savedChunks(NESTED, 20).join("\n")).toBe(
    [
      "Nested_Data = {}",
      'Nested_Data[1] = "a"',
      'Nested_Data["k"] = {}',
      'Nested_Data["k"][2] = true',
    ].join("\n")
  )
})

test("statements share a chunk while together they fit the chunk size", () => {
  expect(savedChunks(NESTED, 40)).toEqual([
    'Nested_Data = {}\nNested_Data[1] = "a"',
    'Nested_Data["k"] = {\n        [2] = true,\n    }',
  ])
})

test("braces inside a string or a comment open no table", () => {
  const source = 'Odd_Data = { ["s"] = "}{", -- }\n ["t"] = 2 }\n'
  expect(savedChunks(source, 5).join("\n")).toBe(
    ["Odd_Data = {}", 'Odd_Data["s"] = "}{"', 'Odd_Data["t"] = 2'].join("\n")
  )
})

test("an entry with no key is set at the place it holds among the keyless entries", () => {
  expect(savedChunks('List_Data = { "x", ["n"] = 0, "y" }', 5).join("\n")).toBe(
    ["List_Data = {}", 'List_Data[1] = "x"', 'List_Data["n"] = 0', 'List_Data[2] = "y"'].join("\n")
  )
})

test("every saved variable a file sets is carried, in the order written", () => {
  expect(savedChunks("One_Data = { a = 1 }\nTwo_Data = {}\n")).toEqual([
    "One_Data = { a = 1 }\nTwo_Data = {}",
  ])
})
