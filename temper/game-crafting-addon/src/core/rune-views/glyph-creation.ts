import type { RuneGlyphDef } from "../../data/rune"
import { state } from "../../state"
import * as RuneCrafting from "../rune-crafting"
import { RuneHideVanillaUI, RuneInitialize } from "./panel"

type RuneGlyphList = RuneGlyphDef[]
function asRuneGlyphList(t: Record<number, RuneGlyphDef>): RuneGlyphList {
  return t as RuneGlyphList
}

export function RuneShowCategory(): undefined {
  let useCSRune: boolean = state.Account.options.userune
  if ((state.Account.options.userune && state.Account.options.userunecreation) || state.Extern) {
    let count = 1
    TemperCrafting_RuneInfo.SetText(GetString(SI_ENCHANTING_CREATION))
    const tsort = (a: RuneGlyphDef, b: RuneGlyphDef) => a[4] < b[4]
    const glyphList = asRuneGlyphList(state.Rune.glyph[state.Character.enchant] ?? {})
    table.sort(glyphList, tsort)
    for (const [, glyph] of ipairs(glyphList)) {
      RuneCrafting.RuneShow(
        count,
        glyph[1],
        state.Character.aspect,
        state.Character.potency,
        glyph[2],
        glyph[3]
      )
      count = count + 1
    }
    TemperCrafting_RuneGlyphSectionScrollChild.SetHeight(glyphList.length * 30 + 20)
    if (state.Extern) {
      state.Character.enchant = ITEMTYPE_GLYPH_ARMOR
    }
  } else {
    useCSRune = false
    ZO_MenuBar_SelectDescriptor(ENCHANTING.modeBar, ENCHANTING_MODE_CREATION)
    ZO_EnchantingTopLevelRuneSlotContainer.SetHidden(false)
    ZO_EnchantingTopLevelInventory.SetHidden(false)
    ZO_EnchantingTopLevelModeMenu.SetHidden(false)
  }
  if (!state.Extern) {
    RuneHideVanillaUI(useCSRune)
  }
  RuneInitialize(useCSRune)
}
