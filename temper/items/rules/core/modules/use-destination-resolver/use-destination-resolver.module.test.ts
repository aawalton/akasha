import { describe, expect, test } from "bun:test"
import { planUseDestinationsForStack } from "akasha/temper/items/rules/core/modules/use-destination-resolver/use-destination-resolver.module.code.ts"
import {
  type CharacterId,
  characterId,
  type ItemKey,
  type UseDestinationContext,
} from "akasha/temper/items/rules/core/modules/use-destination-types/use-destination-types.module.code.ts"

const QUARASS = characterId("quarass")
const VALETERISA = characterId("valeterisa")
const RAFAEMA = characterId("rafaema")
const BOOTS: ItemKey = { kind: "motif", styleId: 76, chapterId: 3 }

function contextFor(priority: readonly CharacterId[]): UseDestinationContext {
  return {
    characterPriority: priority,
    knowsItem: () => false,
    knownChapterCountForStyle: () => 0,
  }
}

describe("N copies go to the first N characters in priority lacking the item.", () => {
  test("a character holding one of two copies uses hers when she is second", () => {
    const allocated = planUseDestinationsForStack(
      BOOTS,
      1,
      contextFor([QUARASS, VALETERISA, RAFAEMA]),
      new Map(),
      undefined,
      { holder: VALETERISA, elsewhere: [{ holder: undefined, count: 1 }] }
    )
    expect(allocated).toEqual([VALETERISA])
  })

  test("the bank copy goes to the first character when the second holds her own", () => {
    const allocated = planUseDestinationsForStack(
      BOOTS,
      1,
      contextFor([QUARASS, VALETERISA, RAFAEMA]),
      new Map(),
      undefined,
      { holder: undefined, elsewhere: [{ holder: VALETERISA, count: 1 }] }
    )
    expect(allocated).toEqual([QUARASS])
  })

  test("a character past the first N sends her copy to the one the bank copy leaves", () => {
    const allocated = planUseDestinationsForStack(
      BOOTS,
      1,
      contextFor([QUARASS, RAFAEMA, VALETERISA]),
      new Map(),
      undefined,
      { holder: VALETERISA, elsewhere: [{ holder: undefined, count: 1 }] }
    )
    expect(allocated).toEqual([RAFAEMA])
  })

  test("a copy past every character lacking the item goes to no character", () => {
    const allocated = planUseDestinationsForStack(
      BOOTS,
      1,
      contextFor([QUARASS]),
      new Map(),
      undefined,
      { holder: VALETERISA, elsewhere: [{ holder: undefined, count: 1 }] }
    )
    expect(allocated).toEqual([])
  })

  test("a spare copy beside her own goes to the next character the bank copy leaves", () => {
    const allocated = planUseDestinationsForStack(
      BOOTS,
      2,
      contextFor([QUARASS, VALETERISA, RAFAEMA]),
      new Map(),
      undefined,
      { holder: VALETERISA, elsewhere: [{ holder: undefined, count: 1 }] }
    )
    expect(allocated).toEqual([VALETERISA, RAFAEMA])
  })

  test("a character already claimed is left out of the first N", () => {
    const claims = new Map<CharacterId, Set<string>>([[QUARASS, new Set(["motif:76:3"])]])
    const allocated = planUseDestinationsForStack(
      BOOTS,
      1,
      contextFor([QUARASS, VALETERISA, RAFAEMA]),
      claims,
      undefined,
      { holder: undefined, elsewhere: [{ holder: VALETERISA, count: 1 }] }
    )
    expect(allocated).toEqual([RAFAEMA])
  })

  test("a stack with no holding goes to the first characters lacking the item", () => {
    const allocated = planUseDestinationsForStack(
      BOOTS,
      1,
      contextFor([QUARASS, VALETERISA]),
      new Map()
    )
    expect(allocated).toEqual([QUARASS])
  })
})
