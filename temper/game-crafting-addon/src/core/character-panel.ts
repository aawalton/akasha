import type { AccountPlayerEntry } from "../data/account-init"
import { Classes, CraftIcon, Flags, Mount, Races } from "../data/icons"
import { Chat, Texture } from "../helpers"
import { state } from "../state"
import * as CharMeta from "./char-meta"
import { GetCharacters } from "./characters"
import * as Inventory from "./inventory"
import type { CraftSkillEntry } from "./player-state"
import * as UiUpdates from "./ui-updates"
import * as Utilities from "./utilities"

const mustControl = <T extends Control = Control>(name: string): T =>
  WINDOW_MANAGER.GetControlByName<T>(name) ?? error(`TemperCrafting: missing control ${name}`)

const defined = <T>(value: T | undefined): T =>
  value ?? error("TemperCrafting: unexpected nil in saved variables")

type CharSkillTable = Record<number, CraftSkillEntry>
const asCharSkillTable = (value: unknown): CharSkillTable => value as CharSkillTable

const offlineMeta = (char: string): AccountPlayerEntry | undefined => {
  const entry = CharMeta.GetEntry(char)
  if (entry === undefined) {
    return undefined
  }
  const mt = entry.mountTraining
  const space = mt?.carryCapacity ?? 0
  const maxSpace = mt?.maxCarryCapacity ?? 0
  const stamina = mt?.stamina ?? 0
  const maxStamina = mt?.maxStamina ?? 0
  const speed = mt?.speed ?? 0
  const maxSpeed = mt?.maxSpeed ?? 0
  const complete =
    mt !== undefined && space === maxSpace && stamina === maxStamina && speed === maxSpeed
  const sp = entry.skillPoints
  const skillPoints =
    sp?.total !== undefined && sp.unassigned !== undefined ? `${sp.unassigned}/${sp.total}` : "?/?"
  const skyShards = sp?.totalSkyshards !== undefined ? tostring(sp.totalSkyshards) : "?/?"
  return {
    race: entry.raceId ?? 1,
    class: entry.classId ?? 1,
    level: entry.level ?? 0,
    faction: entry.allianceId ?? 0,
    mount: {
      space: `${space}/${maxSpace}`,
      stamina: `${stamina}/${maxStamina}`,
      speed: `${speed}/${maxSpeed}`,
      complete: complete,
      time: 0,
    },
    skillPoints: skillPoints,
    skyShards: skyShards,
  }
}

export function RemoveCharacter(char: string): undefined {
  if (char === state.CurrentPlayer) {
    Chat.Print(state.Loc.removeCurrentCharacter)
  } else {
    const account = state.Account
    state.SelectedPlayer = state.CurrentPlayer
    if (account.mainchar === char) {
      account.mainchar = false
    }
    delete account.player[char]
    delete account.crafting.studies[char]
    delete account.crafting.skill[char]
    delete account.style.tracking[char]
    delete account.cook.tracking[char]
    delete account.furnisher.tracking[char]
    delete account.trait.tracking[char]
    delete state.Data.crafting.researched[char]
    const characterTable: unknown = state.Character
    if (!istable(characterTable)) {
      error("TemperCrafting: character saved variables missing")
    }
    delete characterTable[char]
    Inventory.RemoveCharacterStorage(char)
    for (const [nr] of ipairs(GetCharacters())) {
      mustControl(`TemperCrafting_CharacterFrame${nr}`).SetHidden(true)
    }
    DrawCharacters()
    UiUpdates.UpdateScreen()
  }
}

export function LoadCharacter(control: Control, button: number): undefined {
  const char = control.data?.charactername
  if (char === undefined) {
    return
  }
  const account = state.Account
  if (button === 2) {
    if (account.mainchar === char) {
      account.mainchar = false
    } else {
      account.mainchar = char
    }
    DrawCharacters()
  } else if (button === 3) {
    RemoveCharacter(char)
  } else {
    state.SelectedPlayer = char
    UiUpdates.UpdateScreen()
    TemperCrafting_PanelButtonCharacters.SetText(char)
    TemperCrafting_CharacterPanel.SetHidden(true)
  }
}

export function DrawCharacters(): undefined {
  const account = state.Account

  let overviewHeight = 83
  if (account.options.overviewstyle === 1) {
    overviewHeight = overviewHeight + 58
  }
  if (account.options.overviewstyle !== 3) {
    overviewHeight = overviewHeight + 58
  }

  TemperCrafting_CharacterPanelBoxScrollChild.SetHeight(GetCharacters().length * overviewHeight - 8)
  const swatch = (checked: boolean | undefined): string =>
    checked === true
      ? "|t16:16:esoui/art/buttons/checkbox_checked.dds|t"
      : "|t16:16:esoui/art/buttons/checkbox_unchecked.dds|t"
  const tex = (main: boolean): string =>
    main ? "|t18:18:esoui/art/characterwindow/equipmentbonusicon_full.dds|t " : ""
  const GetResearch = (char: string, nr: number): undefined => {
    let row = 1
    const now = GetTimeStamp()
    if (account.options.overviewstyle !== 3) {
      for (const [craft, craftData] of pairs(state.Data.crafting.researched[char] ?? {})) {
        for (const [line, lineData] of pairs(craftData)) {
          for (const [trait, traitData] of pairs(lineData)) {
            if (traitData !== true && traitData !== false) {
              if (traitData > 0) {
                const [name, icon] = GetSmithingResearchLineInfo(craft, line)
                const [tid] = GetSmithingResearchLineTraitInfo(craft, line, trait)
                const [, , ticon] = GetSmithingTraitItemInfo(tid + 1)
                if (account.options.overviewstyle === 1) {
                  const control = mustControl<ButtonControl>(
                    `TemperCrafting_Character${nr}Research${craft}Slot${row}`
                  )
                  control.SetText(`|t22:22:${icon}|t  |t22:22:${ticon}|t`)
                  control.data = {
                    info: zo_strformat(
                      "<<C:1>> - <<C:2>>",
                      name,
                      GetString("SI_ITEMTRAITTYPE", tid)
                    ),
                  }
                  mustControl<LabelControl>(
                    `TemperCrafting_Character${nr}Research${craft}Slot${row}Time`
                  ).SetText(Utilities.GetTime(traitData - now))
                }
                row = row + 1
              }
            }
          }
        }
        const [craftSkillType, craftSkillLineIndex] = GetCraftingSkillLineIndices(craft)
        const [, , , craftSkillLineId] = GetSkillLineInfo(craftSkillType, craftSkillLineIndex)
        const skillEntry = asCharSkillTable(account.crafting.skill[char])[craft]
        const offlineRank = CharMeta.CraftRank(char, craftSkillLineId)
        const maxsim = skillEntry?.maxsim ?? 1
        const level = skillEntry !== undefined ? string.format("%02d", skillEntry.level) : "--"
        const rank =
          skillEntry !== undefined
            ? string.format("%02d", skillEntry.rank)
            : offlineRank !== undefined
              ? string.format("%02d", offlineRank)
              : "--"
        const unknown = skillEntry?.unknown ?? 1
        let simcolor = "|cFFFFFF"
        const current = row - 1
        if (current === maxsim || unknown === 0) {
          simcolor = "|c00FF00"
        } else {
          simcolor = "|cFF0000"
        }
        mustControl<ButtonControl>(`TemperCrafting_Character${nr}Skill${craft}`).SetText(
          `|t24:24:${CraftIcon[craft]}|t  ${level} (${rank})|r    |c808080${GetString(SI_BULLET)}|r   ${simcolor}${current} / ${maxsim}|r`
        )
        row = 1
      }
    }
  }
  for (let x = 1; x <= 20; x++) {
    const frame = WINDOW_MANAGER.GetControlByName(`TemperCrafting_CharacterFrame${x}`)
    if (frame !== undefined) {
      frame.SetHidden(true)
    }
  }
  for (const [nr, char] of ipairs(GetCharacters())) {
    const player = account.player[char] ?? offlineMeta(char)
    if (player === undefined) {
      continue
    }
    const mainchar = account.mainchar === char
    mustControl(`TemperCrafting_CharacterFrame${nr}`).SetHidden(false)
    let control = mustControl<ButtonControl>(`TemperCrafting_Character${nr}Name`)
    if (Races[player.race] === undefined) {
      player.race = 1
    }
    if (Classes[player.class] === undefined) {
      if (state.Debug) {
        d(`Unknown player class id: ${player.class}`)
      }
      player.class = 1
    }
    control.SetText(
      `${tex(mainchar)}${char}${player.level !== 0 ? ` (${player.level}) ` : ""}|t25:25:${Flags[player.faction]}|t|t30:30:${Classes[player.class]}|t|t25:25:${Races[player.race]}|t`
    )
    control.data = { charactername: char, info: state.Loc.TT[9] }
    control = mustControl<ButtonControl>(`TemperCrafting_Character${nr}Info`)
    if (!player.mount.complete) {
      control.SetText(
        `${Texture(defined(Mount.capacity), 20)} ${player.mount.space}  ${Texture(defined(Mount.stamina), 20)} ${player.mount.stamina} ${Texture(defined(Mount.speed), 20)} ${player.mount.speed}  |t22:22:esoui/art/miscellaneous/timer_32.dds|t ${Utilities.GetTime(player.mount.time - GetTimeStamp())}`
      )
    } else {
      control.SetText(`${Texture(defined(Mount.skills), 24)} 180/180`)
    }
    control.data = { info: state.Loc.TT[19] }
    control = mustControl<ButtonControl>(`TemperCrafting_Character${nr}InfoSkillPoints`)
    if (player.skillPoints === undefined) {
      player.skillPoints = "?/?"
    }
    control.SetText(`${state.Loc.TT[29]}${player.skillPoints}`)
    control.data = { info: state.Loc.TT[28] }
    control = mustControl<ButtonControl>(`TemperCrafting_Character${nr}InfoSkyShards`)
    if (player.skyShards === undefined) {
      player.skyShards = "?/?"
    }
    control.SetText(`|t22:22:TemperCrafting/DDS/skyshard.dds|t ${player.skyShards}`)
    control.data = { info: state.Loc.TT[30] }

    if (account.options.overviewstyle !== 3) {
      for (const [x, icon] of pairs(CraftIcon)) {
        const [skillType, skillLineIndex] = GetCraftingSkillLineIndices(x)
        const [name, , , skillLineId] = GetSkillLineInfo(skillType, skillLineIndex)
        const skillEntry = asCharSkillTable(account.crafting.skill[char])[x]
        const offlineRank = CharMeta.CraftRank(char, skillLineId)
        const level = skillEntry !== undefined ? string.format("%02d", skillEntry.level) : "--"
        const rank =
          skillEntry !== undefined
            ? string.format("%02d", skillEntry.rank)
            : offlineRank !== undefined
              ? string.format("%02d", offlineRank)
              : "--"
        control = mustControl<ButtonControl>(`TemperCrafting_Character${nr}Skill${x}`)
        control.SetText(`|t24:24:${icon}|t  ${level} (${rank})`)
        control.data = {
          info: `${zo_strformat("<<C:1>>", name)} - ${state.Loc.rank} (${state.Loc.level})`,
        }
      }
    }
    GetResearch(char, nr)
    mustControl<ButtonControl>(`TemperCrafting_Character${nr}Recipe`).SetText(
      `${swatch(account.cook.tracking[char])} |t22:22:esoui/art/icons/quest_scroll_001.dds|t`
    )
    mustControl<ButtonControl>(`TemperCrafting_Character${nr}Style`).SetText(
      `${swatch(account.style.tracking[char])} |t22:22:esoui/art/icons/quest_book_001.dds|t`
    )
    mustControl<ButtonControl>(`TemperCrafting_Character${nr}Trait`).SetText(
      `${swatch(account.trait.tracking[char])} |t22:22:esoui/art/icons/crafting_potent_nirncrux_dust.dds|t`
    )
  }
}
