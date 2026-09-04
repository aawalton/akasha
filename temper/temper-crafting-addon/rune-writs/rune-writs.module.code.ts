import * as RuneCrafting from "../craft-rune-crafting/craft-rune-crafting.module.code.ts"
import * as Utilities from "../craft-utilities/craft-utilities.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"

export function runeShowWrit(): undefined {
  const tt = STATE.Loc.TT
  TemperCrafting_RuneInfo.SetText(tt[22])
  Utilities.getQuest()

  const getLevelName = (level: number): string => {
    const basename = zo_strformat("<<t:1>>", GetItemLinkName(RuneCrafting.runeGetLink(26580, 0, 0)))
    const basedata = [...zo_strsplit(" ", basename)]
    const name = zo_strformat("<<t:1>>", GetItemLinkName(RuneCrafting.runeGetLink(26580, 3, level)))
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

  const getEssenceName = (essence: number): string => {
    const basename = zo_strformat("<<t:1>>", GetItemLinkName(RuneCrafting.runeGetLink(68343, 0, 0)))
    const basedata = [...zo_strsplit(" ", basename)]
    const name = zo_strformat("<<t:1>>", GetItemLinkName(RuneCrafting.runeGetLink(essence, 0, 0)))
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
    levels[level] = getLevelName(level)
  }

  const runes = [
    { id: 26580, name: "", essence: "oko" },
    { id: 26582, name: "", essence: "makko" },
    { id: 26588, name: "", essence: "deni" },
  ]
  for (const [, runeEntry] of ipairs(runes)) {
    runeEntry.name = getEssenceName(runeEntry.id)
  }

  if (STATE.Quest[CRAFTING_TYPE_ENCHANTING] !== undefined) {
    for (const [, step] of pairs<Record<number, string>>(
      STATE.Quest[CRAFTING_TYPE_ENCHANTING].work
    )) {
      let writLevel: number | undefined
      let writRune: number | undefined
      for (let level = 1; level <= 16; level++) {
        const levelName = levels[level]
        if (levelName !== undefined) {
          const [res1] = string.find(string.lower(step), string.lower(levelName))
          if (res1 !== undefined) {
            writLevel = level
          }
        }
      }
      for (const [rune, runeEntry] of ipairs(runes)) {
        const [res1] = string.find(string.lower(step), string.lower(runeEntry.name))
        if (res1 !== undefined) {
          writRune = rune
        }
      }
      if (writLevel !== undefined && writRune !== undefined) {
        const matched = runes[writRune - 1]
        if (matched !== undefined) {
          RuneCrafting.runeShow(1, matched.id, 1, writLevel, 45830 + writRune, 1)
        }
      }
    }
  }
}
