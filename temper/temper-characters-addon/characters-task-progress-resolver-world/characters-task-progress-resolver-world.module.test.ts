import { describe, expect, test } from "bun:test"
import { ALL_COMPANION_IDS } from "@akasha/temper-companions-addon/companions-id-map"
import { LORE_LIBRARY_DATA } from "@akasha/temper-completion/lore-library-data"
import { COMPANION_QUEST_DATA } from "@akasha/temper-player-completion/companion-quest-data"
import { MAX_COMPANION_RAPPORT } from "@akasha/temper-player-completion/companion-rapport"
import type { SavedCharacterEntry } from "@akasha/temper-player-completion-state/completion-saved-variables"
import {
  resolveCompanionQuests,
  resolveCompanionRapport,
  resolveLoreLibrary,
} from "./characters-task-progress-resolver-world.module.code.ts"

function characterEntry(fields: Partial<SavedCharacterEntry>): SavedCharacterEntry {
  return { name: "Fixture Character", ...fields }
}

function itemAt<T>(items: readonly T[], index: number, what: string): T {
  const item = items[index]
  if (item === undefined) throw new Error(`fixture: ${what}`)
  return item
}

const ALL_COMPANION_QUEST_IDS: readonly number[] = COMPANION_QUEST_DATA.flatMap((group) =>
  group.quests.map((quest) => quest.questId)
)
const TOTAL_COMPANION_QUESTS = ALL_COMPANION_QUEST_IDS.length

const BASTIAN_GROUP = COMPANION_QUEST_DATA.find((group) => group.companionId === "bastian")
if (BASTIAN_GROUP === undefined)
  throw new Error("fixture: bastian is absent from COMPANION_QUEST_DATA")
const BASTIAN_QUESTS = BASTIAN_GROUP.quests
const BASTIAN_FIRST = itemAt(BASTIAN_QUESTS, 0, "bastian holds no first quest")
const BASTIAN_SECOND = itemAt(BASTIAN_QUESTS, 1, "bastian holds no second quest")

const TOTAL_RAPPORT = ALL_COMPANION_IDS.length * MAX_COMPANION_RAPPORT
const COMPANION_A = itemAt(ALL_COMPANION_IDS, 0, "ALL_COMPANION_IDS holds no first companion")
const COMPANION_B = itemAt(ALL_COMPANION_IDS, 1, "ALL_COMPANION_IDS holds no second companion")

const LORE_CATEGORY = itemAt(LORE_LIBRARY_DATA, 0, "LORE_LIBRARY_DATA holds no category")
const LORE_COLLECTION = itemAt(
  LORE_CATEGORY.collections,
  0,
  "the first lore category holds no collection"
)
const LORE_BOOK = itemAt(LORE_COLLECTION.books, 0, "the first lore collection holds no book")

const COLLECTION_BOOK_INDEXES: number[] = LORE_COLLECTION.books.map((book) => book.bookIndex)
const COLLECTION_BOOK_COUNT = LORE_COLLECTION.books.length
const CATEGORY_BOOK_COUNT = LORE_CATEGORY.collections.reduce(
  (sum, collection) => sum + collection.books.length,
  0
)
const TOTAL_LORE_BOOKS = LORE_LIBRARY_DATA.reduce(
  (sum, category) =>
    sum + category.collections.reduce((inner, collection) => inner + collection.books.length, 0),
  0
)

const WHOLE_COLLECTION_KNOWN = {
  [LORE_CATEGORY.categoryIndex]: { [LORE_COLLECTION.collectionIndex]: COLLECTION_BOOK_INDEXES },
}

describe("resolveCompanionQuests", () => {
  test("an entry holding no quest capture yields no progress at all", () => {
    expect(resolveCompanionQuests(characterEntry({}), undefined)).toBeUndefined()
  })

  test("an absent entry yields no progress at all", () => {
    expect(resolveCompanionQuests(undefined, undefined)).toBeUndefined()
  })

  test("an empty quest capture counts nothing done out of every companion quest", () => {
    expect(resolveCompanionQuests(characterEntry({ quests: [] }), undefined)).toEqual({
      current: 0,
      total: TOTAL_COMPANION_QUESTS,
    })
  })

  test("every companion quest done counts them all", () => {
    expect(
      resolveCompanionQuests(characterEntry({ quests: ALL_COMPANION_QUEST_IDS }), undefined)
    ).toEqual({ current: TOTAL_COMPANION_QUESTS, total: TOTAL_COMPANION_QUESTS })
  })

  test("two quests of one companion count two out of every companion quest", () => {
    const entry = characterEntry({ quests: [BASTIAN_FIRST.questId, BASTIAN_SECOND.questId] })
    expect(resolveCompanionQuests(entry, undefined)).toEqual({
      current: 2,
      total: TOTAL_COMPANION_QUESTS,
    })
  })

  test("quest ids belonging to no companion count nothing", () => {
    expect(resolveCompanionQuests(characterEntry({ quests: [9999, 12345] }), undefined)).toEqual({
      current: 0,
      total: TOTAL_COMPANION_QUESTS,
    })
  })

  test("a companion id in the path narrows the count to that companion's own quests", () => {
    const entry = characterEntry({ quests: [BASTIAN_FIRST.questId, 9999] })
    expect(resolveCompanionQuests(entry, ["bastian"])).toEqual({
      current: 1,
      total: BASTIAN_QUESTS.length,
    })
  })

  test("a companion id no companion answers to yields no progress", () => {
    const entry = characterEntry({ quests: ALL_COMPANION_QUEST_IDS })
    expect(resolveCompanionQuests(entry, ["not-a-companion"])).toBeUndefined()
  })

  test("a number where a companion id belongs yields no progress", () => {
    const entry = characterEntry({ quests: ALL_COMPANION_QUEST_IDS })
    expect(resolveCompanionQuests(entry, [0])).toBeUndefined()
  })
})

describe("resolveCompanionRapport", () => {
  test("an entry holding no rapport capture counts nothing out of the whole roster", () => {
    expect(resolveCompanionRapport(characterEntry({}), undefined)).toEqual({
      current: 0,
      total: TOTAL_RAPPORT,
    })
  })

  test("an absent entry counts nothing out of the whole roster", () => {
    expect(resolveCompanionRapport(undefined, undefined)).toEqual({
      current: 0,
      total: TOTAL_RAPPORT,
    })
  })

  test("an empty rapport capture counts nothing out of the whole roster", () => {
    expect(resolveCompanionRapport(characterEntry({ companionRapport: {} }), undefined)).toEqual({
      current: 0,
      total: TOTAL_RAPPORT,
    })
  })

  test("every companion at the ceiling counts the whole roster's rapport", () => {
    const companionRapport: Record<number, number> = {}
    for (const companionId of ALL_COMPANION_IDS) {
      companionRapport[companionId] = MAX_COMPANION_RAPPORT
    }
    expect(resolveCompanionRapport(characterEntry({ companionRapport }), undefined)).toEqual({
      current: TOTAL_RAPPORT,
      total: TOTAL_RAPPORT,
    })
  })

  test("two companions part way sum their raw points against the whole roster", () => {
    const entry = characterEntry({
      companionRapport: { [COMPANION_A]: 4000, [COMPANION_B]: 1000 },
    })
    expect(resolveCompanionRapport(entry, undefined)).toEqual({
      current: 5000,
      total: TOTAL_RAPPORT,
    })
  })

  test("rapport held under an id the roster does not know is left out", () => {
    const entry = characterEntry({ companionRapport: { [COMPANION_A]: 4000, 9999: 4000 } })
    expect(resolveCompanionRapport(entry, undefined)).toEqual({
      current: 4000,
      total: TOTAL_RAPPORT,
    })
  })

  test("a gain inside one tier moves the card count by that raw amount", () => {
    const lower = resolveCompanionRapport(
      characterEntry({ companionRapport: { [COMPANION_A]: 1000 } }),
      undefined
    )
    const higher = resolveCompanionRapport(
      characterEntry({ companionRapport: { [COMPANION_A]: 1145 } }),
      undefined
    )
    if (lower === undefined || higher === undefined)
      throw new Error("card-level rapport answered with nothing")
    expect(higher.current - lower.current).toBe(145)
  })

  test("one companion asked for counts its raw rapport out of the ceiling", () => {
    const entry = characterEntry({ companionRapport: { [COMPANION_A]: 1000 } })
    expect(resolveCompanionRapport(entry, [COMPANION_A])).toEqual({
      current: 1000,
      total: MAX_COMPANION_RAPPORT,
    })
  })

  test("one companion with no rapport yet counts nothing out of the ceiling", () => {
    const entry = characterEntry({ companionRapport: {} })
    expect(resolveCompanionRapport(entry, [COMPANION_A])).toEqual({
      current: 0,
      total: MAX_COMPANION_RAPPORT,
    })
  })

  test("one companion asked for on an entry holding no rapport counts nothing out of the ceiling", () => {
    expect(resolveCompanionRapport(characterEntry({}), [COMPANION_A])).toEqual({
      current: 0,
      total: MAX_COMPANION_RAPPORT,
    })
  })

  test("a string where a companion id belongs yields no progress", () => {
    const entry = characterEntry({ companionRapport: { [COMPANION_A]: 4000 } })
    expect(resolveCompanionRapport(entry, ["bastian"])).toBeUndefined()
  })
})

describe("resolveLoreLibrary", () => {
  test("an entry holding no lore capture yields no progress at all", () => {
    expect(resolveLoreLibrary(characterEntry({}), undefined)).toBeUndefined()
  })

  test("an absent entry yields no progress at all", () => {
    expect(resolveLoreLibrary(undefined, undefined)).toBeUndefined()
  })

  test("an empty lore capture counts no book out of every book there is", () => {
    expect(resolveLoreLibrary(characterEntry({ loreLibrary: {} }), undefined)).toEqual({
      current: 0,
      total: TOTAL_LORE_BOOKS,
    })
  })

  test("a wholly known collection counts every book that collection holds", () => {
    const entry = characterEntry({ loreLibrary: WHOLE_COLLECTION_KNOWN })
    expect(resolveLoreLibrary(entry, undefined)).toEqual({
      current: COLLECTION_BOOK_COUNT,
      total: TOTAL_LORE_BOOKS,
    })
  })

  test("a part-known collection counts only the books it names", () => {
    const entry = characterEntry({
      loreLibrary: {
        [LORE_CATEGORY.categoryIndex]: { [LORE_COLLECTION.collectionIndex]: [LORE_BOOK.bookIndex] },
      },
    })
    expect(resolveLoreLibrary(entry, undefined)).toEqual({
      current: 1,
      total: TOTAL_LORE_BOOKS,
    })
  })

  test("a book index no book answers to counts nothing", () => {
    const entry = characterEntry({
      loreLibrary: { [LORE_CATEGORY.categoryIndex]: { [LORE_COLLECTION.collectionIndex]: [9999] } },
    })
    expect(resolveLoreLibrary(entry, undefined)).toEqual({
      current: 0,
      total: TOTAL_LORE_BOOKS,
    })
  })

  test("a category in the path counts that category's books alone", () => {
    const entry = characterEntry({ loreLibrary: WHOLE_COLLECTION_KNOWN })
    expect(resolveLoreLibrary(entry, [LORE_CATEGORY.categoryIndex])).toEqual({
      current: COLLECTION_BOOK_COUNT,
      total: CATEGORY_BOOK_COUNT,
    })
  })

  test("a collection in the path counts that collection's books alone", () => {
    const entry = characterEntry({ loreLibrary: WHOLE_COLLECTION_KNOWN })
    expect(
      resolveLoreLibrary(entry, [LORE_CATEGORY.categoryIndex, LORE_COLLECTION.collectionIndex])
    ).toEqual({ current: COLLECTION_BOOK_COUNT, total: COLLECTION_BOOK_COUNT })
  })

  test("a category no category answers to yields no progress", () => {
    expect(resolveLoreLibrary(characterEntry({ loreLibrary: {} }), [9999])).toBeUndefined()
  })

  test("a collection no collection answers to yields no progress", () => {
    const entry = characterEntry({ loreLibrary: {} })
    expect(resolveLoreLibrary(entry, [LORE_CATEGORY.categoryIndex, 9999])).toBeUndefined()
  })
})
