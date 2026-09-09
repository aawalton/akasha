import * as Options from "../craft-options/craft-options.module.code.ts"
import * as ResearchGrid from "../craft-research-grid/craft-research-grid.module.code.ts"
import * as RuneCrafting from "../craft-rune-crafting/craft-rune-crafting.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"

import { runeShowMode } from "../rune-mode/rune-mode.module.code.ts"

const WM = WINDOW_MANAGER

interface RuneMenuButton extends Control {
  data: { level: number }
}

const splitWords = (s: string): string[] => {
  const words: string[] = []
  for (const [word] of string.gmatch(s, "[^ ]+")) {
    if (word !== undefined) {
      words.push(word)
    }
  }
  return words
}

export function panelInitialize(): undefined {
  const crafts = [
    CRAFTING_TYPE_BLACKSMITHING,
    CRAFTING_TYPE_CLOTHIER,
    CRAFTING_TYPE_WOODWORKING,
    CRAFTING_TYPE_JEWELRYCRAFTING,
  ]
  const researched: Record<number, Record<number, Record<number, boolean | number>>> = {}
  STATE.Data.crafting.researched[STATE.CurrentPlayer] = researched
  Options.setsSet()
  for (const [, craft] of ipairs(crafts)) {
    const craftResearched: Record<number, Record<number, boolean | number>> = {}
    researched[craft] = craftResearched
    let storedCraft = STATE.Account.crafting.stored[craft]
    if (storedCraft === undefined) {
      storedCraft = {}
      STATE.Account.crafting.stored[craft] = storedCraft
    }
    for (let line = 1; line <= GetNumSmithingResearchLines(craft); line++) {
      ResearchGrid.drawTraitColumn(craft, line)
      craftResearched[line] = {}
      let storedLine = storedCraft[line]
      if (storedLine === undefined) {
        storedLine = {}
        storedCraft[line] = storedLine
      }
      for (let trait = 1; trait <= STATE.MaxTraits; trait++) {
        if (storedLine[trait] === undefined) {
          storedLine[trait] = {}
        }
      }
    }
  }
  Options.styleInitialize()

  const split = (level: number): string => {
    const basename = zo_strformat("<<t:1>>", GetItemLinkName(RuneCrafting.runeGetLink(26580, 0, 0)))
    const basedata = splitWords(basename)
    const name = zo_strformat("<<t:1>>", GetItemLinkName(RuneCrafting.runeGetLink(26580, 3, level)))
    const namedata = splitWords(name)
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
  for (const [x, level] of pairs(STATE.Rune.level)) {
    const name = split(x)
    const btn: TemperCraftingButton = WM.CreateControl(
      `TemperCrafting_RuneMenuButton${x}`,
      TemperCrafting_RuneMenu,
      CT_BUTTON
    )
    btn.SetAnchor(3, undefined, 3, 8, 5 + (x - 1) * 24)
    btn.SetDimensions(240, 24)
    btn.SetFont("ZoFontGame")
    btn.SetClickSound("Click")
    btn.SetNormalFontColor(0.9, 0.87, 0.68, 1)
    btn.SetMouseOverFontColor(1, 0.66, 0.2, 1)
    btn.SetHorizontalAlignment(0)
    btn.SetVerticalAlignment(1)
    btn.SetText(`${name} |c888888(${level})|r`)
    btn.data = { level: x }
    btn.SetHandler("OnClicked", (self: RuneMenuButton) => {
      RuneCrafting.runeSetValue(3, self.data.level)
      TemperCrafting_RuneLevelButton.SetText(
        `${STATE.Loc.level}: ${STATE.Rune.level[self.data.level]}`
      )
      TemperCrafting_RuneMenu.SetHidden(true)
      runeShowMode()
    })
  }
  TemperCrafting_SetPanelScrollChild.SetHeight(luaLength(STATE.Sets) * 22 + 10)
  TemperCrafting_Panel.SetAnchor(
    TOPLEFT,
    GuiRoot,
    TOPLEFT,
    STATE.Account.position[1],
    STATE.Account.position[2]
  )
  TemperCrafting_Quest.SetAnchor(
    TOPLEFT,
    TemperCrafting_QuestFrame,
    TOPLEFT,
    STATE.Account.questbox[1],
    STATE.Account.questbox[2]
  )
  TemperCrafting_ButtonFrameButtonBG.SetAnchor(
    TOPLEFT,
    TemperCrafting_ButtonFrame,
    TOPLEFT,
    STATE.Account.button[1],
    STATE.Account.button[2]
  )
  TemperCrafting_PanelButtonCraftedSets.SetText(STATE.Loc.set)
  TemperCrafting_CharacterPanelHeader.SetText(STATE.Loc.chars)

  TemperCrafting_Style_Window.SetAnchor(
    TOPLEFT,
    GuiRoot,
    TOPLEFT,
    STATE.Account.coords.style[1],
    STATE.Account.coords.style[2]
  )
  TemperCrafting_Recipe_Window.SetAnchor(
    TOPLEFT,
    GuiRoot,
    TOPLEFT,
    STATE.Account.coords.recipe[1],
    STATE.Account.coords.recipe[2]
  )
  TemperCrafting_Blueprint_Window.SetAnchor(
    TOPLEFT,
    GuiRoot,
    TOPLEFT,
    STATE.Account.coords.blueprint[1],
    STATE.Account.coords.blueprint[2]
  )
  TemperCrafting_Rune.SetAnchor(
    TOPLEFT,
    GuiRoot,
    TOPLEFT,
    STATE.Account.coords.rune[1],
    STATE.Account.coords.rune[2]
  )
  TemperCrafting_Cook.SetAnchor(
    TOPLEFT,
    GuiRoot,
    TOPLEFT,
    STATE.Account.coords.cook[1],
    STATE.Account.coords.cook[2]
  )
  TemperCrafting_CharacterPanel.SetAnchor(
    TOPLEFT,
    GuiRoot,
    TOPLEFT,
    STATE.Account.coords.overview[1],
    STATE.Account.coords.overview[2]
  )

  if (STATE.Account.mainchar !== false) {
    TemperCrafting_PanelButtonCharacters.SetText(STATE.Account.mainchar)
  } else {
    TemperCrafting_PanelButtonCharacters.SetText(STATE.CurrentPlayer)
  }
  TemperCrafting_RuneInfo.SetText(GetString(SI_CRAFTING_PERFORM_FREE_CRAFT))
  TemperCrafting_RuneLevelButton.SetText(
    `${STATE.Loc.level}: ${STATE.Rune.level[STATE.Character.potency]}`
  )
  Options.optionSet()
  let control: TemperCraftingControl | undefined
  for (let x = 1; x <= 16; x++) {
    const [listName] = GetRecipeListInfo(x)
    control = WM.GetControlByName(`TemperCrafting_CookCategoryButton${x}`)
    if (control !== undefined) {
      control.data = {
        info: zo_strformat("|cFFFFFF<<C:1>>|r\n<<2>>", listName, STATE.Cook.category[x]),
      }
    }
    control = WM.GetControlByName(`TemperCrafting_RecipeCategoryButton${x}`)
    if (control !== undefined) {
      control.data = {
        info: zo_strformat("|cFFFFFF<<C:1>>|r\n<<2>>", listName, STATE.Cook.category[x]),
      }
    }
  }
  TemperCrafting_PanelQuestButton.data = undefined
  for (let line = 1; line <= 2; line++) {
    for (let trait = 1; trait <= STATE.MaxTraits; trait++) {
      const [tid] = GetSmithingResearchLineTraitInfo(1, math.abs(line - 9), trait)
      const [, desc] = GetSmithingResearchLineTraitInfo(1, math.abs(line - 9), trait)
      const [, name, icon] = GetSmithingTraitItemInfo(tid + 1)
      control = WM.GetControlByName(`TemperCrafting_PanelTraitrow${trait + (line - 1) * 9}`)
      if (control !== undefined) {
        ;(control as LabelControl).SetText(
          `${GetString("SI_ITEMTRAITTYPE", tid)} |t25:25:${icon}|t|t5:25:x.dds|t`
        )
        control.data = { info: `${zo_strformat("|cFFFFFF<<C:1>>", name)}|r\n${desc}` }
      }
    }
  }
  for (let trait = 1; trait <= STATE.JewelryMaxTraits; trait++) {
    const [tid] = GetSmithingResearchLineTraitInfo(7, 1, trait)
    const [, desc] = GetSmithingResearchLineTraitInfo(7, 1, trait)
    const [, name, icon] = GetSmithingTraitItemInfo(tid + 1)
    control = WM.GetControlByName(`TemperCrafting_PanelTraitrow${18 + trait}`)
    if (control !== undefined) {
      ;(control as LabelControl).SetText(
        `${GetString("SI_ITEMTRAITTYPE", tid)} |t25:25:${icon}|t|t5:25:x.dds|t`
      )
      control.data = { info: `${zo_strformat("|cFFFFFF<<C:1>>", name)}|r\n${desc}` }
    }
  }
  TemperCrafting_PanelFenceGoldText.data = { info: STATE.Loc.TT[15] }
  TemperCrafting_ButtonFrameButton.data = { info: "Temper Crafting" }
  TemperCrafting_RuneArmorButton.data = { info: GetString("SI_ITEMTYPE", ITEMTYPE_GLYPH_ARMOR) }
  TemperCrafting_RuneWeaponButton.data = { info: GetString("SI_ITEMTYPE", ITEMTYPE_GLYPH_WEAPON) }
  TemperCrafting_RuneJewelryButton.data = {
    info: GetString("SI_ITEMTYPE", ITEMTYPE_GLYPH_JEWELRY),
  }
  TemperCrafting_RuneSpaceButton.data = { info: GetString(SI_GAMEPAD_MAIL_INBOX_INVENTORY) }
  TemperCrafting_RuneCreateButton.data = { info: GetString(SI_ENCHANTING_CREATION) }
  TemperCrafting_RuneRefineButton.data = { info: GetString(SI_ENCHANTING_EXTRACTION) }
  TemperCrafting_RuneFavoriteButton.data = { info: STATE.Loc.TT[10] }
  TemperCrafting_RuneWritButton.data = { info: STATE.Loc.TT[22] }
  TemperCrafting_RuneFurnitureButton.data = { info: STATE.Loc.TT[23] }
  TemperCrafting_RuneFavoriteFurnitureButton.data = {
    info: `${STATE.Loc.TT[23]} ${STATE.Loc.TT[10]}`,
  }
  TemperCrafting_RuneRefineAllButton.data = {
    info: STATE.Loc.TT[21],
    addline: [STATE.Loc.TT[8]],
  }
  TemperCrafting_RuneHandmadeButton.data = { info: STATE.Loc.TT[11] }
  TemperCrafting_CookSpaceButton.data = { info: GetString(SI_GAMEPAD_MAIL_INBOX_INVENTORY) }
  TemperCrafting_CookCategoryButtonFavorites.data = { info: STATE.Loc.TT[10] }
  TemperCrafting_CookCategoryButtonWrit.data = { info: STATE.Loc.TT[22] }
  TemperCrafting_CookCategoryButtonFurniture.data = { info: STATE.Loc.TT[23] }
  TemperCrafting_CookCategoryButtonFurnitureFavorites.data = {
    info: `${STATE.Loc.TT[23]} ${STATE.Loc.TT[10]}`,
  }
  TemperCrafting_CookCategoryButtonFillet.data = { info: STATE.Loc.TT[34] }
  TemperCrafting_BlueprintCategoryButton1.data = { info: GetString(SI_RECIPECRAFTINGSYSTEM1) }
  TemperCrafting_BlueprintCategoryButton2.data = { info: GetString(SI_RECIPECRAFTINGSYSTEM2) }
  TemperCrafting_BlueprintCategoryButton3.data = { info: GetString(SI_RECIPECRAFTINGSYSTEM3) }
  TemperCrafting_BlueprintCategoryButton4.data = { info: GetString(SI_RECIPECRAFTINGSYSTEM4) }
  TemperCrafting_BlueprintCategoryButton5.data = { info: GetString(SI_RECIPECRAFTINGSYSTEM5) }
  TemperCrafting_BlueprintCategoryButton6.data = { info: GetString(SI_RECIPECRAFTINGSYSTEM6) }
  TemperCrafting_BlueprintCategoryButton7.data = { info: GetString(SI_RECIPECRAFTINGSYSTEM7) }
  for (let x = 1; x <= 5; x++) {
    const aspectButton = WM.GetControlByName<TemperCraftingControl>(
      `TemperCrafting_RuneAspect${x}Button`
    )
    if (aspectButton !== undefined) {
      const aspectId = STATE.Rune.rune[ITEMTYPE_ENCHANTING_RUNE_ASPECT]?.[x]
      if (typeof aspectId !== "number") {
        error(`TemperCrafting: missing aspect rune id ${x}`)
      }
      aspectButton.data = { link: RuneCrafting.runeGetLink(aspectId, x, 1) }
    }
  }
}

export function inventorySpace(control: TemperCraftingControl): undefined {
  ;(control as LabelControl).SetText(
    `${GetNumBagUsedSlots(BAG_BACKPACK)}/${GetBagSize(BAG_BACKPACK)}`
  )
  if (GetBagSize(BAG_BACKPACK) === GetNumBagUsedSlots(BAG_BACKPACK)) {
    ;(control as TextureControl).SetColor(1, 0, 0, 1)
  } else if (GetBagSize(BAG_BACKPACK) - GetNumBagUsedSlots(BAG_BACKPACK) <= 5) {
    ;(control as TextureControl).SetColor(1, 0.9, 0, 1)
  } else {
    ;(control as TextureControl).SetColor(1, 1, 1, 1)
  }
}
