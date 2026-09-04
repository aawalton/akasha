import type { MasterWritSpec } from "../inventory-writ-crafting-master-decode/inventory-writ-crafting-master-decode.module.code.ts"
import { itemTemplateIdPatternIndex } from "../inventory-writ-crafting-master-template/inventory-writ-crafting-master-template.module.code.ts"
import {
  INDEX_RANGES,
  JEWELRY_INDEX_RANGES,
  selectStyle,
} from "../inventory-writ-crafting-smithing/inventory-writ-crafting-smithing.module.code.ts"
export interface SpecMatch {
  bag: number
  slot: number
  quality: number
}

export interface EquipFingerprint {
  craftType: number
  equipType: number
  weaponType: number
  armorType: number
}

export function readEquipFingerprint(this: void, link: string): EquipFingerprint {
  return {
    craftType: GetItemLinkCraftingSkillType(link),
    equipType: GetItemLinkEquipType(link),
    weaponType: GetItemLinkWeaponType(link),
    armorType: GetItemLinkArmorType(link),
  }
}

export function topMaterialIndex(this: void, craftType: number): number {
  const ranges = craftType === CRAFTING_TYPE_JEWELRYCRAFTING ? JEWELRY_INDEX_RANGES : INDEX_RANGES
  let max = 1
  for (const [, idx] of Object.entries(ranges)) {
    if (idx > max) max = idx
  }
  return max
}

export interface EquipPattern {
  patternIndex: number
  materialIndex: number
  numMats: number
  styleId: number
}

export function resolveEquipPattern(this: void, spec: MasterWritSpec): EquipPattern | undefined {
  const patternIndex = itemTemplateIdPatternIndex(spec.templateId)
  if (patternIndex === undefined) return undefined
  const materialIndex = topMaterialIndex(spec.craftType)
  const [, , numMats] = GetSmithingPatternMaterialItemInfo(patternIndex, materialIndex)
  const styleId =
    spec.styleId !== 0
      ? spec.styleId
      : spec.craftType === CRAFTING_TYPE_JEWELRYCRAFTING
        ? 0
        : selectStyle(patternIndex)
  return { patternIndex, materialIndex, numMats, styleId }
}

function wantFingerprint(this: void, spec: MasterWritSpec): EquipFingerprint | undefined {
  const pattern = resolveEquipPattern(spec)
  if (pattern === undefined) return undefined
  const link = GetSmithingPatternResultLink(
    pattern.patternIndex,
    pattern.materialIndex,
    pattern.numMats,
    pattern.styleId,
    1,
    LINK_STYLE_DEFAULT
  )
  if (link === "") return undefined
  return readEquipFingerprint(link)
}

function isFullSpecMatch(
  this: void,
  link: string,
  spec: MasterWritSpec,
  want: EquipFingerprint
): boolean {
  const got = readEquipFingerprint(link)
  if (got.craftType !== spec.craftType) return false
  if (got.equipType !== want.equipType) return false
  if (got.weaponType !== want.weaponType) return false
  if (got.armorType !== want.armorType) return false

  if (spec.traitType !== 0) {
    const [traitType] = GetItemLinkTraitInfo(link)
    if (traitType !== spec.traitType) return false
  }

  const [, , , , , setId] = GetItemLinkSetInfo(link)
  if (setId !== spec.setId) return false

  if (spec.styleId !== 0) {
    if (GetItemLinkItemStyle(link) !== spec.styleId) return false
  }

  return true
}

export function findBestSpecMatch(this: void, spec: MasterWritSpec): SpecMatch | undefined {
  const want = wantFingerprint(spec)
  if (want === undefined) return undefined
  const bags = [BAG_BACKPACK, BAG_BANK, BAG_SUBSCRIBER_BANK]

  let best: SpecMatch | undefined
  for (const bag of bags) {
    const size = GetBagSize(bag)
    for (let slot = 0; slot <= size; slot++) {
      if (GetItemId(bag, slot) === 0) continue
      const link = GetItemLink(bag, slot, LINK_STYLE_DEFAULT)
      if (link === "") continue
      if (!isFullSpecMatch(link, spec, want)) continue

      const quality = GetItemLinkFunctionalQuality(link)
      if (best === undefined || quality > best.quality) {
        best = { bag, slot, quality }
      }
    }
  }
  return best
}
