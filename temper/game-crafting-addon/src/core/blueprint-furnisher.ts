import { type CsQualityColor, Quality } from "../data/quality"
import { Chat, HideControl, ToChat } from "../helpers"
import { state } from "../state"
import * as PlayerState from "./player-state"
import * as Tooltips from "./tooltips"

const WM = WINDOW_MANAGER

const blueprint_limit = 500

export interface CsBlueprintButtonData {
  link: string
  rec: number
  id: number
  buttons: [string, string]
}

export interface CsBlueprintButton extends ButtonControl {
  data?: CsBlueprintButtonData
}

function CsBlueprintButton(c: ButtonControl): CsBlueprintButton {
  return c as CsBlueprintButton
}

function defined<T>(value: T | undefined): T {
  if (value === undefined) {
    error("TemperCrafting: unexpected nil value")
  }
  return value
}

export function CloseBlueprintWindow(): undefined {
  TemperCrafting_Blueprint_Window.SetHidden(true)
  const numChildren = TemperCrafting_BlueprintPanelScrollChild.GetNumChildren()
  for (let x = 1; x <= numChildren; x++) {
    HideControl(`TemperCrafting_BlueprintPanelScrollChildButton${x}`)
  }
}

export function GetBlueprintChild(id: number): CsBlueprintButton {
  let btn = WM.GetControlByName<CsBlueprintButton>(
    `TemperCrafting_BlueprintPanelScrollChildButton${id}`
  )
  if (btn === undefined) {
    const created = CsBlueprintButton(
      WM.CreateControl(
        `TemperCrafting_BlueprintPanelScrollChildButton${id}`,
        TemperCrafting_BlueprintPanelScrollChild,
        CT_BUTTON
      )
    )
    created.SetAnchor(3, undefined, 3, 8, 5 + (id - 1) * 22)
    created.SetDimensions(508, 22)
    created.SetFont("TemperCraftingFont")
    created.SetHidden(true)
    created.EnableMouseButton(1, false)
    created.EnableMouseButton(2, true)
    created.EnableMouseButton(3, true)
    created.SetClickSound("Click")
    created.SetMouseOverFontColor(1, 0.66, 0.2, 1)
    created.SetHorizontalAlignment(0)
    created.SetVerticalAlignment(1)
    created.SetHandler("OnMouseEnter", () => {
      Tooltips.Tooltip(created, true, false, TemperCrafting_Blueprint, "tl")
    })
    created.SetHandler("OnMouseExit", () => {
      Tooltips.Tooltip(created, false)
    })
    created.SetHandler("OnMouseDown", (_self: unknown, button: number) => {
      BlueprintMark(created, button)
    })
    btn = created
  } else {
    const [hasAnchor] = btn.GetAnchor()
    if (hasAnchor === false) {
      btn.SetAnchor(3, undefined, 3, 8, 5 + (id - 1) * 22)
    }
  }
  return btn
}

export function BlueprintMark(control: CsBlueprintButton, button: number): undefined {
  const data = control.data
  if (data === undefined) {
    return
  }
  if (button === 2) {
    ToChat(data.link)
  } else {
    const account = state.Account
    if (account === undefined) {
      return
    }
    const tracked = account.furnisher.ingredients[data.id] ?? false
    let mark: string
    if (tracked === true) {
      mark = ""
      account.furnisher.ingredients[data.id] = undefined
    } else {
      mark = "|t22:22:esoui/art/inventory/newitem_icon.dds|t "
      account.furnisher.ingredients[data.id] = true
    }
    const recipe = defined(state.Furnisher.recipe[data.rec])
    control.SetText(`${mark}(${recipe.level}) ${recipe.name}`)
    zo_callLater(PlayerState.UpdateIngredientTracking, 500)
  }
}

export function BlueprintShow(id: number, inc: number): number {
  const account = state.Account
  if (account === undefined) {
    return inc
  }
  const recipe = defined(state.Furnisher.recipe[id])
  let mark: string
  if (account.furnisher.ingredients[recipe.id] === true) {
    mark = "|t22:22:esoui/art/inventory/newitem_icon.dds|t "
  } else {
    mark = ""
  }
  let color: CsQualityColor
  if (recipe.known === true) {
    color = defined(Quality[recipe.quality])
  } else {
    color = { 1: 1, 2: 0, 3: 0, 4: 1 }
  }
  const control = GetBlueprintChild(inc)
  control.SetNormalFontColor(color[1], color[2], color[3], color[4])
  control.SetText(`${mark}(${recipe.level}) ${recipe.name}`)
  control.SetHidden(false)
  control.data = {
    link: recipe.link,
    rec: id,
    id: recipe.id,
    buttons: [state.Loc.TT[5], state.Loc.TT[6]],
  }
  return inc + 1
}

export function BlueprintShowCategory(list?: number): undefined {
  const character = state.Character
  if (character === undefined) {
    return
  }
  let listIndex = list
  if (listIndex === undefined || listIndex > 7) {
    listIndex = 1
  }
  let inc = 1
  let known = 0
  let total = 0
  const numChildren = TemperCrafting_BlueprintPanelScrollChild.GetNumChildren()
  for (let x = 1; x <= numChildren; x++) {
    HideControl(`TemperCrafting_BlueprintPanelScrollChildButton${x}`)
  }
  for (const [id, recipe] of pairs(state.Furnisher.recipe)) {
    if (recipe.stat === listIndex) {
      if (recipe.known === true) {
        known = known + 1
      }
      total = total + 1
      if (
        (character.hideKnownBlueprints !== true && recipe.known === true) ||
        (character.hideUnknownBlueprints !== true && recipe.known !== true)
      ) {
        inc = BlueprintShow(id, inc)
      }
    }
  }
  TemperCrafting_BlueprintPanelScrollChild.SetHeight(inc * 22 - 13)
  TemperCrafting_BlueprintHeadline.SetText(
    zo_strformat("<<C:1>>", GetString("SI_RECIPECRAFTINGSYSTEM", listIndex))
  )
  if (character.hideKnownBlueprints === true && character.hideUnknownBlueprints === true) {
    TemperCrafting_BlueprintInfo.SetText(`(0 / ${total})`)
  } else if (character.hideKnownBlueprints !== true) {
    TemperCrafting_BlueprintInfo.SetText(`(${known} / ${total})`)
  } else if (character.hideUnknownBlueprints !== true) {
    TemperCrafting_BlueprintInfo.SetText(`(${total - known} / ${total})`)
  }
  character.furniture = listIndex
}

export function BlueprintSearch(): undefined {
  const character = state.Character
  if (character === undefined) {
    return
  }
  const search = TemperCrafting_BlueprintSearch.GetText()
  let inc = 1
  if (search !== "") {
    const numChildren = TemperCrafting_BlueprintPanelScrollChild.GetNumChildren()
    for (let x = 1; x <= numChildren; x++) {
      const control = GetBlueprintChild(x)
      control.SetHidden(true)
      control.data = undefined
    }
    if (character.hideKnownBlueprints !== true || character.hideUnknownBlueprints !== true) {
      for (const [id, food] of pairs(state.Furnisher.recipe)) {
        const [found] = string.find(string.lower(food.name), string.lower(search))
        if (found !== undefined) {
          if (
            (character.hideKnownBlueprints !== true && character.hideUnknownBlueprints !== true) ||
            (character.hideUnknownBlueprints === true && food.known === true) ||
            (character.hideKnownBlueprints === true && food.known !== true)
          ) {
            if (inc > blueprint_limit) {
              Chat.Print(state.Loc.blueprintSearchLimit)
              break
            } else {
              inc = BlueprintShow(id, inc)
            }
          }
        }
      }
    }
    TemperCrafting_BlueprintPanelScrollChild.SetHeight(inc * 22 - 13)
    TemperCrafting_BlueprintHeadline.SetText(state.Loc.searchfor)
    TemperCrafting_BlueprintInfo.SetText(`${search} (${inc - 1})`)
  }
}

export function BlueprintLearned(list: number, id: number): undefined {
  const link: string | undefined = GetRecipeResultItemLink(list, id, LINK_STYLE_DEFAULT)
  if (link !== undefined) {
    for (const [, recipe] of pairs(state.Furnisher.recipe)) {
      if (recipe.result === link) {
        recipe.known = true
        break
      }
    }
  }
}
