import { describe, expect, test } from "bun:test"
import {
  knownMotifChaptersByStyleFromLore,
  knownMotifChaptersFromLore,
  STYLE_TO_CHAPTERS,
} from "akasha/temper/items/core/modules/motif-chapter-set/motif-chapter-set.module.code.ts"

const DRAGONGUARD = 76
const BOOTS = 3
const DRAGONGUARD_COLLECTION = 62

describe("A motif is keyed by the number its book names.", () => {
  test("a known Dragonguard Boots book teaches motif 76 chapter 3 and nothing else", () => {
    const known = knownMotifChaptersFromLore(
      (collectionIndex, bookIndex) => collectionIndex === DRAGONGUARD_COLLECTION && bookIndex === 3,
      DRAGONGUARD
    )
    expect(known).toEqual([BOOTS])
  })

  test("no known book teaches no chapter", () => {
    expect(knownMotifChaptersFromLore(() => false, DRAGONGUARD)).toEqual([])
  })

  test("the map over every motif keys Boots under 76", () => {
    const byStyle = knownMotifChaptersByStyleFromLore(
      (collectionIndex, bookIndex) => collectionIndex === DRAGONGUARD_COLLECTION && bookIndex === 3
    )
    expect([...byStyle.keys()]).toEqual([DRAGONGUARD])
    expect([...(byStyle.get(DRAGONGUARD) ?? [])]).toEqual([BOOTS])
  })
})

describe("A known master book teaches every chapter of its motif.", () => {
  test("motif 1 has only a master book, and knowing it teaches all its chapters", () => {
    const asked: string[] = []
    knownMotifChaptersFromLore((collectionIndex, bookIndex) => {
      asked.push(`${collectionIndex}:${bookIndex}`)
      return false
    }, 1)
    expect(asked).toHaveLength(1)
    const master = asked[0]
    const known = knownMotifChaptersFromLore(
      (collectionIndex, bookIndex) => `${collectionIndex}:${bookIndex}` === master,
      1
    )
    expect(known).toEqual(STYLE_TO_CHAPTERS[1] ?? [])
  })
})
