import { asNumber } from "../knowledge-casts/knowledge-casts.module.code.ts"
import { LCCC } from "../knowledge-lccc/knowledge-lccc.module.code.ts"
import { INTERNAL } from "../knowledge-state/knowledge-state.module.code.ts"
import type { StyleMotifItems } from "../knowledge-types/knowledge-types.module.code.ts"

type StyleRecord = StyleMotifItems
function asStyleRecord(value: unknown): StyleRecord {
  return value as StyleRecord
}

INTERNAL.LoadMotifData = function (this: void): undefined {
  INTERNAL.motifAssociations = {
    motifs: {},
    styles: {},
    styleIds: [],
  }
  const data = INTERNAL.motifAssociations
  const blacklist = INTERNAL.InvalidIds

  const fieldItemId = 3
  const fieldPayload = 2

  let encoded = LCCC.Unchunk(INTERNAL.MotifData)
  let length = zo_strlen(encoded)
  let i = 1
  while (i < length) {
    const [itemId, afterItemId] = LCCC.ReadAndDecode(encoded, i, fieldItemId)
    i = afterItemId
    const [payload, afterPayload] = LCCC.ReadAndDecode(encoded, i, fieldPayload)
    i = afterPayload

    const chapterId = BitAnd(payload, 0xf)
    const styleId = BitRShift(payload, 4)

    data.motifs[itemId] = [styleId, chapterId]

    if (blacklist[itemId] !== true) {
      if (data.styles[styleId] === undefined) {
        data.styles[styleId] = {
          books: [],
          chapters: {},
        }
      }

      if (chapterId === ITEM_STYLE_CHAPTER_ALL) {
        data.styles[styleId].books.push(itemId)
      } else {
        data.styles[styleId].chapters[chapterId] = itemId
      }
    }
  }

  const fieldMetadata = 5

  encoded = INTERNAL.MotifData.metadata
  length = zo_strlen(encoded)
  i = 1
  while (i < length) {
    const [payload, afterPayload] = LCCC.ReadAndDecode(encoded, i, fieldMetadata)
    i = afterPayload

    const style = asStyleRecord(data.styles[BitAnd(payload, 0xff)])
    style.number = BitAnd(BitRShift(payload, 8), 0xff)
    style.crown = BitRShift(payload, 16) === 1
    style.achievementId = BitAnd(BitRShift(payload, 17), 0x1fff)
  }

  for (const [styleId, style] of pairs(data.styles)) {
    const probeItem = style.books[0] ?? style.chapters[ITEM_STYLE_CHAPTER_CHESTS]
    const [category] = INTERNAL.GetItemCategoryAndQuality(asNumber(probeItem))
    if (category === INTERNAL.CATEGORY_MOTIF) {
      data.styleIds.push(styleId)
    }
  }
  table.sort(data.styleIds)
}

INTERNAL.GetMotifStyleAndChapter = function (
  this: void,
  itemId: number,
  _unused?: unknown,
  styleId?: number
): LuaMultiReturn<[number, number]> {
  const data = INTERNAL.motifAssociations
  if (data !== undefined && data.motifs[itemId] !== undefined) {
    const tuple = data.motifs[itemId]
    return $multi(tuple[0], tuple[1])
  } else if (data !== undefined && styleId !== undefined) {
    return $multi(styleId, ITEM_STYLE_CHAPTER_ALL)
  } else {
    return $multi(0, 0)
  }
}

INTERNAL.GetStyleIds = function (this: void): number[] | undefined {
  const data = INTERNAL.motifAssociations
  if (data !== undefined) {
    return data.styleIds
  }
  return undefined
}

INTERNAL.GetStyleMotifItems = function (this: void, styleId: number): StyleMotifItems | undefined {
  const data = INTERNAL.motifAssociations
  if (data !== undefined) {
    return data.styles[styleId]
  }
  return undefined
}

INTERNAL.GetStyleQuality = function (this: void, styleId: number): number {
  return INTERNAL.StyleQuality[styleId] ?? INTERNAL.QUALITY_HIGH
}
