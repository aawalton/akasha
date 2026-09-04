import { expect, test } from "bun:test"
import {
  appendGlobalToTarget,
  escapeRegExp,
  extractMemberGlobalBlocks,
  extractTopLevelBlock,
  renameGlobals,
} from "./saved-vars-blocks.module.code.ts"

const FILE = ["A_SavedVariables =", "{", "  x = 1,", "}", "B_SavedVariables =", "{", "}"].join("\n")

test("a block opens on the assignment and closes on the brace at column one", () => {
  expect(extractTopLevelBlock(FILE, "A_SavedVariables")).toBe("A_SavedVariables =\n{\n  x = 1,\n}")
})

test("a global the file does not assign has no block", () => {
  expect(extractTopLevelBlock(FILE, "C_SavedVariables")).toBeNull()
})

test("a block closes early where another assignment opens", () => {
  const flat = "A_SavedVariables = 1\nB_SavedVariables = 2\n"
  expect(extractTopLevelBlock(flat, "A_SavedVariables")).toBe("A_SavedVariables = 1")
})

test("a bundle member's blocks are gathered and the absent ones named", () => {
  const held = extractMemberGlobalBlocks(FILE, ["A_SavedVariables", "C_SavedVariables"])
  expect(held.present).toEqual(["A_SavedVariables"])
  expect(held.missing).toEqual(["C_SavedVariables"])
  expect(held.blocks).toEqual(["A_SavedVariables =\n{\n  x = 1,\n}"])
})

test("a block already present in the target is appended no second time", () => {
  expect(appendGlobalToTarget(FILE, "A_SavedVariables", FILE).kind).toBe("already-appended")
})

test("a global the absorbed file never assigns cannot be appended", () => {
  expect(appendGlobalToTarget(FILE, "C_SavedVariables", "").kind).toBe("absorbed-global-absent")
})

test("the line ending the target already uses is the line ending appended with", () => {
  const held = appendGlobalToTarget(FILE, "A_SavedVariables", "T = 1\r\n")
  expect(held).toEqual({
    kind: "appended",
    content: "T = 1\r\nA_SavedVariables =\n{\n  x = 1,\n}\r\n",
  })
})

test("a rename that changes nothing is not counted", () => {
  const held = renameGlobals("A = 1\n", [
    [/^A\s*=/m, "B ="],
    [/^Z\s*=/m, "Y ="],
  ])
  expect(held).toEqual({ content: "B = 1\n", renamedCount: 1 })
})

test("a literal is escaped before becoming a pattern", () => {
  expect(escapeRegExp("a.b*c")).toBe("a\\.b\\*c")
})
