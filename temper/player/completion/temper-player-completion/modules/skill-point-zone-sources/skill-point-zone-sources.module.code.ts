import type {
  SkillPointGeneralSource,
  SkillPointZoneSource,
} from "akasha/temper/player/completion/temper-player-completion/modules/skill-point-source-types/skill-point-source-types.module.code.ts"

export interface SkillPointPage {
  readonly key?: unknown
  readonly title?: unknown
  readonly category?: unknown
  readonly maxValue?: unknown
  readonly maxQuests?: unknown
  readonly maxSkyshards?: unknown
  readonly pvp?: unknown
  readonly displayOrder?: unknown
}

export const SKILL_POINT_FIELDS: readonly string[] = [
  "slug",
  "key",
  "title",
  "category",
  "maxValue",
  "maxQuests",
  "maxSkyshards",
  "pvp",
  "displayOrder",
]

const GENERAL_KEYS: readonly SkillPointGeneralSource["key"][] = [
  "level",
  "mainQuests",
  "tutorial",
  "foliumDiscognitum",
  "pvpRank",
  "maelstromArena",
  "endlessArchive",
]

interface SkillPointSources {
  readonly general: readonly SkillPointGeneralSource[]
  readonly zones: readonly SkillPointZoneSource[]
  readonly storyZones: readonly SkillPointZoneSource[]
}

type ReadPages = (this: void) => readonly SkillPointPage[]

const UNREAD =
  "the skill point sources are read from the skill point pages, and nothing has read them yet — hold the skill catalogue before the work starts"

let held: SkillPointSources | null = null

let reader: ReadPages | null = null

function numberAt(page: SkillPointPage, value: unknown, what: string): number {
  if (typeof value !== "number") {
    throw new Error(`the skill point source ${String(page.key)} states no number for ${what}`)
  }
  return value
}

function textAt(page: SkillPointPage, value: unknown, what: string): string {
  if (typeof value !== "string") {
    throw new Error(`the skill point source ${String(page.key)} states no ${what}`)
  }
  return value
}

function generalOf(page: SkillPointPage): SkillPointGeneralSource {
  const key = GENERAL_KEYS.find((one) => one === page.key)
  if (key === undefined) {
    throw new Error(`the skill point source ${String(page.key)} names no count a character holds`)
  }
  return {
    key,
    label: textAt(page, page.title, "title"),
    maxValue: numberAt(page, page.maxValue, "its most"),
  }
}

function zoneOf(page: SkillPointPage): SkillPointZoneSource {
  const zone: SkillPointZoneSource = {
    key: textAt(page, page.key, "key"),
    label: textAt(page, page.title, "title"),
    maxQuests: numberAt(page, page.maxQuests, "its quests"),
    maxSkyshards: numberAt(page, page.maxSkyshards, "its skyshards"),
  }
  if (page.pvp === true) zone.pvp = true
  return zone
}

function sourcesOf(pages: readonly SkillPointPage[]): SkillPointSources {
  const placed = [...pages].sort(
    (one, other) =>
      numberAt(one, one.displayOrder, "its place") -
      numberAt(other, other.displayOrder, "its place")
  )
  const general = placed.filter((page) => page.category === "general").map(generalOf)
  const zones = placed.filter((page) => page.category === "zone").map(zoneOf)
  const storyZones = zones.filter((zone) => zone.maxQuests > 0 && zone.pvp !== true)
  return { general, zones, storyZones }
}

export function holdSkillPointPages(pages: readonly SkillPointPage[]): undefined {
  held = sourcesOf(pages)
  return undefined
}

export function readSkillPointPagesWith(read: ReadPages): undefined {
  reader = read
  return undefined
}

export function skillPointSources(): SkillPointSources {
  if (held === null && reader !== null) held = sourcesOf(reader())
  if (held === null) throw new Error(UNREAD)
  return held
}

export function skillPointZoneSources(): readonly SkillPointZoneSource[] {
  return skillPointSources().zones
}

export function skillPointStoryZoneSources(): readonly SkillPointZoneSource[] {
  return skillPointSources().storyZones
}
