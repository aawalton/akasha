import type { RgbColor } from "../craft-rune-crafting/craft-rune-crafting.module.code.ts"
import type { RefineButton } from "../craft-rune-refining/craft-rune-refining.module.code.ts"
import * as runeRefining from "../craft-rune-refining/craft-rune-refining.module.code.ts"
import * as Tooltips from "../craft-tooltips/craft-tooltips.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"
import { runeHideVanillaUI, runeInitialize } from "../rune-panel/rune-panel.module.code.ts"

function asRefineButton(c: ButtonControl): RefineButton {
  return c as RefineButton
}

export function runeShowRefine(): undefined {
  const tt = STATE.Loc.TT
  let useCSRune: boolean = STATE.Account.options.userune
  if (STATE.Account.options.userune && STATE.Account.options.useruneextraction) {
    TemperCrafting_RuneInfo.SetText(GetString(SI_ENCHANTING_EXTRACTION))
    TemperCrafting_RuneGlyphSectionScrollChildRefine.SetHidden(false)
    TemperCrafting_RuneRefineAllButton.SetHidden(false)
    const numChildren = TemperCrafting_RuneGlyphSectionScrollChildRefine.GetNumChildren()
    for (let x = 1; x <= numChildren; x++) {
      TemperCrafting_RuneGlyphSectionScrollChildRefine.GetChild(x)?.SetHidden(true)
    }
    let count = 0
    let crafted: string
    for (const [x, glyph] of ipairs(runeRefining.runeGetGylphs())) {
      let c = WINDOW_MANAGER.GetControlByName<RefineButton>(`TemperCrafting_GlyphControl${x}`)
      if (c === undefined) {
        c = asRefineButton(
          WINDOW_MANAGER.CreateControl(
            `TemperCrafting_GlyphControl${x}`,
            TemperCrafting_RuneGlyphSectionScrollChildRefine,
            CT_BUTTON
          )
        )
        c.SetAnchor(
          TOPLEFT,
          TemperCrafting_RuneGlyphSectionScrollChild,
          TOPLEFT,
          8,
          5 + (x - 1) * 30
        )
        c.SetDimensions(508, 30)
        c.SetFont("ZoFontGame")
        c.SetClickSound("Click")
        c.SetMouseOverFontColor(1, 0.66, 0.2, 1)
        c.EnableMouseButton(2, true)
        c.SetHorizontalAlignment(0)
        c.SetVerticalAlignment(1)
        c.SetHandler("OnMouseEnter", (ctrl: RefineButton) => {
          Tooltips.tooltip(ctrl, true, false, TemperCrafting_Rune, "tl")
        })
        c.SetHandler("OnMouseExit", (ctrl: RefineButton) => {
          Tooltips.tooltip(ctrl, false)
        })
        c.SetHandler("OnMouseDown", (ctrl: RefineButton, button: number) => {
          runeRefining.runeRefine(ctrl, button)
        })
      }
      if (glyph.crafted) {
        crafted = "|t22:22:esoui/art/treeicons/achievements_indexicon_crafting_up.dds|t "
      } else {
        crafted = ""
      }
      c.SetHidden(false)
      c.SetText(
        `${crafted}|t24:24:${glyph.icon}|t ${glyph.name} |c666666(${glyph.location.length})|r`
      )
      const color: RgbColor = STATE.Quality[glyph.quality] ?? { 1: 0, 2: 0, 3: 0 }
      c.SetNormalFontColor(color[1], color[2], color[3], 1)
      c.data = {
        link: glyph.link,
        location: glyph.location,
        buttons: [tt[7], tt[27]],
      }
      count = count + 1
    }
    TemperCrafting_RuneGlyphSectionScrollChild.SetHeight(count * 30 + 20)
  } else {
    useCSRune = false
    ZO_MenuBar_SelectDescriptor(ENCHANTING.modeBar as Control, ENCHANTING_MODE_EXTRACTION)
    ZO_EnchantingTopLevelExtractionSlotContainer.SetHidden(false)
    ZO_EnchantingTopLevelInventory.SetHidden(false)
    ZO_EnchantingTopLevelModeMenu.SetHidden(false)
  }

  runeHideVanillaUI(useCSRune)
  runeInitialize(useCSRune)
}
