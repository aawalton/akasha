import { saveAchievementProgress } from "akasha/temper/characters-addon/modules/characters-achievements/characters-achievements.module.code.ts"
import {
  refreshAllAntiquityLore,
  updateAntiquityLore,
} from "akasha/temper/characters-addon/modules/characters-antiquity-lore/characters-antiquity-lore.module.code.ts"
import { collectCadwell } from "akasha/temper/characters-addon/modules/characters-cadwell/characters-cadwell.module.code.ts"
import { currentCharacterEntry } from "akasha/temper/characters-addon/modules/characters-current-entry/characters-current-entry.module.code.ts"
import { reconcileDailyWritStates } from "akasha/temper/characters-addon/modules/characters-daily-writs/characters-daily-writs.module.code.ts"
import {
  refreshAllItemSets,
  updateItemSet,
} from "akasha/temper/characters-addon/modules/characters-item-sets/characters-item-sets.module.code.ts"
import { updateLoreBook } from "akasha/temper/characters-addon/modules/characters-lore-library/characters-lore-library.module.code.ts"
import { updateQuest } from "akasha/temper/characters-addon/modules/characters-quests/characters-quests.module.code.ts"
import {
  refreshAllRecipes,
  updateRecipe,
} from "akasha/temper/characters-addon/modules/characters-recipes/characters-recipes.module.code.ts"
import {
  updateGrimoire,
  updateScript,
} from "akasha/temper/characters-addon/modules/characters-scribing/characters-scribing.module.code.ts"
import { updateSkillPoints } from "akasha/temper/characters-addon/modules/characters-skill-points/characters-skill-points.module.code.ts"
import { scheduleTaskAutoCompletionCheck } from "akasha/temper/characters-addon/modules/characters-task-auto-complete/characters-task-auto-complete.module.code.ts"
import { updateTraitResearch } from "akasha/temper/characters-addon/modules/characters-trait-research/characters-trait-research.module.code.ts"
import { ADDON_NAME } from "akasha/temper/player-completion-state/completion-addon-constants/completion-addon-constants.module.code.ts"

const TRAIT_RESEARCH_EVENTS = [
  { suffix: "_TraitResearchCompleted", event: EVENT_SMITHING_TRAIT_RESEARCH_COMPLETED },
  { suffix: "_TraitResearchStarted", event: EVENT_SMITHING_TRAIT_RESEARCH_STARTED },
  { suffix: "_TraitResearchCanceled", event: EVENT_SMITHING_TRAIT_RESEARCH_CANCELED },
]

const ANTIQUITY_NUDGE_EVENTS = [
  { suffix: "_AntiquityLeadAcquired", event: EVENT_ANTIQUITY_LEAD_ACQUIRED },
  { suffix: "_AntiquityDigSitesUpdated", event: EVENT_ANTIQUITY_DIG_SITES_UPDATED },
]

function onTraitResearchChanged(
  this: void,
  _event: number,
  craftingSkillType: number,
  researchLineIndex: number,
  traitIndex: number
): undefined {
  updateTraitResearch(craftingSkillType, researchLineIndex, traitIndex)
  scheduleTaskAutoCompletionCheck()
}

function onProgressNudged(this: void): undefined {
  scheduleTaskAutoCompletionCheck()
}

export function registerCompletionKnowledgeEvents(): undefined {
  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_AchievementUpdated",
    EVENT_ACHIEVEMENT_UPDATED,
    function (this: void, _event: number, achievementId: number): undefined {
      saveAchievementProgress(achievementId)
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_LoreBookLearned",
    EVENT_LORE_BOOK_LEARNED,
    function (
      this: void,
      _event: number,
      categoryIndex: number,
      collectionIndex: number,
      bookIndex: number
    ): undefined {
      updateLoreBook(categoryIndex, collectionIndex, bookIndex)
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_RecipeLearned",
    EVENT_RECIPE_LEARNED,
    function (this: void, _event: number, recipeListIndex: number, recipeIndex: number): undefined {
      updateRecipe(recipeListIndex, recipeIndex)
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_MultipleRecipesLearned",
    EVENT_MULTIPLE_RECIPES_LEARNED,
    function (this: void): undefined {
      refreshAllRecipes()
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_GrimoireLockChanged",
    EVENT_CRAFTED_ABILITY_LOCK_STATE_CHANGED,
    function (
      this: void,
      _event: number,
      craftedAbilityId: number,
      isUnlocked: boolean
    ): undefined {
      updateGrimoire(craftedAbilityId, isUnlocked)
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_ScriptLockChanged",
    EVENT_CRAFTED_ABILITY_SCRIPT_LOCK_STATE_CHANGED,
    function (this: void, _event: number, scriptId: number, isUnlocked: boolean): undefined {
      updateScript(scriptId, isUnlocked)
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_SkillPointsChanged",
    EVENT_SKILL_POINTS_CHANGED,
    function (this: void): undefined {
      updateSkillPoints()
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_QuestRemoved",
    EVENT_QUEST_REMOVED,
    function (
      this: void,
      _event: number,
      isCompleted: boolean,
      _journalIndex: number,
      _questName: string,
      _zoneIndex: number,
      _poiIndex: number,
      questID: number
    ): undefined {
      if (!isCompleted) return
      updateSkillPoints()
      updateQuest(questID)
      collectCadwell()
      const charEntry = currentCharacterEntry()
      if (charEntry !== undefined) reconcileDailyWritStates(charEntry)
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_AchievementAwarded",
    EVENT_ACHIEVEMENT_AWARDED,
    function (this: void, _event: number, _name: string, _points: number, id: number): undefined {
      saveAchievementProgress(id)
      updateSkillPoints()
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_ItemSetCollectionUpdated",
    EVENT_ITEM_SET_COLLECTION_UPDATED,
    function (this: void, _event: number, itemSetId: number): undefined {
      updateItemSet(itemSetId)
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_ItemSetCollectionsUpdated",
    EVENT_ITEM_SET_COLLECTIONS_UPDATED,
    function (this: void): undefined {
      refreshAllItemSets()
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_AntiquityUpdated",
    EVENT_ANTIQUITY_UPDATED,
    function (this: void, _event: number, antiquityId: number): undefined {
      updateAntiquityLore(antiquityId)
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_AntiquitiesUpdated",
    EVENT_ANTIQUITIES_UPDATED,
    function (this: void): undefined {
      refreshAllAntiquityLore()
      scheduleTaskAutoCompletionCheck()
    }
  )

  for (const nudge of ANTIQUITY_NUDGE_EVENTS) {
    EVENT_MANAGER.RegisterForEvent(ADDON_NAME + nudge.suffix, nudge.event, onProgressNudged)
  }

  for (const research of TRAIT_RESEARCH_EVENTS) {
    EVENT_MANAGER.RegisterForEvent(
      ADDON_NAME + research.suffix,
      research.event,
      onTraitResearchChanged
    )
  }
}
