import { grimoires } from "akasha/temper/player/character/skill/modules/scribing-grimoires/scribing-grimoires.module.code.ts"
import type { CharacterCompletion } from "akasha/temper/player/completion/modules/completion-progress/completion-progress.module.code.ts"
import { LORE_LIBRARY_DATA } from "akasha/temper/player/completion/modules/lore-library-data/lore-library-data.module.code.ts"
import { RECIPE_DATA } from "akasha/temper/player/completion/modules/recipe-data/recipe-data.data-table.code.ts"
import { transformAccountLoreUnion } from "akasha/temper/player/completion/temper-player-completion/modules/completion-account-lore-union/completion-account-lore-union.module.code.ts"
import {
  transformAccountRecipeUnion,
  transformAccountScribingUnion,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-account-recipe-scribing-union/completion-account-recipe-scribing-union.module.code.ts"
import { transformAccountTraitResearchUnion } from "akasha/temper/player/completion/temper-player-completion/modules/completion-account-trait-union/completion-account-trait-union.module.code.ts"
import { transformAccountQuestUnion } from "akasha/temper/player/completion/temper-player-completion/modules/completion-account-union-progress/completion-account-union-progress.module.code.ts"
import {
  transformAccountPoiUnion,
  transformAccountZoneCompletionUnion,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-account-zone-poi-union/completion-account-zone-poi-union.module.code.ts"
import { transformAccountAchievementProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-achievement-progress/completion-achievement-progress.module.code.ts"
import { transformAntiquityLoreProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-antiquity-lore-progress/completion-antiquity-lore-progress.module.code.ts"
import type { AccountCheckerInput } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-checker-types/completion-card-checker-types.module.code.ts"
import type { AccountSummaryData } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-registry/completion-card-registry.module.code.ts"
import {
  type CompletionCatalogs,
  NO_COMPLETION_CATALOGS,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-catalogs/completion-catalogs.module.code.ts"
import type { CompletionCharacterRow } from "akasha/temper/player/completion/temper-player-completion/modules/completion-character-row/completion-character-row.module.code.ts"
import { transformCollectiblesProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-collectibles-progress/completion-collectibles-progress.module.code.ts"
import { transformItemSetProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-item-set-progress/completion-item-set-progress.module.code.ts"
import { transformPoiProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-poi-progress/completion-poi-progress.module.code.ts"
import { transformQuestProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-quest-progress/completion-quest-progress.module.code.ts"
import { transformRecipeProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-recipe-progress/completion-recipe-progress.module.code.ts"
import { transformScribingProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-scribing-progress/completion-scribing-progress.module.code.ts"
import { transformSubclassingSkillLineProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-subclassing-progress/completion-subclassing-progress.module.code.ts"
import { buildAccountSummary } from "akasha/temper/player/completion/temper-player-completion/modules/completion-summary-account/completion-summary-account.module.code.ts"
import { transformTraitResearchProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-trait-research-progress/completion-trait-research-progress.module.code.ts"
import {
  CATALOG_CRAFT_TYPES,
  CATALOG_RESEARCH_LINES,
  capturedTraitResearch,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-trait-research-progress/completion-trait-research-progress.module.test-fixtures.ts"
import { transformTributeProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-tribute-progress/completion-tribute-progress.module.code.ts"
import { transformZoneCompletionProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-zone-progress/completion-zone-progress.module.code.ts"
import { transformSubclassingSkillMorphProgress } from "akasha/temper/player/skill-morph/modules/subclassing-morph-progress/subclassing-morph-progress.module.code.ts"

const FIRST_LIST = RECIPE_DATA[0]
const FIRST_RECIPE = FIRST_LIST?.recipes[0]
if (FIRST_LIST === undefined || FIRST_RECIPE === undefined) {
  throw new Error("test fixture: no recipe list")
}

const FIRST_GRIMOIRE = grimoires.list[0]
if (FIRST_GRIMOIRE === undefined) throw new Error("test fixture: no grimoire")

const FIRST_LORE_CATEGORY = LORE_LIBRARY_DATA[0]
const FIRST_LORE_COLLECTION = FIRST_LORE_CATEGORY?.collections[0]
const FIRST_LORE_BOOK = FIRST_LORE_COLLECTION?.books[0]
if (
  FIRST_LORE_CATEGORY === undefined ||
  FIRST_LORE_COLLECTION === undefined ||
  FIRST_LORE_BOOK === undefined
) {
  throw new Error("test fixture: no lore book")
}

const GLENUMBRA = 3

const DELVE = 1

const ACHIEVEMENT_DONE = { completed: true, criteriaProgress: { completedSteps: 1, totalSteps: 1 } }

const PATRON_COLLECTIBLE = 600

export const CATALOGS: CompletionCatalogs = {
  ...NO_COMPLETION_CATALOGS,
  achievementCategories: [
    { slug: "account-invented", title: "Invented", category: "account", displayOrder: 0 },
    {
      slug: "account-invented-general",
      title: "General",
      category: "account",
      displayOrder: 0,
      parent: "account-invented",
      achievements: [
        { esoAchievementId: 1, name: "An Invented Deed", achievementPoints: 10, totalSteps: 1 },
        { esoAchievementId: 2, name: "Another Invented Deed", achievementPoints: 5, totalSteps: 1 },
      ],
    },
    { slug: "character-invented", title: "Invented", category: "character", displayOrder: 0 },
    {
      slug: "character-invented-general",
      title: "General",
      category: "character",
      displayOrder: 0,
      parent: "character-invented",
      achievements: [
        { esoAchievementId: 3, name: "A Deed of One Hero", achievementPoints: 20, totalSteps: 1 },
      ],
    },
  ],
  antiquityCategories: [
    {
      esoAntiquityCategoryId: 1,
      title: "Invented Digs",
      antiquities: [
        { esoAntiquityId: 24, antiquityName: "An Invented Relic", totalLoreEntries: 3 },
      ],
    },
  ],
  collectibleCategories: [
    {
      slug: "invented-mounts",
      title: "Mounts",
      collectibles: [
        { esoCollectibleId: 500, collectibleName: "An Invented Horse" },
        { esoCollectibleId: 501, collectibleName: "Another Invented Horse" },
      ],
    },
  ],
  tributePatrons: [
    {
      title: "An Invented Patron",
      esoPatronId: 7,
      esoCollectibleId: PATRON_COLLECTIBLE,
      cards: [{ cardIndex: 1, baseCardName: "A Card", upgradeCardName: "A Better Card" }],
    },
  ],
  craftTypes: CATALOG_CRAFT_TYPES,
  researchLines: CATALOG_RESEARCH_LINES,
  questZones: [
    {
      title: "Glenumbra",
      zoneQuests: [
        { esoQuestId: 900001, questName: "An Invented Errand" },
        { esoQuestId: 900002, questName: "Another Invented Errand" },
      ],
    },
  ],
  poiZones: [
    {
      title: "Glenumbra",
      esoZoneId: GLENUMBRA,
      pois: [
        { poiType: 1, poiTypeLabel: "Wayshrine", poiIndex: 1, poiName: "An Invented Shrine" },
        { poiType: 1, poiTypeLabel: "Wayshrine", poiIndex: 2, poiName: "Another Invented Shrine" },
      ],
    },
  ],
  zoneCompletionZones: [
    {
      esoZoneId: GLENUMBRA,
      title: "Glenumbra",
      zoneCompletionActivities: [
        {
          completionType: DELVE,
          completionTypeLabel: "Delves",
          activityIndex: 1,
          esoActivityId: 1,
          activityName: "An Invented Delve",
        },
        {
          completionType: DELVE,
          completionTypeLabel: "Delves",
          activityIndex: 2,
          esoActivityId: 2,
          activityName: "Another Invented Delve",
        },
      ],
    },
  ],
}

function row(id: string, completion: CharacterCompletion): CompletionCharacterRow {
  return { id, esoCharacterId: `eso-${id}`, title: id, completion }
}

export const ROWS: readonly CompletionCharacterRow[] = [
  row("durene", {
    achievements: { 3: ACHIEVEMENT_DONE },
    quests: [900001],
    pointsOfInterest: { [GLENUMBRA]: [1] },
    zoneCompletion: { [GLENUMBRA]: { [DELVE]: [1] } },
    recipes: { [FIRST_LIST.listIndex]: [FIRST_RECIPE.itemId] },
    traitResearch: capturedTraitResearch({
      known: (craft, line, trait) => craft === 1 && line === 1 && trait === 1,
    }),
  }),
  row("amerys", {
    quests: [900002],
    pointsOfInterest: { [GLENUMBRA]: [1] },
    scribing: {
      grimoires: { 1: { name: FIRST_GRIMOIRE.name, unlocked: true } },
      scripts: {},
    },
    loreLibrary: {
      [FIRST_LORE_CATEGORY.categoryIndex]: {
        [FIRST_LORE_COLLECTION.collectionIndex]: [FIRST_LORE_BOOK.bookIndex],
      },
    },
  }),
]

export const HELD: AccountCheckerInput = {
  account: {
    achievements: { 1: ACHIEVEMENT_DONE },
    antiquityLore: { 24: 2 },
    collectibles: [500, PATRON_COLLECTIBLE],
    tributeCardUpgrades: { 7: [1] },
  },
  rows: ROWS,
  catalogs: CATALOGS,
}

export function summaryOf({ account, rows, catalogs }: AccountCheckerInput): AccountSummaryData {
  const traitResearch = transformTraitResearchProgress(
    rows,
    catalogs.craftTypes,
    catalogs.researchLines
  )
  return buildAccountSummary(
    transformAccountAchievementProgress(account, rows, catalogs.achievementCategories),
    account?.championPointsEarned ?? 0,
    transformAntiquityLoreProgress(account, catalogs.antiquityCategories),
    transformCollectiblesProgress(account, catalogs.collectibleCategories),
    transformItemSetProgress(account),
    transformAccountLoreUnion(rows),
    transformAccountPoiUnion(transformPoiProgress(rows, catalogs.poiZones), catalogs.poiZones),
    transformAccountQuestUnion(transformQuestProgress(rows, catalogs.questZones)),
    transformAccountRecipeUnion(transformRecipeProgress(rows)),
    transformAccountScribingUnion(transformScribingProgress(rows)),
    transformAccountTraitResearchUnion(traitResearch, catalogs.craftTypes, catalogs.researchLines),
    transformTributeProgress(account, catalogs.tributePatrons),
    transformAccountZoneCompletionUnion(
      transformZoneCompletionProgress(rows, catalogs.zoneCompletionZones)
    ),
    account?.bankUpgrade ?? { current: 0, max: 0 },
    account?.grandMasterStations,
    transformSubclassingSkillLineProgress(account),
    transformSubclassingSkillMorphProgress({
      subclassingSkillLineProgress: account?.subclassingSkillLineProgress,
    })
  )
}
