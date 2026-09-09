import * as BlueprintFurnisher from "../craft-blueprint-furnisher/craft-blueprint-furnisher.module.code.ts"
import * as Knowledge from "../craft-knowledge/craft-knowledge.module.code.ts"
import * as RecipeCooking from "../craft-recipe-cooking/craft-recipe-cooking.module.code.ts"
import type { StyleApi } from "../craft-styles-data/craft-styles-data.module.code.ts"
import { CB_CONTROL_SHOW } from "../crafting-constants/crafting-constants.module.code.ts"
import { STATE, type StyleNameRow } from "../crafting-state/crafting-state.module.code.ts"

const WM = WINDOW_MANAGER

function styleApi(): StyleApi {
  return STATE.Style ?? error("TemperCrafting: style API not initialized")
}

function asort(a: StyleNameRow, b: StyleNameRow): boolean {
  return string.lower(a.name) < string.lower(b.name)
}

function msort(a: StyleNameRow, b: StyleNameRow): boolean {
  return a.motif < b.motif
}

export function styleSort(): undefined {
  const rows: StyleNameRow[] = []
  STATE.styleNames = rows
  const styleLib = styleApi()
  const numStyles = GetNumValidItemStyles()
  for (let id = 1; id <= numStyles; id++) {
    const style = GetValidItemStyleId(id)
    const [, , name] = styleLib.getHeadline(style)
    if (id !== 33 && styleLib.checkStyle(style)) {
      rows.push({
        name: name,
        id: id,
        motif: styleLib.styleMotifNumber(style),
      })
    }
  }

  if (STATE.Account.options.sortstyles === 1) {
    table.sort(rows, asort)
  } else if (STATE.Account.options.sortstyles === 2) {
    table.sort(rows, msort)
  }
}

export function updateStyleKnowledge(_activate?: boolean): undefined {
  styleSort()
  const styleLib = styleApi()
  const rows: Record<number, StyleNameRow> = STATE.styleNames
  for (const [id, data] of pairs(rows)) {
    const style = GetValidItemStyleId(data.id)
    for (let chapter = 1; chapter <= 14; chapter++) {
      const known = Knowledge.isItemKnownById(
        STATE.SelectedPlayer,
        styleLib.getChapterId(style, chapter)
      )
      const control = WM.GetControlByName<TextureControl>(
        `TemperCrafting_StylePanelScrollChild${id}Button${chapter}Texture`
      )
      if (control !== undefined) {
        if (known) {
          control.SetColor(1, 1, 1, 1)
        } else {
          control.SetColor(1, 0, 0, 0.5)
        }
      }
    }
    filterStyles()
  }
}

export function setAllStyles(): undefined {
  if (TemperCrafting_Style_Window.IsHidden()) {
    TemperCrafting_StylePanelScrollChildStyles.SetHidden(false)
    TemperCrafting_StylePanelScrollChildSets.SetHidden(true)
    TemperCrafting_StyleHeader.SetText("TemperCrafting Styles")
    CALLBACK_MANAGER.FireCallbacks(CB_CONTROL_SHOW, TemperCrafting_Style_Window)
  } else {
    TemperCrafting_Style_Window.SetHidden(true)
  }
}

export function closeStyle(): undefined {
  TemperCrafting_Style_Window.SetHidden(true)
  ACHIEVEMENTS.popup.Hide()
}

export function hideStyles(init?: boolean): undefined {
  const tex = "|t16:16:esoui/art/buttons/checkbox_<<1>>.dds|t |t2:2:x.dds|t "
  if (!(init === true)) {
    STATE.Character.hidestyles = !STATE.Character.hidestyles
  }
  TemperCrafting_StyleHideButton.SetText(
    zo_strformat(tex, STATE.Character.hidestyles ? "checked" : "unchecked") + STATE.Loc.hideStyles
  )
  filterStyles()
}

export function hideCrownStyles(init?: boolean): undefined {
  const tex = "|t16:16:esoui/art/buttons/checkbox_<<1>>.dds|t |t2:2:x.dds|t "
  if (!(init === true)) {
    STATE.Character.hidecrownstyles = !STATE.Character.hidecrownstyles
  }
  TemperCrafting_StyleHideCrownButton.SetText(
    zo_strformat(tex, STATE.Character.hidecrownstyles ? "checked" : "unchecked") +
      STATE.Loc.hideCrownStyles
  )
  filterStyles()
}

export function hidePerfectedStyles(init?: boolean): undefined {
  const tex = "|t16:16:esoui/art/buttons/checkbox_<<1>>.dds|t |t2:2:x.dds|t "
  if (!(init === true)) {
    STATE.Character.hideperfectedstyles = !STATE.Character.hideperfectedstyles
  }
  TemperCrafting_StyleHidePerfectedButton.SetText(
    zo_strformat(tex, STATE.Character.hideperfectedstyles ? "checked" : "unchecked") +
      STATE.Loc.hideKnown
  )
  filterStyles()
}

export function hideUnknownStyles(init?: boolean): undefined {
  const tex = "|t16:16:esoui/art/buttons/checkbox_<<1>>.dds|t |t2:2:x.dds|t "
  if (!(init === true)) {
    STATE.Character.hideunknownstyles = !STATE.Character.hideunknownstyles
  }
  TemperCrafting_StyleHideUnknownButton.SetText(
    zo_strformat(tex, STATE.Character.hideunknownstyles ? "checked" : "unchecked") +
      STATE.Loc.hideUnknown
  )
  filterStyles()
}

export function filterStyles(): undefined {
  const styleLib = styleApi()
  const filterPerfected = STATE.Character.hideperfectedstyles
  const filterSimple = STATE.Character.hidestyles
  const filterCrown = STATE.Character.hidecrownstyles
  const filterUnknown = STATE.Character.hideunknownstyles
  const rows: Record<number, StyleNameRow> = STATE.styleNames
  for (const [id, data] of pairs(rows)) {
    const style = GetValidItemStyleId(data.id)
    const c = WM.GetControlByName(`TemperCrafting_StyleRow${id}`)
    if (c !== undefined) {
      if (
        (filterPerfected && styleLib.isPerfectedStyle(style)) ||
        (filterUnknown && styleLib.isUnknownStyle(style)) ||
        (filterCrown && styleLib.isCrownStyle(style)) ||
        (filterSimple && styleLib.isSimpleStyle(style))
      ) {
        c.SetHidden(true)
        c.SetHeight(0)
      } else {
        c.SetHidden(false)
        c.SetHeight(90)
      }
    }
  }
}

export function hideKnownBlueprints(init?: boolean): undefined {
  const tex = "|t16:16:esoui/art/buttons/checkbox_<<1>>.dds|t |t2:2:x.dds|t "
  if (!(init === true)) {
    STATE.Character.hideKnownBlueprints = !STATE.Character.hideKnownBlueprints
  }
  TemperCrafting_BlueprintHideKnownButton.SetText(
    zo_strformat(tex, STATE.Character.hideKnownBlueprints ? "checked" : "unchecked") +
      STATE.Loc.hideKnown
  )
  filterBlueprints()
}

export function hideUnknownBlueprints(init?: boolean): undefined {
  const tex = "|t16:16:esoui/art/buttons/checkbox_<<1>>.dds|t |t2:2:x.dds|t "
  if (!(init === true)) {
    STATE.Character.hideUnknownBlueprints = !STATE.Character.hideUnknownBlueprints
  }
  TemperCrafting_BlueprintHideUnknownButton.SetText(
    zo_strformat(tex, STATE.Character.hideUnknownBlueprints ? "checked" : "unchecked") +
      STATE.Loc.hideUnknown
  )
  filterBlueprints()
}

export function filterBlueprints(): undefined {
  BlueprintFurnisher.blueprintShowCategory(STATE.Character.furniture)
}

export function hideKnownRecipes(init?: boolean): undefined {
  const tex = "|t16:16:esoui/art/buttons/checkbox_<<1>>.dds|t |t2:2:x.dds|t "
  if (!(init === true)) {
    STATE.Character.hideKnownRecipes = !STATE.Character.hideKnownRecipes
  }
  TemperCrafting_RecipeHideKnownButton.SetText(
    zo_strformat(tex, STATE.Character.hideKnownRecipes ? "checked" : "unchecked") +
      STATE.Loc.hideKnown
  )
  filterRecipes()
}

export function hideUnknownRecipes(init?: boolean): undefined {
  const tex = "|t16:16:esoui/art/buttons/checkbox_<<1>>.dds|t |t2:2:x.dds|t "
  if (!(init === true)) {
    STATE.Character.hideUnknownRecipes = !STATE.Character.hideUnknownRecipes
  }
  TemperCrafting_RecipeHideUnknownButton.SetText(
    zo_strformat(tex, STATE.Character.hideUnknownRecipes ? "checked" : "unchecked") +
      STATE.Loc.hideUnknown
  )
  filterRecipes()
}

export function filterRecipes(): undefined {
  RecipeCooking.recipeShowCategory(STATE.Character.recipe)
}
