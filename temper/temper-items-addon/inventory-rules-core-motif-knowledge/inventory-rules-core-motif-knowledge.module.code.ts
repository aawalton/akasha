import {
  getLoreLibraryCoords,
  STYLE_TO_CHAPTERS,
} from "@akasha/temper-items-core/motif-chapter-set"
import { asObjectRecord } from "@akasha/utils-narrow/as-object-record"
export const CRAFTING_MOTIFS_CATEGORY_INDEX = 2

function motifKnowledgeChapters(
  charData: Record<string, unknown>,
  styleId: number
): ReadonlyArray<number> | undefined {
  const motifKnowledge = asObjectRecord(charData["motifKnowledge"])
  if (!motifKnowledge) return undefined
  const chapters = motifKnowledge[styleId]
  if (chapters === undefined) return undefined
  const out: number[] = []
  if (Array.isArray(chapters)) {
    for (const v of chapters) {
      if (typeof v === "number") out.push(v)
    }
    return out
  }
  const chaptersRecord = asObjectRecord(chapters)
  if (!chaptersRecord) return undefined
  for (const v of Object.values(chaptersRecord)) {
    if (typeof v === "number") out.push(v)
  }
  return out
}

function loreLibraryKnowsBook(
  charData: Record<string, unknown>,
  collectionIndex: number,
  bookIndex: number
): boolean {
  const loreLibrary = asObjectRecord(charData["loreLibrary"])
  if (!loreLibrary) return false
  const motifCategory = asObjectRecord(loreLibrary[CRAFTING_MOTIFS_CATEGORY_INDEX])
  if (!motifCategory) return false
  const knownBooks = motifCategory[collectionIndex]
  if (!knownBooks) return false
  if (Array.isArray(knownBooks)) {
    for (const idx of knownBooks) {
      if (idx === bookIndex) return true
    }
    return false
  }
  const knownBooksRecord = asObjectRecord(knownBooks)
  if (knownBooksRecord) {
    for (const v of Object.values(knownBooksRecord)) {
      if (v === bookIndex) return true
    }
  }
  return false
}

export function knownChapterCountForStyleByCharData(
  charData: Record<string, unknown>,
  styleId: number
): number {
  const chapters = motifKnowledgeChapters(charData, styleId)
  if (chapters !== undefined) return chapters.length
  const styleChapters = STYLE_TO_CHAPTERS[styleId]
  if (styleChapters === undefined || styleChapters.length === 0) return 0
  let count = 0
  for (const chapter of styleChapters) {
    const coords = getLoreLibraryCoords(styleId, chapter)
    if (coords === undefined) continue
    if (loreLibraryKnowsBook(charData, coords.collectionIndex, coords.bookIndex)) count++
  }
  return count
}

export function knowsMotifByCharData(
  charData: Record<string, unknown>,
  styleId: number,
  chapterId: number | null
): boolean {
  const motifKnown = motifKnowledgeChapters(charData, styleId)
  if (motifKnown !== undefined) {
    if (chapterId !== null) {
      for (const c of motifKnown) {
        if (c === chapterId) return true
      }
      return false
    }
    const styleChapters = STYLE_TO_CHAPTERS[styleId]
    if (styleChapters === undefined || styleChapters.length === 0) return false
    return motifKnown.length === styleChapters.length
  }

  if (chapterId !== null) {
    const coords = getLoreLibraryCoords(styleId, chapterId)
    if (coords === undefined) return false
    return loreLibraryKnowsBook(charData, coords.collectionIndex, coords.bookIndex)
  }
  const chapters = STYLE_TO_CHAPTERS[styleId]
  if (chapters === undefined || chapters.length === 0) return false
  for (const chapter of chapters) {
    const coords = getLoreLibraryCoords(styleId, chapter)
    if (coords === undefined) return false
    if (!loreLibraryKnowsBook(charData, coords.collectionIndex, coords.bookIndex)) return false
  }
  return true
}
