import { createDataFile } from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import type { SkillLineId as SkillLinePageSlug } from "akasha/temper/catalog/skill/line/modules/skill-line-ids/skill-line-ids.data-table.code.ts"
import { ALLIANCE_WAR_SKILL_LINES } from "akasha/temper/player/character/skill/line/modules/alliance-war-skill-lines/alliance-war-skill-lines.module.code.ts"
import { CLASS_SKILL_LINES } from "akasha/temper/player/character/skill/line/modules/class-skill-lines/class-skill-lines.module.code.ts"
import { COMPANION_SKILL_LINES } from "akasha/temper/player/character/skill/line/modules/companion-skill-lines/companion-skill-lines.module.code.ts"
import { RACIAL_AND_CRAFT_SKILL_LINES } from "akasha/temper/player/character/skill/line/modules/racial-and-craft-skill-lines/racial-and-craft-skill-lines.module.code.ts"
import type { SkillLineTemplate } from "akasha/temper/player/character/skill/line/modules/skill-line-template/skill-line-template.module.code.ts"
import { VENGEANCE_SKILL_LINES } from "akasha/temper/player/character/skill/line/modules/vengeance-skill-lines/vengeance-skill-lines.module.code.ts"
import { WEAPON_AND_ARMOR_SKILL_LINES } from "akasha/temper/player/character/skill/line/modules/weapon-and-armor-skill-lines/weapon-and-armor-skill-lines.module.code.ts"
import { WORLD_AND_GUILD_SKILL_LINES } from "akasha/temper/player/character/skill/line/modules/world-and-guild-skill-lines/world-and-guild-skill-lines.module.code.ts"

const SKILL_LINES_DATA = {
  "no-skill-line": {
    id: "no-skill-line" as const,
    name: "No Skill Line",
    subcategoryId: "none" as const,
    displayOrder: 0,
    esoSkillLineId: 0,
    maxRank: 0,
  },
  ...CLASS_SKILL_LINES,
  ...WEAPON_AND_ARMOR_SKILL_LINES,
  ...WORLD_AND_GUILD_SKILL_LINES,
  ...ALLIANCE_WAR_SKILL_LINES,
  ...RACIAL_AND_CRAFT_SKILL_LINES,
  ...COMPANION_SKILL_LINES,
  ...VENGEANCE_SKILL_LINES,
} satisfies Record<string, SkillLineTemplate>

export const skillLines = createDataFile<SkillLineTemplate>()(SKILL_LINES_DATA)

export type SkillLineId = SkillLinePageSlug

type ByClass = Readonly<Record<string, readonly SkillLineId[]>>

function computeSkillLinesByClass(lines: typeof skillLines.list): ByClass {
  const grouped: Record<string, SkillLineId[]> = {}
  for (const line of lines) {
    if (!("class" in line) || line.class === undefined) continue
    const classId: string = line.class
    const existing = grouped[classId]
    if (existing) {
      existing.push(line.id)
    } else {
      grouped[classId] = [line.id]
    }
  }
  return grouped
}

let byClass: { readonly from: typeof skillLines.list; readonly grouped: ByClass } | null = null

const EMPTY_SKILL_LINE_IDS: readonly SkillLineId[] = []

export function getSkillLineIdsForClass(classId: string): readonly SkillLineId[] {
  const from = skillLines.list
  if (byClass?.from !== from) byClass = { from, grouped: computeSkillLinesByClass(from) }
  return byClass.grouped[classId] ?? EMPTY_SKILL_LINE_IDS
}
