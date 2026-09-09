import { libAsync } from "../craft-libraries/craft-libraries.module.code.ts"
import { asString } from "../potion-casts/potion-casts.module.code.ts"
import type { TraitEffect } from "../potion-constants/potion-constants.module.code.ts"
import { PAGE_SIZE } from "../potion-constants/potion-constants.module.code.ts"
import {
  getAccountSettings,
  getSavedFavorites,
} from "../potion-saved-variables/potion-saved-variables.module.code.ts"
import { PotMaker } from "../potion-state/potion-state.module.code.ts"
import type { Ingredient, Potion, Quest } from "../potion-types/potion-types.module.code.ts"

interface TraitControlView {
  trait: { name: string }
}
interface SolventControlView {
  solvent: Ingredient
}
interface ReagentControlView {
  reagent: Ingredient
}

interface AsyncTaskWithDelay {
  Delay: (this: void, ms: number, fn: (this: void) => undefined) => undefined
}

interface CraftAdvisorQuestCondition {
  craftingType: number
  conditionIndex: number
  isMasterWrit: boolean
}
interface CraftAdvisorQuest {
  questType: number
  questIndex: number
  conditionData: Record<string, CraftAdvisorQuestCondition>
}
interface CraftAdvisorManager {
  questMasterList: Record<string, CraftAdvisorQuest>
  selectedMasterListIndex: string
  RefreshQuestMasterList: (this: void) => undefined
  HasActiveWrits: (this: void) => boolean
}
function asCraftAdvisorManager(value: unknown): CraftAdvisorManager {
  return value as CraftAdvisorManager
}

function asTraitControlView(value: unknown): TraitControlView {
  return value as TraitControlView
}

function asSolventControlView(value: unknown): SolventControlView {
  return value as SolventControlView
}

function asReagentControlView(value: unknown): ReagentControlView {
  return value as ReagentControlView
}

function asAsyncTaskWithDelay(value: unknown): AsyncTaskWithDelay {
  return value as AsyncTaskWithDelay
}

function asQuest(value: unknown): Quest {
  return value as Quest
}

type TraitFilter = Record<string, TraitEffect>

function asTraitFilter(value: unknown): TraitFilter {
  return value as TraitFilter
}

function asIngredient(value: unknown): Ingredient {
  return value as Ingredient
}

const craftAdvisor = asCraftAdvisorManager(CRAFT_ADVISOR_MANAGER)

const plainStrFind: (this: void, haystack: string, needle: string) => boolean = zo_plainstrfind

function previous(this: void): undefined {
  PotMaker.resultsMaxIndex = PotMaker.resultsMaxIndex - PAGE_SIZE
  PotMaker.RenderPage()
}
PotMaker.previous = previous

function next(this: void): undefined {
  PotMaker.resultsMaxIndex = PotMaker.resultsMaxIndex + PAGE_SIZE
  PotMaker.RenderPage()
}
PotMaker.next = next

function findFavorites(this: void): undefined {
  const savedFavorites = getSavedFavorites()
  function showFavoriteReagents(this: void, potion: Potion): boolean {
    return savedFavorites[asString(potion.itemId)] !== undefined
  }
  function showFavoritePotion(this: void, potion: Potion): boolean {
    return PotMaker.samePotions[asString(potion.samePotionId)] !== undefined
  }
  function showFavoriteTraits(this: void, potion: Potion): boolean {
    return PotMaker.sameTraits[asString(potion.sameTraitsId)] !== undefined
  }

  PotMaker.resultsMaxIndex = 0
  PotMaker.onlyReagentFilter = false
  PotMaker.potion2ReagentFilter = false
  PotMaker.questPotionsOnly = false
  PotMaker.favoritesOnly = true
  TemperPotionsOutput.title.SetText(PotMaker.language.favorites)

  const accountSettings = getAccountSettings()
  if (accountSettings.showInFavorites === "TRAITS") {
    PotMaker.favoriteFilter = showFavoriteTraits
  } else if (accountSettings.showInFavorites === "POTION") {
    PotMaker.favoriteFilter = showFavoritePotion
  } else {
    PotMaker.favoriteFilter = showFavoriteReagents
  }

  PotMaker.quests = undefined

  PotMaker.restartSearch()
}
PotMaker.findFavorites = findFavorites

const poisonWord = zo_strformat("<<1>>", GetString("SI_ITEMTYPE", ITEMTYPE_POISON), 1)
const poisonWordLower = zo_strformat("<<z:1>>", GetString("SI_ITEMTYPE", ITEMTYPE_POISON), 1)
const findWritsTask = libAsync().Create("POTION_MAKER_FIND_WRITS")

function hasQuestPoisonWord(this: void): boolean {
  const quest = craftAdvisor.questMasterList[craftAdvisor.selectedMasterListIndex]
  if (quest !== undefined && quest.questType === QUEST_TYPE_CRAFTING) {
    for (const condition of Object.values(quest.conditionData)) {
      if (condition.craftingType === CRAFTING_TYPE_ALCHEMY) {
        const [conditionText] = GetJournalQuestConditionInfo(
          quest.questIndex,
          1,
          condition.conditionIndex
        )
        if (conditionText !== undefined && conditionText !== "") {
          if (
            plainStrFind(conditionText, poisonWord) ||
            plainStrFind(conditionText, poisonWordLower)
          ) {
            return true
          }
        }
      }
    }
  }
  return false
}

function hasMasterWrit(this: void): boolean {
  if (!craftAdvisor.HasActiveWrits()) {
    return false
  }
  for (const quest of Object.values(craftAdvisor.questMasterList)) {
    if (quest.questType === QUEST_TYPE_CRAFTING) {
      for (const condition of Object.values(quest.conditionData)) {
        if (condition.craftingType === CRAFTING_TYPE_ALCHEMY && condition.isMasterWrit) {
          return true
        }
      }
    }
  }
  return false
}

function findWrits(this: void): undefined {
  findWritsTask
    .StopTimer()
    .Cancel()
    .Call(function callRefresh(this: void): undefined {
      craftAdvisor.RefreshQuestMasterList()
    })
    .Then(function thenStartSearch(this: void): undefined {
      const quests = PotMaker.GetQuests()
      PotMaker.onlyReagentFilter = false
      PotMaker.potion2ReagentFilter = !hasMasterWrit()
      PotMaker.questPotionsOnly = true
      PotMaker.favoritesOnly = false
      const accountSettings = getAccountSettings()
      if (accountSettings.autoSwitchTab) {
        if (quests.length > 0) {
          const descriptor = hasQuestPoisonWord()
            ? PotMaker.descriptorPoison
            : PotMaker.descriptorPotion
          if (PotMaker.atAlchemyStation) {
            PotMaker.LAS.SelectTab(descriptor)
          } else {
            ZO_MenuBar_SelectDescriptor(PotMaker.modeBar, descriptor)
          }
        }
        asAsyncTaskWithDelay(findWritsTask).Delay(
          100,
          function delayedStartSearch(this: void): undefined {
            PotMaker.InternalStartSearch(quests)
          }
        )
      } else {
        PotMaker.InternalStartSearch(quests)
      }
    })
}
PotMaker.findWrits = findWrits

function internalStartSearch(this: void, quests?: Quest[]): undefined {
  PotMaker.quests = quests !== undefined && quests.length > 0 ? quests : undefined

  PotMaker.resultsMaxIndex = 0
  TemperPotionsOutput.title.SetText(PotMaker.language.search_results)
  PotMaker.restartSearch()
}
PotMaker.InternalStartSearch = internalStartSearch

function getQuests(this: void): Quest[] {
  const quests: Quest[] = []
  for (const quest of Object.values(craftAdvisor.questMasterList)) {
    if (quest.questType === QUEST_TYPE_CRAFTING) {
      for (const condition of Object.values(quest.conditionData)) {
        if (condition.craftingType === CRAFTING_TYPE_ALCHEMY) {
          quests[quests.length] = asQuest(quest)
        }
      }
    }
  }
  return quests
}
PotMaker.GetQuests = getQuests

function startSearch(this: void): undefined {
  PotMaker.onlyReagentFilter = ZO_CheckButton_IsChecked(TemperPotionsOnlyReagent)
  PotMaker.potion2ReagentFilter = ZO_CheckButton_IsChecked(TemperPotionsOnly2)
  PotMaker.questPotionsOnly = false
  PotMaker.favoritesOnly = false

  if (PotMaker.questPotionsOnly) {
    PotMaker.InternalStartSearch(PotMaker.GetQuests())
  } else {
    PotMaker.InternalStartSearch(undefined)
  }
}
PotMaker.startSearch = startSearch

function restartSearch(this: void): undefined {
  const filters: Record<string, boolean> = {}
  const filterSolvents: Record<string, boolean> = {}
  const filterReagent: Record<string, boolean | number> = {}
  const accountSettings = getAccountSettings()

  if (
    !PotMaker.questPotionsOnly &&
    (!PotMaker.favoritesOnly || accountSettings.filterFavoriteByTraits)
  ) {
    function ckeckState(this: void, checkBox: Control): undefined {
      const checkState = PotMaker.GetToggleButtonCheckState(checkBox)
      const traitName = asTraitControlView(checkBox).trait.name
      if (checkState === TRISTATE_CHECK_BUTTON_CHECKED) {
        filters[traitName] = true
      } else if (checkState === TRISTATE_CHECK_BUTTON_UNCHECKED) {
        filters[traitName] = false
      }
    }
    for (const checkBox of PotMaker.PositiveTraitControls) {
      ckeckState(checkBox)
    }
    for (const checkBox of PotMaker.NegativeTraitControls) {
      ckeckState(checkBox)
    }
  }

  let solventCount = 0
  if (
    !PotMaker.questPotionsOnly &&
    (!PotMaker.favoritesOnly || accountSettings.filterFavoriteBySolvents)
  ) {
    for (const checkBox of PotMaker.SolventFilterControls) {
      if (!checkBox.IsControlHidden() && PotMaker.ToggleButtonIsChecked(checkBox)) {
        filterSolvents[asSolventControlView(checkBox).solvent.itemId] = true
        solventCount = solventCount + 1
      }
    }
  } else if (PotMaker.questPotionsOnly) {
    for (const checkBox of PotMaker.SolventFilterControls) {
      if (!checkBox.IsControlHidden()) {
        const solvent = asSolventControlView(checkBox).solvent
        const pack = solvent.pack[0]
        if (pack !== undefined) {
          filterSolvents[solvent.itemId] = true
          solventCount = solventCount + 1
        }
      }
    }
  }
  if (solventCount === 0) {
    for (const checkBox of PotMaker.SolventFilterControls) {
      if (!checkBox.IsControlHidden()) {
        filterSolvents[asSolventControlView(checkBox).solvent.itemId] = true
        solventCount = solventCount + 1
      }
    }
  }
  if (solventCount === 0) {
    filterSolvents[""] = true
  }

  let reagentCount = 0
  if (
    !PotMaker.questPotionsOnly &&
    (!PotMaker.favoritesOnly || accountSettings.filterFavoriteByReagents)
  ) {
    for (const checkBox of PotMaker.ReagentFilterControls) {
      if (!checkBox.IsControlHidden() && PotMaker.ToggleButtonIsChecked(checkBox)) {
        filterReagent[asReagentControlView(checkBox).reagent.itemId] = true
        reagentCount = reagentCount + 1
      }
    }
  }
  if (
    reagentCount === 0 &&
    (!PotMaker.onlyReagentFilter ||
      (PotMaker.favoritesOnly && !accountSettings.filterFavoriteByReagents))
  ) {
    for (const checkBox of PotMaker.ReagentFilterControls) {
      if (!checkBox.IsControlHidden()) {
        filterReagent[asReagentControlView(checkBox).reagent.itemId] = true
        reagentCount = reagentCount + 1
      }
    }
  }
  filterReagent.count = reagentCount

  PotMaker.findDoablePotions(
    asTraitFilter(filters),
    asIngredient(filterSolvents),
    asIngredient(filterReagent)
  )
}
PotMaker.restartSearch = restartSearch
