import * as PlayerState from "../craft-player-state/craft-player-state.module.code.ts"
import { type CsQualityColor, QUALITY } from "../craft-quality/craft-quality.module.code.ts"
import * as Tooltips from "../craft-tooltips/craft-tooltips.module.code.ts"
import { CHAT, hideControl, toChat } from "../crafting-helpers/crafting-helpers.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"

const WM = WINDOW_MANAGER

const BLUEPRINT_LIMIT = 500

export interface CsBlueprintButtonData {
  link: string
  rec: number
  id: number
  buttons: [string, string]
}

export interface CsBlueprintButton extends ButtonControl {
  data?: CsBlueprintButtonData
}

function asBlueprintButton(c: ButtonControl): CsBlueprintButton {
  return c as CsBlueprintButton
}

function defined<T>(value: T | undefined): T {
  if (value === undefined) {
    error("TemperCrafting: unexpected nil value")
  }
  return value
}

export function closeBlueprintWindow(): undefined {
  TemperCrafting_Blueprint_Window.SetHidden(true)
  const numChildren = TemperCrafting_BlueprintPanelScrollChild.GetNumChildren()
  for (let x = 1; x <= numChildren; x++) {
    hideControl(`TemperCrafting_BlueprintPanelScrollChildButton${x}`)
  }
}

export function getBlueprintChild(id: number): CsBlueprintButton {
  let btn = WM.GetControlByName<CsBlueprintButton>(
    `TemperCrafting_BlueprintPanelScrollChildButton${id}`
  )
  if (btn === undefined) {
    const created = asBlueprintButton(
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
      Tooltips.tooltip(created, true, false, TemperCrafting_Blueprint, "tl")
    })
    created.SetHandler("OnMouseExit", () => {
      Tooltips.tooltip(created, false)
    })
    created.SetHandler("OnMouseDown", (_self: unknown, button: number) => {
      blueprintMark(created, button)
    })
    btn = created
  } else {
    const [hasAnchor] = btn.GetAnchor(0)
    if (hasAnchor === false) {
      btn.SetAnchor(3, undefined, 3, 8, 5 + (id - 1) * 22)
    }
  }
  return btn
}

export function blueprintMark(control: CsBlueprintButton, button: number): undefined {
  const data = control.data
  if (data === undefined) {
    return
  }
  if (button === 2) {
    toChat(data.link)
  } else {
    const account = STATE.Account
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
    const recipe = defined(STATE.Furnisher.recipe[data.rec])
    control.SetText(`${mark}(${recipe.level}) ${recipe.name}`)
    zo_callLater(PlayerState.updateIngredientTracking, 500)
  }
}

export function blueprintShow(id: number, inc: number): number {
  const account = STATE.Account
  if (account === undefined) {
    return inc
  }
  const recipe = defined(STATE.Furnisher.recipe[id])
  let mark: string
  if (account.furnisher.ingredients[recipe.id] === true) {
    mark = "|t22:22:esoui/art/inventory/newitem_icon.dds|t "
  } else {
    mark = ""
  }
  let color: CsQualityColor
  if (recipe.known === true) {
    color = defined(QUALITY[recipe.quality])
  } else {
    color = { 1: 1, 2: 0, 3: 0, 4: 1 }
  }
  const control = getBlueprintChild(inc)
  control.SetNormalFontColor(color[1], color[2], color[3], color[4])
  control.SetText(`${mark}(${recipe.level}) ${recipe.name}`)
  control.SetHidden(false)
  control.data = {
    link: recipe.link,
    rec: id,
    id: recipe.id,
    buttons: [STATE.Loc.TT[5], STATE.Loc.TT[6]],
  }
  return inc + 1
}

export function blueprintShowCategory(list?: number): undefined {
  const character = STATE.Character
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
    hideControl(`TemperCrafting_BlueprintPanelScrollChildButton${x}`)
  }
  for (const [id, recipe] of pairs(STATE.Furnisher.recipe)) {
    if (recipe.stat === listIndex) {
      if (recipe.known === true) {
        known = known + 1
      }
      total = total + 1
      if (
        (character.hideKnownBlueprints !== true && recipe.known === true) ||
        (character.hideUnknownBlueprints !== true && recipe.known !== true)
      ) {
        inc = blueprintShow(id, inc)
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

export function blueprintSearch(): undefined {
  const character = STATE.Character
  if (character === undefined) {
    return
  }
  const search = TemperCrafting_BlueprintSearch.GetText()
  let inc = 1
  if (search !== "") {
    const numChildren = TemperCrafting_BlueprintPanelScrollChild.GetNumChildren()
    for (let x = 1; x <= numChildren; x++) {
      const control = getBlueprintChild(x)
      control.SetHidden(true)
      control.data = undefined
    }
    if (character.hideKnownBlueprints !== true || character.hideUnknownBlueprints !== true) {
      for (const [id, food] of pairs(STATE.Furnisher.recipe)) {
        const [found] = string.find(string.lower(food.name), string.lower(search))
        if (found !== undefined) {
          if (
            (character.hideKnownBlueprints !== true && character.hideUnknownBlueprints !== true) ||
            (character.hideUnknownBlueprints === true && food.known === true) ||
            (character.hideKnownBlueprints === true && food.known !== true)
          ) {
            if (inc > BLUEPRINT_LIMIT) {
              CHAT.Print(STATE.Loc.blueprintSearchLimit)
              break
            } else {
              inc = blueprintShow(id, inc)
            }
          }
        }
      }
    }
    TemperCrafting_BlueprintPanelScrollChild.SetHeight(inc * 22 - 13)
    TemperCrafting_BlueprintHeadline.SetText(STATE.Loc.searchfor)
    TemperCrafting_BlueprintInfo.SetText(`${search} (${inc - 1})`)
  }
}

export function blueprintLearned(list: number, id: number): undefined {
  const link: string | undefined = GetRecipeResultItemLink(list, id, LINK_STYLE_DEFAULT)
  if (link !== undefined) {
    for (const [, recipe] of pairs(STATE.Furnisher.recipe)) {
      if (recipe.result === link) {
        recipe.known = true
        break
      }
    }
  }
}
