import { parseMotifBookName } from "akasha/temper/items/core/modules/motif-name-parser/motif-name-parser.module.code.ts"
import { LORE_LIBRARY_DATA } from "akasha/temper/player/completion/modules/lore-library-data/lore-library-data.module.code.ts"

const CRAFTING_MOTIFS_CATEGORY_INDEX = 2

const MASTER_ONLY_STYLE_IDS: readonly number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 29]
const FULL_CHAPTER_SET: readonly number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

interface LoreLibraryCoords {
  readonly collectionIndex: number
  readonly bookIndex: number
}

interface BuiltTables {
  readonly styleToChapters: Readonly<Record<number, readonly number[]>>
  readonly lookup: ReadonlyMap<string, LoreLibraryCoords>
  readonly masterLookup: ReadonlyMap<number, LoreLibraryCoords>
}

export type LoreBookKnown = (collectionIndex: number, bookIndex: number) => boolean

function loreKey(styleId: number, chapterId: number): string {
  return `${styleId}:${chapterId}`
}

function buildTables(): BuiltTables {
  const styleAcc = new Map<number, Set<number>>()
  const lookup = new Map<string, LoreLibraryCoords>()
  const masterLookup = new Map<number, LoreLibraryCoords>()

  for (const styleId of MASTER_ONLY_STYLE_IDS) {
    styleAcc.set(styleId, new Set(FULL_CHAPTER_SET))
  }

  const category = LORE_LIBRARY_DATA.find((c) => c.categoryIndex === CRAFTING_MOTIFS_CATEGORY_INDEX)
  if (category !== undefined) {
    for (const collection of category.collections) {
      for (const book of collection.books) {
        const parsed = parseMotifBookName(book.name)
        if (parsed === undefined) continue
        if (parsed.chapterId === null) {
          masterLookup.set(parsed.styleId, {
            collectionIndex: collection.collectionIndex,
            bookIndex: book.bookIndex,
          })
          continue
        }
        let set = styleAcc.get(parsed.styleId)
        if (set === undefined) {
          set = new Set<number>()
          styleAcc.set(parsed.styleId, set)
        }
        set.add(parsed.chapterId)
        lookup.set(loreKey(parsed.styleId, parsed.chapterId), {
          collectionIndex: collection.collectionIndex,
          bookIndex: book.bookIndex,
        })
      }
    }
  }

  const styleToChapters: Record<number, readonly number[]> = {}
  for (const [styleId, set] of styleAcc) {
    styleToChapters[styleId] = [...set].sort((a, b) => a - b)
  }
  return { styleToChapters, lookup, masterLookup }
}

const TABLES = buildTables()

export const STYLE_TO_CHAPTERS: Readonly<Record<number, readonly number[]>> = TABLES.styleToChapters

function bookKnown(isBookKnown: LoreBookKnown, coords: LoreLibraryCoords | undefined): boolean {
  return coords !== undefined && isBookKnown(coords.collectionIndex, coords.bookIndex)
}

export function knownMotifChaptersFromLore(
  isBookKnown: LoreBookKnown,
  styleId: number
): readonly number[] {
  const chapters = TABLES.styleToChapters[styleId] ?? []
  if (bookKnown(isBookKnown, TABLES.masterLookup.get(styleId))) return chapters
  const known: number[] = []
  for (const chapter of chapters) {
    if (bookKnown(isBookKnown, TABLES.lookup.get(loreKey(styleId, chapter)))) known.push(chapter)
  }
  return known
}

export function knownMotifChaptersByStyleFromLore(
  isBookKnown: LoreBookKnown
): Map<number, Set<number>> {
  const out = new Map<number, Set<number>>()
  for (const key of Object.keys(TABLES.styleToChapters)) {
    const styleId = Number(key)
    const known = knownMotifChaptersFromLore(isBookKnown, styleId)
    if (known.length > 0) out.set(styleId, new Set(known))
  }
  return out
}
