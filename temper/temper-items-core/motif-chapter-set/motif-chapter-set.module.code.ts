import { LORE_LIBRARY_DATA } from "@akasha/temper-completion/lore-library-data"
import { parseMotifBookName } from "../motif-name-parser/motif-name-parser.module.code.ts"

const CRAFTING_MOTIFS_CATEGORY_INDEX = 2

const MASTER_ONLY_STYLE_IDS: readonly number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 29]
const FULL_CHAPTER_SET: readonly number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

export interface LoreLibraryCoords {
  readonly collectionIndex: number
  readonly bookIndex: number
}

interface BuiltTables {
  readonly styleToChapters: Readonly<Record<number, readonly number[]>>
  readonly lookup: ReadonlyMap<string, LoreLibraryCoords>
}

function loreKey(styleId: number, chapterId: number): string {
  return `${styleId}:${chapterId}`
}

function buildTables(): BuiltTables {
  const styleAcc = new Map<number, Set<number>>()
  const lookup = new Map<string, LoreLibraryCoords>()

  for (const styleId of MASTER_ONLY_STYLE_IDS) {
    styleAcc.set(styleId, new Set(FULL_CHAPTER_SET))
  }

  const category = LORE_LIBRARY_DATA.find((c) => c.categoryIndex === CRAFTING_MOTIFS_CATEGORY_INDEX)
  if (category !== undefined) {
    for (const collection of category.collections) {
      for (const book of collection.books) {
        const parsed = parseMotifBookName(book.name)
        if (parsed === undefined) continue
        if (parsed.chapterId === null) continue
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
  return { styleToChapters, lookup }
}

const TABLES = buildTables()

export const STYLE_TO_CHAPTERS: Readonly<Record<number, readonly number[]>> = TABLES.styleToChapters

export function getLoreLibraryCoords(
  styleId: number,
  chapterId: number
): LoreLibraryCoords | undefined {
  return TABLES.lookup.get(loreKey(styleId, chapterId))
}
