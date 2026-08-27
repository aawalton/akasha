import { CB_CONTROL_SHOW } from "../constants"
import { type StyleNameRow, state } from "../state"
import * as BlueprintFurnisher from "./blueprint-furnisher"
import * as Knowledge from "./knowledge"
import * as RecipeCooking from "./recipe-cooking"
import type { StyleApi } from "./styles-data"

const WM = WINDOW_MANAGER

function styleApi(): StyleApi {
  return state.Style ?? error("TemperCrafting: style API not initialized")
}

function asort(a: StyleNameRow, b: StyleNameRow): boolean {
  return string.lower(a.name) < string.lower(b.name)
}

function msort(a: StyleNameRow, b: StyleNameRow): boolean {
  return a.motif < b.motif
}

export function StyleSort(): undefined {
  const rows: StyleNameRow[] = []
  state.styleNames = rows
  const Style = styleApi()
  const numStyles = GetNumValidItemStyles()
  for (let id = 1; id <= numStyles; id++) {
    const style = GetValidItemStyleId(id)
    const [, , name] = Style.GetHeadline(style)
    if (id !== 33 && Style.CheckStyle(style)) {
      rows.push({
        name: name,
        id: id,
        motif: Style.StyleMotifNumber(style),
      })
    }
  }

  if (state.Account.options.sortstyles === 1) {
    table.sort(rows, asort)
  } else if (state.Account.options.sortstyles === 2) {
    table.sort(rows, msort)
  }
}

export function UpdateStyleKnowledge(_activate?: boolean): undefined {
  StyleSort()
  const Style = styleApi()
  const rows: Record<number, StyleNameRow> = state.styleNames
  for (const [id, data] of pairs(rows)) {
    const style = GetValidItemStyleId(data.id)
    for (let chapter = 1; chapter <= 14; chapter++) {
      const known = Knowledge.IsItemKnownById(
        state.SelectedPlayer,
        Style.GetChapterId(style, chapter)
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
    FilterStyles()
  }
}

export function SetAllStyles(): undefined {
  if (TemperCrafting_Style_Window.IsHidden()) {
    TemperCrafting_StylePanelScrollChildStyles.SetHidden(false)
    TemperCrafting_StylePanelScrollChildSets.SetHidden(true)
    TemperCrafting_StyleHeader.SetText("TemperCrafting Styles")
    CALLBACK_MANAGER.FireCallbacks(CB_CONTROL_SHOW, TemperCrafting_Style_Window)
  } else {
    TemperCrafting_Style_Window.SetHidden(true)
  }
}

export function CloseStyle(): undefined {
  TemperCrafting_Style_Window.SetHidden(true)
  ACHIEVEMENTS.popup.Hide()
}

export function HideStyles(init?: boolean): undefined {
  const tex = "|t16:16:esoui/art/buttons/checkbox_<<1>>.dds|t |t2:2:x.dds|t "
  if (!(init === true)) {
    state.Character.hidestyles = !state.Character.hidestyles
  }
  TemperCrafting_StyleHideButton.SetText(
    zo_strformat(tex, state.Character.hidestyles ? "checked" : "unchecked") + state.Loc.hideStyles
  )
  FilterStyles()
}

export function HideCrownStyles(init?: boolean): undefined {
  const tex = "|t16:16:esoui/art/buttons/checkbox_<<1>>.dds|t |t2:2:x.dds|t "
  if (!(init === true)) {
    state.Character.hidecrownstyles = !state.Character.hidecrownstyles
  }
  TemperCrafting_StyleHideCrownButton.SetText(
    zo_strformat(tex, state.Character.hidecrownstyles ? "checked" : "unchecked") +
      state.Loc.hideCrownStyles
  )
  FilterStyles()
}

export function HidePerfectedStyles(init?: boolean): undefined {
  const tex = "|t16:16:esoui/art/buttons/checkbox_<<1>>.dds|t |t2:2:x.dds|t "
  if (!(init === true)) {
    state.Character.hideperfectedstyles = !state.Character.hideperfectedstyles
  }
  TemperCrafting_StyleHidePerfectedButton.SetText(
    zo_strformat(tex, state.Character.hideperfectedstyles ? "checked" : "unchecked") +
      state.Loc.hideKnown
  )
  FilterStyles()
}

export function HideUnknownStyles(init?: boolean): undefined {
  const tex = "|t16:16:esoui/art/buttons/checkbox_<<1>>.dds|t |t2:2:x.dds|t "
  if (!(init === true)) {
    state.Character.hideunknownstyles = !state.Character.hideunknownstyles
  }
  TemperCrafting_StyleHideUnknownButton.SetText(
    zo_strformat(tex, state.Character.hideunknownstyles ? "checked" : "unchecked") +
      state.Loc.hideUnknown
  )
  FilterStyles()
}

export function FilterStyles(): undefined {
  const Style = styleApi()
  const filterPerfected = state.Character.hideperfectedstyles
  const filterSimple = state.Character.hidestyles
  const filterCrown = state.Character.hidecrownstyles
  const filterUnknown = state.Character.hideunknownstyles
  const rows: Record<number, StyleNameRow> = state.styleNames
  for (const [id, data] of pairs(rows)) {
    const style = GetValidItemStyleId(data.id)
    const c = WM.GetControlByName(`TemperCrafting_StyleRow${id}`)
    if (c !== undefined) {
      if (
        (filterPerfected && Style.IsPerfectedStyle(style)) ||
        (filterUnknown && Style.IsUnknownStyle(style)) ||
        (filterCrown && Style.IsCrownStyle(style)) ||
        (filterSimple && Style.IsSimpleStyle(style))
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

export function HideKnownBlueprints(init?: boolean): undefined {
  const tex = "|t16:16:esoui/art/buttons/checkbox_<<1>>.dds|t |t2:2:x.dds|t "
  if (!(init === true)) {
    state.Character.hideKnownBlueprints = !state.Character.hideKnownBlueprints
  }
  TemperCrafting_BlueprintHideKnownButton.SetText(
    zo_strformat(tex, state.Character.hideKnownBlueprints ? "checked" : "unchecked") +
      state.Loc.hideKnown
  )
  FilterBlueprints()
}

export function HideUnknownBlueprints(init?: boolean): undefined {
  const tex = "|t16:16:esoui/art/buttons/checkbox_<<1>>.dds|t |t2:2:x.dds|t "
  if (!(init === true)) {
    state.Character.hideUnknownBlueprints = !state.Character.hideUnknownBlueprints
  }
  TemperCrafting_BlueprintHideUnknownButton.SetText(
    zo_strformat(tex, state.Character.hideUnknownBlueprints ? "checked" : "unchecked") +
      state.Loc.hideUnknown
  )
  FilterBlueprints()
}

export function FilterBlueprints(): undefined {
  BlueprintFurnisher.BlueprintShowCategory(state.Character.furniture)
}

export function HideKnownRecipes(init?: boolean): undefined {
  const tex = "|t16:16:esoui/art/buttons/checkbox_<<1>>.dds|t |t2:2:x.dds|t "
  if (!(init === true)) {
    state.Character.hideKnownRecipes = !state.Character.hideKnownRecipes
  }
  TemperCrafting_RecipeHideKnownButton.SetText(
    zo_strformat(tex, state.Character.hideKnownRecipes ? "checked" : "unchecked") +
      state.Loc.hideKnown
  )
  FilterRecipes()
}

export function HideUnknownRecipes(init?: boolean): undefined {
  const tex = "|t16:16:esoui/art/buttons/checkbox_<<1>>.dds|t |t2:2:x.dds|t "
  if (!(init === true)) {
    state.Character.hideUnknownRecipes = !state.Character.hideUnknownRecipes
  }
  TemperCrafting_RecipeHideUnknownButton.SetText(
    zo_strformat(tex, state.Character.hideUnknownRecipes ? "checked" : "unchecked") +
      state.Loc.hideUnknown
  )
  FilterRecipes()
}

export function FilterRecipes(): undefined {
  RecipeCooking.RecipeShowCategory(state.Character.recipe)
}
