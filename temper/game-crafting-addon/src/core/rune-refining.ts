import { CB_INVENTORY_SPACE } from "../constants"
import type { RuneRefineGlyphEntry } from "../data/rune"
import { Chat } from "../helpers"
import { state } from "../state"
import * as Inventory from "./inventory"

export interface GlyphStack extends RuneRefineGlyphEntry {
  name: string
  icon: string
  link: string
  quality: number
  level: number
}

export interface RefineButtonData {
  [key: string]: unknown
  link: string
  location: [number, number][]
  buttons: [string, string]
}

export interface RefineButton extends ButtonControl {
  data: RefineButtonData
}

export function RuneCheckGlyph(glyphs: GlyphStack[], link: string): number {
  let found = 0
  for (const [ind, data] of ipairs(glyphs)) {
    const [, , , item_id1] = ZO_LinkHandler_ParseLink(data.link)
    const [, , , item_id2] = ZO_LinkHandler_ParseLink(link)
    const [level1, cplevel1] = GetItemLinkGlyphMinLevels(data.link)
    const [level2, cplevel2] = GetItemLinkGlyphMinLevels(link)
    if (
      IsItemLinkCrafted(data.link) === IsItemLinkCrafted(link) &&
      data.quality === GetItemLinkQuality(link) &&
      level1 === level2 &&
      cplevel1 === cplevel2 &&
      item_id1 === item_id2
    ) {
      found = ind
      break
    }
  }
  return found
}

export function GlyphSort(a: GlyphStack, b: GlyphStack): boolean {
  if (a.level === b.level) {
    if (a.name === b.name) {
      return a.quality < b.quality
    } else {
      return a.name < b.name
    }
  } else {
    return a.level < b.level
  }
}

export function RuneGetGylphs(): GlyphStack[] {
  const bag = SHARED_INVENTORY.GenerateFullSlotData(
    undefined,
    BAG_BANK,
    BAG_SUBSCRIBER_BANK,
    BAG_BACKPACK,
    BAG_VIRTUAL
  )
  const glyphs: GlyphStack[] = []
  for (const data of bag) {
    const item = data.itemType
    const link = GetItemLink(data.bagId, data.slotIndex)
    const icon = data.iconFile
    if (
      (item === ITEMTYPE_GLYPH_ARMOR ||
        item === ITEMTYPE_GLYPH_WEAPON ||
        item === ITEMTYPE_GLYPH_JEWELRY) &&
      Inventory.IsLocked(data.bagId, data.slotIndex) !== true
    ) {
      const glyph_position = RuneCheckGlyph(glyphs, link)
      if (glyph_position === 0) {
        const [level, cplevel] = GetItemLinkGlyphMinLevels(link)
        if (level === undefined && cplevel === undefined) {
          Chat.Print(`Unknown level: ${link}`)
        } else {
          const resolvedLevel = level !== undefined ? level : (cplevel ?? 0) + 50
          glyphs.push({
            name: zo_strformat("<<C:1>>", data.name),
            icon: icon,
            link: link,
            quality: data.quality,
            level: resolvedLevel,
            location: [[data.bagId, data.slotIndex]],
            crafted: IsItemLinkCrafted(link),
          })
        }
      } else {
        const existing = glyphs[glyph_position - 1]
        if (existing !== undefined) {
          existing.location.push([data.bagId, data.slotIndex])
        }
      }
    }
  }
  table.sort(glyphs, GlyphSort)
  return glyphs
}

export function RuneRefining(): undefined {
  const first = state.Rune.refine.glyphs[0]
  if (first !== undefined) {
    if (
      GetNumBagFreeSlots(BAG_BACKPACK) >= 3 ||
      (tonumber(GetSetting(SETTING_TYPE_LOOT, LOOT_SETTING_AUTO_ADD_TO_CRAFT_BAG)) === 1 &&
        IsESOPlusSubscriber())
    ) {
      ExtractEnchantingItem(first.location[0]?.[0] ?? 0, first.location[0]?.[1] ?? 0)
      PlaySound("Enchanting_Extract_Start_Anim")
      if (first.location.length === 1) {
        state.Rune.refine.glyphs.shift()
      } else {
        first.location.shift()
      }
    } else {
      Chat.Print(state.Loc.nobagspace)
    }
  }
  CALLBACK_MANAGER.FireCallbacks(CB_INVENTORY_SPACE, TemperCrafting_RuneSpaceButtonName)
}

export function RuneRefine(control: RefineButton, button: number): undefined {
  if (button === 2) {
    const glyphs: RuneRefineGlyphEntry[] = []
    glyphs.push({
      location: control.data.location,
      crafted: IsItemLinkCrafted(control.data.link),
    })
    state.Rune.refine = { glyphs: glyphs, crafted: true }
    RuneRefining()
  } else if (
    GetNumBagFreeSlots(BAG_BACKPACK) >= 3 ||
    (tonumber(GetSetting(SETTING_TYPE_LOOT, LOOT_SETTING_AUTO_ADD_TO_CRAFT_BAG)) === 1 &&
      IsESOPlusSubscriber())
  ) {
    ExtractEnchantingItem(control.data.location[0]?.[0] ?? 0, control.data.location[0]?.[1] ?? 0)
    PlaySound("Enchanting_Extract_Start_Anim")
  } else {
    Chat.Print(state.Loc.nobagspace)
  }
  CALLBACK_MANAGER.FireCallbacks(CB_INVENTORY_SPACE, TemperCrafting_RuneSpaceButtonName)
}

export function RefineAll(_: unknown, button: number): undefined {
  state.Rune.refine = { glyphs: RuneGetGylphs(), crafted: button === 2 }
  if (state.Rune.refine.glyphs.length > 0) {
    let remove = true
    while (remove) {
      if (state.Rune.refine.glyphs[0]?.crafted === true && !state.Rune.refine.crafted) {
        state.Rune.refine.glyphs.shift()
      } else {
        remove = false
      }
    }
    RuneRefining()
  }
}
