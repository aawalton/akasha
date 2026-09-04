import { expect, test } from "bun:test"
import { detectIndent, replaceOrInsertLuaBlock } from "./watcher-settings-lua-block.module.code.ts"

const FILE = [
  "TemperInventory =",
  "{",
  '    ["Default"] =',
  "    {",
  '        ["alpha"] =',
  "        {",
  '            ["x"] = 1,',
  "        },",
  '        ["beta"] = 2,',
  "    },",
  "}",
]

test("a key already there is replaced where it is", () => {
  const out = replaceOrInsertLuaBlock(FILE, "alpha", ['        ["alpha"] = "new",'], [])
  expect(out).toEqual([
    "TemperInventory =",
    "{",
    '    ["Default"] =',
    "    {",
    '        ["alpha"] = "new",',
    '        ["beta"] = 2,',
    "    },",
    "}",
  ])
})

test("braces are counted so a nested block does not end the outer one", () => {
  const nested = [
    '        ["alpha"] =',
    "        {",
    '            ["inner"] = { ["deep"] = 1 },',
    "        },",
    '        ["beta"] = 2,',
  ]
  const out = replaceOrInsertLuaBlock(nested, "alpha", ["REPLACED"], [])
  expect(out).toEqual(["REPLACED", '        ["beta"] = 2,'])
})

test("a key absent is inserted before the first sibling key found", () => {
  const out = replaceOrInsertLuaBlock(FILE, "gamma", ['        ["gamma"] = 3,'], ["beta"])
  expect(out[8]).toBe('        ["gamma"] = 3,')
  expect(out[9]).toBe('        ["beta"] = 2,')
})

test("siblings are tried in the order the caller named them", () => {
  const first = replaceOrInsertLuaBlock(FILE, "gamma", ["NEW"], ["beta", "alpha"])
  const second = replaceOrInsertLuaBlock(FILE, "gamma", ["NEW"], ["alpha", "beta"])
  expect(first.indexOf("NEW")).toBe(8)
  expect(second.indexOf("NEW")).toBe(4)
})

test("content no anchor is found in is handed back unchanged", () => {
  const out = replaceOrInsertLuaBlock(FILE, "gamma", ["NEW"], ["nowhere"])
  expect(out).toEqual(FILE)
})

test("a block opening and closing on one line is replaced whole", () => {
  const oneLine = [
    "TemperInventory =",
    "{",
    '    ["Default"] = { ["sell"] = { 1, 2, 3, }, ["db"] = {}, },',
    "}",
  ]
  const out = replaceOrInsertLuaBlock(
    oneLine,
    "sell",
    ['    ["Default"] = { ["sell"] = { 9, }, ["db"] = {}, },'],
    ["db"]
  )
  expect(out).toEqual([
    "TemperInventory =",
    "{",
    '    ["Default"] = { ["sell"] = { 9, }, ["db"] = {}, },',
    "}",
  ])
})

test("a sibling named but not there is passed over for the next one named", () => {
  const out = replaceOrInsertLuaBlock(FILE, "gamma", ["NEW"], ["nowhere", "beta"])
  expect(out.indexOf("NEW")).toBe(8)
})

test("no sibling named at all leaves content unchanged", () => {
  expect(replaceOrInsertLuaBlock(FILE, "gamma", ["NEW"], [])).toEqual(FILE)
})

test("content with no wrapper around it is handed back unchanged", () => {
  const orphan = ['["tasks"] =', "{", '    ["uuid"] = { ["title"] = "Skill Morphs", },', "},"]
  const siblings = ["characters", "account", "navigation"]
  const out = replaceOrInsertLuaBlock(orphan, "characterPriority", ["NEW"], siblings)
  expect(out).toEqual(orphan)
})

test("the indent is taken from the key's own line where the key is there", () => {
  expect(detectIndent(FILE, "alpha", [])).toBe("        ")
  expect(detectIndent(FILE, "Default", [])).toBe("    ")
})

test("the indent falls back to a sibling's line", () => {
  expect(detectIndent(FILE, "gamma", ["beta"])).toBe("        ")
})

test("the indent falls back to twelve spaces where nothing is found", () => {
  expect(detectIndent(FILE, "gamma", ["nowhere"])).toBe("            ")
})

test("the key's own line wins over a sibling's", () => {
  expect(detectIndent(FILE, "alpha", ["Default"])).toBe("        ")
})
