import { ADDON_NAME } from "./constants"
import { getSavedVariables } from "./saved-variables"
import { scheduleTaskAutoCompletionCheck } from "./task-auto-complete"
import { updateSingleAchievement } from "./tracking/achievements"
import { refreshAllAntiquityLore, updateAntiquityLore } from "./tracking/antiquity-lore"
import { refreshCadwellProgress } from "./tracking/cadwell"
import { reconcileDailyWritStates } from "./tracking/daily-writs"
import { refreshAllItemSets, updateItemSet } from "./tracking/item-sets"
import { updateLoreBook } from "./tracking/lore-library"
import { updateQuest } from "./tracking/quests"
import { refreshAllRecipes, updateRecipe } from "./tracking/recipes"
import { updateGrimoire, updateScript } from "./tracking/scribing"
import { updateSkillPoints } from "./tracking/skill-points"
import { updateTraitResearch } from "./tracking/trait-research"
export function registerCompletionKnowledgeEvents(): undefined {
  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_AchievementUpdated",
    EVENT_ACHIEVEMENT_UPDATED,
    function (this: void, _event: number, achievementId: number): undefined {
      updateSingleAchievement(achievementId)
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
      if (isCompleted) {
        updateSkillPoints()
        updateQuest(questID)
        refreshCadwellProgress()
        const charEntry = getSavedVariables().characters[GetCurrentCharacterId()]
        if (charEntry !== undefined) reconcileDailyWritStates(charEntry)
        scheduleTaskAutoCompletionCheck()
      }
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_AchievementAwarded",
    EVENT_ACHIEVEMENT_AWARDED,
    function (this: void, _event: number, _name: string, _points: number, id: number): undefined {
      updateSingleAchievement(id)
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

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_AntiquityLeadAcquired",
    EVENT_ANTIQUITY_LEAD_ACQUIRED,
    function (this: void, _eventCode: number, _antiquityId: number): undefined {
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_AntiquityDigSitesUpdated",
    EVENT_ANTIQUITY_DIG_SITES_UPDATED,
    function (this: void, _eventCode: number, _antiquityId: number): undefined {
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_TraitResearchCompleted",
    EVENT_SMITHING_TRAIT_RESEARCH_COMPLETED,
    function (
      this: void,
      _event: number,
      craftingSkillType: number,
      researchLineIndex: number,
      traitIndex: number
    ): undefined {
      updateTraitResearch(craftingSkillType, researchLineIndex, traitIndex)
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_TraitResearchStarted",
    EVENT_SMITHING_TRAIT_RESEARCH_STARTED,
    function (
      this: void,
      _event: number,
      craftingSkillType: number,
      researchLineIndex: number,
      traitIndex: number
    ): undefined {
      updateTraitResearch(craftingSkillType, researchLineIndex, traitIndex)
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_TraitResearchCanceled",
    EVENT_SMITHING_TRAIT_RESEARCH_CANCELED,
    function (
      this: void,
      _event: number,
      craftingSkillType: number,
      researchLineIndex: number,
      traitIndex: number
    ): undefined {
      updateTraitResearch(craftingSkillType, researchLineIndex, traitIndex)
      scheduleTaskAutoCompletionCheck()
    }
  )
}
