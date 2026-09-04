import { libAlchemyStation } from "../craft-libraries/craft-libraries.module.code.ts"

import {
  TEXTURE_POISON_DISABLED,
  TEXTURE_POISON_DOWN,
  TEXTURE_POISON_OVER,
  TEXTURE_POISON_UP,
} from "../potion-constants/potion-constants.module.code.ts"
import {
  getPlayerSettings,
  initializeSavedVariables,
} from "../potion-saved-variables/potion-saved-variables.module.code.ts"
import { PotMaker } from "../potion-state/potion-state.module.code.ts"
import { EN_LANGUAGE, registerStrings } from "../potion-ui-strings/potion-ui-strings.module.code.ts"
import {
  loadSolventSelection,
  saveSolventSelection,
  showStationOrTopLevel,
} from "../potion-window-helpers/potion-window-helpers.module.code.ts"
import "../potion-controls-layout/potion-controls-layout.module.code.ts"
import "../potion-controls/potion-controls.module.code.ts"
import "../potion-events/potion-events.module.code.ts"
import "../potion-ingredient/potion-ingredient.module.code.ts"
import "../potion-inventory/potion-inventory.module.code.ts"
import "../potion-job-search/potion-job-search.module.code.ts"
import "../potion-keybinds/potion-keybinds.module.code.ts"
import "../potion-main-menu/potion-main-menu.module.code.ts"
import "../potion-potion-craft/potion-potion-craft.module.code.ts"
import "../potion-potion/potion-potion.module.code.ts"
import "../potion-public-api/potion-public-api.module.code.ts"
import "../potion-reagents/potion-reagents.module.code.ts"
import "../potion-render-page/potion-render-page.module.code.ts"
import "../potion-search/potion-search.module.code.ts"
import "../potion-settings-menu/potion-settings-menu.module.code.ts"
import "../potion-tooltips/potion-tooltips.module.code.ts"
import "../potion-windows/potion-windows.module.code.ts"

PotMaker.language = EN_LANGUAGE

registerStrings()

export function initializeTemperPotions(this: void): undefined {
  const language = GetCVar("language.2") ?? "en"
  PotMaker.languageSupported = PotMaker.language.name === language

  PotMaker.ApplyLanguageSpecific()

  initializeSavedVariables()

  PotMaker.LAS = libAlchemyStation()
  PotMaker.LAS.Init()

  PotMaker.contentWindowPotion = PotMaker.LAS.AddTab({
    name: SI_BINDING_NAME_POTIONMAKER,
    descriptor: PotMaker.descriptorPotion,
    normal: "esoui/art/inventory/inventory_tabicon_consumables_up.dds",
    pressed: "esoui/art/inventory/inventory_tabicon_consumables_down.dds",
    highlight: "esoui/art/inventory/inventory_tabicon_consumables_over.dds",
    disabled: "esoui/art/inventory/inventory_tabicon_consumables_disabled.dds",
    callback: function (this: void): undefined {
      saveSolventSelection()
      PotMaker.solventMode = ITEMTYPE_POTION_BASE
      showStationOrTopLevel()
      PotMaker.addStuffToInventory()
      PotMaker.searchAgain()
      getPlayerSettings().lastUsedTab = PotMaker.descriptorPotion
      loadSolventSelection()
    },
  })

  PotMaker.contentWindowPoison = PotMaker.LAS.AddTab({
    name: SI_BINDING_NAME_POISONMAKER,
    descriptor: PotMaker.descriptorPoison,
    normal: TEXTURE_POISON_UP,
    pressed: TEXTURE_POISON_DOWN,
    highlight: TEXTURE_POISON_OVER,
    disabled: TEXTURE_POISON_DISABLED,
    callback: function (this: void): undefined {
      saveSolventSelection()
      PotMaker.solventMode = ITEMTYPE_POISON_BASE
      showStationOrTopLevel()
      PotMaker.addStuffToInventory()
      PotMaker.searchAgain()
      getPlayerSettings().lastUsedTab = PotMaker.descriptorPoison
      loadSolventSelection()
    },
  })

  PotMaker.initVar(language)
  PotMaker.initSettingsMenu()
  PotMaker.initMainMenu()

  EVENT_MANAGER.RegisterForEvent(
    PotMaker.name,
    EVENT_CRAFTING_STATION_INTERACT,
    PotMaker.interactWithAlchemyStation
  )

  SLASH_COMMANDS["/temperpotions"] = toggleTemperPotions

  globalThis.TemperHud?.registerCommand({
    name: "/temperpotions",
    description: "Alchemy potion-maker window",
    addon: "TemperCrafting",
  })
}

function toggleTemperPotions(this: void): undefined {
  if (PotMaker.atAlchemyStation) {
    return
  }
  ;(PotMaker.LMM2 as LibMainMenu2Lib | undefined)?.SelectMenuItem(PotMaker.descriptorPotion)
}

PotMaker.SelectPotionOfWrit = function (this: void): boolean {
  if (!PotMaker.atAlchemyStation) {
    return false
  }
  if (PotMaker.resultListShown) {
    PotMaker.searchAgain()
  }
  PotMaker.findWrits()
  return true
}
