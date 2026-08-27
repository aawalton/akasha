import { state } from "../../state"
import type { RgbColor } from "../rune-crafting"
import type { RefineButton } from "../rune-refining"
import * as RuneRefining from "../rune-refining"
import * as Tooltips from "../tooltips"
import { RuneHideVanillaUI, RuneInitialize } from "./panel"

function asRefineButton(c: ButtonControl): RefineButton {
  return c as RefineButton
}

export function RuneShowRefine(): undefined {
  const TT = state.Loc.TT
  let useCSRune: boolean = state.Account.options.userune
  if (state.Account.options.userune && state.Account.options.useruneextraction) {
    TemperCrafting_RuneInfo.SetText(GetString(SI_ENCHANTING_EXTRACTION))
    TemperCrafting_RuneGlyphSectionScrollChildRefine.SetHidden(false)
    TemperCrafting_RuneRefineAllButton.SetHidden(false)
    const numChildren = TemperCrafting_RuneGlyphSectionScrollChildRefine.GetNumChildren()
    for (let x = 1; x <= numChildren; x++) {
      TemperCrafting_RuneGlyphSectionScrollChildRefine.GetChild(x)?.SetHidden(true)
    }
    let count = 0
    let crafted: string
    for (const [x, glyph] of ipairs(RuneRefining.RuneGetGylphs())) {
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
          Tooltips.Tooltip(ctrl, true, false, TemperCrafting_Rune, "tl")
        })
        c.SetHandler("OnMouseExit", (ctrl: RefineButton) => {
          Tooltips.Tooltip(ctrl, false)
        })
        c.SetHandler("OnMouseDown", (ctrl: RefineButton, button: number) => {
          RuneRefining.RuneRefine(ctrl, button)
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
      const color: RgbColor = state.Quality[glyph.quality] ?? { 1: 0, 2: 0, 3: 0 }
      c.SetNormalFontColor(color[1], color[2], color[3], 1)
      c.data = {
        link: glyph.link,
        location: glyph.location,
        buttons: [TT[7], TT[27]],
      }
      count = count + 1
    }
    TemperCrafting_RuneGlyphSectionScrollChild.SetHeight(count * 30 + 20)
  } else {
    useCSRune = false
    ZO_MenuBar_SelectDescriptor(ENCHANTING.modeBar, ENCHANTING_MODE_EXTRACTION)
    ZO_EnchantingTopLevelExtractionSlotContainer.SetHidden(false)
    ZO_EnchantingTopLevelInventory.SetHidden(false)
    ZO_EnchantingTopLevelModeMenu.SetHidden(false)
  }

  RuneHideVanillaUI(useCSRune)
  RuneInitialize(useCSRune)
}
