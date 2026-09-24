import { expect, test } from "bun:test"
import {
  detectIndent,
  detectIndentInText,
  replaceOrInsertLuaBlock,
  replaceOrInsertLuaBlockInText,
} from "akasha/temper/watcher/modules/watcher-settings-lua-block/watcher-settings-lua-block.module.code.ts"

const FILE = [
  "TemperItems =",
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
    "TemperItems =",
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

test("a block opening and closing inside a line is replaced and the rest of the line kept", () => {
  const oneLine = [
    "TemperItems =",
    "{",
    '    ["Default"] = { ["sell"] = { 1, 2, 3, }, ["db"] = {}, },',
    "}",
  ]
  const out = replaceOrInsertLuaBlock(oneLine, "sell", ['["sell"] = { 9, },'], ["db"])
  expect(out).toEqual([
    "TemperItems =",
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

const ONE_LINE =
  'Saved_Vars={["Default"]={["@alan"]={["$AccountWide"]={["notes"]={["text"]="a } and a {",["deep"]={["version"]=3,["sell"]={1,},},},["sell"]={[1]="old } {",},["db"]={["x"]=1,},["version"]=1,},},},}Other_Vars={["Default"]={["sell"]={},},}'

const HOME_SIBLINGS = ["db", "version"]

test("a file on one line has the block beside the siblings replaced and nothing else", () => {
  const out = replaceOrInsertLuaBlockInText(
    ONE_LINE,
    "sell",
    ['["sell"] = { "new", },'],
    HOME_SIBLINGS
  )
  expect(out).toBe(ONE_LINE.replace('["sell"]={[1]="old } {",},', '["sell"] = { "new", },'))
})

test("a key absent from a file on one line goes before the sibling in the table holding most siblings", () => {
  const out = replaceOrInsertLuaBlockInText(ONE_LINE, "logging", ["NEW,"], ["version", "db"])
  expect(out).toBe(ONE_LINE.replace('["version"]=1,', 'NEW,["version"]=1,'))
})

test("a key the siblings' table lacks is inserted there though another table holds that key", () => {
  const text = 'V={["a"]={["sell"]=1,},["db"]={},}'
  const out = replaceOrInsertLuaBlockInText(text, "sell", ["NEW"], ["db"])
  expect(out).toBe('V={["a"]={["sell"]=1,},NEW["db"]={},}')
})

test("a key inside a comment is passed over", () => {
  const text = '-- ["db"] = {\nV={["db"]={},}'
  const out = replaceOrInsertLuaBlockInText(text, "logging", ["NEW"], ["db"])
  expect(out).toBe('-- ["db"] = {\nV={NEW["db"]={},}')
})

test("a block written again as it already is leaves the text byte for byte", () => {
  const text = FILE.join("\n")
  const same = ['        ["alpha"] =', "        {", '            ["x"] = 1,', "        },"]
  expect(replaceOrInsertLuaBlockInText(text, "alpha", same, ["beta"])).toBe(text)
})

test("a value that never closes leaves the content unchanged", () => {
  const text = 'V={["a"]={["sell"]={1,'
  expect(replaceOrInsertLuaBlockInText(text, "sell", ["NEW"], [])).toBe(text)
})

test("a key whose value is no table is replaced up to the comma after that value", () => {
  const out = replaceOrInsertLuaBlock(FILE, "beta", ['        ["beta"] = 3,'], [])
  expect(out).toEqual(
    FILE.map((line) => (line === '        ["beta"] = 2,' ? '        ["beta"] = 3,' : line))
  )
})

test("the indent in a file on one line is none", () => {
  expect(detectIndentInText(ONE_LINE, "sell", HOME_SIBLINGS)).toBe("")
})
