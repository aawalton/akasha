import { state } from "../state"
import * as BlueprintFurnisher from "./blueprint-furnisher"
import * as Knowledge from "./knowledge"
import * as Options from "./options"
import * as PlayerState from "./player-state"
import * as RecipeCooking from "./recipe-cooking"
import * as Research from "./research"
import * as ResearchGrid from "./research-grid"
import * as RuneViews from "./rune-views"
import * as StyleTracking from "./style-tracking"
import * as Utilities from "./utilities"


const WM = WINDOW_MANAGER
const SM = SCENE_MANAGER

function parseLuaCapture(captured: string | undefined): string | undefined {
  return captured
}

export function UpdateScreen(): undefined {
  const SetPoint = (x: number): string => {
    const [leftRaw, numRaw, rightRaw] = string.match(tostring(x), "^([^%d]*%d)(%d*)(,-)$")
    const left = parseLuaCapture(leftRaw)
    const num = parseLuaCapture(numRaw)
    const right = parseLuaCapture(rightRaw)
    if (left === undefined || num === undefined || right === undefined) {
      return tostring(x)
    }
    const [grouped] = string.gsub(
      string.reverse(num),
      "(%d%d%d)",
      `%1${GetCVar("language.2") === "en" ? "," : "."}`
    )
    return `${left}${string.reverse(grouped)}${right}`
  }
  for (const [craft] of pairs(state.Data.crafting.researched[state.SelectedPlayer] ?? {})) {
    for (let line = 1; line <= GetNumSmithingResearchLines(craft); line++) {
      for (let trait = 1; trait <= state.MaxTraits; trait++) {
        ResearchGrid.UpdatePanelIcon(craft, line, trait)
      }
    }
  }
  for (const [, recipe] of pairs(state.Cook.recipe)) {
    recipe.known = Knowledge.IsItemKnownByLink(state.SelectedPlayer, recipe.link)
  }
  for (const [, recipe] of pairs(state.Furnisher.recipe)) {
    recipe.known = Knowledge.IsItemKnownByLink(state.SelectedPlayer, recipe.link)
  }
  Research.UpdateAllStudies()
  Research.UpdateResearchWindows()
  StyleTracking.UpdateStyleKnowledge()
  const [fmax, fused] = GetFenceSellTransactionInfo()
  TemperCrafting_PanelButtonCharacters.SetText(state.SelectedPlayer)
  const incomeBase =
    state.Character.income[2] ?? error("TemperCrafting: missing login gold baseline")
  TemperCrafting_PanelFenceGoldText.SetText(
    `|cC5C29E${fused}/${fmax} |r  ${SetPoint(
      GetCurrentMoney() - incomeBase
    )} |t14:14:esoui/art/currency/currency_gold.dds|t`
  )
}

export function UpdateIcons(): undefined {
  const icons = [8, 5, 9, 12, 7, 3, 2, 1, 14, 10, 6, 13, 4, 11]
  const Style = state.Style ?? error("TemperCrafting: style API not initialized")
  for (const [id, data] of ipairs(state.styleNames)) {
    const style = GetValidItemStyleId(data.id)
    if (Style.CheckStyle(style)) {
      let [icon] = Style.GetHeadline(style)
      for (const [, y] of ipairs(icons)) {
        ;[icon] = Style.GetIconAndLink(style, y)
        const tex = WM.GetControlByName<TextureControl>(
          `TemperCrafting_StylePanelScrollChild${id}Button${y}Texture`
        )
        tex?.SetTexture(icon)
      }
    }
  }
}

export function InitPreviews(): undefined {
  const previews = [
    state.Loc.previewType[0],
    state.Loc.previewType[1],
    state.Loc.previewType[2],
    state.Loc.previewType[3],
  ]
  const Style = state.Style ?? error("TemperCrafting: style API not initialized")
  const combo = TemperCrafting_StylePreviewType
  const _selected = combo.name
  const dropdown = combo.dropdown

  if (state.Character.previewType === undefined || state.Character.previewType === false) {
    state.Character.previewType = 1
  }

  const previewType = state.Character.previewType
  if (typeof previewType !== "number") {
    error("TemperCrafting: preview type not initialized")
  }
  dropdown.SetSelectedItem(
    state.Loc.previewType[previewType - 1] ?? error("TemperCrafting: unknown preview type")
  )

  const OnItemSelect = (_: unknown, choiceText: string, _choice: ComboBoxItem): undefined => {
    state.Character.previewType = state.previewType[choiceText]
    Style.UpdatePreview(state.previewType[choiceText])
    UpdateIcons()
  }

  for (const preview of previews) {
    const entry = dropdown.CreateItemEntry(preview, OnItemSelect)
    dropdown.AddItem(entry)
  }
}

export function ControlCloseAll(preview?: boolean): undefined {
  TemperCrafting_CharacterPanel.SetHidden(true)
  RecipeCooking.CloseRecipeWindow()
  TemperCrafting_Style_Window.SetHidden(true)
  TemperCrafting_SetPanel.SetHidden(true)
  if (preview === undefined || preview === false) {
    BlueprintFurnisher.CloseBlueprintWindow()
  }
  SM.HideTopLevel(TemperCrafting_Panel)
  RuneViews.RuneView(2)
}

export function ControlShow(scene: Control): undefined {
  const closed = scene.IsHidden()
  TemperCrafting_CharacterPanel.SetHidden(true)
  RecipeCooking.CloseRecipeWindow()
  BlueprintFurnisher.CloseBlueprintWindow()
  TemperCrafting_Style_Window.SetHidden(true)
  TemperCrafting_SetPanel.SetHidden(true)
  if (ZO_EnchantingTopLevel.IsHidden()) {
    TemperCrafting_Rune.SetHidden(true)
  }
  if (scene === TemperCrafting_SetPanel) {
    Options.SetsSet()
  }
  if (closed) {
    scene.SetHidden(false)
    if (scene.GetType() === CT_TOPLEVELCONTROL) {
      scene.BringWindowToTop()
    }
  }
}

export function ShowMain(): undefined {
  SM.ToggleTopLevel(TemperCrafting_Panel)
  if (!TemperCrafting_Panel.IsHidden()) {
    Utilities.GetQuest()
    let questText = ""
    for (const [, quest] of pairs(state.Quest)) {
      if (questText !== "") {
        questText = `${questText}\n\n`
      }
      questText = `${questText}${quest.name}`
      for (const [, step] of pairs(quest.work)) {
        questText = `${questText}\n${step}`
      }
    }
    if (questText !== "") {
      TemperCrafting_PanelQuestButton.data = { info: questText }
    } else {
      TemperCrafting_PanelQuestButton.data = undefined
    }
    if (state.Account.mainchar !== false) {
      state.SelectedPlayer = state.Account.mainchar
    }
    PlayerState.UpdatePlayer()
    UpdateScreen()
    const timer12 = state.Account.timer[12] ?? error("TemperCrafting: missing 12h alarm timer")
    const timer24 = state.Account.timer[24] ?? error("TemperCrafting: missing 24h alarm timer")
    if (timer12 > 0) {
      TemperCrafting_Panel12Hours.SetText(Utilities.GetTime(timer12 - GetTimeStamp()))
    } else {
      TemperCrafting_Panel12Hours.SetText("12:00h")
    }
    if (timer24 > 0) {
      TemperCrafting_Panel24Hours.SetText(Utilities.GetTime(timer24 - GetTimeStamp()))
    } else {
      TemperCrafting_Panel24Hours.SetText("24:00h")
    }
  }
}
