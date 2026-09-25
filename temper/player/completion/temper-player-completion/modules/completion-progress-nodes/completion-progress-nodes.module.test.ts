import { describe, expect, test } from "bun:test"
import {
  isNodesComplete,
  nodeAt,
  type ProgressNode,
  pickerLevelAt,
  progressAt,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-progress-nodes/completion-progress-nodes.module.code.ts"

const TREE: readonly ProgressNode[] = [
  {
    key: "1",
    label: "One",
    children: [
      { key: "a", label: "A", count: 1, total: 1 },
      { key: "b", label: "B", count: 0, total: 3 },
    ],
  },
  { key: "2", label: "Two", count: 2, total: 2 },
]

describe("progressAt", () => {
  test("sums every leaf at the empty path", () => {
    expect(progressAt(TREE, [])).toEqual({ current: 3, total: 6 })
  })

  test("sums the leaves under a branch", () => {
    expect(progressAt(TREE, ["1"])).toEqual({ current: 1, total: 4 })
  })

  test("reads a leaf, matching a numeric step against a string key", () => {
    expect(progressAt(TREE, [2])).toEqual({ current: 2, total: 2 })
    expect(progressAt(TREE, ["1", "b"])).toEqual({ current: 0, total: 3 })
  })

  test("answers nothing for a path naming no node", () => {
    expect(progressAt(TREE, ["3"])).toBeUndefined()
    expect(nodeAt(TREE, ["2", "x"])).toBeUndefined()
  })
})

describe("pickerLevelAt", () => {
  test("offers the top nodes at the empty path", () => {
    expect(pickerLevelAt(TREE, [], ["Group", "Item"])).toEqual({
      label: "Group",
      options: [
        { value: "1", label: "One" },
        { value: "2", label: "Two" },
      ],
    })
  })

  test("offers a branch's children one level down", () => {
    expect(pickerLevelAt(TREE, ["1"], ["Group", "Item"])?.options.map((o) => o.value)).toEqual([
      "a",
      "b",
    ])
  })

  test("stops at a leaf, past the labels, and at a path naming no node", () => {
    expect(pickerLevelAt(TREE, ["2"], ["Group", "Item"])).toBeNull()
    expect(pickerLevelAt(TREE, ["1"], ["Group"])).toBeNull()
    expect(pickerLevelAt(TREE, ["9"], ["Group", "Item"])).toBeNull()
  })
})

describe("isNodesComplete", () => {
  test("is complete only when every leaf is full and there is something to count", () => {
    expect(isNodesComplete(TREE)).toBe(false)
    expect(isNodesComplete([{ key: "x", label: "X", count: 2, total: 2 }])).toBe(true)
    expect(isNodesComplete([])).toBe(false)
  })
})
