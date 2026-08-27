import { classes } from "../code/classes-data.ts"
import { races } from "../code/game-characters-races.ts"
import { skillLineCategoriesSorted } from "../code/skill-line-categories.ts"
import {
  getSkillLineIdsForClass,
  skillLines,
} from "../code/skill-lines-data.ts"
import { getRacialSkillLineIdForRace } from "../code/passive-queries.ts"
import { morphableSkillsByLine } from "../code/game-characters-skills-morphs-core.ts"

const EXCLUDED_CATEGORIES = new Set(["none", "companion", "class", "racial"])
const EXCLUDED_SKILL_LINES = new Set(["no-skill-line", "alliance-war-emperor"])

export function generateSkillLineMappings(): string {
  const filteredIds = skillLines.ids.filter(
    (id) => skillLines.data[id]?.subcategoryId !== "companion"
  )

  const indexEntries: string[] = []
  const maxRankEntries: string[] = []
  const morphableEntries: string[] = []
  const morphableDetailEntries: string[] = []
  const displayOrderEntries: string[] = []
  for (const [i, skillLineId] of filteredIds.entries()) {
    const sl = skillLines.data[skillLineId]
    if (sl === undefined) continue
    if (sl.esoSkillLineId === 0) continue
    indexEntries.push(`  [${sl.esoSkillLineId}]: ${i}, // ${sl.name}`)
    if (sl.maxRank > 0) {
      maxRankEntries.push(`  [${sl.esoSkillLineId}]: ${sl.maxRank}, // ${sl.name}`)
    }
    const morphableSkills = morphableSkillsByLine.get(skillLineId)
    if (morphableSkills !== undefined) {
      morphableEntries.push(`  [${sl.esoSkillLineId}]: ${morphableSkills.length}, // ${sl.name}`)
      const detailLiteral = morphableSkills
        .map(
          (m) =>
            `{ baseName: ${JSON.stringify(m.baseName)}, morph1Name: ${JSON.stringify(m.morph1Name)}, morph2Name: ${JSON.stringify(m.morph2Name)}, skillType: ${JSON.stringify(m.skillType)}, lineRankNeeded: ${m.lineRankNeeded} }`
        )
        .join(", ")
      morphableDetailEntries.push(`  [${sl.esoSkillLineId}]: [${detailLiteral}], // ${sl.name}`)
      displayOrderEntries.push(`  [${sl.esoSkillLineId}]: ${sl.displayOrder}, // ${sl.name}`)
    }
  }

  const classLineEntries: string[] = []
  const allClassLineEntries: string[] = []
  for (const classId of classes.ids) {
    const cls = classes.data[classId]
    if (cls === undefined || cls.esoClassId === 0) continue
    const esoLineIds: number[] = []
    for (const slId of getSkillLineIdsForClass(classId)) {
      const sl = skillLines.data[slId]
      if (sl !== undefined && sl.esoSkillLineId !== 0) esoLineIds.push(sl.esoSkillLineId)
    }
    classLineEntries.push(`  [${cls.esoClassId}]: [${esoLineIds.join(", ")}], // ${cls.name}`)
    for (const esoId of esoLineIds) {
      allClassLineEntries.push(`  [${esoId}]: true,`)
    }
  }

  const racialLinePerRaceEntries: string[] = []
  for (const race of races.list) {
    if (race.esoRaceId === 0) continue
    const slId = getRacialSkillLineIdForRace(race.id)
    if (slId === null) continue
    if (EXCLUDED_SKILL_LINES.has(slId)) continue
    const sl = skillLines.data[slId]
    if (sl === undefined || sl.esoSkillLineId === 0) continue
    racialLinePerRaceEntries.push(
      `  [${race.esoRaceId}]: ${sl.esoSkillLineId}, // ${race.name} → ${sl.name}`
    )
  }

  const baseApplicableEntries: string[] = []
  for (const category of skillLineCategoriesSorted) {
    if (EXCLUDED_CATEGORIES.has(category.id)) continue
    for (const sl of skillLines.list) {
      if (sl.subcategoryId !== category.id) continue
      if (EXCLUDED_SKILL_LINES.has(sl.id)) continue
      if (sl.esoSkillLineId === 0) continue
      baseApplicableEntries.push(`  [${sl.esoSkillLineId}]: true, // ${sl.name}`)
    }
  }

  return `\
/**
 * Skill Line Mappings (Generated)
 *
 * Maps ESO skill line IDs to temper indices.
 * Excludes companion skill lines (handled by companion codec).
 * Source: engine/skills/skill-lines-data.ts
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

export const SKILL_LINE_ESO_ID_TO_INDEX: Record<number, number> = {
${indexEntries.join("\n")}
}

export const SKILL_LINE_MAX_RANK: Record<number, number> = {
${maxRankEntries.join("\n")}
}

export const MORPHABLE_SKILLS_PER_LINE: Record<number, number> = {
${morphableEntries.join("\n")}
}

export const MORPHABLE_SKILLS_DETAIL_PER_LINE: Record<
  number,
  ReadonlyArray<{
    baseName: string
    morph1Name: string
    morph2Name: string
    skillType: "active" | "ultimate"
    lineRankNeeded: number
  }>
> = {
${morphableDetailEntries.join("\n")}
}

export const SKILL_LINE_DISPLAY_ORDER: Record<number, number> = {
${displayOrderEntries.join("\n")}
}

export const CLASS_ESO_SKILL_LINE_IDS: Record<number, number[]> = {
${classLineEntries.join("\n")}
}

export const ALL_CLASS_ESO_SKILL_LINE_IDS: Record<number, boolean> = {
${allClassLineEntries.join("\n")}
}

export const RACIAL_ESO_LINE_ID_PER_ESO_RACE: Record<number, number> = {
${racialLinePerRaceEntries.join("\n")}
}

export const BASE_APPLICABLE_ESO_LINE_IDS: Record<number, true> = {
${baseApplicableEntries.join("\n")}
}

export function getPlayerSkillLineIndex(esoSkillLineId: number): number {
  return SKILL_LINE_ESO_ID_TO_INDEX[esoSkillLineId] ?? 0
}
`
}
