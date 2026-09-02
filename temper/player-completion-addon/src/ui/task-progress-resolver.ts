import { resolveSkillMorphs } from "@temper/game-characters-skills-morphs-addon/ui/task-progress-resolver-skill-morphs"
import type { AccountCompletion } from "@akasha/temper-completion/completion-record"
import { applyCompletionOverrides } from "@temper/player-completion/completion-overrides"
import { getCompletionOverridesForCharacter } from "../characters-config"
import { HIRELING_MAILS_DAILY_TARGET, hirelingCountForToday } from "../hireling-mail-count"
import {
  getSavedVariables,
  type SavedCharacterEntry,
  type SavedVariablesData,
  type TaskData,
} from "../saved-variables"
import { getEsoDateString } from "../tracking/daily-writs"
import {
  resolveAccountAchievements,
  resolveCharacterAchievements,
} from "./task-progress-resolver-achievements"
import {
  resolveDailyWrits,
  resolveRecipes,
  resolveScribing,
} from "./task-progress-resolver-knowledge"
import { resolveSkillLines, resolveSkillPoints } from "./task-progress-resolver-skills"
import type { TaskProgress } from "./task-progress-resolver-types"
import {
  resolveAntiquityLore,
  resolveCadwell,
  resolveCompanionQuests,
  resolveCompanionRapport,
  resolveLoreLibrary,
  resolveMountTraining,
  resolveTraitResearch,
} from "./task-progress-resolver-world"


export function resolveTaskProgressForCharacter(
  charData: SavedCharacterEntry | undefined,
  account: AccountCompletion,
  task: TaskData,
  charId: string
): TaskProgress | undefined {
  const cardId = task.completionCardId
  if (cardId === undefined) return undefined

  const floored =
    charData === undefined
      ? undefined
      : applyCompletionOverrides(charData, getCompletionOverridesForCharacter(charId))

  if (cardId === "daily-writs") {
    return resolveDailyWrits(floored)
  }
  if (cardId === "mount-training") {
    return resolveMountTraining(floored, task.completionItemPath)
  }
  if (cardId === "trait-research") {
    return resolveTraitResearch(floored, task.completionItemPath)
  }
  if (cardId === "recipes") {
    return resolveRecipes(floored, task.completionItemPath)
  }
  if (cardId === "scribing-knowledge") {
    return resolveScribing(floored, task.completionItemPath)
  }
  if (cardId === "character-achievements") {
    return resolveCharacterAchievements(floored, task.completionItemPath)
  }
  if (cardId === "account-achievements") {
    return resolveAccountAchievements(account, task.completionItemPath)
  }
  if (cardId === "cadwells-almanac") {
    return resolveCadwell(floored, task.completionItemPath)
  }
  if (cardId === "companion-quests") {
    return resolveCompanionQuests(floored, task.completionItemPath)
  }
  if (cardId === "companion-rapport-character") {
    return resolveCompanionRapport(floored, task.completionItemPath)
  }
  if (cardId === "skill-lines") {
    return resolveSkillLines(floored, task.completionItemPath)
  }
  if (cardId === "skill-morphs") {
    return resolveSkillMorphs(floored, task.completionItemPath)
  }
  if (cardId === "skill-points") {
    return resolveSkillPoints(floored, task.completionItemPath)
  }
  if (cardId === "antiquity-lore") {
    return resolveAntiquityLore(account)
  }
  if (cardId === "lore-library-character") {
    return resolveLoreLibrary(floored, task.completionItemPath)
  }
  if (cardId === "antiquity-leads-motifs" || cardId === "antiquity-leads-legendary") {
    return undefined
  }
  if (cardId === "guild-sales") {
    const sv = getSavedVariables()
    const today = getEsoDateString(GetTimeStamp())
    if (sv.guildSalesPostedDate === today) {
      return { current: 1, total: 1 }
    }
    return { current: 0, total: 1 }
  }
  if (cardId === "hireling-mails") {
    const sv = getSavedVariables()
    const today = getEsoDateString(GetTimeStamp())
    return {
      current: hirelingCountForToday(sv.hirelingMails, today),
      total: HIRELING_MAILS_DAILY_TARGET,
    }
  }

  return undefined
}

export function resolveTaskProgress(
  sv: SavedVariablesData,
  task: TaskData
): TaskProgress | undefined {
  const charId = GetCurrentCharacterId()
  return resolveTaskProgressForCharacter(sv.characters[charId], sv.account, task, charId)
}
