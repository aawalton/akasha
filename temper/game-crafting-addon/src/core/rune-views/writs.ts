import { state } from "../../state"
import * as RuneCrafting from "../rune-crafting"
import * as Utilities from "../utilities"

export function RuneShowWrit(): undefined {
  const TT = state.Loc.TT
  TemperCrafting_RuneInfo.SetText(TT[22])
  Utilities.GetQuest()

  const GetLevelName = (level: number): string => {
    const basename = zo_strformat("<<t:1>>", GetItemLinkName(RuneCrafting.RuneGetLink(26580, 0, 0)))
    const basedata = [...zo_strsplit(" ", basename)]
    const name = zo_strformat("<<t:1>>", GetItemLinkName(RuneCrafting.RuneGetLink(26580, 3, level)))
    const namedata = [...zo_strsplit(" ", name)]
    for (let j = namedata.length; j >= 1; j--) {
      for (let i = basedata.length; i >= 1; i--) {
        if (namedata[j - 1] === basedata[i - 1]) {
          namedata.splice(j - 1, 1)
          basedata.splice(i - 1, 1)
        }
      }
    }
    return zo_strformat("<<C:1>>", table.concat(namedata, " "))
  }

  const GetEssenceName = (essence: number): string => {
    const basename = zo_strformat("<<t:1>>", GetItemLinkName(RuneCrafting.RuneGetLink(68343, 0, 0)))
    const basedata = [...zo_strsplit(" ", basename)]
    const name = zo_strformat("<<t:1>>", GetItemLinkName(RuneCrafting.RuneGetLink(essence, 0, 0)))
    const namedata = [...zo_strsplit(" ", name)]
    for (let j = namedata.length; j >= 1; j--) {
      for (let i = basedata.length; i >= 1; i--) {
        if (namedata[j - 1] === basedata[i - 1]) {
          namedata.splice(j - 1, 1)
          basedata.splice(i - 1, 1)
        }
      }
    }
    return zo_strformat("<<C:1>>", table.concat(namedata, " "))
  }

  const levels: Record<number, string> = {}
  for (let level = 1; level <= 16; level++) {
    levels[level] = GetLevelName(level)
  }

  const runes = [
    { id: 26580, name: "", essence: "oko" },
    { id: 26582, name: "", essence: "makko" },
    { id: 26588, name: "", essence: "deni" },
  ]
  for (const [, runeEntry] of ipairs(runes)) {
    runeEntry.name = GetEssenceName(runeEntry.id)
  }

  if (state.Quest[CRAFTING_TYPE_ENCHANTING] !== undefined) {
    for (const [, step] of pairs<Record<number, string>>(
      state.Quest[CRAFTING_TYPE_ENCHANTING].work
    )) {
      let writ_level: number | undefined
      let writ_rune: number | undefined
      for (let level = 1; level <= 16; level++) {
        const levelName = levels[level]
        if (levelName !== undefined) {
          const [res1] = string.find(string.lower(step), string.lower(levelName))
          if (res1 !== undefined) {
            writ_level = level
          }
        }
      }
      for (const [rune, runeEntry] of ipairs(runes)) {
        const [res1] = string.find(string.lower(step), string.lower(runeEntry.name))
        if (res1 !== undefined) {
          writ_rune = rune
        }
      }
      if (writ_level !== undefined && writ_rune !== undefined) {
        const matched = runes[writ_rune - 1]
        if (matched !== undefined) {
          RuneCrafting.RuneShow(1, matched.id, 1, writ_level, 45830 + writ_rune, 1)
        }
      }
    }
  }
}
