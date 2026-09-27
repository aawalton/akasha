import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { temperDungeon } from "akasha/temper/catalog/world/temper-dungeon/temper-dungeon.page-type.ts"
import { PUBLIC_DUNGEON_PAGES } from "akasha/temper/catalog/world/temper-public-dungeon/modules/public-dungeon-pages/public-dungeon-pages.module.code.ts"
import { temperSkillPoint } from "akasha/temper/player/character/temper-skill-point/temper-skill-point.page-type.ts"

interface ZoneRaw {
  key: string
  quests: number[]
}

interface SkillPointSourcePage {
  readonly key?: unknown
  readonly category?: unknown
  readonly displayOrder?: unknown
  readonly esoZoneId?: unknown
  readonly skillPointQuests?: unknown
  readonly skillPointAchievements?: unknown
}

interface DungeonSourcePage {
  readonly key?: unknown
  readonly esoZoneId?: unknown
  readonly zoneKey?: unknown
  readonly questId?: unknown
  readonly displayOrder?: unknown
}

export interface GroupDungeonEntry {
  key: string
  id: number
  zone: string
  quest: number
}

export interface PublicDungeonEntry {
  key: string
  id: number
  zone: string
  achievement: number
}

const SOURCE_PAGES = $pagesOfType<SkillPointSourcePage>(temperSkillPoint)

const DUNGEON_PAGES = $pagesOfType<DungeonSourcePage>(temperDungeon)

function placeOf(page: { readonly displayOrder?: unknown }): number {
  return typeof page.displayOrder === "number" ? page.displayOrder : 0
}

function numbersIn(rows: unknown, field: string): number[] {
  const found: number[] = []
  if (!Array.isArray(rows)) return found
  for (const row of rows) {
    if (typeof row !== "object" || row === null) continue
    const value = (row as Record<string, unknown>)[field]
    if (typeof value === "number") found.push(value)
  }
  return found
}

function sourceNamed(key: string): SkillPointSourcePage | undefined {
  return SOURCE_PAGES.find((page) => page.key === key)
}

function questsOf(key: string): number[] {
  return numbersIn(sourceNamed(key)?.skillPointQuests, "esoQuestId")
}

function zoneIdsOf(pages: readonly SkillPointSourcePage[]): Record<string, number> {
  const ids: Record<string, number> = {}
  for (const page of pages) {
    if (typeof page.key === "string" && typeof page.esoZoneId === "number") {
      ids[page.key] = page.esoZoneId
    }
  }
  return ids
}

function zonesOf(pages: readonly SkillPointSourcePage[]): ZoneRaw[] {
  const zones: ZoneRaw[] = []
  const placed = [...pages].sort((one, other) => placeOf(one) - placeOf(other))
  for (const page of placed) {
    if (page.category !== "zone" || typeof page.key !== "string") continue
    zones.push({ key: page.key, quests: numbersIn(page.skillPointQuests, "esoQuestId") })
  }
  return zones
}

function groupDungeonsOf(pages: readonly DungeonSourcePage[]): GroupDungeonEntry[] {
  const dungeons: GroupDungeonEntry[] = []
  const placed = [...pages].sort((one, other) => placeOf(one) - placeOf(other))
  for (const page of placed) {
    const { key, esoZoneId, zoneKey, questId } = page
    if (typeof key !== "string" || typeof esoZoneId !== "number") continue
    if (typeof zoneKey !== "string" || typeof questId !== "number") continue
    dungeons.push({ key, id: esoZoneId, zone: zoneKey, quest: questId })
  }
  return dungeons
}

export const ZONE_IDS: Record<string, number> = zoneIdsOf(SOURCE_PAGES)

export const RAW_ZONES: ZoneRaw[] = zonesOf(SOURCE_PAGES)

export const MAIN_QUESTS: number[] = questsOf("mainQuests")

export const TUTORIALS: number[] = questsOf("tutorial")

export const ENDLESS_ARCHIVE: number[] = questsOf("endlessArchive")

const ENDLESS_ARCHIVE_ZONE = sourceNamed("endlessArchive")?.esoZoneId

export const ENDLESS_ARCHIVE_ZONE_ID: number =
  typeof ENDLESS_ARCHIVE_ZONE === "number" ? ENDLESS_ARCHIVE_ZONE : 0

export const MAEL_ACHIEVEMENT: number =
  numbersIn(sourceNamed("maelstromArena")?.skillPointAchievements, "esoAchievementId")[0] ?? 0

export const GROUP_DUNGEONS: GroupDungeonEntry[] = groupDungeonsOf(DUNGEON_PAGES)

export const PUBLIC_DUNGEONS: readonly PublicDungeonEntry[] = PUBLIC_DUNGEON_PAGES.map((one) => ({
  key: one.key,
  id: one.esoZoneId,
  zone: one.zoneKey,
  achievement: one.esoAchievementId,
}))
