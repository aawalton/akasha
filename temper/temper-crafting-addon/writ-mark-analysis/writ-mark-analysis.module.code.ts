import { EQUIPMENT_CHAPTERS } from "../writ-mark-constants/writ-mark-constants.module.code.ts"
import {
  getMotifCharId,
  getSv,
} from "../writ-mark-saved-variables/writ-mark-saved-variables.module.code.ts"

export function getMasterWritSetName(
  this: void,
  data: InventoryRowSlotData | undefined
): string | undefined {
  if (data === undefined || data.bagId === undefined || data.slotIndex === undefined) {
    return undefined
  }
  const [itemType] = GetItemType(data.bagId, data.slotIndex)
  if (itemType !== ITEMTYPE_MASTER_WRIT) {
    return undefined
  }
  const fields: Record<number, string> = [
    ...zo_strsplit(":", GetItemLink(data.bagId, data.slotIndex)),
  ]
  const setId = fields[12] !== undefined ? tonumber(fields[12]) : undefined
  if (setId !== undefined) {
    const setName = GetItemSetName(setId)
    if (setName !== "") {
      return setName
    }
  }
  return undefined
}

export function getMasterWritVouchers(
  this: void,
  data: InventoryRowSlotData | undefined
): number | undefined {
  if (data === undefined || data.bagId === undefined || data.slotIndex === undefined) {
    return undefined
  }
  const [itemType] = GetItemType(data.bagId, data.slotIndex)
  if (itemType !== ITEMTYPE_MASTER_WRIT) {
    return undefined
  }
  const fields: Record<number, string> = [
    ...zo_strsplit(":", GetItemLink(data.bagId, data.slotIndex)),
  ]
  if (fields[23] !== undefined) {
    const [firstField] = zo_strsplit("|", fields[23])
    const value = firstField !== undefined ? tonumber(firstField) : undefined
    if (value !== undefined) {
      return zo_round(value / 10000)
    }
  }
  return undefined
}

export function isWritCompleted(this: void, slot: InventoryRowSlotData | undefined): boolean {
  if (TemperWrit === undefined) {
    return false
  }
  if (slot !== undefined && slot.bagId !== undefined && slot.slotIndex !== undefined) {
    const list =
      TemperWritInventoryList !== undefined ? TemperWritInventoryList.singleton : undefined
    if (list !== undefined) {
      const id = TemperWrit.UniqueID?.(slot.bagId, slot.slotIndex)
      const data = list.UniqueIDToInventoryData(id)
      if (data !== undefined && data.ui_is_completed === true) {
        return true
      }
    }
  }
  return false
}

export function isWritDoable(this: void, itemLink: string): boolean {
  if (TemperWrit === undefined) {
    return false
  }
  const parser = TemperWrit.CreateParser?.(itemLink)
  if (parser === undefined || !parser.ParseItemLink(itemLink) || parser.ToKnowList === undefined) {
    return false
  }
  const knowList = parser.ToKnowList()
  if (knowList !== undefined) {
    for (const [, know] of ipairs(knowList)) {
      if (!know.is_known) {
        return false
      }
    }
  }
  if (getSv().requireMats === true) {
    const matList = parser.ToMatList !== undefined ? parser.ToMatList() : undefined
    const util = TemperWrit.Util
    if (matList !== undefined && util !== undefined) {
      for (const [, mat] of ipairs(matList)) {
        const link = mat.link
        const ct = mat.ct
        if (link !== undefined && ct !== undefined && util.MatHaveCt(link) < ct) {
          return false
        }
      }
    }
  }
  return true
}

export function isWritMotifUnknown(this: void, itemLink: string): boolean {
  if (getSv().motifChar === "disabled") {
    return false
  }
  const [linkItemType] = GetItemLinkItemType(itemLink)
  if (linkItemType !== ITEMTYPE_MASTER_WRIT) {
    return false
  }
  const fields: Record<number, string> = [...zo_strsplit(":", itemLink)]
  const styleId = fields[14] !== undefined ? tonumber(fields[14]) : undefined
  const chapterRaw = fields[9] !== undefined ? tonumber(fields[9]) : undefined
  const chapterId = chapterRaw !== undefined ? EQUIPMENT_CHAPTERS[chapterRaw] : undefined
  if (
    styleId !== undefined &&
    chapterId !== undefined &&
    LibCharacterKnowledge.GetMotifKnowledgeForCharacter(
      styleId,
      chapterId,
      undefined,
      getMotifCharId()
    ) === LibCharacterKnowledge.KNOWLEDGE_UNKNOWN
  ) {
    return true
  }
  return false
}
