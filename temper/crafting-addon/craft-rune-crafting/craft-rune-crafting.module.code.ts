import type { CsCookButton } from "../craft-cooking/craft-cooking.module.code.ts"
import * as RecipeCooking from "../craft-cooking/craft-cooking.module.code.ts"
import * as Inventory from "../craft-inventory/craft-inventory.module.code.ts"
import * as Tooltips from "../craft-tooltips/craft-tooltips.module.code.ts"
import { MAXCRAFT } from "../crafting-constants/crafting-constants.module.code.ts"
import { CHAT, toChat } from "../crafting-helpers/crafting-helpers.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"

export interface RgbColor {
  1: number
  2: number
  3: number
}

export interface RuneButtonData {
  [key: string]: unknown
  nr: number
  link: string
  addline: string[]
  crafting: [EditControl, number]
  craftable: boolean
  quality: number
  level: number
  glyph: number
  potency: number
  essence: number
  aspect: number
  potencyType: number
  list?: unknown
}

export interface RuneButton extends ButtonControl {
  data: RuneButtonData
}

function asRuneButton(c: ButtonControl): RuneButton {
  return c as RuneButton
}

function asCsCookButton(c: Control): CsCookButton {
  return c as CsCookButton
}

type RuneIdTable = Record<number, number>
export type PotencyRuneTables = Record<number, RuneIdTable>
export type RuneTableEntry = Record<number, number | RuneIdTable> | undefined

export function asRuneIdTable(t: RuneTableEntry): RuneIdTable {
  return t as RuneIdTable
}
export function asPotencyRuneTables(t: RuneTableEntry): PotencyRuneTables {
  return t as PotencyRuneTables
}

export function runeCreate(control: RuneButton | undefined, button: number): undefined {
  if (control === undefined) {
    return
  }
  if (control.data.list !== undefined) {
    RecipeCooking.cookStart(asCsCookButton(control), button, true)
    return
  }
  if (STATE.Extern && button === 2) {
    toChat(control.data.link)
    return
  }
  if (button === 3) {
    const id = control.data.glyph
    const idx = `${control.data.glyph}_${control.data.quality}_${control.data.level}`
    const favorites: Record<string, Record<number, number> | undefined> =
      STATE.Character.favorites[CRAFTING_TYPE_ENCHANTING] ?? {}
    if (favorites[idx] !== undefined) {
      delete favorites[idx]
    } else {
      favorites[idx] = {
        1: id,
        2: control.data.level,
        3: control.data.quality,
        4: control.data.essence,
        5: control.data.potencyType,
      }
    }
    runeShow(
      control.data.nr,
      id,
      control.data.quality,
      control.data.level,
      control.data.essence,
      control.data.potencyType
    )
    return
  }
  if (control.data.craftable && !STATE.Extern) {
    if (GetNumBagFreeSlots(BAG_BACKPACK) > 0) {
      let amount = tonumber(TemperCrafting_RuneAmount.GetText()) ?? 1
      if (button === 2) {
        amount = STATE.Account.options.bulkcraftlimit
        if (STATE.Account.options.bulkcraftlimit > control.data.crafting[1]) {
          amount = control.data.crafting[1]
        }
      }
      if (amount > MAXCRAFT) {
        amount = MAXCRAFT
        if (amount > control.data.crafting[1]) {
          amount = control.data.crafting[1]
        }
      }
      TemperCrafting_RuneAmount.SetText(tostring(amount))
      const [bagP, slotP] = Inventory.scanBag(control.data.potency)
      const [bagE, slotE] = Inventory.scanBag(control.data.essence)
      const [bagA, slotA] = Inventory.scanBag(control.data.aspect)
      CraftEnchantingItem(bagP, slotP, bagE, slotE, bagA, slotA, amount)
      if (STATE.Account.options.playrunevoice) {
        const [soundP, lengthP] = GetRunestoneSoundInfo(bagP, slotP)
        const [soundE, lengthE] = GetRunestoneSoundInfo(bagE, slotE)
        const [soundA] = GetRunestoneSoundInfo(bagA, slotA)
        PlaySound(soundP)
        zo_callLater(() => PlaySound(soundE), lengthP)
        zo_callLater(() => PlaySound(soundA), lengthE + lengthP)
      }
    } else {
      CHAT.Print(STATE.Loc.nobagspace)
    }
  }
}

export function runeGetLink(id: number, quality: number, rank: number): string {
  const color: Record<number, number> = {
    0: 0,
    1: 19,
    2: 19,
    3: 19,
    4: 19,
    5: 19,
    6: 19,
    7: 19,
    8: 19,
    9: 19,
    10: 115,
    11: 117,
    12: 119,
    13: 121,
    14: 271,
    15: 307,
    16: 365,
  }
  const adder: Record<number, number> = {
    0: 0,
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 1,
    6: 1,
    7: 1,
    8: 1,
    9: 1,
    10: 10,
    11: 10,
    12: 10,
    13: 10,
    14: 1,
    15: 1,
    16: 1,
  }
  const level: Record<number, number> = {
    0: 0,
    1: 5,
    2: 10,
    3: 15,
    4: 20,
    5: 25,
    6: 30,
    7: 35,
    8: 40,
    9: 45,
    10: 50,
    11: 50,
    12: 50,
    13: 50,
    14: 50,
    15: 50,
    16: 50,
  }
  return string.format(
    "|H1:item:%u:%u:%u:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
    id,
    (color[rank] ?? 0) + quality * (adder[rank] ?? 0),
    level[rank] ?? 0
  )
}

export function runeSetValue(key: number, value = 0, ptype?: number): undefined {
  if (key === 1) {
    STATE.Character.enchant = value
  } else if (key === 2) {
    STATE.Character.aspect = value
    const color: RgbColor = STATE.Quality[value] ?? { 1: 0, 2: 0, 3: 0 }
    TemperCrafting_RuneLevelButton.SetNormalFontColor(color[1], color[2], color[3], 1)
  } else if (key === 3) {
    STATE.Character.potency = value
    if (ptype !== undefined) {
      STATE.Character.potencytype = ptype
    }
  } else if (key === 4) {
    STATE.Character.essence = value
  } else if (key === 5) {
    STATE.Character.runemode = "search"
  } else if (key === 6) {
    STATE.Character.runemode = "craft"
  } else if (key === 7) {
    STATE.Character.runemode = "refine"
  } else if (key === 9) {
    STATE.Character.runemode = "selection"
  } else if (key === 10) {
    STATE.Character.runemode = "favorites"
  } else if (key === 11) {
    STATE.Character.runemode = "writ"
  } else if (key === 12) {
    STATE.Character.runemode = "furniture"
  } else if (key === 13) {
    STATE.Character.runemode = "furniturefavorites"
  }
}

export function getRuneChild(id: number): RuneButton {
  let btn = WINDOW_MANAGER.GetControlByName<RuneButton>(
    `TemperCrafting_RuneGlyphSectionScrollChildButton${id}`
  )
  if (btn === undefined) {
    btn = asRuneButton(
      WINDOW_MANAGER.CreateControl(
        `TemperCrafting_RuneGlyphSectionScrollChildButton${id}`,
        TemperCrafting_RuneGlyphSectionScrollChild,
        CT_BUTTON
      )
    )
    btn.SetAnchor(3, undefined, 3, 8, 5 + (id - 1) * 30)
    btn.SetDimensions(508, 30)
    btn.SetFont("ZoFontGame")
    btn.EnableMouseButton(2, true)
    btn.EnableMouseButton(3, true)
    btn.SetClickSound("Click")
    btn.SetMouseOverFontColor(1, 0.66, 0.2, 1)
    btn.SetHorizontalAlignment(0)
    btn.SetVerticalAlignment(1)
    btn.SetHandler("OnMouseEnter", (ctrl: RuneButton) => {
      Tooltips.tooltip(ctrl, true, false, TemperCrafting_Rune, "tl")
    })
    btn.SetHandler("OnMouseExit", (ctrl: RuneButton) => {
      Tooltips.tooltip(ctrl, false)
    })
    btn.SetHandler("OnMouseDown", (ctrl: RuneButton, button: number) => {
      runeCreate(ctrl, button)
    })
  } else {
    const [hasAnchor] = btn.GetAnchor(0)
    if (hasAnchor === false) {
      btn.SetAnchor(3, undefined, 3, 8, 5 + (id - 1) * 30)
    }
  }
  return (
    WINDOW_MANAGER.GetControlByName<RuneButton>(
      `TemperCrafting_RuneGlyphSectionScrollChildButton${id}`
    ) ?? error(`TemperCrafting: missing rune child button ${id}`)
  )
}

export function runeShow(
  nr: number,
  id: number,
  quality: number,
  level: number,
  essence: number,
  potencytype: number
): undefined {
  const control = getRuneChild(nr)
  const link = runeGetLink(id, quality, level)
  const icon = GetItemLinkInfo(link)[0]
  const basename = zo_strformat(
    "<<C:1>>",
    GetItemLinkName(string.format("|H0:item:%u:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h", id))
  )
  const potencyId = asPotencyRuneTables(STATE.Rune.rune[51])[potencytype]?.[level] ?? 0
  const essenceId = essence
  const aspectId = asRuneIdTable(STATE.Rune.rune[52])[quality] ?? 0
  const potencyLink = runeGetLink(potencyId, 1, 1)
  const essenceLink = runeGetLink(essenceId, 1, 1)
  const aspectLink = runeGetLink(aspectId, quality, 1)
  const potencySkill = STATE.Rune.skillLevel[level] ?? 0
  const aspectSkill = quality - 1
  const [bagP, bankP, virtP] = GetItemLinkStacks(potencyLink)
  const potencyCount = bagP + bankP + virtP
  const [bagE, bankE, virtE] = GetItemLinkStacks(essenceLink)
  const essenceCount = bagE + bankE + virtE
  const [bagA, bankA, virtA] = GetItemLinkStacks(aspectLink)
  const aspectCount = bagA + bankA + virtA
  const maxval = math.min(potencyCount, essenceCount, aspectCount)
  let color: RgbColor
  let fault: boolean
  if (
    maxval === 0 ||
    aspectSkill > STATE.Rune.aspectSkill ||
    potencySkill > STATE.Rune.potencySkill
  ) {
    color = { 1: 1, 2: 0, 3: 0 }
    fault = true
  } else {
    color = STATE.Quality[quality] ?? { 1: 0, 2: 0, 3: 0 }
    fault = false
  }
  let mark: string
  if (
    STATE.Character.favorites[CRAFTING_TYPE_ENCHANTING]?.[`${id}_${quality}_${level}`] !== undefined
  ) {
    mark = "|t16:16:esoui/art/characterwindow/equipmentbonusicon_full.dds|t "
  } else {
    mark = ""
  }
  control.SetText(`${mark}|t24:24:${icon}|t ${basename} |c666666(${maxval})|r`)
  control.SetNormalFontColor(color[1], color[2], color[3], 1)
  let col: string
  let countcol: string
  if (potencyCount === 0 || potencySkill > STATE.Rune.potencySkill) {
    col = "FF0000"
  } else {
    col = "FFFFFF"
  }
  if (potencyCount === 0) {
    countcol = "FF0000"
  } else {
    countcol = "00FF00"
  }
  let addline = `|t22:22:${GetItemLinkInfo(potencyLink)[0]}|t |c${col}${zo_strformat(
    "<<C:1>>",
    GetItemLinkName(potencyLink)
  )} |c${countcol}(${potencyCount})|r`
  if (essenceCount === 0) {
    col = "FF0000"
  } else {
    col = "FFFFFF"
  }
  if (essenceCount === 0) {
    countcol = "FF0000"
  } else {
    countcol = "00FF00"
  }
  addline = `${addline}|r  |t22:22:${GetItemLinkInfo(essenceLink)[0]}|t |c${col}${zo_strformat(
    "<<C:1>>",
    GetItemLinkName(essenceLink)
  )} |c${countcol}(${essenceCount})|r`
  if (aspectCount === 0 || aspectSkill > STATE.Rune.aspectSkill) {
    col = "FF0000"
  } else {
    col = STATE.QualityHex[quality] ?? ""
  }
  if (aspectCount === 0) {
    countcol = "FF0000"
  } else {
    countcol = "00FF00"
  }
  addline = `${addline}|r  |t22:22:${GetItemLinkInfo(aspectLink)[0]}|t |c${col}${zo_strformat(
    "<<C:1>>",
    GetItemLinkName(aspectLink)
  )} |c${countcol}(${aspectCount})|r`
  control.SetHidden(false)
  control.data = {
    nr: nr,
    link: link,
    addline: [addline],
    crafting: [TemperCrafting_RuneAmount, maxval],
    craftable: !fault,
    quality: quality,
    level: level,
    glyph: id,
    potency: potencyId,
    essence: essenceId,
    aspect: aspectId,
    potencyType: potencytype,
  }
}
