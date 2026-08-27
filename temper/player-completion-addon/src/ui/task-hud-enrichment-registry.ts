import {
  getSkillMorphEnrichment,
  isSkillMorphTask,
} from "@temper/game-characters-skills-morphs-addon/ui/task-hud-skill-morphs"
import type { TaskData } from "../saved-variables"
import {
  getScribingGuildDailyFallback,
  getScribingMotifFallbackSubRows,
  getScribingScriptType,
  getScribingSourceSubRows,
} from "../scribing-sources"
import type { DailyWritProfessionState } from "../tracking/daily-writs-state"
import { formatProgressCount } from "../tracking/progress-format"
import { filterPledgesForCharacter, getTodaysPledges } from "../undaunted-pledges"
import { COMPANION_RAPPORT_POINTS_MAX } from "./task-hud-companion-rapport"
import { type AntiquityLeadEnrichment, getAntiquityLeadEnrichment, getCadwellEnrichment, getCompanionQuestEnrichment, getCompanionRapportEnrichment, getDragonguardBadges, getLoreLibraryEnrichment, getMotifSourceEnrichment, isAntiquityLegendaryTask, isAntiquityLoreTask, isAntiquityMotifsTask, isCadwellTask, isDragonguardTask, isLoreLibraryTask, isMotifTask, isUndauntedTask } from "./task-hud-enrichment"
import { isCompanionQuestTask } from "./task-hud-companion-quests"
import { isCompanionRapportTask } from "./task-hud-companion-rapport"
import {
  type DailyWritRow,
  getDailyWritsEnrichmentRows,
  isDailyWritsTask,
} from "./task-hud-enrichment-daily-writs"
import type { SubRowColor, SubRowSpec } from "./task-hud-rows"
import { getDungeonSetsForCurrentZone } from "./task-hud-visibility"

export interface SubRowProgress {
  readonly current: number
  readonly total: number
}

export function withProgress(hint: string, progress?: SubRowProgress): string {
  return progress === undefined ? hint : formatProgressCount(hint, progress.current, progress.total)
}

export function groupLabelSpecs(
  header: string,
  leaves: readonly string[],
  progress?: SubRowProgress
): readonly SubRowSpec[] {
  const specs: SubRowSpec[] = [{ text: withProgress(header, progress), color: "default" }]
  for (const leaf of leaves) specs.push({ text: leaf, color: "default", indent: 2 })
  return specs
}

export function flatSpecs(texts: readonly string[]): readonly SubRowSpec[] {
  return texts.map((text): SubRowSpec => ({ text, color: "default" }))
}

export function motifSpecs(
  entries: readonly {
    readonly name: string
    readonly known: number
    readonly total: number
    readonly sourceDescription: string
  }[]
): readonly SubRowSpec[] {
  return entries.map(
    (e): SubRowSpec => ({
      text: withProgress(`${e.name} (${e.sourceDescription})`, {
        current: e.known,
        total: e.total,
      }),
      color: "default",
    })
  )
}

export function scribingSpecs(
  primary: readonly {
    readonly achievementName: string
    readonly current: number
    readonly total: number
  }[],
  motif: readonly {
    readonly activityLabel: string
    readonly name: string
    readonly known: number
    readonly total: number
  }[],
  guildDaily: string
): readonly SubRowSpec[] {
  if (primary.length > 0) {
    return primary.map(
      (s): SubRowSpec => ({
        text: `${s.achievementName} (${s.current}/${s.total})`,
        color: "default",
      })
    )
  }
  if (motif.length > 0) {
    return motif.map(
      (e): SubRowSpec => ({
        text: `${e.activityLabel} (${e.name} ${e.known}/${e.total})`,
        color: "purple",
      })
    )
  }
  return [{ text: guildDaily, color: "default" }]
}

export function skillMorphSpecs(
  entries: readonly {
    readonly skillName: string
    readonly isLineConflict: boolean
    readonly isEquipped: boolean
  }[]
): readonly SubRowSpec[] {
  return entries.map(
    (e): SubRowSpec => ({
      text: e.skillName,
      color: e.isLineConflict ? "purple" : e.isEquipped ? "green" : "yellow",
    })
  )
}

type DisplayedWritState = Exclude<DailyWritProfessionState, "completed">

const DAILY_WRIT_STATE_COLOR: Record<DisplayedWritState, SubRowColor> = {
  notPickedUp: "default",
  pickedUp: "yellow",
  crafted: "green",
}

export function dailyWritsSpecs(rows: readonly DailyWritRow[]): readonly SubRowSpec[] {
  return rows
    .filter(
      (r): r is DailyWritRow & { readonly state: DisplayedWritState } => r.state !== "completed"
    )
    .map((r): SubRowSpec => ({ text: r.label, color: DAILY_WRIT_STATE_COLOR[r.state] }))
}

export function inventoryVenueSpecs(
  venues: readonly { readonly label: string; readonly count: number }[]
): readonly SubRowSpec[] {
  return venues.map(
    (v): SubRowSpec => ({ text: `${v.label} — ${v.count} items`, color: "default" })
  )
}

export function dungeonSetSpecs(
  zoneName: string,
  sets: readonly {
    readonly name: string
    readonly slotsUnlocked: number
    readonly totalSlots: number
  }[]
): readonly SubRowSpec[] {
  return groupLabelSpecs(
    zoneName,
    sets.map((s) => `${s.slotsUnlocked}/${s.totalSlots} ${s.name}`)
  )
}

export function antiquityLeadSpecs(enrichment: AntiquityLeadEnrichment): readonly SubRowSpec[] {
  const specs: SubRowSpec[] = []
  for (const group of enrichment.groups) {
    for (const spec of groupLabelSpecs(group.digZone, group.leadNames, {
      current: group.completedThisSession,
      total: group.totalAtSessionStart,
    })) {
      specs.push(spec)
    }
  }
  for (const spec of flatSpecs(enrichment.ungrouped)) specs.push(spec)
  return specs
}

export interface EnrichmentSelector {
  readonly key: string
  readonly matches: (this: void, task: TaskData) => boolean
  readonly select: (this: void, task: TaskData) => readonly SubRowSpec[]
}

export const ENRICHMENT_SELECTORS: readonly EnrichmentSelector[] = [
  {
    key: "undaunted",
    matches: isUndauntedTask,
    select: (): readonly SubRowSpec[] => {
      const filtered = filterPledgesForCharacter(getTodaysPledges())
      if (filtered.length > 0) return flatSpecs(filtered.map((p) => p.dungeonLabel))
      return flatSpecs(["Undaunted Delve Daily"])
    },
  },
  {
    key: "dailyWrits",
    matches: isDailyWritsTask,
    select: (): readonly SubRowSpec[] => dailyWritsSpecs(getDailyWritsEnrichmentRows()),
  },
  {
    key: "scribing",
    matches: (task): boolean => getScribingScriptType(task) !== undefined,
    select: (task): readonly SubRowSpec[] => {
      const scriptType = getScribingScriptType(task)
      if (scriptType === undefined) return []
      return scribingSpecs(
        getScribingSourceSubRows(scriptType),
        getScribingMotifFallbackSubRows(scriptType),
        getScribingGuildDailyFallback(scriptType)
      )
    },
  },
  {
    key: "cadwell",
    matches: isCadwellTask,
    select: (task): readonly SubRowSpec[] => {
      const e = getCadwellEnrichment(task)
      return e === undefined
        ? []
        : groupLabelSpecs(e.zoneName, e.incompletePois, {
            current: e.completedPois,
            total: e.totalPois,
          })
    },
  },
  {
    key: "loreLibrary",
    matches: isLoreLibraryTask,
    select: (): readonly SubRowSpec[] => {
      const e = getLoreLibraryEnrichment()
      return e === undefined
        ? []
        : groupLabelSpecs(e.collectionName, e.unreadBooks, {
            current: e.knownBooks,
            total: e.totalBooks,
          })
    },
  },
  {
    key: "skillMorph",
    matches: isSkillMorphTask,
    select: (task): readonly SubRowSpec[] => {
      const e = getSkillMorphEnrichment(task)
      return e === undefined ? [] : skillMorphSpecs(e)
    },
  },
  {
    key: "motif",
    matches: isMotifTask,
    select: (task): readonly SubRowSpec[] => motifSpecs(getMotifSourceEnrichment(task)),
  },
  {
    key: "companionRapport",
    matches: isCompanionRapportTask,
    select: (): readonly SubRowSpec[] => {
      const e = getCompanionRapportEnrichment()
      return e === undefined
        ? []
        : groupLabelSpecs(e.companionName, e.sources, {
            current: e.currentPoints,
            total: COMPANION_RAPPORT_POINTS_MAX,
          })
    },
  },
  {
    key: "companionQuest",
    matches: isCompanionQuestTask,
    select: (): readonly SubRowSpec[] => {
      const e = getCompanionQuestEnrichment()
      return e === undefined ? [] : groupLabelSpecs(e.companionName, [e.questName])
    },
  },
  {
    key: "dragonguard",
    matches: isDragonguardTask,
    select: (): readonly SubRowSpec[] => flatSpecs(getDragonguardBadges().map((b) => b.label)),
  },
  {
    key: "inventoryManagement",
    matches: (task): boolean => task.completionCardId === "inventory-management",
    select: (): readonly SubRowSpec[] => {
      const summary = globalThis.TemperInventory?.getInventoryActionSummary?.()
      return summary === undefined ? [] : inventoryVenueSpecs(summary.venues)
    },
  },
  {
    key: "dungeonSets",
    matches: (task): boolean => task.completionCardId === "dungeon-sets",
    select: (): readonly SubRowSpec[] => {
      const ds = getDungeonSetsForCurrentZone()
      return ds === undefined ? [] : dungeonSetSpecs(ds.zoneName, ds.incompleteSets)
    },
  },
  {
    key: "antiquityLore",
    matches: isAntiquityLoreTask,
    select: (): readonly SubRowSpec[] =>
      antiquityLeadSpecs(getAntiquityLeadEnrichment("antiquity-lore")),
  },
  {
    key: "antiquityMotifs",
    matches: isAntiquityMotifsTask,
    select: (): readonly SubRowSpec[] =>
      antiquityLeadSpecs(getAntiquityLeadEnrichment("antiquity-leads-motifs")),
  },
  {
    key: "antiquityLegendary",
    matches: isAntiquityLegendaryTask,
    select: (): readonly SubRowSpec[] =>
      antiquityLeadSpecs(getAntiquityLeadEnrichment("antiquity-leads-legendary")),
  },
]
