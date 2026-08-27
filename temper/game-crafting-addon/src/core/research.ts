import { NilCheckSet } from "../helpers"
import { state } from "../state"
import * as DataValidation from "./data-validation"
import * as Inventory from "./inventory"
import * as ResearchGrid from "./research-grid"
import * as Utilities from "./utilities"

const WM = WINDOW_MANAGER

interface CraftSkillEntry {
  unknown?: number
  maxsim?: number
  level?: number
  rank?: number
  [key: string]: unknown
}

type CraftSkillTable = Record<number, CraftSkillEntry | undefined>

function asCraftSkillTable(value: unknown): CraftSkillTable {
  return value as CraftSkillTable
}

export function UpdateAllStudies(): undefined {
  for (const [craft, craftData] of pairs(
    state.Account.crafting.studies[state.SelectedPlayer] ?? {}
  )) {
    for (const [line, lineData] of pairs(craftData)) {
      ResearchGrid.UpdateStudyLine(
        WM.GetControlByName(`TemperCrafting_PanelCraft${craft}Line${line}`),
        lineData,
        craft,
        line
      )
    }
  }
}

export function UpdateResearchWindows(): undefined {
  let known = 0
  let unknown = 0
  let row = 1
  const now = GetTimeStamp()
  let control: Control | undefined
  const pip = `|r|c808080  ${GetString(SI_BULLET)}|r  `
  const skill = asCraftSkillTable(state.Account.crafting.skill[state.SelectedPlayer])
  for (const [craft, craftData] of pairs(
    state.Data.crafting.researched[state.SelectedPlayer] ?? {}
  )) {
    for (let x = 1; x <= 3; x++) {
      control = WM.GetControlByName(`TemperCrafting_PanelResearch${craft}WindowLine${x}`)
      if (control !== undefined) {
        control.SetText(undefined)
        control.data = undefined
        control.GetNamedChild("Time")?.SetText(undefined)
      }
    }
    for (const [line, lineData] of pairs(craftData)) {
      for (const [trait, traitData] of pairs(lineData)) {
        if (traitData !== false) {
          known = known + 1
        } else {
          unknown = unknown + 1
        }
        if (traitData !== true && traitData !== false) {
          if (traitData > 0) {
            control = WM.GetControlByName(`TemperCrafting_PanelResearch${craft}WindowLine${row}`)
            const [name, icon] = GetSmithingResearchLineInfo(craft, line)
            const [tid] = GetSmithingResearchLineTraitInfo(craft, line, trait)
            if (control !== undefined) {
              control.SetText(` |t28:28:${icon}|t  ${GetString("SI_ITEMTRAITTYPE", tid)}`)
              control.data = { info: zo_strformat("<<C:1>>", name) }
              if (state.SelectedPlayer === state.CurrentPlayer) {
                const [, remain] = GetSmithingResearchLineTraitTimes(craft, line, trait)
                control.GetNamedChild("Time")?.SetText(Utilities.GetTime(remain))
              } else {
                control
                  .GetNamedChild("Time")
                  ?.SetText(Utilities.GetTime(GetDiffBetweenTimeStamps(traitData, now)))
              }
            }
            row = row + 1
          }
        }
      }
    }
    const skillEntry = skill[craft]
    if (skillEntry !== undefined) {
      skillEntry.unknown = unknown
    }
    const maxsim = skillEntry?.maxsim ?? 1
    const level = skillEntry?.level ?? 1
    const rank = skillEntry?.rank ?? 1
    let simcolor = "|cFFFFFF"
    let unknowncolor = "|cFF0000"
    const current = row - 1
    if (current === maxsim || unknown === 0) {
      simcolor = "|c00FF00"
    } else {
      simcolor = "|cFF0000"
    }
    if (unknown === 0) {
      unknowncolor = "|c00FF00"
    }
    control = WM.GetControlByName(`TemperCrafting_PanelResearch${craft}Header`)
    if (control !== undefined) {
      control
        .GetNamedChild("Data")
        ?.SetText(
          `|c00FF00${known}${pip}${unknowncolor}${unknown}${pip}|c808080${state.Loc.level}: ${level} (${rank})|r`
        )
      control.GetNamedChild("Slot")?.SetText(`${simcolor}${current} / ${maxsim}|r`)
    }
    row = 1
    known = 0
    unknown = 0
  }
}

export function UpdateResearch(): undefined {
  const crafts = [
    CRAFTING_TYPE_BLACKSMITHING,
    CRAFTING_TYPE_CLOTHIER,
    CRAFTING_TYPE_WOODWORKING,
    CRAFTING_TYPE_JEWELRYCRAFTING,
  ]
  for (const [, craft] of ipairs(crafts)) {
    for (let line = 1; line <= GetNumSmithingResearchLines(craft); line++) {
      for (let trait = 1; trait <= state.MaxTraits; trait++) {
        const [, , known] = GetSmithingResearchLineTraitInfo(craft, line, trait)
        if (known === false) {
          const [, remaining] = GetSmithingResearchLineTraitTimes(craft, line, trait)
          if (remaining !== undefined && remaining > 0) {
            NilCheckSet(
              state.Data.crafting.researched,
              remaining + GetTimeStamp(),
              state.CurrentPlayer,
              craft,
              line,
              trait
            )
          } else {
            NilCheckSet(
              state.Data.crafting.researched,
              false,
              state.CurrentPlayer,
              craft,
              line,
              trait
            )
          }
        } else {
          NilCheckSet(state.Data.crafting.researched, true, state.CurrentPlayer, craft, line, trait)
        }
        ResearchGrid.UpdatePanelIcon(craft, line, trait)
      }
    }
  }
}

export interface ResearchWish {
  craft: number
  line: number
  trait: number
}

export function AddResearchItems(
  items: ResearchWish[],
  bag_data?: SharedInventorySlotData[]
): undefined {
  if (bag_data === undefined) {
    bag_data = SHARED_INVENTORY.GenerateFullSlotData(
      undefined,
      BAG_WORN,
      BAG_BACKPACK,
      BAG_BANK,
      BAG_SUBSCRIBER_BANK
    )
  }
  for (const [, data] of ipairs(bag_data)) {
    const [nextKey] = next(items)
    if (nextKey === undefined) {
      break
    }
    const link = GetItemLink(data.bagId, data.slotIndex, LINK_STYLE_DEFAULT)
    if (DataValidation.IsValidEquip(GetItemLinkEquipType(link))) {
      const [craft, line, trait] = DataValidation.GetTrait(link)
      const locked = Inventory.IsLocked(data.bagId, data.slotIndex)
      if (locked !== true) {
        for (const [items_index, i_data] of ipairs(items)) {
          if (i_data.craft === craft && i_data.line === line && i_data.trait === trait) {
            items.splice(items_index - 1, 1)
            Inventory.UpdateStored("added", data)
            break
          }
        }
      }
    }
  }
}

export function AddResearchItem(
  craft: number,
  line: number,
  trait: number,
  bag_data?: SharedInventorySlotData[]
): undefined {
  if (bag_data === undefined) {
    bag_data = SHARED_INVENTORY.GenerateFullSlotData(
      undefined,
      BAG_WORN,
      BAG_BACKPACK,
      BAG_BANK,
      BAG_SUBSCRIBER_BANK
    )
  }
  const [bag, slot] = Inventory.ScanBagResearch(craft, line, trait, bag_data)
  if (bag !== false && bag !== undefined) {
    for (const [, data] of ipairs(bag_data)) {
      if (data.bagId === bag && data.slotIndex === slot) {
        Inventory.UpdateStored("added", data)
        break
      }
    }
  }
}
