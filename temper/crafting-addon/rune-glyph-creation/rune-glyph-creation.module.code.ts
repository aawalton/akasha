import type { RuneGlyphDef } from "akasha/temper/crafting-addon/modules/craft-rune/craft-rune.module.code.ts"
import * as RuneCrafting from "akasha/temper/crafting-addon/modules/craft-rune-crafting/craft-rune-crafting.module.code.ts"
import { STATE } from "akasha/temper/crafting-addon/modules/crafting-state/crafting-state.module.code.ts"
import {
  runeHideVanillaUI,
  runeInitialize,
} from "akasha/temper/crafting-addon/rune-panel/rune-panel.module.code.ts"

type RuneGlyphList = RuneGlyphDef[]
function asRuneGlyphList(t: Record<number, RuneGlyphDef>): RuneGlyphList {
  return t as RuneGlyphList
}

export function runeShowCategory(): undefined {
  let useCSRune: boolean = STATE.Account.options.userune
  if ((STATE.Account.options.userune && STATE.Account.options.userunecreation) || STATE.Extern) {
    let count = 1
    TemperCrafting_RuneInfo.SetText(GetString(SI_ENCHANTING_CREATION))
    const tsort = (a: RuneGlyphDef, b: RuneGlyphDef) => a[4] < b[4]
    const glyphList = asRuneGlyphList(STATE.Rune.glyph[STATE.Character.enchant] ?? {})
    table.sort(glyphList, tsort)
    for (const [, glyph] of ipairs(glyphList)) {
      RuneCrafting.runeShow(
        count,
        glyph[1],
        STATE.Character.aspect,
        STATE.Character.potency,
        glyph[2],
        glyph[3]
      )
      count = count + 1
    }
    TemperCrafting_RuneGlyphSectionScrollChild.SetHeight(glyphList.length * 30 + 20)
    if (STATE.Extern) {
      STATE.Character.enchant = ITEMTYPE_GLYPH_ARMOR
    }
  } else {
    useCSRune = false
    ZO_MenuBar_SelectDescriptor(ENCHANTING.modeBar as Control, ENCHANTING_MODE_CREATION)
    ZO_EnchantingTopLevelRuneSlotContainer.SetHidden(false)
    ZO_EnchantingTopLevelInventory.SetHidden(false)
    ZO_EnchantingTopLevelModeMenu.SetHidden(false)
  }
  if (!STATE.Extern) {
    runeHideVanillaUI(useCSRune)
  }
  runeInitialize(useCSRune)
}
