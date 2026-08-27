import "./public-api"

import "./reagents"
import "./ingredient"
import "./potion"
import "./potion-craft"
import "./inventory"
import "./job-search"
import "./events"
import "./tooltips"
import "./search"
import "./render-page"
import "./controls"
import "./controls-layout"
import "./windows"
import "./main-menu"
import "./settings-menu"
import "./keybinds"

import {
  TEXTURE_POISON_DISABLED,
  TEXTURE_POISON_DOWN,
  TEXTURE_POISON_OVER,
  TEXTURE_POISON_UP,
} from "./constants"
import { enLanguage, registerStrings } from "./locale/ui-strings"
import { getPlayerSettings, initializeSavedVariables } from "./saved-variables"
import { PotMaker } from "./state"
import { LoadSolventSelection, SaveSolventSelection, ShowStationOrTopLevel } from "./window-helpers"

PotMaker.language = enLanguage

registerStrings()

export function initializeTemperPotions(this: void): undefined {
  const language = GetCVar("language.2") ?? "en"
  PotMaker.languageSupported = PotMaker.language.name === language

  PotMaker.ApplyLanguageSpecific()

  initializeSavedVariables()

  PotMaker.LAS = LibAlchemyStation
  PotMaker.LAS.Init()

  PotMaker.contentWindowPotion = PotMaker.LAS.AddTab({
    name: SI_BINDING_NAME_POTIONMAKER,
    descriptor: PotMaker.descriptorPotion,
    normal: "esoui/art/inventory/inventory_tabicon_consumables_up.dds",
    pressed: "esoui/art/inventory/inventory_tabicon_consumables_down.dds",
    highlight: "esoui/art/inventory/inventory_tabicon_consumables_over.dds",
    disabled: "esoui/art/inventory/inventory_tabicon_consumables_disabled.dds",
    callback: function (this: void): undefined {
      SaveSolventSelection()
      PotMaker.solventMode = ITEMTYPE_POTION_BASE
      ShowStationOrTopLevel()
      PotMaker.addStuffToInventory()
      PotMaker.searchAgain()
      getPlayerSettings().lastUsedTab = PotMaker.descriptorPotion
      LoadSolventSelection()
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
      SaveSolventSelection()
      PotMaker.solventMode = ITEMTYPE_POISON_BASE
      ShowStationOrTopLevel()
      PotMaker.addStuffToInventory()
      PotMaker.searchAgain()
      getPlayerSettings().lastUsedTab = PotMaker.descriptorPoison
      LoadSolventSelection()
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

  SLASH_COMMANDS["/temperpotions"] = ToggleTemperPotions

  globalThis.TemperHud?.registerCommand({
    name: "/temperpotions",
    description: "Alchemy potion-maker window",
    addon: "TemperCrafting",
  })
}

function ToggleTemperPotions(this: void): undefined {
  if (PotMaker.atAlchemyStation) {
    return
  }
  PotMaker.LMM2.SelectMenuItem(PotMaker.descriptorPotion)
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
