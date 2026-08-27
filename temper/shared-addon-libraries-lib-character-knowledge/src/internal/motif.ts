import { asNumber } from "../casts"
import { LCCC } from "../lccc"
import type { StyleMotifItems } from "../types"
import { Internal } from "./state"

type StyleRecord = StyleMotifItems
function asStyleRecord(value: unknown): StyleRecord {
  return value as StyleRecord
}

Internal.LoadMotifData = function (this: void): undefined {
  Internal.motifAssociations = {
    motifs: {},
    styles: {},
    styleIds: [],
  }
  const data = Internal.motifAssociations
  const blacklist = Internal.InvalidIds

  const FIELD_ITEM_ID = 3
  const FIELD_PAYLOAD = 2

  let encoded = LCCC.Unchunk(Internal.MotifData)
  let length = zo_strlen(encoded)
  let i = 1
  while (i < length) {
    const [itemId, afterItemId] = LCCC.ReadAndDecode(encoded, i, FIELD_ITEM_ID)
    i = afterItemId
    const [payload, afterPayload] = LCCC.ReadAndDecode(encoded, i, FIELD_PAYLOAD)
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

  const FIELD_METADATA = 5

  encoded = Internal.MotifData.metadata
  length = zo_strlen(encoded)
  i = 1
  while (i < length) {
    const [payload, afterPayload] = LCCC.ReadAndDecode(encoded, i, FIELD_METADATA)
    i = afterPayload

    const style = asStyleRecord(data.styles[BitAnd(payload, 0xff)])
    style.number = BitAnd(BitRShift(payload, 8), 0xff)
    style.crown = BitRShift(payload, 16) === 1
    style.achievementId = BitAnd(BitRShift(payload, 17), 0x1fff)
  }

  for (const [styleId, style] of pairs(data.styles)) {
    const probeItem = style.books[0] ?? style.chapters[ITEM_STYLE_CHAPTER_CHESTS]
    const [category] = Internal.GetItemCategoryAndQuality(asNumber(probeItem))
    if (category === Internal.CATEGORY_MOTIF) {
      data.styleIds.push(styleId)
    }
  }
  table.sort(data.styleIds)
}

Internal.GetMotifStyleAndChapter = function (
  this: void,
  itemId: number,
  _unused?: unknown,
  styleId?: number
): LuaMultiReturn<[number, number]> {
  const data = Internal.motifAssociations
  if (data !== undefined && data.motifs[itemId] !== undefined) {
    const tuple = data.motifs[itemId]
    return $multi(tuple[0], tuple[1])
  } else if (data !== undefined && styleId !== undefined) {
    return $multi(styleId, ITEM_STYLE_CHAPTER_ALL)
  } else {
    return $multi(0, 0)
  }
}

Internal.GetStyleIds = function (this: void): number[] | undefined {
  const data = Internal.motifAssociations
  if (data !== undefined) {
    return data.styleIds
  }
  return undefined
}

Internal.GetStyleMotifItems = function (this: void, styleId: number): StyleMotifItems | undefined {
  const data = Internal.motifAssociations
  if (data !== undefined) {
    return data.styles[styleId]
  }
  return undefined
}

Internal.GetStyleQuality = function (this: void, styleId: number): number {
  return Internal.StyleQuality[styleId] ?? Internal.QUALITY_HIGH
}
