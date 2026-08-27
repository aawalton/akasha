import { describe, expect, test } from "bun:test"
import { mergeIdList, mergeIdListsByKey, mergeMaxByKey } from "./collector-merge"

describe("mergeIdList", () => {
  test("an absent stored list takes the fresh scan whole", () => {
    expect(mergeIdList(undefined, [11, 22, 33])).toEqual([11, 22, 33])
  })

  test("an empty fresh scan never empties a populated stored list", () => {
    expect(mergeIdList([11, 22, 33], [])).toEqual([11, 22, 33])
  })

  test("ids only the fresh scan found are appended", () => {
    expect(mergeIdList([11, 22], [11, 22, 33, 44])).toEqual([11, 22, 33, 44])
  })

  test("ids only the stored list has are kept", () => {
    expect(mergeIdList([11, 22, 33], [11])).toEqual([11, 22, 33])
  })

  test("a disjoint cold capture and warm capture both survive whole", () => {
    expect(mergeIdList([11, 22], [33, 44])).toEqual([11, 22, 33, 44])
  })

  test("an id in both sides is not duplicated", () => {
    const merged = mergeIdList([11, 22, 33], [22, 33, 44])
    expect(merged).toEqual([11, 22, 33, 44])
    expect(merged.length).toBe(4)
  })

  test("a duplicate already inside the stored list is collapsed", () => {
    expect(mergeIdList([11, 11, 22], [22])).toEqual([11, 22])
  })

  test("merging is idempotent — a repeat scan changes nothing", () => {
    const stored = [11, 22, 33]
    expect(mergeIdList(stored, stored)).toEqual(stored)
  })

  test("the stored list is not mutated in place", () => {
    const stored = [11, 22]
    mergeIdList(stored, [33])
    expect(stored).toEqual([11, 22])
  })

  test("a sliver captured first heals to the full harvest on a later scan", () => {
    const complete: number[] = []
    for (let id = 1; id <= 300; id++) complete.push(id)
    const merged = mergeIdList([7], complete)
    expect(merged.length).toBe(300)
    expect(merged[0]).toBe(7)
  })
})

describe("mergeIdListsByKey", () => {
  test("an absent stored record takes the fresh scan whole", () => {
    const fresh = { 1: [11, 22], 2: [33] }
    expect(mergeIdListsByKey(undefined, fresh)).toEqual(fresh)
  })

  test("a key only the fresh scan has is added", () => {
    const merged = mergeIdListsByKey({ 1: [11] }, { 1: [11], 2: [33] })
    expect(Object.keys(merged).length).toBe(2)
    expect(merged[2]).toEqual([33])
  })

  test("a key only the stored record has is kept", () => {
    const merged = mergeIdListsByKey({ 1: [11], 2: [33] }, { 1: [11] })
    expect(Object.keys(merged).length).toBe(2)
    expect(merged[2]).toEqual([33])
  })

  test("an entirely empty fresh scan leaves every stored key intact", () => {
    const stored = { 1: [11, 22], 2: [33], 7: [44, 55] }
    const merged = mergeIdListsByKey(stored, {})
    expect(Object.keys(merged).length).toBe(3)
    expect(merged[7]).toEqual([44, 55])
  })

  test("ids the fresh scan adds inside a known key are folded in", () => {
    const merged = mergeIdListsByKey({ 1: [11] }, { 1: [11, 22, 33] })
    expect(merged[1]).toEqual([11, 22, 33])
  })

  test("ids only the stored record has inside a shared key are kept", () => {
    const merged = mergeIdListsByKey({ 1: [11, 22, 33] }, { 1: [11] })
    expect(merged[1]).toEqual([11, 22, 33])
  })

  test("sparse stored keys survive a merge that fills the holes", () => {
    const merged = mergeIdListsByKey({ 1: [11], 4: [44] }, { 1: [11], 2: [22], 3: [33], 4: [44] })
    expect(Object.keys(merged).length).toBe(4)
    expect(merged[3]).toEqual([33])
  })

  test("merging is idempotent — a repeat scan changes nothing", () => {
    const stored = { 1: [11, 22], 7: [33] }
    expect(mergeIdListsByKey(stored, stored)).toEqual(stored)
  })
})

describe("mergeMaxByKey", () => {
  test("an absent stored record takes the fresh scan whole", () => {
    const fresh = { 101: 3, 102: 5 }
    expect(mergeMaxByKey(undefined, fresh)).toEqual(fresh)
  })

  test("a key only the fresh scan has is added", () => {
    const merged = mergeMaxByKey({ 101: 3 }, { 101: 3, 102: 5 })
    expect(merged[102]).toBe(5)
  })

  test("a key only the stored record has is kept", () => {
    const merged = mergeMaxByKey({ 101: 3, 102: 5 }, { 101: 3 })
    expect(merged[102]).toBe(5)
  })

  test("a newly acquired lore entry in the fresh scan lands", () => {
    expect(mergeMaxByKey({ 101: 3 }, { 101: 4 })[101]).toBe(4)
  })

  test("a cold scan reporting a lower count never walks the stored count back", () => {
    expect(mergeMaxByKey({ 101: 9 }, { 101: 1 })[101]).toBe(9)
  })

  test("an entirely empty fresh scan leaves every stored count intact", () => {
    const merged = mergeMaxByKey({ 101: 3, 102: 5, 103: 9 }, {})
    expect(Object.keys(merged).length).toBe(3)
    expect(merged[103]).toBe(9)
  })

  test("merging is idempotent — a repeat scan changes nothing", () => {
    const stored = { 101: 3, 102: 5 }
    expect(mergeMaxByKey(stored, stored)).toEqual(stored)
  })
})
