import { afterEach, beforeEach, describe, expect, it } from "bun:test"

type GlobalsWithEsoStubs = typeof globalThis & {
  GetNumValidItemStyles: () => number
  IsSmithingStyleKnown: (styleId: number, chapterIndex: number) => boolean
  ZO_CreateStringId: (id: string, value: string) => undefined
}

const g: GlobalsWithEsoStubs = Object.assign(globalThis, {
  ZO_CreateStringId: (_id: string, _value: string): undefined => undefined,
  GetNumValidItemStyles: (): number => 0,
  IsSmithingStyleKnown: (_styleId: number, _chapterIndex: number): boolean => false,
})

const { MOTIF_CHAPTERS_PER_STYLE, scanMotifKnowledge } = await import("./motif-knowledge")

let originalGetNumValidItemStyles: GlobalsWithEsoStubs["GetNumValidItemStyles"] =
  g.GetNumValidItemStyles
let originalIsSmithingStyleKnown: GlobalsWithEsoStubs["IsSmithingStyleKnown"] =
  g.IsSmithingStyleKnown

function installStubs(
  numStyles: number,
  isKnown: (styleId: number, chapterIndex: number) => boolean
): undefined {
  g.GetNumValidItemStyles = () => numStyles
  g.IsSmithingStyleKnown = isKnown
}

beforeEach(() => {
  originalGetNumValidItemStyles = g.GetNumValidItemStyles
  originalIsSmithingStyleKnown = g.IsSmithingStyleKnown
})

afterEach(() => {
  g.GetNumValidItemStyles = originalGetNumValidItemStyles
  g.IsSmithingStyleKnown = originalIsSmithingStyleKnown
})

describe("scanMotifKnowledge", () => {
  it("returns empty object when no styles are valid", () => {
    installStubs(0, () => false)
    expect(scanMotifKnowledge()).toEqual({})
  })

  it("omits styles with zero known chapters from the sparse map", () => {
    installStubs(3, () => false)
    expect(scanMotifKnowledge()).toEqual({})
  })

  it("records each known chapter for every known style", () => {
    installStubs(3, (styleId, chapterIndex) => {
      if (styleId === 1 && chapterIndex === 1) return true
      if (styleId === 2 && (chapterIndex === 5 || chapterIndex === 9)) return true
      return false
    })
    expect(scanMotifKnowledge()).toEqual({
      1: [1],
      2: [5, 9],
    })
  })

  it("captures all 14 chapters when the character has mastered a style", () => {
    installStubs(1, (styleId, _chapterIndex) => styleId === 1)
    const expectedChapters: number[] = []
    for (let i = 1; i <= MOTIF_CHAPTERS_PER_STYLE; i++) expectedChapters.push(i)
    expect(scanMotifKnowledge()).toEqual({ 1: expectedChapters })
  })

  it("iterates styleIds 1..GetNumValidItemStyles inclusive", () => {
    const observedStyleIds: number[] = []
    installStubs(5, (styleId, chapterIndex) => {
      if (chapterIndex === 1) observedStyleIds.push(styleId)
      return false
    })
    scanMotifKnowledge()
    expect(observedStyleIds).toEqual([1, 2, 3, 4, 5])
  })

  it("iterates chapterIndex 1..14 inclusive for every style", () => {
    const observedChapters: number[] = []
    installStubs(1, (_styleId, chapterIndex) => {
      observedChapters.push(chapterIndex)
      return false
    })
    scanMotifKnowledge()
    expect(observedChapters).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14])
  })

  it("preserves chapter ordering (ascending 1..14)", () => {
    installStubs(
      1,
      (_styleId, chapterIndex) => chapterIndex === 2 || chapterIndex === 7 || chapterIndex === 14
    )
    expect(scanMotifKnowledge()).toEqual({ 1: [2, 7, 14] })
  })
})
