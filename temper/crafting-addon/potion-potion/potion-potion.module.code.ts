import { asNumber, asString, asZoColorDef } from "../potion-casts/potion-casts.module.code.ts"
import type { TraitEffect } from "../potion-constants/potion-constants.module.code.ts"
import {
  COLOR_DISABLED,
  COLOR_SELECT,
  TRAIT_EFFECT,
} from "../potion-constants/potion-constants.module.code.ts"
import { getPlayerSettings } from "../potion-saved-variables/potion-saved-variables.module.code.ts"
import { PotMaker } from "../potion-state/potion-state.module.code.ts"
import {
  addLineCenter,
  addLineSubTitle,
  addLineTitle,
  isScreenRightHalf,
} from "../potion-tooltip-helpers/potion-tooltip-helpers.module.code.ts"
import type { Potion, PotionFactory } from "../potion-types/potion-types.module.code.ts"

interface PotionButton extends Control {
  potion: Potion
}

interface FontControl {
  SetFont: (this: void, font: string) => undefined
}
type FavoriteFilter = (this: void, potion: Potion) => unknown
type ConditionData = Record<string, QuestConditionRow>

function asPotion(value: unknown): Potion {
  return value as Potion
}
function asPotionButton(value: unknown): PotionButton {
  return value as PotionButton
}
function asFontControl(value: unknown): FontControl {
  return value as FontControl
}
function asFavoriteFilter(value: unknown): FavoriteFilter {
  return value as FavoriteFilter
}
function asTraitEffect(value: unknown): TraitEffect {
  return value as TraitEffect
}
function asConditionData(value: unknown): ConditionData {
  return value as ConditionData
}

function newPotion(this: void, o: Partial<Potion>): Potion {
  const instance = asPotion(o)
  const solvent = instance.solvent
  if (solvent !== undefined && solvent.name !== "") {
    const pack1 = instance.ingredients[0]?.pack[0]
    const pack2 = instance.ingredients[1]?.pack[0]
    const solventPack = solvent.pack[0]
    if (pack1 !== undefined && pack2 !== undefined && solventPack !== undefined) {
      const third = instance.ingredients[2]
      const pack3 = third?.pack[0]
      const usePack3 = third !== undefined && pack3 !== undefined
      const [link] = GetAlchemyResultingItemLink(
        solventPack.bagId,
        solventPack.slotIndex,
        pack1.bagId,
        pack1.slotIndex,
        pack2.bagId,
        pack2.slotIndex,
        usePack3 ? pack3.bagId : undefined,
        usePack3 ? pack3.slotIndex : undefined,
        LINK_STYLE_DEFAULT
      )
      instance.itemLink = link
    }
  } else {
    instance.searchName = ""
    instance.name = ""
    instance.itemLink = ""
    instance.solvent = undefined
  }
  instance.numTraits = NonContiguousCount(instance.traits)
  return instance
}

function getQualityColor(this: void, self: Potion): string | ZoColorDef {
  if (self.qualityColor !== "") {
    return self.qualityColor
  }
  self.qualityColor = GetItemQualityColor(GetItemLinkFunctionalQuality(self.itemLink))
  return self.qualityColor
}

function getName(this: void, self: Potion): string {
  if (self.name !== "") {
    return self.name
  }
  self.name = GetItemLinkName(self.itemLink)
  return self.name
}

function getUpperName(this: void, self: Potion): string {
  if (self.upperName !== "") {
    return self.upperName
  }
  self.upperName = string.upper(getName(self))
  return self.upperName
}

function parseLinkNumber(this: void, raw: string | undefined): number | undefined {
  return tonumber(raw)
}
function parseLinkPart(this: void, raw: string | undefined): string {
  return raw ?? ""
}

function matchesQuest(this: void, self: Potion): boolean {
  const quests = PotMaker.quests
  if (quests === undefined || quests.length === 0) {
    return false
  }

  let itemId: number | undefined
  let traits: number | undefined
  for (let i = 0; i < quests.length; i = i + 1) {
    const quest = quests[i]
    if (quest === undefined) {
      continue
    }
    const questIndex = asNumber(quest.questIndex)
    const rawConditionData = quest.conditionData
    const conditionData =
      rawConditionData === undefined ? undefined : asConditionData(rawConditionData)
    if (conditionData === undefined) {
      continue
    }
    for (const key in conditionData) {
      const condition = conditionData[key]
      if (condition === undefined) {
        continue
      }
      if (condition.isMasterWrit === true) {
        const solvent = self.solvent
        if (solvent === undefined) {
          continue
        }
        for (const pack of solvent.pack) {
          if (pack === undefined) {
            continue
          }
          if (
            IsAlchemySolventForItemAndMaterialId(
              pack.bagId,
              pack.slotIndex,
              condition.itemId,
              condition.materialItemId
            )
          ) {
            if (itemId === undefined) {
              const [matchedItemId, matchedTraits] = string.match(
                self.itemLink,
                "^|H[^:]+:item:([^:]+):[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:([^|]+)|h"
              )
              itemId = parseLinkNumber(matchedItemId)
              traits = parseLinkNumber(matchedTraits)
            }
            if (condition.itemId === itemId && condition.encodedAlchemyTraits === traits) {
              return true
            }
          }
        }
      } else {
        if (
          DoesItemLinkFulfillJournalQuestCondition(
            self.itemLink,
            questIndex,
            1,
            condition.conditionIndex,
            true
          )
        ) {
          return true
        }
      }
    }
  }
  return false
}

interface QuestConditionRow {
  isMasterWrit?: boolean
  itemId: number
  materialItemId: number
  encodedAlchemyTraits: number
  conditionIndex: number
}

function setFont(this: void, control: Control, font: string): undefined {
  asFontControl(control).SetFont(font)
}

function applyLanguageSpecific(this: void): undefined {
  if (PotMaker.language.name === "jp") {
    const fontCommonSettings = "$(CHAT_FONT)|16|soft-shadow-thin"
    setFont(TemperPotionsSearchButton, fontCommonSettings)
    setFont(TemperPotionsOutputCombinationLabel, fontCommonSettings)
    setFont(TemperPotionsOutputTraitLabel, fontCommonSettings)
    setFont(TemperPotionsOutputSearchButton, fontCommonSettings)
    setFont(TemperPotionsTraitLabel1, fontCommonSettings)
    setFont(TemperPotionsTraitLabel2, fontCommonSettings)
    setFont(TemperPotionsSolventLabel, fontCommonSettings)
    setFont(TemperPotionsReagentLabel, fontCommonSettings)
    setFont(TemperPotionsOnlyReagentText, fontCommonSettings)
    setFont(TemperPotionsOnly2Text, fontCommonSettings)
    setFont(TemperPotionsQuestWrits, fontCommonSettings)
    setFont(TemperPotionsFavorites, fontCommonSettings)
    setFont(TemperPotionsOutputFavorite, fontCommonSettings)
    setFont(TemperPotionsOutputPageLabel, fontCommonSettings)
  }
}

const MUST_HAVES: Record<string, boolean> = {}

function conformsToSearch(
  this: void,
  self: Potion,
  searchTerms: Record<string, TraitEffect>
): boolean {
  const playerSettings = getPlayerSettings()
  if (
    self.solvent !== undefined &&
    self.itemLink === "" &&
    !(playerSettings.useUnknown || playerSettings.useMissing)
  ) {
    return false
  }

  if (PotMaker.questPotionsOnly) {
    if (self.itemLink === "") {
      return false
    }
    if (!matchesQuest(self)) {
      return false
    }
  }

  if (PotMaker.favoritesOnly) {
    createFavoriteIdentifier(self)
    const favoriteFilter = PotMaker.favoriteFilter
    if (favoriteFilter === undefined) {
      return false
    }
    const filterFn = asFavoriteFilter(favoriteFilter)
    if (filterFn(self) === undefined || filterFn(self) === false) {
      return false
    }
  }

  const terms = searchTerms
  const [firstTermKey] = next(terms)
  const searchTermsExist = firstTermKey !== undefined
  let unknownTrait = false
  ZO_ClearTable(MUST_HAVES)

  const useUnknown = playerSettings.useUnknown
  if (searchTermsExist || useUnknown) {
    for (const traitName in self.traits) {
      if (terms[traitName] === asTraitEffect(false)) {
        return false
      }
      if (useUnknown) {
        for (let j = 0; j < self.ingredients.length; j = j + 1) {
          const ingredient = self.ingredients[j]
          if (ingredient !== undefined && ingredient.traits[traitName] === TRAIT_EFFECT.None) {
            unknownTrait = true
            break
          }
        }
      }
      if (terms[traitName] === asTraitEffect(true)) {
        MUST_HAVES[traitName] = true
      }
    }
    for (const k in terms) {
      const v = terms[k]
      if (v !== undefined && v !== asTraitEffect(false) && MUST_HAVES[k] === undefined) {
        return false
      }
    }
  }
  if (!(useUnknown && playerSettings.training) || (useUnknown && unknownTrait)) {
    return true
  }
  return self.solvent === undefined
}

const FAV_INGREDIENTS: (number | undefined)[] = [0, 0, 0]

function createFavoriteIdentifier(this: void, self: Potion): undefined {
  if (typeof self.itemId === "string" && self.itemId !== "") {
    return
  }

  const [matchedItem1, matchedItem3, matchedItem2] = string.match(
    self.itemLink,
    "^|H[^:]+:item:([^:]+):[^:]+:([^:]+):[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:([^|]+)|h"
  )
  let item1 = parseLinkPart(matchedItem1)
  let item3 = parseLinkPart(matchedItem3)
  let item2 = parseLinkPart(matchedItem2)
  if (matchedItem1 === undefined) {
    item1 = ""
    item2 = ""
    item3 = ""
  }
  let index = 0
  FAV_INGREDIENTS[2] = undefined
  for (const ingredient of self.ingredients) {
    if (ingredient !== undefined) {
      FAV_INGREDIENTS[index] = ingredient.itemId
      index = index + 1
    }
  }
  table.sort(FAV_INGREDIENTS)
  self.sameTraitsId = `${item1}_${item2}`
  self.samePotionId = `${self.sameTraitsId}_${item3}`
  const a = FAV_INGREDIENTS[0] ?? 0
  const b = FAV_INGREDIENTS[1] ?? 0
  const c = FAV_INGREDIENTS[2]
  self.itemId =
    index === 3 && c !== undefined
      ? `${self.samePotionId}_${a}_${b}_${c}`
      : `${self.samePotionId}_${a}_${b}`
}

function getPotion(this: void, resultButton: Control): Potion {
  return asPotionButton(resultButton).potion
}

function showPotion(this: void, resultButton: Control): undefined {
  const potion = getPotion(resultButton)
  PotMaker.AddToCraftTable(potion)
  PotMaker.SetSelected(potion)
}

function getIngredientString(this: void, self: Potion): string {
  return zo_strformat(
    "<<1>> (<<2>>)",
    getPotionNameString(self),
    COLOR_SELECT.Colorize(tostring(self.quantity))
  )
}

function getInBagString(this: void, self: Potion): string {
  let inBag = ""
  if (self.itemLink !== "") {
    const [bagCount, bankCount] = GetItemLinkStacks(self.itemLink)
    if (bankCount > 0) {
      inBag = "|t28:28:esoui/art/icons/servicemappins/servicepin_bank.dds:inheritColor|t"
    } else if (bagCount > 0) {
      inBag =
        "|t28:28:esoui/art/crafting/crafting_provisioner_inventorycolumn_icon.dds:inheritColor|t"
    }
  }
  return inBag
}

const UNKNOWN_RESULT: Record<number, string> = {
  [ITEMTYPE_POTION_BASE]: zo_strformat(
    SI_ALCHEMY_UNKNOWN_RESULT,
    GetString(SI_ITEM_FORMAT_STR_POTION)
  ),
  [ITEMTYPE_POISON_BASE]: zo_strformat(
    SI_ALCHEMY_UNKNOWN_RESULT,
    GetString(SI_ITEM_FORMAT_STR_POISON)
  ),
}

function getPotionNameString(this: void, self: Potion): string {
  if (self.solvent === undefined) {
    return COLOR_DISABLED.Colorize(zo_strformat("(<<1>>)", PotMaker.language.need_solvent))
  } else if (self.itemLink === "") {
    return UNKNOWN_RESULT[PotMaker.solventMode] ?? asString(UNKNOWN_RESULT[ITEMTYPE_POTION_BASE])
  } else {
    const color = getQualityColor(self)
    const colorDef = asZoColorDef(color)
    return colorDef.Colorize(zo_strformat(SI_TOOLTIP_ITEM_NAME, getName(self)))
  }
}

function setToolTip(this: void, self: Potion, resultButton: Control): undefined {
  if (self.name === "") {
    if (isScreenRightHalf(resultButton)) {
      InitializeTooltip(InformationTooltip, resultButton, RIGHT, -32, 0, LFFT)
    } else {
      InitializeTooltip(InformationTooltip, resultButton, LEFT, 32, 0, RIGHT)
    }
    InformationTooltip.ClearLines()
    const potion = asPotionButton(resultButton).potion
    addLineTitle(InformationTooltip, getPotionNameString(potion))
    InformationTooltip.AddVerticalPadding(-9)
    ZO_Tooltip_AddDivider(InformationTooltip)

    addLineSubTitle(InformationTooltip, GetString(SI_PROVISIONER_INGREDIENTS_HEADER))
    const color = GetItemQualityColor(2)
    for (let i = 0; i < potion.ingredients.length; i = i + 1) {
      const ingredient = potion.ingredients[i]
      if (ingredient === undefined) {
        continue
      }
      const amount = ingredient.stack
      addLineCenter(
        InformationTooltip,
        zo_strformat(
          "<<1>> (<<2>>)",
          color.Colorize(zo_strformat(SI_TOOLTIP_ITEM_NAME, ingredient.name)),
          amount
        )
      )
    }
    addLineSubTitle(InformationTooltip, GetString(SI_CRAFTING_COMPONENT_TOOLTIP_TRAITS))
    for (const v in potion.traits) {
      const effect = potion.traits[v]
      if (effect !== undefined) {
        const traitColor = PotMaker.traitColor[effect]
        if (traitColor !== undefined) {
          addLineCenter(InformationTooltip, traitColor.Colorize(v))
        }
      }
    }
  } else {
    if (isScreenRightHalf(resultButton)) {
      InitializeTooltip(ItemTooltip, resultButton, RIGHT, -32, 0, LEFT)
    } else {
      InitializeTooltip(ItemTooltip, resultButton, LEFT, 32, 0, RIGHT)
    }
    ItemTooltip.SetLink(self.itemLink)
  }
}

const POTION_FACTORY: PotionFactory = {
  new: newPotion,
  get: getPotion,
  show: showPotion,
  GetQualityColor: getQualityColor,
  GetName: getName,
  GetUpperName: getUpperName,
  MatchesQuest: matchesQuest,
  conformsToSearch,
  createFavoriteIdentifier,
  getIngredientString,
  getInBagString,
  getPotionNameString,
  SetToolTip: setToolTip,
}

PotMaker.Potion = POTION_FACTORY
PotMaker.ApplyLanguageSpecific = applyLanguageSpecific
